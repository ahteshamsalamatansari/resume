// Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver),
// so new and changed pages are re-crawled quickly. Bing powers ChatGPT search and Copilot.
// Usage: npm run indexnow            (after a production deploy)
import { readdirSync, readFileSync } from "node:fs";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahteshamsalamatansari.vercel.app").replace(/\/$/, "");
const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("No IndexNow key file (32 hex chars + .txt) in public/");
const key = readFileSync(`public/${keyFile}`, "utf8").trim();

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation: `${SITE}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status >= 400) process.exitCode = 1;
