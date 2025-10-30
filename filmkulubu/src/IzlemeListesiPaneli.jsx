import React, { useContext } from 'react';
import { DiziKonteks } from './DurumYoneticisi';

const IzlemeListesiPaneli = () => {
    const { durum, gonder } = useContext(DiziKonteks);

    const listedenKaldir = (diziId) => {
        gonder({ type: 'IZLEME_LISTESI_KALDIR', payload: diziId });
    };

    const listeyiTemizle = () => {
        gonder({ type: 'IZLEME_LISTESI_TEMIZLE' });
    };

    return (
        <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', position: 'sticky', top: '20px' }}>
            <h3>⭐ Gösterime Girecekler Listesi</h3>
            {durum.izlemeListesi.length === 0 ? (
                <p>Listeniz şu anda boş.</p>
            ) : (
                <>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {durum.izlemeListesi.map(dizi => (
                            <li key={dizi.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px dotted #eee' }}>
                                <span style={{ flexGrow: 1 }}>{dizi.name}</span>
                                <button 
                                    onClick={() => listedenKaldir(dizi.id)} 
                                    style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
                                >
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={listeyiTemizle}
                        style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Listeyi Temizle
                    </button>
                </>
            )}
        </div>
    );
};

export default IzlemeListesiPaneli;