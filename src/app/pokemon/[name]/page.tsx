'use client';

import React, { Suspense, use, useCallback } from 'react';
import PokemonDetail from '../../../components/PokemonDetail';
import { useRouter } from 'next/navigation';

interface PokemonDetailPageProps {
    params: Promise<{
        name: string;
    }>;
}

const PokemonDetailPage: React.FC<PokemonDetailPageProps> = ({ params }) => {
    const { name: pokemonName } = use(params);
    const router = useRouter();

    const handleGoBack = useCallback(() => {
        router.back(); // กลับไปยังหน้าก่อนหน้าใน history
    }, [router]);

    if (!pokemonName) {
        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
                <p style={{ fontSize: '1.1em', color: '#e74c3c' }}>ไม่พบชื่อโปเกมอนใน URL</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '960px', margin: '0 auto' }}>
            <button
                onClick={handleGoBack}
                style={{
                    padding: '10px 20px',
                    fontSize: '1em',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f0f0f0',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    transition: 'background-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e0e0e0'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
                &larr; ย้อนกลับ
            </button>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>รายละเอียดโปเกมอน</h1>
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '20px' }}>กำลังโหลดข้อมูลโปเกมอน...</div>}>
                <PokemonDetail pokemonName={pokemonName} />
            </Suspense>
        </div>
    );
};

export default PokemonDetailPage;
