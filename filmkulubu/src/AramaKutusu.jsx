import React, { useContext, useState } from 'react';
import { DiziKonteks } from './DurumYoneticisi';

const AramaKutusu = () => {
  const { gonder, durum } = useContext(DiziKonteks);
  

  const [aramaMetni, setAramaMetni] = useState(durum.sorgu); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (aramaMetni.trim()) {
      
      gonder({ type: 'SET_QUERY', payload: aramaMetni }); 
    }
  };

  return (
   
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        value={aramaMetni}
        onChange={(e) => setAramaMetni(e.target.value)}
        placeholder="Dizi adı ile arama yapın (örn: the office)"
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      {/* Arama butonu görünmez olsa bile submit işlemi için önemlidir */}
      <button type="submit" style={{ display: 'none' }}>Ara</button> 
    </form>
  );
};

export default AramaKutusu;