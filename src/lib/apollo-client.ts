// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const API_URL = 'https://graphql-pokemon2.vercel.app/';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: API_URL,
    }),
    // InMemoryCache จะจัดการเรื่องการ caching ข้อมูลที่ดึงมาให้เราโดยอัตโนมัติ
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
