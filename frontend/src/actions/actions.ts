'use server'
import { FormDataWithQuery, Query } from '../types'

export async function getFormData(): Promise<FormDataWithQuery[]> {
  const response = await fetch('http://127.0.0.1:8080/form-data')
  const json = await response.json()
  const formdata = json['data']['formData'] as FormDataWithQuery[]
  const queries = json['data']['query'] as Query[]

  for (const form of formdata) {
    const query = queries.filter(query => query.formDataId === form.id)
    if (query.length > 0) {
      form.query = query[0]
    }
  }
  return formdata
}

export async function createQuery(
  title: string,
  description: string,
  form_data_id: string
) {
  const url = 'http://127.0.0.1:8080/query/create'
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      form_data_id,
    }),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
}

export async function updateQuery(
  resolve: boolean,
  title: string,
  description: string,
  query_id: string
) {
  const url = 'http://127.0.0.1:8080/query/update'
  return await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resolve,
      query_id,
    }),
  })
    .then(response => {
      console.log('updateQuery response:', response)
      if (!response.ok) {
        return false
      }
      return true
    })
    .catch(error => {
      console.error('Error updating query:', error)
      return false
    })
}

export async function deleteQuery(formDataId: string) {
  console.log('deleteQuery called with formDataId:', formDataId)
  //TODO
}
