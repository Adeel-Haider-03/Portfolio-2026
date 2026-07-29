/**
 * Converts the project screenshots in public/ to WebP and moves the PNG
 * originals out of public/ so they stop shipping with the site.
 *
 *   node scripts/optimize-images.mjs
 */
import sharp from 'sharp'
import { mkdir, readdir, rename, stat } from 'node:fs/promises'
import { join, parse } from 'node:path'

const PUBLIC = 'public'
const ARCHIVE = 'screenshots-src'
const MAX_WIDTH = 1600 // panels render at 760px, so 1600 covers 2x displays
const QUALITY = 80

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

const files = (await readdir(PUBLIC)).filter((f) => /\.png$/i.test(f))
if (files.length === 0) {
  console.log('No PNGs left in public/ — nothing to do.')
  process.exit(0)
}

await mkdir(ARCHIVE, { recursive: true })

let before = 0
let after = 0

for (const file of files) {
  const src = join(PUBLIC, file)
  const { name } = parse(file)
  const out = join(PUBLIC, `${name}.webp`)

  const sizeBefore = (await stat(src)).size
  const image = sharp(src)
  const { width } = await image.metadata()

  await image
    .resize({ width: Math.min(MAX_WIDTH, width ?? MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out)

  const sizeAfter = (await stat(out)).size
  before += sizeBefore
  after += sizeAfter

  const saved = Math.round(100 - (sizeAfter / sizeBefore) * 100)
  console.log(`${file.padEnd(20)} ${kb(sizeBefore).padStart(8)} -> ${kb(sizeAfter).padStart(8)}  (-${saved}%)`)

  await rename(src, join(ARCHIVE, file))
}

console.log(
  `\nTotal ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB` +
    `  (-${Math.round(100 - (after / before) * 100)}%)`,
)
console.log(`Originals moved to ${ARCHIVE}/`)
