import { useEffect } from 'react';
import axios from 'axios';
//BU KISIM AI TARAFINDAN HAZIRLANDI...

const KancaVeriCek = (durum, gonder) => {
  const { sorgu } = durum;

  useEffect(() => {
    let iptalEdildi = false;
    
    const dizileriCek = async () => {
      gonder({ type: 'FETCH_INIT' }); 

      try {
        const sonuc = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${sorgu}` 
        );

        if (!iptalEdildi) {
          const dizilerVerisi = sonuc.data.map(item => item.show);
          gonder({ type: 'FETCH_BASARI', payload: dizilerVerisi });
        }
      } catch (hata) {
        if (!iptalEdildi) {
          gonder({ type: 'FETCH_HATA', payload: hata.message });
        }
      }
    };

    if (sorgu) { 
        dizileriCek();
    }

    return () => {
      iptalEdildi = true; 
    };
  }, [sorgu, gonder]); 
};

export default KancaVeriCek;