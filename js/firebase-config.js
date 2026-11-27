/**
 * js/firebase-config.js
 * Configuration publique du client Web Firebase (Les Chroniques de Rokugan — L5R 4e)
 * La sécurité des données est intégralement garantie par database.rules.json + Firebase Auth.
 * Compatible Navigateur (window.L5R_FIREBASE_CONFIG) et Node.js (module.exports).
 */
(function (globalScope) {
  'use strict';

  const L5R_FIREBASE_CONFIG = {
    apiKey: "AIzaSyCK7N2N0SVNV6jTIxsnPMpR5WbhC0YDR4A",
    authDomain: "vincenzorpg-l5r.firebaseapp.com",
    databaseURL: "https://vincenzorpg-l5r-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vincenzorpg-l5r",
    storageBucket: "vincenzorpg-l5r.firebasestorage.app",
    messagingSenderId: "921398314716",
    appId: "1:921398314716:web:b22a26f0cac5475ae51619",
    measurementId: "G-VJ36NX837Q"
  };

  const L5R_GM_EMAIL = "vincent.david.perso@gmail.com";

  if (typeof globalScope !== "undefined") {
    globalScope.L5R_FIREBASE_CONFIG = L5R_FIREBASE_CONFIG;
    globalScope.L5R_GM_EMAIL = L5R_GM_EMAIL;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      L5R_FIREBASE_CONFIG,
      L5R_GM_EMAIL
    };
  }
})(typeof window !== "undefined" ? window : globalThis);
