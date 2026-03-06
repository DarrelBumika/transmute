import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import NotFound from '../../src/pages/NotFound'

describe('NotFound Page', () => {
  const renderNotFound = () => {
    return render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )
  }

  it('renders the 404 heading', () => {
    renderNotFound()
    expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument()
  })

  it('renders the "Page Not Found" message', () => {
    renderNotFound()
    expect(screen.getByRole('heading', { level: 2, name: /page not found/i })).toBeInTheDocument()
  })

  it('renders a helpful description', () => {
    renderNotFound()
    expect(screen.getByText(/doesn't exist or has been moved/i)).toBeInTheDocument()
  })

  it('renders a link back to the home page', () => {
    renderNotFound()
    const homeLink = screen.getByRole('link', { name: /back to home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
