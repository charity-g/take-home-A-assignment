'use client'

import { Text, Card } from '@mantine/core'
import QueryModalWrapper from './query-modal-wrapper'
import React from 'react'
import { FormDataWithQuery, Query } from '../types'

interface ResolvedQueryModalProps {
  opened: boolean
  data: FormDataWithQuery
  onClose: () => void
}

export function ResolvedQueryModal({
  opened,
  data,
  onClose,
}: ResolvedQueryModalProps) {
  const query = data.query as Query
  return (
    <QueryModalWrapper
      opened={opened}
      onClose={onClose}
      data={{ id: data.id, question: data.question, answer: data.answer }}
      query={query}
    >
      <Card className="border-0 shadow-sm z-10 bg-white">
        <div className="flex items-start gap-4">
          <div className="flex items-start gap-2">
            <Text size="md" className="text-gray-800 leading-relaxed">
              <strong> Description: </strong>
              {query.description || 'No description provided.'}
            </Text>
          </div>
        </div>
      </Card>
    </QueryModalWrapper>
  )
}
