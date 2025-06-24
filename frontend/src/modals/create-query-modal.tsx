'use client'

import { Textarea, Button } from '@mantine/core'
import { useState } from 'react'
import QueryModalWrapper from './query-modal-wrapper'
import { FormDataWithQuery } from '../types'

interface CreateQueryModalProps {
  opened: boolean
  modalData: FormDataWithQuery
  onClose: () => void
}

export function CreateQueryModal({ opened, onClose }: CreateQueryModalProps) {
  const [remark, setRemark] = useState('')

  const handleCreate = () => {
    // Handle create logic here
    console.log('Creating query with remark:', remark)
    setRemark('')
    onClose()
  }

  return (
    <QueryModalWrapper
      opened={opened}
      onClose={handleCreate}
      formdata_title="hardcoded title for resolved query"
    >
      <div className="space-y-4">
        {/* Textarea for remarks */}
        <Textarea
          placeholder="Add a new remark"
          value={remark}
          onChange={event => setRemark(event.currentTarget.value)}
          minRows={4}
          maxRows={8}
          className="w-full"
          styles={{
            input: {
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              padding: '12px',
              '&:focus': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 1px #3b82f6',
              },
            },
          }}
        />

        {/* Create Button */}
        <Button
          onClick={handleCreate}
          fullWidth
          size="md"
          className="bg-slate-700 hover:bg-slate-800 text-white font-medium py-3 rounded-md"
          styles={{
            root: {
              backgroundColor: '#334155',
              '&:hover': {
                backgroundColor: '#1e293b',
              },
            },
          }}
        >
          Create
        </Button>
      </div>
    </QueryModalWrapper>
  )
}
