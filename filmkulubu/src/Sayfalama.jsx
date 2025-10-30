import React from 'react';

const Sayfalama = ({ aktifSayfa, toplamSayfa, sayfaDegistir }) => {
  if (toplamSayfa <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', padding: '10px' }}>
      <button 
        onClick={() => sayfaDegistir(1)} 
        disabled={aktifSayfa === 1}
      >
        İlk
      </button>
      <button 
        onClick={() => sayfaDegistir(aktifSayfa - 1)} 
        disabled={aktifSayfa === 1}
      >
        Geri
      </button>

      <span style={{ margin: '0 10px' }}>Sayfa {aktifSayfa} / {toplamSayfa}</span>

      <button 
        onClick={() => sayfaDegistir(aktifSayfa + 1)} 
        disabled={aktifSayfa === toplamSayfa}
      >
        İleri
      </button>
      <button 
        onClick={() => sayfaDegistir(toplamSayfa)} 
        disabled={aktifSayfa === toplamSayfa}
      >
        Son
      </button>
    </div>
  );
};

export default Sayfalama;