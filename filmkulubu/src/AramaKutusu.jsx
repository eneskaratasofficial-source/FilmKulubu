import React, { useContext, useState } from 'react';
import { DiziKonteks } from './DurumYoneticisi';

const AramaKutusu = () => {
  const { gonder, durum } = useContext(DiziKonteks);
  
  // Local state'i global durumdaki sorgu ile başlatıyoruz
  const [aramaMetni, setAramaMetni] = useState(durum.sorgu); 

  const handleSubmit = (e) => {
    e.preventDefault(); // Formun varsayılan gönderimini engeller
    if (aramaMetni.trim()) {
      // SET_QUERY eylemini gönderiyoruz
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
      <button type="submit" style={{ display: 'none' }}>Ara</button> 
    </form>
  );
};

export default AramaKutusu;