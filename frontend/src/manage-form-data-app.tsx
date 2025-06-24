'use client'

import React, { useState } from 'react'
import DataTable from './data-table'
import Header from './header'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core'
import { use } from 'react'
import { FormDataWithQuery } from './types'
import { CreateQueryModal } from './modals/create-query-modal'
import { ViewQueryModal } from './modals/view-query-modal'
import { ResolvedQueryModal } from './modals/resolve-query-modal'
import { ModalTypes } from './types'
import { getFormData } from './actions/actions'

export default function ManageFormDataApp({
  dataPromise,
}: {
  dataPromise: Promise<FormDataWithQuery[]>
}) {
  const [currentDataPromise, setCurrentDataPromise] = useState(dataPromise)
  const data = use(currentDataPromise)
  const [modalOpen, setModalOpen] = useState<ModalTypes | null>(null)
  const [modalData, setModalData] = useState<FormDataWithQuery | null>(null)

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(current => value || (current === 'dark' ? 'light' : 'dark'))

  const handleModalClose = (edited: boolean) => {
    setModalData(null)
    setModalOpen(null)
    if (edited) {
      setCurrentDataPromise(getFormData())
    }
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {modalData &&
        (modalOpen === ModalTypes.Create ? (
          <CreateQueryModal
            opened={true}
            data={modalData}
            onClose={handleModalClose}
          />
        ) : (
          <>
            <ViewQueryModal
              opened={modalOpen === ModalTypes.View}
              data={modalData}
              onClose={handleModalClose}
            />
            <ResolvedQueryModal
              opened={modalOpen === ModalTypes.Resolve}
              data={modalData}
              onClose={handleModalClose}
            />
          </>
        ))}

      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "'Noto Sans', 'Inclusive Sans', sans-serif",
          headings: {
            fontFamily: "'Noto Sans', 'Poppins', 'Inclusive Sans', sans-serif",
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Header />
        <div className="container mx-auto p-6">
          <DataTable
            data={data}
            displayModal={(modal: ModalTypes, data: FormDataWithQuery) => {
              setModalOpen(modal)
              setModalData(data)
              console.log('Displaying modal:', modal, 'with data:', data)
            }}
          />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
