// src/app/ApolloWrapper.tsx
'use client'; // ต้องเป็น Client Component

import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apollo-client';
import { useMemo } from 'react';

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // สร้าง Apollo Client instance เพียงครั้งเดียวเมื่อ component ถูก mount
  // useMemo จะช่วยให้ client instance ไม่ถูกสร้างใหม่ทุกครั้งที่ component re-render
  const client = useMemo(() => createApolloClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
