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
              // 1. Dizi Detay Bilgisi Yapay Zeka Yardımıyla Oluşturuldu :))
                const diziSonuc = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                
                // 2. Bölüm Listesi
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
    if (!dizi) return <div style={{ textAlign: 'center' }}>Dizi bulunamadı.</div>;

    const ozet = dizi.summary ? dizi.summary.replace(/<[^>]*>?/gm, '') : 'Özet bulunmamaktadır.';

    return (
        <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none', color: '#3498db' }}>← Anasayfaya Dön</Link>
            
            <div style={{ display: 'flex', gap: '30px' }}>
                <img src={dizi.image?.original || 'https://via.placeholder.com/300x420?text=Poster+Yok'} alt={dizi.name} style={{ width: '300px', height: 'auto', borderRadius: '8px' }} />
                
                <div>
                    <h2>{dizi.name}</h2>
                    <p><strong>Puan:</strong> {dizi.rating?.average || 'N/A'}</p>
                    <p><strong>Türler:</strong> {dizi.genres.join(', ')}</p>
                    <p><strong>Dil:</strong> {dizi.language}</p>
                    <p><strong>Durum:</strong> {dizi.status}</p>
                    <p style={{ marginTop: '20px' }}><strong>Özet:</strong> {ozet}</p>
                </div>
            </div>

            <h3 style={{ marginTop: '40px' }}>Bölüm Listesi</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {bolumler.length > 0 ? bolumler.slice(0, 15).map(bolum => ( 
                    <li key={bolum.id} style={{ padding: '10px', borderBottom: '1px dotted #ccc' }}>
                        <strong>S{bolum.season}E{bolum.number}:</strong> {bolum.name}
                        <span style={{ float: 'right', fontSize: '12px', color: '#777' }}>Yayın Tarihi: {bolum.airdate}</span>
                    </li>
                )) : <p>Bölüm bilgisi bulunamadı.</p>}
            </ul>
        </div>
    );
};

export default DiziDetay;