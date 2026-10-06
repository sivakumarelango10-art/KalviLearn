/**
 * Feedback attachments are stored in a PUBLIC bucket and shown to staff, so the declared MIME type / file name from the
 * client is never trusted. The content type is derived from the file's magic bytes; anything that is not a real
 * PNG / JPEG / GIF / WebP image (SVG, HTML, scripts, polyglots with a wrong signature) is rejected.
 */
export type SafeImageMime = 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp'

export function sniffImageMime(buf: Buffer): SafeImageMime | null {
  if (buf.length < 12) return null
  if (
    buf[0] === 0x89 &&
    buf.subarray(1, 4).toString('latin1') === 'PNG' &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return 'image/png'
  }
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg'
  const head6 = buf.subarray(0, 6).toString('latin1')
  if (head6 === 'GIF87a' || head6 === 'GIF89a') return 'image/gif'
  if (buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') {
    return 'image/webp'
  }
  return null
}

const EXTENSION: Record<SafeImageMime, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
}

/** Storage object name that cannot carry a client-chosen extension or path. */
export function safeObjectName(mime: SafeImageMime, randomId: string): string {
  return `feedback/${Date.now()}_${randomId}.${EXTENSION[mime]}`
}
