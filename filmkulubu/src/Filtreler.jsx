import React, { useContext } from 'react';
import { DiziKonteks } from './DurumYoneticisi';

const Filtreler = () => {
  const { gonder, durum } = useContext(DiziKonteks);

  const handleRatingChange = (e) => {
    gonder({ 
      type: 'FILTRE_AYARLA', 
      payload: { ...durum.filtreler, minPuan: Number(e.target.value) } 
    });
  };

  return (
    <div style={{ flex: 1, display: 'flex', gap: '15px', alignItems: 'center' }}>
        <label>  </label>
      <label>  🔎   ✨ Min Puan:</label>
      <select 
        onChange={handleRatingChange} 
        value={durum.filtreler.minPuan}
        style={{ padding: '8px' }}
      >
        <option value={0}>Tümü</option>
        <option value={7}>7.0 ve üzeri</option>
        <option value={8}>8.0 ve üzeri</option>
        <option value={9}>9.0 ve üzeri</option>
      </select>
      {/* Tür ve Dil filtreleri buraya eklenebilir (AI ONERDI)*/}
    </div>
  );
};

export default Filtreler;