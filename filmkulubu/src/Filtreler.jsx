import React, { useContext } from 'react';
import { DiziKonteks } from './DurumYoneticisi';
import { TumTurler, TumDiller } from './sabitler'; 

const Filtreler = () => {
  const { gonder, durum } = useContext(DiziKonteks);

  const handleFilterChange = (filtreAdi, deger) => {
    gonder({ 
      type: 'SET_FILTERS', 
      payload: { 
        ...durum.filtreler, 
        [filtreAdi]: deger 
      } 
    });
  };

  return (
    <div style={{ flex: 1, display: 'flex', gap: '15px', alignItems: 'center' }}>
        <label>  </label>
      <label>  🔎   ✨ Min Puan:</label>
      <select 
        onChange={(e) => handleFilterChange('minPuan', Number(e.target.value))} 
        value={durum.filtreler.minPuan}
        style={{ padding: '8px' }}
      >
        <option value={0}>Tümü</option>
        <option value={7}>7.0 ve üzeri</option>
        <option value={8}>8.0 ve üzeri</option>
        <option value={9}>9.0 ve üzeri</option>
      </select>
      
     
      <label>Dil:</label>
      <select 
        onChange={(e) => handleFilterChange('dil', e.target.value)} 
        value={durum.filtreler.dil}
        style={{ padding: '8px' }}
      >
        {TumDiller.map(dil => (
          <option key={dil} value={dil}>{dil}</option>
        ))}
      </select>

     
      <label>Tür:</label>
      <select 
        onChange={(e) => handleFilterChange('tur', e.target.value)} 
        value={durum.filtreler.tur}
        style={{ padding: '8px' }}
      >
        {TumTurler.map(tur => (
          <option key={tur} value={tur}>{tur}</option>
        ))}
      </select>
    </div>
  );
};

export default Filtreler;