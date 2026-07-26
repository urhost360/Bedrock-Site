import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = "https://img1.wsimg.com/isteam/ip/a8c44178-2313-4cff-8c5c-ad47552b1fb6";
const OUT = path.resolve("src/assets");

const widescreen = (assetPath, file, label, width = 3840) => ({
  file,
  path: assetPath,
  label,
  suffix: `/:/rs=w:${width},cg:true,m/qt=q:95`,
});

const portrait = (assetPath, file, label, width = 2560) => ({
  file,
  path: assetPath,
  label,
  suffix: `/:/rs=w:${width},cg:true,m/qt=q:95`,
});

const downloads = [
  widescreen("cr%3Dw_1240%2Ch_620%20(3).webp", "hero-dining.jpg", "Dining room hero"),
  widescreen("cr%3Dw_1240%2Ch_620%20(4).webp", "storefront.jpg", "Drive-thru storefront"),
  widescreen("cr%3Dw_1240%2Ch_620%20(5).webp", "patio.jpg", "Outdoor patio"),
  portrait("rs%3Dw_370%2Ccg_true%20(4).webp", "gallery-4.jpg", "Gallery 4"),
  ...[18, 19, 20, 21, 22, 23, 24].map((n) =>
    portrait(`rs%3Dw_370%2Ccg_true%2Cm%20(${n}).webp`, `gallery-${n}.jpg`, `Gallery ${n}`),
  ),
];

async function fetchOne({ file, path: assetPath, label, suffix }) {
  const url = `${BASE}/${assetPath}${suffix}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${label}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(OUT, file), buf);
  console.log(`✓ ${file} (${(buf.length / 1024).toFixed(0)} KB)`);
}

await mkdir(OUT, { recursive: true });
for (const item of downloads) {
  await fetchOne(item);
}
console.log(`\nDownloaded ${downloads.length} photos (3840px heroes, 2560px gallery).`);
