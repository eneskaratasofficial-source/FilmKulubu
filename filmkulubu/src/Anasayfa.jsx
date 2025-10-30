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

  const { yukleniyor, hata, diziler, aktifSayfa, sayfaBoyutu, toplamSayfa, filtreler } = durum;

  // Basit rating filtresi uygulama
  const filtrelenmisDiziler = diziler.filter(dizi => 
      (dizi.rating && dizi.rating.average >= filtreler.minPuan)
  );

  // Sayfalama Mantığı
  const baslangicIndeksi = (aktifSayfa - 1) * sayfaBoyutu;
  const bitisIndeksi = baslangicIndeksi + sayfaBoyutu;
  const gosterilecekDiziler = filtrelenmisDiziler.slice(baslangicIndeksi, bitisIndeksi);

  const tekrarDene = () => {
    gonder({ type: 'SORGULAMA_AYARLA', payload: durum.sorgu }); 
  };
  
  const bosSonuc = !yukleniyor && !hata && diziler.length > 0 && filtrelenmisDiziler.length === 0;
  const genelBosDurum = !yukleniyor && !hata && diziler.length === 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>🎬 Kampüs Film Kulübü</h1>
      <header style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <AramaKutusu />
        <Filtreler />
      </header>

      <div style={{ display: 'flex', gap: '20px' }}>
        <section style={{ flex: 3 }}>
          {/* Conditional Rendering: Yükleniyor */}
          {yukleniyor && <Yukleyici />}

          {/* Conditional Rendering: Hata */}
          {hata && <HataMesaji mesaj={hata} tekrarDene={tekrarDene} />}

          {/* Conditional Rendering: Boş Sonuç */}
          {genelBosDurum && <div style={{ textAlign: 'center', padding: '50px' }}>Aradığınız sorguya uygun dizi bulunamadı.</div>}
          {bosSonuc && <div style={{ textAlign: 'center', padding: '50px' }}>Filtrelerinize uygun dizi bulunamadı.</div>}

          {/* Listeleme ve Sayfalama */}
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

        <aside style={{ flex: 1 }}>
          <IzlemeListesiPaneli />
        </aside>
      </div>
    </div>
  );
};

export default Anasayfa;