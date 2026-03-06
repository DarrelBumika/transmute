/**
 * Formats a byte count into a human-readable string (KB, MB, GB, TB).
 * Uses base-1024 (IEC standard) for calculations.
 * 
 * @param bytes - The byte count to format
 * @returns The formatted string
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(1)} MB`
  const gb = mb / 1024
  if (gb < 1024) return `${gb.toFixed(1)} GB`
  return `${(gb / 1024).toFixed(1)} TB`
}
