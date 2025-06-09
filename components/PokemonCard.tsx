// components/PokemonCard.tsx
'use client';

import React from 'react';
import { PokemonCardData } from '../types/pokemon';
import { useRouter } from 'next/navigation';

interface PokemonCardProps {
  pokemon: PokemonCardData;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const router = useRouter();

  const handleClick = () => {
    // เมื่อคลิกการ์ด ให้เปลี่ยน URL ไปยังหน้ารายละเอียดโปเกมอนตัวนั้นๆ
    // โดยใช้ Dynamic Route: /pokemon/[name]
    router.push(`/pokemon/${pokemon.name}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        backgroundColor: '#fff',
        width: '180px',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'; }}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '10px' }}
      />
      <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2em', color: '#333' }}>{pokemon.name}</h3>
      <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>#{pokemon.number}</p>
      <p style={{ margin: '5px 0 0 0', fontSize: '0.85em', color: '#888' }}>ประเภท: {pokemon.types.join(', ')}</p>
    </div>
  );
};

export default React.memo(PokemonCard);
