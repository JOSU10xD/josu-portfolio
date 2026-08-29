// src/App.jsx
import React, { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";

/**
 * Normalizer component: runs on mount and:
 * 1. Checks if the URL pathname ends with a section name (e.g., "/about", "/projects" from a reload).
 *    If so, it translates the pathname into a clean hash route (e.g. "/#/about").
 * 2. Checks if there is a flat hash like "#about" and normalizes it to "#/about".
 */
function HashNormalizer() {
  useEffect(() => {
    const path = window.location.pathname; // e.g. "/<base>/about" or "/about"
    const match = path.match(/\/(about|projects|contact|home|timeline)\/?$/i);

    if (match) {
      const section = match[1].toLowerCase();
      // Strip the section name from the end of the pathname to get the base path
      const basePath = path.replace(/\/(about|projects|contact|home|timeline)\/?$/i, "/");
      // Redirect to the hash-based equivalent
      window.location.replace(basePath + window.location.search + "#/" + section);
      return;
    }

    const hash = window.location.hash; // e.g. "#about" or "#/about" or ""
    if (hash && hash.length > 1 && !hash.startsWith("#/")) {
      const newHash = "#/" + hash.slice(1);
      window.location.replace(path + window.location.search + newHash);
    }
  }, []);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      {/* run normalizer early */}
      <HashNormalizer />

      <Routes>
        {/* primary single-page route */}
        <Route path="/" element={<Home />} />

        {/* Support incoming normalized routes */}
        <Route path="home" element={<Home />} />
        <Route path="about" element={<Home />} />
        <Route path="projects" element={<Home />} />
        <Route path="contact" element={<Home />} />

        {/* catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
