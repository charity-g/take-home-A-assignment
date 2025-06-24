export interface ICreatedBody {
  title: string
  description: string
  form_data_id: string
}

export interface IQuery {
    id: string
    title: string
    description: string
    status: string
    createdAt: Date
    updatedAt: Date
    formData: {
      id: string
      question: string
      answer: string
    }
    formDataId: string
  }

export interface ICreatedQuery {
  query: IQuery
}
