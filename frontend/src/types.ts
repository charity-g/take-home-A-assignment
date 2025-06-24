export type FormData = {
  id: string
  question: string
  answer: string
}

export type FormDataWithQuery = {
  id: string
  question: string
  answer: string
  query?: Query,
}


export type Query = {
  id: string
  title: string
  description: string
  status: 'OPEN' | 'CLOSED'
  createdAt?: string
  updatedAt?: string
  formDataId: string
}

export type MantineHeader = {
  accessorKey: string,
  header: string,
}
  