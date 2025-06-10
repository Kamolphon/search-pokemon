// components/SearchInput.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchInput: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValue = searchParams?.get('name') || '';
  const [searchValue, setSearchValue] = useState<string>(initialValue);

  // Sync ค่า search จาก URL เมื่อ mount หรือ URL เปลี่ยน
  useEffect(() => {
    setSearchValue(searchParams?.get('name') || '');
  }, [searchParams]);

  // ทำ real-time search ด้วย debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = searchValue.trim();
      const newParams = new URLSearchParams(searchParams?.toString() || '');

      if (trimmed) {
        newParams.set('name', trimmed);
      } else {
        newParams.delete('name');
      }

      router.push(`/?${newParams.toString()}`);
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [searchValue, router, searchParams]);

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="ค้นหาโปเกมอนด้วยชื่อ..."
        style={{
          padding: '10px',
          width: '300px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default React.memo(SearchInput);
