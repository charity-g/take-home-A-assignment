import React, { useState } from 'react'
import { useMantineTheme } from '@mantine/core'

interface StatusButtonProps {
  status: 'OPEN' | 'RESOLVED'
  onClick?: () => void
}
const queryColors = {
  dark: {
    OPEN: {
      background: '#3b2323',
      color: '#ffb4b4',
    },
    RESOLVED: {
      background: '#228B22',
      color: '#9ACD32',
    },
  },
  light: {
    OPEN: {
      background: '#f8d7da',
      color: '#c82333',
    },
    RESOLVED: {
      background: '#9ACD32',
      color: '#228B22',
    },
  },
}

const StatusButton: React.FC<StatusButtonProps> = ({ status, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const mantineTheme = useMantineTheme()
  const theme =
    mantineTheme.colorScheme === 'dark' ? queryColors.dark : queryColors.light
  const colorSet = theme[status] || { background: '#ccc', color: '#000' }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? lighten(colorSet.background, 0.1)
          : colorSet.background,
        color: colorSet.color,
        borderRadius: 12,
        padding: '4px 12px',
        fontWeight: 600,
        fontSize: 20,
        display: 'inline-block',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
      }}
    >
      {status}
    </button>
  )
}

function lighten(color: string, amount: number): string {
  try {
    const num = parseInt(color.slice(1), 16)
    const r = Math.min(255, (num >> 16) + 255 * amount)
    const g = Math.min(255, ((num >> 8) & 0x00ff) + 255 * amount)
    const b = Math.min(255, (num & 0x0000ff) + 255 * amount)
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
  } catch {
    return color // fallback if color is invalid
  }
}

export default StatusButton
