import React, { createContext, useReducer } from 'react';


const baslangicDurumu = {
  yukleniyor: false,
  hata: null,
  diziler: [],
  sorgu: 'friends', 
  filtreler: { 
    minPuan: 0,
    dil: 'Tümü',  
    tur: 'Tümü',  
  },
  izlemeListesi: [], 
  aktifSayfa: 1,
  sayfaBoyutu: 6, 
  toplamSayfa: 1,
};


const indirgeyici = (durum, eylem) => {
  switch (eylem.type) {
    
    case 'FETCH_INIT':
      return { ...durum, yukleniyor: true, hata: null };
    case 'FETCH_BASARI':
      const toplamOge = eylem.payload.length;
      const toplamSayfa = Math.ceil(toplamOge / durum.sayfaBoyutu);
      return {
        ...durum,
        yukleniyor: false,
        diziler: eylem.payload,
        aktifSayfa: 1, 
        toplamSayfa: toplamSayfa,
      };
    case 'FETCH_HATA':
      return { ...durum, yukleniyor: false, hata: eylem.payload };

  
    case 'SET_QUERY':
      return { ...durum, sorgu: eylem.payload, aktifSayfa: 1 };
    case 'SET_FILTERS':
      return { ...durum, filtreler: eylem.payload, aktifSayfa: 1 };
    
    T, CLEAR_WATCHLIST
    case 'ADD_WATCHLIST':
      if (durum.izlemeListesi.some(item => item.id === eylem.payload.id)) {
        return durum;
      }
      return { ...durum, izlemeListesi: [...durum.izlemeListesi, eylem.payload] };
    case 'REMOVE_WATCHLIST':
      return { ...durum, izlemeListesi: durum.izlemeListesi.filter(item => item.id !== eylem.payload) };
    case 'CLEAR_WATCHLIST':
      return { ...durum, izlemeListesi: [] };
      

    case 'SET_PAGE_SIZE':
        const yeniToplamSayfa = Math.ceil(durum.diziler.length / eylem.payload);
        return { ...durum, sayfaBoyutu: eylem.payload, toplamSayfa: yeniToplamSayfa, aktifSayfa: 1 };
    case 'SAYFA_AYARLA':
        if (eylem.payload < 1 || eylem.payload > durum.toplamSayfa) return durum;
        return { ...durum, aktifSayfa: eylem.payload };

    default:
      return durum;
  }
};

export const DiziKonteks = createContext();


export const DurumYoneticisi = ({ children }) => {
  const [durum, gonder] = useReducer(indirgeyici, baslangicDurumu);

  return (
    <DiziKonteks.Provider value={{ durum, gonder }}>
      {children}
    </DiziKonteks.Provider>
  );
};