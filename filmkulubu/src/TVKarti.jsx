import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DiziKonteks } from './DurumYoneticisi';

const TVKarti = ({ dizi }) => {
    const { gonder } = useContext(DiziKonteks);
    const resmiUrl = dizi.image?.medium || 'https://via.placeholder.com/210x295?text=Poster+Yok';
    const ozet = dizi.summary ? dizi.summary.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'Özet bulunmamaktadır.';
    const turler = dizi.genres.join(', ') || 'Belirtilmemiş';
    const puan = dizi.rating?.average || 'N/A';
    
    const izlemeListesineEkle = () => {
        gonder({ 
            type: 'IZLEME_LISTESI_EKLE', 
            payload: { id: dizi.id, name: dizi.name, image: dizi.image } 
        });
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
            <img src={resmiUrl} alt={dizi.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
            <h3 style={{ margin: '10px 0' }}>{dizi.name}</h3>
            <p><strong>Puan:</strong> {puan} | <strong>Dil:</strong> {dizi.language}</p>
            <p><strong>Türler:</strong> {turler}</p>
            <p style={{ fontSize: '14px', color: '#555' }}>{ozet}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <Link to={`/detay/${dizi.id}`} style={{ padding: '8px 15px', backgroundColor: '#3498db', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                    Detay
                </Link>
                <button onClick={izlemeListesineEkle} style={{ padding: '8px 15px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Kısa Listeye Ekle
                </button>
            </div>
        </div>
    );
};

export default TVKarti;