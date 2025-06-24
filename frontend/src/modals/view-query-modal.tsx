'use client'

import { Text, Button, Card, Alert } from '@mantine/core'
import QueryModalWrapper from './query-modal-wrapper'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FormDataWithQuery, Query } from '../types'
import { updateQuery } from '../actions/actions'

interface ViewQueryModalProps {
  opened: boolean
  data: FormDataWithQuery
  onClose: () => void
}

export function ViewQueryModal({ opened, data, onClose }: ViewQueryModalProps) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (failed) {
      const timer = setTimeout(() => setFailed(false), 3000)
      return () => {
        clearTimeout(timer)
        setFailed(false)
      }
    }
  }, [failed])

  const query: Query = data.query as Query
  const handleResolve = () => {
    updateQuery(true, query.title, query.description, query.id)
      .then(updated => {
        if (updated) {
          onClose()
        } else {
          setFailed(true)
        }
      })
      .catch(error => {
        console.error('Error updating query:', error)
        setFailed(true)
      })
  }

  return (
    <QueryModalWrapper
      opened={opened}
      onClose={onClose}
      data={{ id: data.id, question: data.question, answer: data.answer }}
      query={query}
    >
      {failed && (
        <Alert color="red" title="Error" mb="md">
          Failed to resolve query.
        </Alert>
      )}

      <Card className="border-0 shadow-sm z-10 bg-white">
        <div className="flex items-start gap-4">
          <div className="flex items-start gap-2">
            <Text size="md" className="text-gray-800 leading-relaxed">
              <strong> Description: </strong>
              {query.description || 'No description provided.'}
            </Text>
          </div>
          <Button
            variant="light"
            color="green"
            onClick={handleResolve}
            className="hover:scale-105 transition-transform "
            leftIcon={
              <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5" />
            }
            size="md"
          >
            <Text size="xs" className="ml-2">
              Resolve
            </Text>
          </Button>
        </div>
      </Card>
    </QueryModalWrapper>
  )
}
