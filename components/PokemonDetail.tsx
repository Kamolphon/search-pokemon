// components/PokemonDetail.tsx
'use client'; // ต้องเป็น Client Component สำหรับ hook อย่าง useRouter, useQuery

import React, { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAIL_BY_NAME } from '../graphql/queries';
import { Pokemon } from '../types/pokemon';
import { useRouter, useSearchParams } from 'next/navigation';

interface PokemonDetailProps {
  pokemonName: string; // prop นี้จะถูกส่งมาจาก src/app/pokemon/[name]/page.tsx
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemonName }) => {
  const router = useRouter();
  // searchParams ไม่จำเป็นต้องใช้โดยตรงสำหรับการนำทางวิวัฒนาการแล้ว
  // แต่ยังคง import ไว้เผื่อใช้ในส่วนอื่นของคอมโพเนนต์หากต้องการ
  const searchParams = useSearchParams(); 
  
  const { loading, error, data } = useQuery<{ pokemon: Pokemon }>(GET_POKEMON_DETAIL_BY_NAME, {
    variables: { name: pokemonName },
    skip: !pokemonName, // ไม่ต้อง query ถ้าไม่มีชื่อโปเกมอน
  });

  const handleEvolutionClick = useCallback((name: string) => {
    router.push(`/pokemon/${name}`); 
  }, [router]);

  if (!pokemonName) {
    return <p style={{ fontSize: '1.1em', color: '#555' }}>ไม่พบชื่อโปเกมอนที่ระบุใน URL</p>;
  }

  if (loading) return <p style={{ fontSize: '1.1em', color: '#0070f3' }}>กำลังค้นหาโปเกมอน...</p>;
  if (error) return <p style={{ fontSize: '1.1em', color: '#e74c3c' }}>เกิดข้อผิดพลาดในการดึงข้อมูล: {error.message}</p>;

  const pokemon = data?.pokemon;

  if (!pokemon) {
    return <p style={{ fontSize: '1.1em', color: '#e74c3c' }}>ไม่พบโปเกมอนชื่อ "{pokemonName}"</p>;
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '25px', borderRadius: '10px', maxWidth: '700px', margin: '20px auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', marginBottom: '15px' }}>{pokemon.name} ({pokemon.number})</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '20px' }}>
        <img src={pokemon.image} alt={pokemon.name} style={{ width: '180px', height: '180px', objectFit: 'contain', borderRadius: '5px', border: '1px solid #eee' }} />
        <div>
          <p><strong>ประเภท:</strong> {pokemon.types.join(', ')}</p>
          <p><strong>ความต้านทาน:</strong> {pokemon.resistant.join(', ')}</p>
          <p><strong>จุดอ่อน:</strong> {pokemon.weaknesses.join(', ')}</p>
          <p><strong>การจำแนก:</strong> {pokemon.classification}</p>
          <p><strong>อัตราการหนี:</strong> {pokemon.fleeRate}</p>
          <p><strong>CP สูงสุด:</strong> {pokemon.maxCP}</p>
          <p><strong>HP สูงสุด:</strong> {pokemon.maxHP}</p>
          <p><strong>น้ำหนัก:</strong> {pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
          <p><strong>ส่วนสูง:</strong> {pokemon.height.minimum} - {pokemon.height.maximum}</p>
        </div>
      </div>

      <h3 style={{ color: '#555', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>การโจมตี</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h4>เร็ว:</h4>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {pokemon.attacks.fast.map((attack, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                {attack.name} ({attack.type}) - ความเสียหาย: {attack.damage}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>พิเศษ:</h4>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {pokemon.attacks.special.map((attack, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                {attack.name} ({attack.type}) - ความเสียหาย: {attack.damage}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {pokemon.evolutions && pokemon.evolutions.length > 0 && (
        <>
          <h3 style={{ color: '#555', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', marginTop: '20px' }}>วิวัฒนาการ</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {pokemon.evolutions.map((evolution) => (
              <div
                key={evolution.id}
                onClick={() => handleEvolutionClick(evolution.name)}
                style={{
                  cursor: 'pointer',
                  border: '1px solid #eee',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; }}
              >
                <img src={evolution.image} alt={evolution.name} style={{ width: '90px', height: '90px', objectFit: 'contain', marginBottom: '5px' }} />
                <p style={{ fontWeight: 'bold', margin: 0, color: '#333' }}>{evolution.name}</p>
                <p style={{ fontSize: '0.8em', color: '#777', margin: 0 }}>({evolution.number})</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
