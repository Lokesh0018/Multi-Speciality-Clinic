/**
 * URLs for files in src/assets. Vite fingerprints each file at build time
 * (cache-busting); only URLs end up in the bundle, not file contents.
 * Paths are relative to src/assets, e.g. asset('images/visit.webp').
 */
const urls = import.meta.glob('../assets/**/*.{webp,jpg,png,mp4,webm}', { eager: true, query: '?url', import: 'default' })

export function asset(path) {
  const url = urls[`../assets/${path}`]
  if (!url) throw new Error(`Missing asset: src/assets/${path}`)
  return url
}
