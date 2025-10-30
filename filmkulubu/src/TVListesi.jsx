import React from 'react';
import TVKarti from './TVKarti'; 

const TVListesi = ({ diziler }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {diziler.map(dizi => (
            <TVKarti key={dizi.id} dizi={dizi} /> 
        ))}
    </div>
);

export default TVListesi;