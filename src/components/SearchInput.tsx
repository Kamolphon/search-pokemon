// components/SearchInput.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchInput: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // ใช้ useSearchParams เพื่ออ่าน query params
  // ตรวจสอบว่า searchParams ไม่เป็น null ก่อนเรียกใช้ .get()
  const [searchValue, setSearchValue] = useState<string>(searchParams ? searchParams.get('name') || '' : ''); // อ่าน 'name' param

  // ซิงค์ค่า input กับ URL query param เมื่อ component mount หรือ searchParams เปลี่ยนแปลง
  useEffect(() => {
    setSearchValue(searchParams ? searchParams.get('name') || '' : '');
  }, [searchParams]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearchValue = searchValue.trim();

    // ตรวจสอบว่า searchParams ไม่เป็น null ก่อนเรียกใช้ .toString()
    const newParams = new URLSearchParams(searchParams ? searchParams.toString() : '');

    if (trimmedSearchValue) {
      newParams.set('name', trimmedSearchValue);
      router.push(`/?${newParams.toString()}`); // อัปเดต URL ด้วย query param ใหม่
    } else {
      // ลบ query param ถ้าค่าว่าง
      newParams.delete('name');
      router.push(`/?${newParams.toString()}`);
    }
  }, [router, searchValue, searchParams]); // searchParams ถูกใช้ใน useCallback dependency array

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="ค้นหาโปเกมอนด้วยชื่อ..."
        style={{ padding: '10px', width: '300px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#0070f3',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        ค้นหา
      </button>
    </form>
  );
};

export default React.memo(SearchInput);
