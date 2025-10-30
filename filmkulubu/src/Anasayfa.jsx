import React, { useContext } from 'react';
import { DiziKonteks } from './DurumYoneticisi';
import KancaVeriCek from './KancaVeriCek';
import AramaKutusu from './AramaKutusu';
import Filtreler from './Filtreler';
import TVListesi from './TVListesi';
import IzlemeListesiPaneli from './IzlemeListesiPaneli';
import Sayfalama from './Sayfalama';
import Yukleyici from './Yukleyici';
import HataMesaji from './HataMesaji';

const Anasayfa = () => {
  const { durum, gonder } = useContext(DiziKonteks);
  
 
  KancaVeriCek(durum, gonder); 

  const { yukleniyor, hata, aktifSayfa, sayfaBoyutu, toplamSayfa, filtreler } = durum;
  const { minPuan, dil, tur } = filtreler;

  
  const filtrelenmisDiziler = durum.diziler.filter(dizi => {
    const diziPuani = dizi.rating?.average || 0;
    const diziDili = dizi.language || '';
    const diziTurleri = dizi.genres || [];
    
    const puanUygun = diziPuani >= minPuan;
    const dilUygun = dil === 'Tümü' || diziDili === dil;
    const turUygun = tur === 'Tümü' || diziTurleri.includes(tur);

    return puanUygun && dilUygun && turUygun;
  });


  const baslangicIndeksi = (aktifSayfa - 1) * sayfaBoyutu;
  const bitisIndeksi = baslangicIndeksi + sayfaBoyutu;
  const gosterilecekDiziler = filtrelenmisDiziler.slice(baslangicIndeksi, bitisIndeksi);

  const tekrarDene = () => {
    gonder({ type: 'SET_QUERY', payload: durum.sorgu }); 
  };
  
  const bosSonuc = !yukleniyor && !hata && durum.diziler.length > 0 && filtrelenmisDiziler.length === 0;
  const genelBosDurum = !yukleniyor && !hata && durum.diziler.length === 0;

  return (
    <div className="main-container">
      <h1>🎬 Süleyman Demirel Üniversitesi Film Kulübü</h1>
      <header className="header-panel">
        {/* 4. Uygulama Akışı: Arama çubuğu ve filtreler üstte yer alır */}
        <AramaKutusu />
        <Filtreler />
      </header>

      <div className="content-area">
        <section className="list-section">
          {/* 1. Conditional Rendering */}
          {yukleniyor && <Yukleyici />}
          {hata && <HataMesaji mesaj={hata} tekrarDene={tekrarDene} />}
          {genelBosDurum && <div className="bos-mesaj">Aradığınız sorguya uygun dizi bulunamadı.</div>}
          {bosSonuc && <div className="bos-mesaj">Filtrelerinize uygun dizi bulunamadı.</div>}

          {/* 4. Uygulama Akışı: 5. Sayfalama (Pagination) */}
          {!yukleniyor && !hata && gosterilecekDiziler.length > 0 && (
            <>
              <TVListesi diziler={gosterilecekDiziler} />
              
              <Sayfalama 
                aktifSayfa={aktifSayfa}
                toplamSayfa={toplamSayfa}
                sayfaDegistir={(sayfa) => gonder({ type: 'SAYFA_AYARLA', payload: sayfa })}
              />
            </>
          )}
        </section>

        <aside className="watchlist-aside">
          {/* 4. Uygulama Akışı: 4. Gösterime Girecekler: Sağda seçilen dizileri gösterir */}
          <IzlemeListesiPaneli />
        </aside>
      </div>
    </div>
  );
};

export default Anasayfa;