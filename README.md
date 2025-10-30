[Film Kulüp Sitesi](https://film-kulubu.vercel.app/)



Tasarım Aşamaları: Kalıcı Durumdan (Persistence) Kaçınma
Bu uygulama kasıtlı olarak, kullanıcının İzleme Listesi'ni sayfa yenilemelerinde kalıcı kılacak (localStorage) bir çözüm kullanmamaktadır.
Bu yüzden sayfa yenilendiğinde liste silinmektedir.

Bu karar, projenin temel amacını daha iyi yansıtmak üzere alınmıştır:

Neden localStorage Kullanılmadı?
Önceki Kitaplık Uygulamasında kullanıldığı için bu uygulamada sayfa refresh yapıldığında verilerin silinmesi istendi.
Odak Noktası: Projenin birincil öğrenim ve değerlendirme hedefi, React'in dahili durum yönetimi mekanizmaları (useReducer, useContext) ile karmaşık bir uygulama akışını (Fetch, Filter, Dispatch) yönetme becerisini göstermektir.(demo linkte localstorage kullanılmasına rağmen genel şablonlarda kullanılması gerektiği belirtilmemiş.)

Senaryo metninde yer alan tüm zorunlu gereklilikler şunlardır:

Kavramlar: Axios, useEffect, useReducer, Composition, Conditional Rendering, Pagination. (Bunların hepsi kodumuzda mevcuttu.)

Bileşenler: Listelenen tüm bileşenler (Filters, SearchBox, TVList, TVCard, WatchlistPanel, vb.) kodumuzda mevcuttu ve Türkçe isimleri kullanıldı.

useReducer Eylemleri: Listelenen tüm FETCH, SET_QUERY, SET_FILTERS, ADD_WATCHLIST, REMOVE_WATCHLIST, CLEAR_WATCHLIST gibi eylemler kodumuzda mevcuttu.

Uygulama Akışı: Listelenen 7 maddenin tamamı (Açılışta sorgu, Arama/Filtreler, Sayfalama, Detay sayfası gibi) mevcut kodda karşılanmıştır.

Temizlik: localStorage entegrasyonu, useReducer başlatıcısı (initializer) ve useEffect ile asenkron kayıt gibi ek karmaşıklık katmanları ekler. Bu ek katmanlar, temel durum yönetimi mantığının temizliğini ve anlaşılırlığını azaltır.

Performans ve Basitlik: Bu ölçekteki bir demo uygulaması için, her dispatch eyleminde depolama cihazına yazma işlemi (kaydetme) yapmak gereksiz bir yük getirir. Basitlik ve hızlı prototipleme bu projenin öncelikleridir.

Sonuç: İzleme Listesi, tarayıcının oturum hafızasında tutulur ve sayfa yenilemesi veya tarayıcının kapatılması durumunda sıfırlanır.
