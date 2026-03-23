import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.cwd(), "dist");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 4173);

if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(
    "[preview:dist] dist directory not found. Run `pnpm build` first.",
  );
  process.exit(1);
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".webp": "image/webp",
};

function safePath(urlPath) {
  const withoutQuery = urlPath.split("?")[0].split("#")[0];
  const normalized = normalize(withoutQuery);
  const relative = normalized === "/" ? "/index.html" : normalized;
  const absolute = resolve(root, `.${relative}`);
  if (!absolute.startsWith(root)) return null;
  return absolute;
}

const server = createServer((req, res) => {
  const requestPath = req.url || "/";
  const filePath = safePath(requestPath);
  if (!filePath) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  let target = filePath;
  if (existsSync(target) && statSync(target).isDirectory())
    target = join(target, "index.html");

  if (!existsSync(target)) {
    target = join(root, "index.html");
  }

  try {
    const buffer = readFileSync(target);
    const type = contentTypes[extname(target)] || "application/octet-stream";
    res.setHeader("Content-Type", type);
    res.setHeader("Cache-Control", "no-cache");
    res.statusCode = 200;
    res.end(buffer);
  } catch (error) {
    res.statusCode = 500;
    res.end(
      `Internal Server Error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
});

server.listen(port, host, () => {
  console.log(`[preview:dist] Serving ${root}`);
  console.log(`[preview:dist] Open http://${host}:${port}`);
  if (host === "0.0.0.0") {
    console.log(
      "[preview:dist] LAN mode enabled. Open from other devices via this machine's LAN IP.",
    );
  }
});
