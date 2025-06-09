// src/app/page.tsx
// ไฟล์นี้เป็น Server Component โดยค่าเริ่มต้น ไม่ต้องใส่ 'use client' ที่นี่แล้ว

import React, { Suspense } from 'react';
import PokemonListContent from '../components/PokemonListContent'; 

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Pokemon Searcher</h1>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '20px' }}>กำลังโหลดหน้าจอ...</div>}>
        <PokemonListContent />
      </Suspense>
    </div>
  );
};

export default HomePage;
