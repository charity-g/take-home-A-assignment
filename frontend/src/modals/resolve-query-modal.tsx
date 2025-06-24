'use client'

import { Text, Group, Avatar } from '@mantine/core'
import QueryModalWrapper from './query-modal-wrapper'
import { FormDataWithQuery } from '../types'

interface ResolvedQueryModalProps {
  opened: boolean
  modalData: FormDataWithQuery
  onClose: () => void
}

export function ResolvedQueryModal({
  opened,
  onClose,
}: ResolvedQueryModalProps) {
  opened = true
  return (
    <QueryModalWrapper
      opened={opened}
      onClose={onClose}
      formdata_title="hardcoded title for resolved query"
    >
      <div className="space-y-4">
        {/* Status Header */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <Group spacing="lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Text size="sm" className="text-gray-600">
                Query Status
              </Text>
              <Text size="sm" className="font-medium">
                Resolved
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Text size="sm" className="text-gray-600">
                Created By
              </Text>
              <Text size="sm" className="font-medium">
                hardcoded_useremail
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Text size="sm" className="text-gray-600">
                Created On
              </Text>
              <Text size="sm" className="font-medium">
                06/01/2025
              </Text>
            </div>
          </Group>
        </div>

        {/* Message Content */}
        <div className="py-4">
          <div className="flex items-start gap-3">
            <Avatar size="sm" className="bg-gray-300">
              <Text size="xs">S</Text>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Text size="sm" className="font-medium text-gray-900">
                  hardcoded_useremail
                </Text>
                <Text size="xs" className="text-gray-500">
                  January 06 2025 • 14:53
                </Text>
              </div>
              <Text size="sm" className="text-gray-700">
                test
              </Text>
            </div>
          </div>
        </div>
      </div>
    </QueryModalWrapper>
  )
}
