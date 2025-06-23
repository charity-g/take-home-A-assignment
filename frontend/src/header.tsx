'use client';
import { Container, useMantineTheme, ActionIcon, useMantineColorScheme } from '@mantine/core';
import Image from 'next/image';
// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const theme = useMantineTheme();
  const isDark = theme.colorScheme === 'dark';
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <header
      className={isDark ? 'bg-gray-800 text-white py-4' : 'bg-gray-100 text-gray-900 py-4'}
      style={{
        backgroundColor: isDark ? '#232b32' : '#f7fafc',
        color: isDark ? '#fff' : '#232b32',
      }}
    >
      <div className='flex w-full px-8 justify-between'>
        <div className='flex items-center ml-4'>
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
        </div>
        <div className='flex items-center space-x-4'>   
        <ActionIcon
          variant="outline"
          color={isDark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          size="lg"
          aria-label="Toggle color scheme"
        >
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
        </ActionIcon>
        </div>
      </div>
    </header>
  );
}