import React, { useContext } from 'react';
import { DiziKonteks } from './DurumYoneticisi';

const IzlemeListesiPaneli = () => {
    const { durum, gonder } = useContext(DiziKonteks);
    const { izlemeListesi } = durum;

    // Tek bir öğeyi listeden kaldırma
    const handleRemove = (id) => {
        gonder({ type: 'REMOVE_WATCHLIST', payload: id });
    };

    // ✨ Listeyi tamamen temizleme fonksiyonu
    const handleClear = () => {
        gonder({ type: 'CLEAR_WATCHLIST' });
    };

    return (
        <div className="watchlist-panel">
            <h3>Gösterime Girecekler Listesi ({izlemeListesi.length})</h3>
            
            {izlemeListesi.length > 0 && (
                // ✨ Liste temizleme düğmesi
                <button onClick={handleClear} className="clear-btn">
                    Listeyi Temizle
                </button>
            )}

            <ul className="watchlist-items">
                {izlemeListesi.length === 0 ? (
                    <li className="empty-msg">Kısa Listeniz boş.</li>
                ) : (
                    izlemeListesi.map(dizi => (
                        <li key={dizi.id} className="watchlist-item">
                            {/* Resim gösterimi isteğe bağlı, sadece isim kullanmak daha temiz olabilir */}
                            <div className="item-info">
                                <span>{dizi.name}</span>
                            </div>
                            <button onClick={() => handleRemove(dizi.id)} className="remove-btn">
                                Kaldır
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default IzlemeListesiPaneli;