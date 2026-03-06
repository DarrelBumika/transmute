import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Header from '../../src/components/Header'
import { useTheme } from '../../src/ThemeContext'

vi.mock('../../src/ThemeContext', () => ({
  useTheme: vi.fn(),
}))
const mockUseTheme = vi.mocked(useTheme)

function renderHeader(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header />
    </MemoryRouter>
  )
}

describe('Header', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      keepOriginals: true,
      theme: 'rubedo',
      setTheme: vi.fn(),
      setKeepOriginals: vi.fn(),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the Transmute brand link', () => {
    renderHeader()
    const brandLink = screen.getByRole('link', { name: /transmute/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('renders the logo SVG with accessible label', () => {
    renderHeader()
    expect(screen.getByLabelText('Transmute Logo')).toBeInTheDocument()
  })

  it('renders Converter nav link', () => {
    renderHeader()
    const link = screen.getByRole('link', { name: /converter/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders History nav link', () => {
    renderHeader()
    const link = screen.getByRole('link', { name: /history/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/history')
  })

  it('renders Settings nav link', () => {
    renderHeader()
    const link = screen.getByRole('link', { name: /settings/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/settings')
  })

  it('renders Files nav link when keepOriginals is true', () => {
    mockUseTheme.mockReturnValue({
      keepOriginals: true,
      theme: 'rubedo',
      setTheme: vi.fn(),
      setKeepOriginals: vi.fn(),
    })
    renderHeader()
    const link = screen.getByRole('link', { name: /files/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/files')
  })

  it('does not render Files nav link when keepOriginals is false', () => {
    mockUseTheme.mockReturnValue({
      keepOriginals: false,
      theme: 'rubedo',
      setTheme: vi.fn(),
      setKeepOriginals: vi.fn(),
    })
    renderHeader()
    expect(screen.queryByRole('link', { name: /files/i })).not.toBeInTheDocument()
  })

  it('highlights the active Converter link on "/"', () => {
    renderHeader('/')
    const link = screen.getByRole('link', { name: /converter/i })
    expect(link).toHaveClass('text-primary')
  })

  it('highlights the active History link on "/history"', () => {
    renderHeader('/history')
    const link = screen.getByRole('link', { name: /history/i })
    expect(link).toHaveClass('text-primary')
  })

  it('highlights the active Settings link on "/settings"', () => {
    renderHeader('/settings')
    const link = screen.getByRole('link', { name: /settings/i })
    expect(link).toHaveClass('text-primary')
  })

  it('highlights the active Files link on "/files" when keepOriginals is true', () => {
    renderHeader('/files')
    const link = screen.getByRole('link', { name: /files/i })
    expect(link).toHaveClass('text-primary')
  })
})
