import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_URI,
  cache: new InMemoryCache(),
});

export default async function SearchCharacters(req: NextApiRequest, res: NextApiResponse) {
  const search = req.body;
  try {
    const { data } = await client.query({
      query: gql`
        query {
          characters(filter: { name: "${search}" }) {
            info {
              count
            }
            results {
              name
              id
              location {
                name
                id
              }
              image
              origin {
                name
                id
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
    res.status(200).json({ characters: data.characters.results, error: null });
  } catch (error: any) {
    if (error.message === '404: Not Found') {
      res.status(404).json({ characters: null, error: 'No Characters found' });
    } else {
      res.status(500).json({ characters: null, error: 'Internal Error, Please try again' });
    }
  }
}
