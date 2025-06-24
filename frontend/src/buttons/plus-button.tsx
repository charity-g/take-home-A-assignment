import React from 'react'
import { Button } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface PlusButtonProps {
  onClick: () => void
  label?: string
}

const PlusButton: React.FC<PlusButtonProps> = ({ onClick, label = 'Add' }) => {
  return (
    <Button
      leftIcon={<FontAwesomeIcon icon={faPlus} />}
      onClick={onClick}
      variant="filled"
      color="darkblue"
    >
      {label}
    </Button>
  )
}

export default PlusButton
