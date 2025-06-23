'use client'

import React, { useState } from 'react';
import DataTable from './data-table';
import Header from './header';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { use } from 'react';
import { FormData } from './types';


export default function ManageFormDataApp({dataPromise} : {
  dataPromise: Promise<FormData[]>
}) {
  const data = use(dataPromise);

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme((current) => value || (current === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
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
            <DataTable data={data}/>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}