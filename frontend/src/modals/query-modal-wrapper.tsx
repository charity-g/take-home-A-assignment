'use client'
import {
  Modal,
  Text,
  Card,
  Badge,
  Divider,
  CloseButtonProps,
} from '@mantine/core'
import {
  faTimes,
  faCircleUser,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Query } from '../types'

interface QueryModalWrapperProps {
  opened: boolean
  onClose: () => void
  query: Query
  children: React.ReactNode
}

export default function QueryModalWrapper({
  opened,
  onClose,
  query,
  children,
}: QueryModalWrapperProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div className="flex items-center justify-between w-full pr-8">
          <Text size="lg" className="font-bold text-gray-900">
            Query | {query.title || 'No Title Provided'}
          </Text>
        </div>
      }
      size="lg"
      padding="md"
      closeButtonProps={
        {
          icon: <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>,
          className: 'text-gray-400 hover:text-gray-600',
        } as CloseButtonProps
      }
    >
      <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-0 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div>
                <Text
                  size="xs"
                  className="text-gray-500 font-medium uppercase tracking-wide"
                >
                  Status
                </Text>
                <Badge variant="light" color="red" size="sm" className="mt-1">
                  {query.status === 'OPEN' ? 'Open' : 'Resolved'}
                </Badge>
              </div>
            </div>

            <Divider orientation="vertical" className="h-12" />

            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="w-4 h-4 text-gray-400"
              />
              <div>
                <Text
                  size="xs"
                  className="text-gray-500 font-medium uppercase tracking-wide"
                >
                  Created By
                </Text>
                <Text size="sm" className="font-semibold text-gray-900 mt-1">
                  hardcoded.user@email.com
                </Text>
              </div>
            </div>

            <Divider orientation="vertical" className="h-12" />

            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCalendar}
                className="w-4 h-4 text-gray-400"
              />
              <div>
                <Text
                  size="xs"
                  className="text-gray-500 font-medium uppercase tracking-wide"
                >
                  Created On
                </Text>
                <Text size="sm" className="font-semibold text-gray-900 mt-1">
                  {query.createdAt
                    ? new Date(query.createdAt).toDateString()
                    : 'No date available'}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {children}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="p-4">
          <Text size="sm" className="font-semibold text-gray-700 mb-3">
            Query Information
          </Text>
          <div className="grid grid-rows-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-4 bg-blue-500 rounded-full"></div>
              <Text size="xs" className="text-gray-600">
                Question: <span className="font-medium">{data.question}</span>
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-4 bg-green-500 rounded-full"></div>
              <Text size="xs" className="text-gray-600">
                Answer: <span className="font-medium">{data.answer}</span>
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </Modal>
  )
}
