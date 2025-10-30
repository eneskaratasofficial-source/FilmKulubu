import React, { createContext, useReducer, useEffect } from 'react';

// Sabit anahtar (Key) tanımlama
const LOCAL_STORAGE_KEY = 'filmKulubuIzlemeListesi';

// Başlatıcı (Initializer) Fonksiyonu: Local Storage'dan listeyi yükler
const başlatıcı = (initialState) => {
    try {
        const kaydedilenListe = localStorage.getItem(LOCAL_STORAGE_KEY);
        
        // Kaydedilmiş veri varsa ve boş değilse, izleme listesine yükle
        if (kaydedilenListe && kaydedilenListe !== 'undefined') { 
            return {
                ...initialState,
                izlemeListesi: JSON.parse(kaydedilenListe)
            };
        }
    } catch (error) {
        console.error("Local Storage okuma hatası:", error);
    }
    // Hata varsa veya veri yoksa varsayılan başlangıç durumunu döndür
    return initialState; 
};

// Başlangıç Durumu (izlemeListesi başlatıcı tarafından yönetileceği için burada boş kalır)
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

// Reducer Fonksiyonu
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
    
    // İzleme Listesi İşlemleri
    case 'ADD_WATCHLIST':
      if (durum.izlemeListesi.some(item => item.id === eylem.payload.id)) {
        return durum; 
      }
      return { 
        ...durum, 
        izlemeListesi: [...durum.izlemeListesi, eylem.payload] 
      };
      
    case 'REMOVE_WATCHLIST':
      return { 
        ...durum, 
        izlemeListesi: durum.izlemeListesi.filter(item => item.id !== eylem.payload) 
      };
    case 'CLEAR_WATCHLIST':
      return { ...durum, izlemeListesi: [] };
      
    // Sayfalama Eylemleri
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
  // 1. useReducer'ı başlatıcı fonksiyonu ile çağırıyoruz
  const [durum, gonder] = useReducer(indirgeyici, baslangicDurumu, başlatıcı); 

  // 2. useEffect ile izleme listesi her değiştiğinde Local Storage'a kaydetme
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(durum.izlemeListesi));
    } catch (error) {
      console.error("Local Storage yazma hatası:", error);
    }
  }, [durum.izlemeListesi]); // izlemeListesi değiştiğinde çalışır

  return (
    <DiziKonteks.Provider value={{ durum, gonder }}>
      {children}
    </DiziKonteks.Provider>
  );
};