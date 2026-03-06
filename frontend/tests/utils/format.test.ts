import { describe, it, expect } from 'vitest'
import { formatFileSize } from '../../src/utils/format'

describe('formatFileSize', () => {
  it('formats bytes correctly', () => {
    expect(formatFileSize(500)).toBe('500 B')
    expect(formatFileSize(1023)).toBe('1023 B')
  })

  it('formats kilobytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1.0 KB')
    expect(formatFileSize(1536)).toBe('1.5 KB')
    expect(formatFileSize(1024 * 1023)).toBe('1023.0 KB')
  })

  it('formats megabytes correctly', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1.0 MB')
    expect(formatFileSize(1024 * 1024 * 1.5)).toBe('1.5 MB')
  })

  it('formats gigabytes correctly', () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.0 GB')
    expect(formatFileSize(1024 * 1024 * 1024 * 2.5)).toBe('2.5 GB')
  })

  it('formats terabytes correctly', () => {
    expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe('1.0 TB')
    expect(formatFileSize(1024 * 1024 * 1024 * 1024 * 1.2)).toBe('1.2 TB')
  })
})
