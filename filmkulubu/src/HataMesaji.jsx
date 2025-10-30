import React from 'react';

const HataMesaji = ({ mesaj, tekrarDene }) => (
    <div style={{ padding: '20px', border: '1px solid red', backgroundColor: '#fee', textAlign: 'center' }}>
        <h3>❌ Bir Hata Oluştu Daha Sonra Deneyin!</h3>
        <p>{mesaj || "Veriler yüklenirken bir sorun oluştu."}</p>
        <button onClick={tekrarDene} style={{ padding: '10px', marginTop: '10px' }}>Tekrar Dene</button>
    </div>
);

export default HataMesaji;