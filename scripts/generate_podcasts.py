#!/usr/bin/env python3
"""
Générateur de Podcasts Audio Immersifs — Les Chroniques de Rokugan (L5R 4e)
Convertit campagne/scenario-N.html en épisodes MP3 multi-voix (Edge TTS Neuronal)
avec voix distinctes (Conteur immersif, dialogues masculins/féminins, pensées)
et habillage sonore pentatonique japonais synthétisé par ffmpeg.
"""

import argparse
import asyncio
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
CAMPAGNE_DIR = ROOT / "campagne"
AUDIO_DIR = ROOT / "assets" / "audio"
MANIFEST_PATH = ROOT / "data" / "podcasts-manifest.json"

# Voix neuronales françaises (Microsoft Edge TTS)
VOICES = {
    "narrator": {"voice": "fr-FR-RemyMultilingualNeural", "rate": "-3%", "pitch": "-2Hz"},
    "narrator_alt": {"voice": "fr-FR-HenriNeural", "rate": "-3%", "pitch": "-1Hz"},
    "narrator_3": {"voice": "fr-CH-FabriceNeural", "rate": "-2%", "pitch": "-1Hz"},
    "dialogue_male_grave": {"voice": "fr-FR-HenriNeural", "rate": "-5%", "pitch": "-4Hz"},
    "dialogue_male_alt": {"voice": "fr-CH-FabriceNeural", "rate": "-2%", "pitch": "-1Hz"},
    "dialogue_female": {"voice": "fr-FR-VivienneMultilingualNeural", "rate": "-2%", "pitch": "+1Hz"},
    "thought": {"voice": "fr-FR-RemyMultilingualNeural", "rate": "-8%", "pitch": "-4Hz"},
    "chapter": {"voice": "fr-FR-HenriNeural", "rate": "-6%", "pitch": "-3Hz"},
}

FEMALE_HINTS = re.compile(
    r"\b(yuriko|elle|dame|pr[eê]tresse|geisha|shugenja\s+femme|m[eè]re|fille|s[oœ]ur|servante|ma[iî]tresse|kachiko|hotaru|tsukune|kumiko|aiko|hana|kaede|mariko)\b",
    re.IGNORECASE,
)
LORD_HINTS = re.compile(
    r"\b(takeda|kisada|seigneur|magistrat|daimyo|champion|ma[iî]tre|bunzo|moine|ancien|vieillard|soshi|hida|tenkasu|tenkazu|iuchiban|empereur)\b",
    re.IGNORECASE,
)


class ScenarioHTMLParser(HTMLParser):
    """Extrait titre, épigraphe, chapitres et paragraphes lisibles d'un scénario HTML."""

    def __init__(self):
        super().__init__()
        self.title = ""
        self.motto = ""
        self.blocks = []  # list of (kind, text, version_idx)

        self._in_title = False
        self._in_motto = False
        self._story_depth = 0
        self._skip_depth = 0
        self._in_p = False
        self._in_h2 = False
        self._in_thought = False
        self._buf = []
        self._p_parts = []
        self._current_version = 1

    def handle_starttag(self, tag, attrs):
        attr_map = dict(attrs)
        elem_id = attr_map.get("id", "")
        cls = attr_map.get("class", "")

        if elem_id == "story-title":
            self._in_title = True
            self._buf = []
            return
        if elem_id == "story-motto":
            self._in_motto = True
            self._buf = []
            return

        if elem_id == "story-content":
            self._story_depth = 1
            return

        if self._story_depth > 0:
            self._story_depth += 1

            if elem_id.startswith("content-v"):
                try:
                    self._current_version = int(elem_id.replace("content-v", ""))
                except ValueError:
                    self._current_version = 1

            if tag in ("figcaption", "script", "style", "button", "select"):
                self._skip_depth += 1
                return
            if self._skip_depth > 0:
                return

            if tag == "h2":
                self._in_h2 = True
                self._buf = []
            elif tag == "p":
                self._in_p = True
                self._p_parts = []
                self._buf = []
            elif self._in_p and tag == "span" and "inner-thought" in cls:
                self._flush_p_buf("normal")
                self._in_thought = True

    def handle_endtag(self, tag):
        if self._in_title and tag in ("h1", "h2"):
            self.title = clean_text("".join(self._buf))
            self._in_title = False
            return
        if self._in_motto and tag == "p":
            self.motto = clean_text("".join(self._buf))
            self._in_motto = False
            return

        if self._story_depth > 0:
            if self._skip_depth > 0:
                if tag in ("figcaption", "script", "style", "button", "select"):
                    self._skip_depth -= 1
                self._story_depth -= 1
                return

            if self._in_h2 and tag == "h2":
                text = clean_text("".join(self._buf))
                if text:
                    self.blocks.append(("chapter", text, self._current_version))
                self._in_h2 = False
            elif self._in_p and tag == "span" and self._in_thought:
                self._flush_p_buf("thought")
                self._in_thought = False
            elif self._in_p and tag == "p":
                self._flush_p_buf("thought" if self._in_thought else "normal")
                self._in_thought = False
                self._in_p = False
                if self._p_parts:
                    self.blocks.append(("paragraph", self._p_parts, self._current_version))

            self._story_depth -= 1

    def handle_data(self, data):
        if self._skip_depth > 0:
            return
        if self._in_title or self._in_motto or self._in_h2 or self._in_p:
            self._buf.append(data)

    def _flush_p_buf(self, kind):
        text = clean_text("".join(self._buf))
        self._buf = []
        if text:
            self._p_parts.append((kind, text))


def clean_text(text: str) -> str:
    # Retire les emojis isolés et nettoie les espaces multiples
    text = re.sub(r"[\U00010000-\U0010ffff]", "", text)
    text = re.sub(r"[◄►🔊▶⏸⏹⏮⏭📜⚔️🐺🏹🔨✨🗺️🏯]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def choose_dialogue_voice(context_text: str, toggle_idx: int) -> str:
    if FEMALE_HINTS.search(context_text):
        return "dialogue_female"
    if LORD_HINTS.search(context_text):
        return "dialogue_male_grave"
    return "dialogue_male_grave" if toggle_idx % 2 == 0 else "dialogue_male_alt"


def split_paragraph_to_segments(parts, version_idx: int, dialogue_counter: list):
    """Découpe un paragraphe en segments (voice_key, text, pause_after_ms)."""
    narrator_key = {1: "narrator", 2: "narrator_alt", 3: "narrator_3"}.get(version_idx, "narrator")
    full_context = " ".join(t for _, t in parts)
    segments = []

    quote_pattern = re.compile(r"(«[^»]{4,}»|\"[^\"]{6,}\")")

    for kind, text in parts:
        if kind == "thought":
            segments.append(("thought", text, 250))
            continue

        pos = 0
        for m in quote_pattern.finditer(text):
            before = clean_text(text[pos : m.start()])
            if before:
                segments.append((narrator_key, before, 160))

            quote_clean = clean_text(m.group(1).strip("«»\" "))
            if quote_clean:
                ctx = before[-120:] if before else full_context[:160]
                vkey = choose_dialogue_voice(ctx, dialogue_counter[0])
                dialogue_counter[0] += 1
                segments.append((vkey, quote_clean, 220))
            pos = m.end()

        after = clean_text(text[pos:])
        if after:
            segments.append((narrator_key, after, 350))

    if segments:
        v, t, _ = segments[-1]
        segments[-1] = (v, t, 420)
    return segments


def chunk_long_text(text: str, max_chars: int = 900):
    """Évite d'envoyer des blocs trop longs d'un seul coup à Edge TTS."""
    if len(text) <= max_chars:
        return [text]
    sentences = re.split(r"(?<=[.!?…])\s+", text)
    chunks, buf = [], ""
    for s in sentences:
        if not buf:
            buf = s
        elif len(buf) + 1 + len(s) <= max_chars:
            buf += " " + s
        else:
            chunks.append(buf)
            buf = s
    if buf:
        chunks.append(buf)
    return chunks


def build_podcast_script(html_path: Path, scenario_num: int):
    raw = html_path.read_text(encoding="utf-8")
    parser = ScenarioHTMLParser()
    parser.feed(raw)

    segments = []  # list of (voice_key, text, pause_after_ms)
    title = parser.title or f"Scénario {scenario_num}"
    segments.append(("chapter", f"Les Chroniques de Rokugan. {title}.", 650))
    if parser.motto:
        segments.append(("thought", parser.motto.strip("«»\" "), 800))

    dialogue_counter = [0]
    for kind, payload, v_idx in parser.blocks:
        if kind == "chapter":
            segments.append(("chapter", payload, 700))
        elif kind == "paragraph":
            segs = split_paragraph_to_segments(payload, v_idx, dialogue_counter)
            for vkey, txt, pause_ms in segs:
                chunks = chunk_long_text(txt)
                for ci, ch in enumerate(chunks):
                    p_ms = pause_ms if ci == len(chunks) - 1 else 140
                    segments.append((vkey, ch, p_ms))

    segments.append(("chapter", f"Fin de l'Acte {scenario_num}. Les Chroniques de Rokugan.", 500))
    return title, segments


async def synth_segment(text: str, voice_cfg: dict, out_mp3: Path, retries: int = 3):
    last_err = None
    for attempt in range(retries):
        try:
            voice_name = voice_cfg["voice"] if attempt < 2 else "fr-FR-HenriNeural"
            comm = edge_tts.Communicate(
                text=text,
                voice=voice_name,
                rate=voice_cfg["rate"],
                pitch=voice_cfg["pitch"],
            )
            await comm.save(str(out_mp3))
            if out_mp3.exists() and out_mp3.stat().st_size > 100:
                return
        except Exception as exc:
            last_err = exc
            await asyncio.sleep(1.2 * (attempt + 1))
    raise RuntimeError(f"Échec Edge TTS après {retries} tentatives : {last_err}")


def make_silence_wav(duration_ms: int, out_wav: Path):
    sec = max(0.05, duration_ms / 1000.0)
    subprocess.run(
        [
            "ffmpeg", "-y", "-loglevel", "error",
            "-f", "lavfi", "-i", f"anullsrc=r=24000:cl=mono:d={sec:.3f}",
            "-c:a", "pcm_s16le", str(out_wav),
        ],
        check=True,
    )


def make_japanese_chime_wav(out_wav: Path, duration_sec: float = 2.6):
    """Synthétise un carillon/gong pentatonique subtil (notes Ré-La-Mi) via ffmpeg."""
    expr = (
        "0.16*sin(2*PI*293.66*t)*exp(-1.5*t) + "
        "0.10*sin(2*PI*440.00*t)*exp(-1.9*t) + "
        "0.08*sin(2*PI*587.33*t)*exp(-2.4*t) + "
        "0.05*sin(2*PI*146.83*t)*exp(-1.1*t)"
    )
    subprocess.run(
        [
            "ffmpeg", "-y", "-loglevel", "error",
            "-f", "lavfi", "-i", f"aevalsrc='{expr}':s=24000:d={duration_sec:.2f}",
            "-af", f"afade=t=in:st=0:d=0.06,afade=t=out:st={duration_sec - 0.8:.2f}:d=0.8",
            "-c:a", "pcm_s16le", str(out_wav),
        ],
        check=True,
    )


def probe_duration_sec(mp3_path: Path) -> int:
    res = subprocess.run(
        [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(mp3_path),
        ],
        capture_output=True,
        text=True,
        check=True,
    )
    return int(round(float(res.stdout.strip())))


async def generate_scenario_podcast(scenario_num: int, force: bool = False):
    html_path = CAMPAGNE_DIR / f"scenario-{scenario_num}.html"
    if not html_path.exists():
        print(f"[SKIP] {html_path} introuvable.")
        return None

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    out_mp3 = AUDIO_DIR / f"scenario-{scenario_num}.mp3"

    if out_mp3.exists() and not force and out_mp3.stat().st_size > 10_000:
        dur = probe_duration_sec(out_mp3)
        print(f"[CACHE] Acte {scenario_num} déjà présent ({dur}s, {out_mp3.stat().st_size // 1024} Ko)")
        return {
            "file": f"assets/audio/scenario-{scenario_num}.mp3",
            "durationSec": dur,
            "sizeBytes": out_mp3.stat().st_size,
            "mode": "conteur-immersif",
        }

    title, segments = build_podcast_script(html_path, scenario_num)
    print(f"[GEN] Acte {scenario_num} : {title} ({len(segments)} segments)...")

    with tempfile.TemporaryDirectory(prefix=f"l5r_pod_{scenario_num}_") as tmp_str:
        tmp = Path(tmp_str)
        concat_list = []

        # Intro chime
        intro_wav = tmp / "intro_chime.wav"
        make_japanese_chime_wav(intro_wav, 2.4)
        concat_list.append(intro_wav)

        # Synthèse des segments (concurrence limitée à 3 pour rester respectueux du service)
        sem = asyncio.Semaphore(3)
        seg_files = []

        async def worker(idx, vkey, txt):
            seg_mp3 = tmp / f"seg_{idx:04d}.mp3"
            seg_wav = tmp / f"seg_{idx:04d}.wav"
            async with sem:
                await synth_segment(txt, VOICES[vkey], seg_mp3)
            subprocess.run(
                [
                    "ffmpeg", "-y", "-loglevel", "error",
                    "-i", str(seg_mp3),
                    "-ar", "24000", "-ac", "1", "-c:a", "pcm_s16le",
                    str(seg_wav),
                ],
                check=True,
            )
            return seg_wav

        tasks = [worker(i, vkey, txt) for i, (vkey, txt, _) in enumerate(segments)]
        seg_wavs = await asyncio.gather(*tasks)

        silence_cache = {}
        for i, (_, _, pause_ms) in enumerate(segments):
            concat_list.append(seg_wavs[i])
            if pause_ms > 0:
                if pause_ms not in silence_cache:
                    s_wav = tmp / f"sil_{pause_ms}.wav"
                    make_silence_wav(pause_ms, s_wav)
                    silence_cache[pause_ms] = s_wav
                concat_list.append(silence_cache[pause_ms])

        # Outro chime
        outro_wav = tmp / "outro_chime.wav"
        make_japanese_chime_wav(outro_wav, 2.8)
        concat_list.append(outro_wav)

        list_file = tmp / "concat.txt"
        list_file.write_text(
            "\n".join(f"file '{p.as_posix()}'" for p in concat_list) + "\n",
            encoding="utf-8",
        )

        # Assemblage + normalisation loudness + encodage MP3 64 kbps mono 24 kHz
        subprocess.run(
            [
                "ffmpeg", "-y", "-loglevel", "error",
                "-f", "concat", "-safe", "0", "-i", str(list_file),
                "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
                "-ar", "24000", "-ac", "1", "-b:a", "64k",
                str(out_mp3),
            ],
            check=True,
        )

    dur = probe_duration_sec(out_mp3)
    size = out_mp3.stat().st_size
    print(f"[OK] Acte {scenario_num} généré : {out_mp3.name} ({dur}s, {size // 1024} Ko)")
    return {
        "file": f"assets/audio/scenario-{scenario_num}.mp3",
        "durationSec": dur,
        "sizeBytes": size,
        "mode": "conteur-immersif",
    }


def discover_scenario_numbers():
    nums = []
    for p in CAMPAGNE_DIR.glob("scenario-*.html"):
        m = re.match(r"scenario-(\d+)\.html$", p.name)
        if m:
            nums.append(int(m.group(1)))
    return sorted(nums)


async def main_async(args):
    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        print("Erreur : ffmpeg et ffprobe sont requis dans le PATH.", file=sys.stderr)
        sys.exit(1)

    if args.scenario.strip().lower() == "all":
        targets = discover_scenario_numbers()
    else:
        targets = [int(x.strip()) for x in args.scenario.split(",") if x.strip().isdigit()]

    manifest = {"generatedAt": datetime.now(timezone.utc).isoformat(), "episodes": {}}
    if MANIFEST_PATH.exists():
        try:
            existing = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
            if isinstance(existing.get("episodes"), dict):
                manifest["episodes"] = existing["episodes"]
        except Exception:
            pass

    for n in targets:
        info = await generate_scenario_podcast(n, force=args.force)
        if info:
            manifest["episodes"][str(n)] = info

    manifest["generatedAt"] = datetime.now(timezone.utc).isoformat()
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"[MANIFEST] Mis à jour : {MANIFEST_PATH} ({len(manifest['episodes'])} épisodes)")


def main():
    parser = argparse.ArgumentParser(description="Générateur de Podcasts L5R (Edge TTS)")
    parser.add_argument("--scenario", default="all", help="'all' ou liste de numéros séparés par des virgules (ex: 11 ou 1,2,3)")
    parser.add_argument("--force", action="store_true", help="Régénérer même si le fichier MP3 existe déjà")
    args = parser.parse_args()
    asyncio.run(main_async(args))


if __name__ == "__main__":
    main()
