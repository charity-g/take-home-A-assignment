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

export default function ManageFormDataApp({
  dataPromise,
}: {
  dataPromise: Promise<FormDataWithQuery[]>
}) {
  const data = use(dataPromise)
  const [modalOpen, setModalOpen] = useState<ModalTypes | null>(null)
  const [modalData, setModalData] = useState<FormDataWithQuery | null>(null)

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(current => value || (current === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {/* <CreateQueryModal opened={modalOpen === ModalTypes.Create} data={modalData} onClose={()=>{setModalOpen(null)}} /> */}
      <ViewQueryModal
        opened={modalOpen === ModalTypes.View}
        data={modalData}
        onClose={() => {
          setModalOpen(null)
        }}
      />
      {/* <ResolvedQueryModal opened={modalOpen === ModalTypes.Resolve} data={modalData} onClose={()=>{setModalOpen(null)}} /> */}

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
