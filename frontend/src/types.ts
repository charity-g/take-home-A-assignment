export type FormData = {
  id: string
  question: string
  answer: string
}

export type Query = {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  formData: FormData[]
}
