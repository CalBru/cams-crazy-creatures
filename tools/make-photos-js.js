/* Builds photos.js from whatever photos are sitting in images/.
   Run it after fetch-photos.js:   node tools/make-photos-js.js
   The game loads photos.js with a plain <script> tag, so it works
   by double-clicking index.html — no web server needed. */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const IMAGES = path.join(ROOT, "images");

/* Titles come from the download script so the credit links stay right. */
const src = fs.readFileSync(path.join(__dirname, "fetch-photos.js"), "utf8");
const WIKI = eval("(" + src.slice(src.indexOf("const WIKI = {") + "const WIKI = ".length,
                                 src.indexOf("};", src.indexOf("const WIKI = {")) + 1) + ")");

const creditsPath = path.join(IMAGES, "credits.json");
const credits = fs.existsSync(creditsPath) ? JSON.parse(fs.readFileSync(creditsPath, "utf8")) : {};

const out = {};
fs.readdirSync(IMAGES).forEach(file => {
  const m = file.match(/^(.+)\.(jpg|png)$/i);
  if (!m) return;
  const id = m[1];
  const title = (credits[id] && credits[id].title) || WIKI[id] || id;
  out[id] = {
    file: file,
    title: title,
    url: (credits[id] && credits[id].url) ||
         "https://en.wikipedia.org/wiki/" + encodeURIComponent(String(title).replace(/ /g, "_"))
  };
});

fs.writeFileSync(
  path.join(ROOT, "photos.js"),
  "/* Real photos of every creature, from Wikipedia.\n" +
  "   Built by tools/make-photos-js.js — don't edit by hand. */\n" +
  "var PHOTOS = " + JSON.stringify(out, null, 2) + ";\n"
);

console.log("photos.js now has " + Object.keys(out).length + " photos");
