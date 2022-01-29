import Head from 'next/head';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Characters } from '../components/Characters';
import { Props } from '../../type';
import { useToast } from '@chakra-ui/react';

const Home: React.FC<Props> = (results) => {
  const initialState = results;

  const [characters, setCharacters] = useState(initialState.characters);

  const [search, setSearch] = useState('');

  console.log(search);

  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const results = await fetch('/api/SearchCharacters', {
      method: 'POST',
      body: search,
    });
    const { characters, error } = await results.json();
    if (error) {
      toast({
        position: 'top',
        title: 'An error occurred.',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      setCharacters(characters);
    }
  };

  return (
    <div className='mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center py-2'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className='mt-7 mb-7'
      >
        <input
          type='text'
          placeholder='search'
          value={search}
          className='rounded-full border p-3'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type='button'
          className='ml-4 mr-5 cursor-pointer'
          onClick={() => {
            setSearch('');
            setCharacters(initialState.characters);
          }}
        >
          ❌
        </button>
        <button
          className='cursor-pointer rounded-lg border bg-yellow-500 p-2 font-bold text-white'
          disabled={search === ''}
          type='submit'
        >
          検索
        </button>
      </form>

      <div className='pb-12'>
        <Characters characters={characters} />
      </div>
      <footer className='flex h-24 w-full items-center justify-center border-t'>
        <a
          className='flex items-center justify-center'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by <img src='/vercel.svg' alt='Vercel Logo' className='ml-2 h-4' />
        </a>
      </footer>
    </div>
  );
};

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URI,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            image
            id
            location {
              id
              name
            }
            origin {
              id
              name
            }
            episode {
              id
              episode
              air_date
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
    revalidate: 10,
  };
}

export default Home;
