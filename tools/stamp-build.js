/* Stamps the current build id into index.html and version.json.

   Run:  node tools/stamp-build.js      (build-share.js runs it for you)

   Why this exists: an "Add to Home Screen" web app on an iPad keeps its own
   copy of the page and never asks the server whether there is a newer one, so
   Cam's iPad sat on an old build while the same URL in Safari was fine. The
   game now checks version.json against the BUILD baked into the page and
   reloads itself when they disagree — but only if this has been run, so the
   two are stamped from the same content.

   The id is a hash of the three files that make up the game, so re-running it
   when nothing has changed is a no-op and there is no version to remember. */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const indexPath = path.join(ROOT, "index.html");
const STAMP = /const BUILD = "[^"]*";/;
/* the two files the page pulls in beside itself */
const SRC = /<script src="(photos|creatures)\.js[^"]*"><\/script>/g;

let html = fs.readFileSync(indexPath, "utf8");
if (!STAMP.test(html)) {
  console.error("couldn't find the BUILD line in index.html");
  process.exit(1);
}

/* hash the game itself, with the old stamp and the old ?v= taken out so it
   can't chase its own tail */
const hash = crypto.createHash("sha256");
hash.update(html.replace(STAMP, "").replace(SRC, '<script src="$1.js"></script>'));
["creatures.js", "photos.js"].forEach(f => hash.update(fs.readFileSync(path.join(ROOT, f))));

const day = new Date().toISOString().slice(0, 10);
const build = day + "-" + hash.digest("hex").slice(0, 8);

/* Stamp the version onto index.html AND onto the two files it loads. Without
   that last part the page can arrive fresh while its catalog comes from cache,
   and the game ends up knowing about a world it has no creatures for. */
const stamped = html
  .replace(STAMP, 'const BUILD = "' + build + '";')
  .replace(SRC, '<script src="$1.js?v=' + build + '"></script>');

if (stamped === html) {
  console.log("already stamped " + build);
} else {
  fs.writeFileSync(indexPath, stamped);
  console.log("stamped " + build);
}

fs.writeFileSync(path.join(ROOT, "version.json"), JSON.stringify({ build: build }) + "\n");
console.log("version.json -> " + build);
