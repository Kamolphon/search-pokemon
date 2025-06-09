// src/app/page.tsx
'use client'; // ต้องเป็น Client Component เนื่องจากมีการใช้ hooks จาก next/navigation และ Apollo Client

import React, { Suspense, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import SearchInput from '../components/SearchInput';
import PokemonCard from '../components/PokemonCard';
import { useSearchParams } from 'next/navigation';
import { GET_MULTIPLE_POKEMONS } from '../graphql/queries';
import { Pokemon } from '../types/pokemon'; 

const HomePage: React.FC = () => {
  const searchParams = useSearchParams();
  const pokemonName = searchParams ? searchParams.get('name') || '' : ''; // อ่าน 'name' param จาก URL

  const { loading, error, data } = useQuery<{ pokemons: Pokemon[] }>(GET_MULTIPLE_POKEMONS, {
    variables: { first: 151 }, // ดึง 151 ตัวแรก
  });

  // กรองข้อมูลโปเกมอนตามชื่อที่ค้นหา (ถ้ามี)
  const filteredPokemons = useMemo(() => {
    if (!data?.pokemons) return [];
    if (!pokemonName) return data.pokemons; // ถ้าไม่มีการค้นหา ให้แสดงทั้งหมด

    const lowerCaseSearch = pokemonName.toLowerCase();
    return data.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(lowerCaseSearch)
    );
  }, [data?.pokemons, pokemonName]);

  // กำหนดข้อความการโหลด/ข้อผิดพลาดสำหรับรายการโปเกมอน
  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#333' }}>Pokemon Searcher</h1>
        <SearchInput />
        <p style={{ fontSize: '1.1em', color: '#0070f3' }}>กำลังโหลดรายการโปเกมอนทั้งหมด...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#333' }}>Pokemon Searcher</h1>
        <SearchInput />
        <p style={{ fontSize: '1.1em', color: '#e74c3c' }}>เกิดข้อผิดพลาดในการดึงรายการโปเกมอน: {error.message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Pokemon Searcher</h1>
      <SearchInput />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#555' }}>
            {pokemonName ? `ไม่พบโปเกมอนชื่อ "${pokemonName}"` : 'ไม่พบโปเกมอนในรายการ'}
          </p>
        )}
      </div>
      {/* PokemonDetail จะไม่ถูกแสดงผลโดยตรงจากการค้นหาในหน้านี้ */}
    </div>
  );
};

export default HomePage;
