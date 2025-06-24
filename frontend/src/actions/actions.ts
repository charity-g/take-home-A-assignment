"use server"
import { FormData } from '../types';

export async function getFormData() : Promise<FormData[]> {
    const response = await fetch('http://127.0.0.1:8080/form-data');
    const data = (await response.json())['data']['formData'] as FormData[];
    return data;
}

export async function createQuery(title: string, description: string, formDataId: string) {
    const url = 'http://127.0.0.1:8080/create-query'
    return await fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                formDataId,
            }),
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
    )
}


export async function updateQuery(resolved: boolean, title: string, description: string, formDataId: string) {
    //TODO
    const url = 'http://127.0.0.1:8080/update-query';
    return await fetch(url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                resolved,
                title,
                description,
                formDataId,
            }),
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
    )
}

export async function deleteQuery(formDataId: string) {
    console.log('deleteQuery called with formDataId:', formDataId);
    //TODO
}