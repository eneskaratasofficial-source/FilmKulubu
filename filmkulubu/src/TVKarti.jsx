import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DiziKonteks } from './DurumYoneticisi';

const TVKarti = ({ dizi }) => {
    const { gonder } = useContext(DiziKonteks);
    
    const resmiUrl = dizi.image?.medium || 'https://via.placeholder.com/210x295?text=Poster+Yok';
    const puan = dizi.rating?.average || 'N/A';
    const ozet = dizi.summary ? dizi.summary.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : 'Özet yok.';
    const turler = dizi.genres.join(', ') || 'Bilinmiyor';

    const izlemeListesineEkle = () => {
        gonder({ 
            type: 'ADD_WATCHLIST', 
            // ✨ Düzeltildi: Eklenecek dizinin ID, isim ve resmi gönderilir
            payload: { id: dizi.id, name: dizi.name, image: dizi.image } 
        });
    };

    return (
        <div className="tv-card">
            <img src={resmiUrl} alt={dizi.name} />
            <h3>{dizi.name}</h3>
            <p><strong>Puan:</strong> {puan} | <strong>Dil:</strong> {dizi.language}</p>
            <p><strong>Türler:</strong> {turler}</p>
            <p>{ozet}</p>
            <div className="card-buttons">
                <Link to={`/detay/${dizi.id}`} className="detail-btn">
                    Detay
                </Link>
                <button 
                    onClick={izlemeListesineEkle}
                    className="watchlist-add-btn"
                >
                    Kısa Listeye Ekle
                </button>
            </div>
        </div>
    );
};

export default TVKarti;