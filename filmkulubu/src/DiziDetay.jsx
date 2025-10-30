import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Yukleyici from './Yukleyici';
import HataMesaji from './HataMesaji';

const DiziDetay = () => {
    const { id } = useParams();
    const [dizi, setDizi] = useState(null);
    const [bolumler, setBolumler] = useState([]);
    const [yukleniyor, setYukleniyor] = useState(true);
    const [hata, setHata] = useState(null);

  
    useEffect(() => {
        const detaylariCek = async () => {
            setYukleniyor(true);
            setHata(null);
            try {
                
                const diziSonuc = await axios.get(`https://api.tvmaze.com/shows/${id}`);
            
                const bolumSonuc = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
                
                setDizi(diziSonuc.data);
                setBolumler(bolumSonuc.data);
                setYukleniyor(false);

            } catch (err) {
                setHata("Dizi detayları yüklenirken bir sorun oluştu.");
                setYukleniyor(false);
            }
        };

        detaylariCek();
    }, [id]);

   
    if (yukleniyor) return <Yukleyici />;
    if (hata) return <HataMesaji mesaj={hata} tekrarDene={() => window.location.reload()} />;
    if (!dizi) return <div className="bos-mesaj">Dizi bulunamadı.</div>;

    const ozet = dizi.summary ? dizi.summary.replace(/<[^>]*>?/gm, '') : 'Özet bulunmamaktadır.';

    return (
        <div className="detail-container">
            <Link to="/" className="back-link">← Anasayfaya Dön</Link>
            
            <div className="detail-content">
                <img src={dizi.image?.original || 'https://via.placeholder.com/300x420?text=Poster+Yok'} alt={dizi.name} className="detail-poster" />
                
                <div className="detail-info">
                    <h2>{dizi.name}</h2>
                    <p><strong>Puan:</strong> {dizi.rating?.average || 'N/A'}</p>
                    <p><strong>Türler:</strong> {dizi.genres.join(', ')}</p>
                    <p><strong>Dil:</strong> {dizi.language}</p>
                    <p><strong>Durum:</strong> {dizi.status}</p>
                    <p className="detail-summary"><strong>Özet:</strong> {ozet}</p>
                </div>
            </div>

            <h3 className="episodes-title">Bölüm Listesi</h3>
            <ul className="episodes-list">
                {bolumler.length > 0 ? bolumler.slice(0, 15).map(bolum => ( 
                    <li key={bolum.id} className="episode-item">
                        <strong>S{bolum.season}E{bolum.number}:</strong> {bolum.name}
                        <span className="episode-date">Yayın Tarihi: {bolum.airdate}</span>
                    </li>
                )) : <p>Bölüm bilgisi bulunamadı.</p>}
            </ul>
        </div>
    );
};

export default DiziDetay;