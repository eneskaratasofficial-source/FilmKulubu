import React, { createContext, useReducer } from 'react';


const baslangicDurumu = {
  yukleniyor: false,
  hata: null,
  diziler: [],
  sorgu: 'friends', 
  filtreler: { tur: '', dil: '', minPuan: 0 },
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

    // Kullanıcı Eylemleri
    case 'SORGULAMA_AYARLA':
      return { ...durum, sorgu: eylem.payload };
    case 'FILTRE_AYARLA':
      return { ...durum, filtreler: eylem.payload, aktifSayfa: 1 };
    
    
    case 'IZLEME_LISTESI_EKLE':
      if (durum.izlemeListesi.some(item => item.id === eylem.payload.id)) {
        return durum;
      }
      return { ...durum, izlemeListesi: [...durum.izlemeListesi, eylem.payload] };
    case 'IZLEME_LISTESI_KALDIR':
      return { ...durum, izlemeListesi: durum.izlemeListesi.filter(item => item.id !== eylem.payload) };
    case 'IZLEME_LISTESI_TEMIZLE':
      return { ...durum, izlemeListesi: [] };
      
    // Sayfalamalar - bu kısmı ekledim (AI tarafından önerildi)
    case 'SAYFA_AYARLA':
        if (eylem.payload < 1 || eylem.payload > durum.toplamSayfa) return durum;
        return { ...durum, aktifSayfa: eylem.payload };
    case 'SAYFA_BOYUTU_AYARLA':
        const yeniToplamSayfa = Math.ceil(durum.diziler.length / eylem.payload);
        return { ...durum, sayfaBoyutu: eylem.payload, toplamSayfa: yeniToplamSayfa, aktifSayfa: 1 };

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