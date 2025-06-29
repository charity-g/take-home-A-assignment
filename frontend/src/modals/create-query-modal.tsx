'use client'

import { Textarea, Button, Alert } from '@mantine/core'
import { useState } from 'react'
import QueryModalWrapper from './query-modal-wrapper'
import { FormData } from '../types'
import { createQuery } from '../actions/actions'

interface CreateQueryModalProps {
  opened: boolean
  data: FormData
  onClose: (edited: boolean) => void
}

export function CreateQueryModal({
  opened,
  data,
  onClose,
}: CreateQueryModalProps) {
  const [remark, setRemark] = useState('')
  const [failed, setFailed] = useState(false)

  const handleCreate = async () => {
    await createQuery(data.question, remark, data.id)
      .then(success => {
        if (success) {
          setRemark('')
          onClose(true)
        } else {
          setFailed(true)
          const timer = setTimeout(() => {
            setFailed(false)
          }, 3000)
          return () => {
            clearTimeout(timer)
            setFailed(false)
          }
        }
      })
      .catch(error => {
        console.error('Error creating query:', error)
        setFailed(true)
        const timer = setTimeout(() => {
          setFailed(false)
        }, 3000)
        return () => {
          clearTimeout(timer)
          setFailed(false)
        }
      })
  }

  return (
    <QueryModalWrapper
      opened={opened}
      onClose={onClose}
      data={{ id: data.id, question: data.question, answer: data.answer }}
    >
      {failed && (
        <Alert color="red" title="Error" mb="md">
          Failed to resolve query.
        </Alert>
      )}
      <div className="space-y-4">
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
