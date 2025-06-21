'use client';
import { Container } from '@mantine/core';
import Image from 'next/image';

export default function Header() {
  return (
    <header className='bg-gray-800 text-white py-4'>
      <Container size="md" className='flex items-center justify-between'>
        <Image
          src="/vialtrials_logo.jpg"
          alt="Vial Logo"
          width={40}
          height={40}
          className='rounded-full mr-4'
        />
        <h1>
            Vial - Query Management Application
        </h1>
      </Container>
    </header>
  );
}