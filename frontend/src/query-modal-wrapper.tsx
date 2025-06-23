'use client'
import { Modal, Text, Button, CloseButtonProps } from "@mantine/core"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface QueryModalWrapperProps {
  opened: boolean
  onClose: () => void
  formdata_title: string,
  children: React.ReactNode
}

export default function QueryModalWrapper({opened, onClose, formdata_title, children} : QueryModalWrapperProps) {

    return (<Modal
          opened={opened}
          onClose={onClose}
          title={
            <div className="flex items-center justify-between w-full pr-8">
              <Text size="sm" className="font-medium text-gray-900">
                Query | {formdata_title}
              </Text>
              <Button
                onClick={onClose}
                size="xs"
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded text-sm"
                styles={{
                  root: {
                    backgroundColor: "#14b8a6",
                    "&:hover": {
                      backgroundColor: "#0d9488",
                    },
                  },
                }}
              >
                Resolve
              </Button>
            </div>
          }
          size="lg"
          padding="md"
          closeButtonProps={{
                  icon: <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>,
                  className: "text-gray-400 hover:text-gray-600",
                } as CloseButtonProps}
        >
        {children}
        </Modal>);
}