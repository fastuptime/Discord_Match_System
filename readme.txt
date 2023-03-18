//// Kurulum ////

1. config.js dosyasını düzenleyin.
- mongoURL: mongodb.com adresinden aldığınız veritabanı bağlantı adresini girin. Tüm ip adreslerine açık yapmayı unutmayın.
- token: discord.com/developers adresinden aldığınız bot tokenini girin.
- name: sisteminizin ismini girin. (örnek: "Tinkie Binkie")
- ownerID: Bot sahibinin discord id'sini girin. Admin komutunu sadece bu id ye sahip kişiler kullanabilir.
- dayMatchLimit: Günde en fazla yapabileceği eşleşme sayısı. (örnek: 5)
- fake_user: Fake user eklemek için true yapın. (örnek: true)

2. Terminali açın ve aşağıdaki komutları girin.
NodeJS kurulu değilse LİNUX.
- sudo apt-get install nodejs
- sudo apt-get install npm
- sudo apt-get install build-essential
windows için https://nodejs.org/en/download/ adresinden indirin. 18.x.x LTS sürümünü indirin.

Dosyanın bulunduğu konuma gidin terminal ile
- cd PATH
- npm install
- npm i pm2 -g
- pm2 start index.js --name "TinkieBinkie"
- pm2 monit
Kurulum bu kadar.
//// Sistemi yeniden başlatmak için ////
- pm2 restart "TinkieBinkie"
//// Sistemi durdurmak için ////
- pm2 stop "TinkieBinkie"
//// Sistemi kaldırmak için ////
- pm2 delete "TinkieBinkie"
//// Sistemi başlatmak için ////
- pm2 start "TinkieBinkie"

//// Komutlar ////
- /oynadıgım_oyun Oynadığınız oyunu profilinize ekler.
- /artık_oynamıyorum Oynadığınız oyunu profilinizden kaldırır.
- /profil @kullanıcı Profilini görürsünüz.
- /engelle @kullanıcı Engelleme işlemi yaparsınız.
- /engelle_kaldir @kullanıcı Engelleme işlemi kaldırırsınız.
- /hesap_olustur Hesap oluşturur.
- /bilgilerimi_duzenle Hesabınızı düzenlersiniz.
- /arkadas_oner Arkadaş önerirsiniz.
- /oyunlar Oyunlar listesini görürsünüz.
- /isim_etiket @userID İsim etiket olarak getirir. (örnek: /isim_etiket 123456789012345678)

//// Veritabanı Modelleri ////
- model/user.js Kullanıcı veritabanı modeli.

//// Functions ////
- functions/discordMessage.js Discord mesaj fonksiyonları. success Error
- functions/exports.js fonksiyonları export eder.
- functions/loadCommands.js Komutları yükler.
- functions/matchFirends.js Arkadaşlarınızı eşleştirir.
- functions/log.js Console log fonksiyonları.

//// Fake User Ekleme ////
Fake user eklemek için config.js deki fake_user değişkeni true yapılmalıdır sonrasında sistemi başlattığınızda 200 adet rasgele fake user ekleyecektir.
Tekrardan false yapmayı unutmayın.