import Head from 'next/head';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Characters } from '../components/Characters';
import { Props } from '../../type';

const Home: React.FC<Props> = (results) => {
  const initialState = results;
  console.log(initialState);

  const [characters, setCharacters] = useState(initialState.characters);

  return (
    <div className='mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center py-2'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

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

export const getStaticProps: GetStaticProps = async () => {
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
  };
};

export default Home;
