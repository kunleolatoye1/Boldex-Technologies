// Local preview of the website: run  node preview.mjs  then open http://localhost:4173
// (Mimics the live host: folder index.html, trailing-slash redirect, 404.html.)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "public_html");
const PORT = Number(process.env.PORT || 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    let file = path.join(ROOT, decodeURIComponent(url.pathname));
    if (!file.startsWith(path.normalize(ROOT))) file = ROOT;
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        res.writeHead(301, { Location: url.pathname + "/" + url.search });
        return res.end();
      }
      file = path.join(file, "index.html");
    }
    let status = 200;
    if (!fs.existsSync(file)) {
      status = 404;
      file = path.join(ROOT, "404.html");
    }
    res.writeHead(status, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`Serving ${ROOT} on http://localhost:${PORT}`));
