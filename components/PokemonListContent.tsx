// components/PokemonListContent.tsx
'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import SearchInput from './SearchInput'; 
import PokemonCard from './PokemonCard'; 
import { useSearchParams } from 'next/navigation';
import { GET_MULTIPLE_POKEMONS } from '../graphql/queries'; 
import { PokemonCardData } from '../types/pokemon'; 

const TOTAL_POKEMONS = 151;

const PokemonListContent: React.FC = () => {
  const searchParams = useSearchParams();
  const searchName = searchParams ? searchParams.get('name') || '' : ''; // ชื่อที่ใช้ค้นหา

  const { loading, error, data } = useQuery<{ pokemons: PokemonCardData[] }>(GET_MULTIPLE_POKEMONS, {
    variables: { first: TOTAL_POKEMONS },
  });

  const filteredPokemons = useMemo(() => {
    if (!data?.pokemons) return [];
    if (searchName) {
      const lowerCaseSearch = searchName.toLowerCase();
      return data.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(lowerCaseSearch)
      );
    }
    return data.pokemons; 
  }, [data?.pokemons, searchName]);

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
    <>
      <SearchInput /> 

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#555' }}>
            {searchName ? `ไม่พบโปเกมอนชื่อ "${searchName}"` : 'ไม่พบโปเกมอนในรายการ'}
          </p>
        )}
      </div>
    </>
  );
};

export default PokemonListContent;
