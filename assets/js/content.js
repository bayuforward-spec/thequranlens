/*
 * content.js — Mesin konten The Quran Lens.
 *
 * Setiap ayat mengikuti SATU skema baku berisi 6 lapisan tadabbur:
 *   1. Teks  : arab + latin (transliterasi) + arti (terjemah)
 *   2. asbabunNuzul : sebab/latar turunnya ayat (jujur bila tidak ada riwayat khusus)
 *   3. tafsir       : penjelasan makna ringkas
 *   4. hikmah       : pelajaran/ibrah inti
 *   5. linguistik   : keajaiban bahasa (i'jaz/balaghah) — "kenapa kata ini?"  ← pembeda utama
 *   6. amalan       : contoh penerapan & kasus keseharian
 *   + sumber        : rujukan tafsir agar kredibel
 *
 * Urutan array mengikuti tertib mushaf. CARA MENAMBAH AYAT BARU: salin satu objek,
 * ganti isinya, tempel pada posisi yang sesuai. `gratis: true` membuka seluruh
 * lapisan tanpa Premium (untuk etalase/teaser).
 */
const AYAT = [
  /* ============ SURAH AL-FĀTIḤAH (1) ============ */
  {
    id: 'al-fatihah-1',
    kajianKata: [
      {
        kata: 'بِسْمِ', latin: 'Bismi', arti: 'Dengan (menyebut) nama',
        poin: [
          'بِ — satu huruf bermakna "dengan". Ia menyandarkan seluruh perbuatan kepada Allah.',
          'Ada kata kerja yang sengaja disembunyikan: "dengan nama Allah, aku memulai".',
          'Disembunyikan justru agar mencakup apa pun yang sedang kamu mulai.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'],
      },
      {
        kata: 'اللَّهِ', latin: 'Allāh', arti: 'Allah',
        poin: [
          'Nama bagi Dzat — bukan sekadar sifat.',
          'Tak pernah disandang selain-Nya. Tak ber-jamak, tak ber-bentuk perempuan.',
          'Nama lain menyifati; nama ini menamai.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'اللَّه', latin: 'Allāh', sifat: ['Nama Dzat', 'Khusus, tak tertandingi'] },
          { arab: 'إِلٰه', latin: 'ilāh', alt: true, sifat: ['"Sembahan" — umum', 'Bisa untuk apa saja yang disembah'] },
        ], catatan: 'Dipakai nama Dzat «Allāh», bukan kata umum «ilāh».' },
        sumber: ['Tafsir As-Sa‘di', 'Tafsir Ibnu Katsir'],
      },
      {
        kata: 'الرَّحْمَٰنِ الرَّحِيمِ', latin: 'Ar-Raḥmān Ar-Raḥīm', arti: 'Yang Maha Pengasih lagi Maha Penyayang',
        poin: [
          'Dua nama dari satu akar: rahmat.',
          'Ar-Raḥmān — luas, untuk semua. Ar-Raḥīm — kekal, khusus bagi yang beriman.',
          'Rahmat-Nya disebut sebelum apa pun yang lain.',
        ],
        akar: { tipe: 'akar', huruf: ['ر', 'ح', 'م'], teks: 'Satu akar: raḥmah (rahmat)' },
        asalKata: { huruf: ['ر', 'ح', 'م'], makna: 'rahim — kandungan ibu',
          gambar: 'Akar «r-ḥ-m» adalah akar kata «ar-raḥim»: <b>rahim/kandungan ibu</b>. Dari sanalah lahir gambaran rahmat paling murni — ruang yang <b>menyelimuti, menghangatkan, dan menumbuhkan</b> makhluk lemah tanpa diminta dan tanpa balasan. Dalam hadis Nabi ﷺ, Allah berfirman: "Aku Ar-Raḥmān, Aku ciptakan rahim dan Kuambilkan namanya dari nama-Ku." Maka membuka dengan «Ar-Raḥmān Ar-Raḥīm» berarti menghadirkan kasih yang memeluk bak rahim — sebelum satu pun perintah disebut.' },
        banding: { tipe: 'banding', item: [
          { arab: 'الرَّحْمَٰن', latin: 'Ar-Raḥmān', sifat: ['Pola «fa‘lān» → keluasan', 'Untuk SELURUH makhluk', 'Di dunia'] },
          { arab: 'الرَّحِيم', latin: 'Ar-Raḥīm', sifat: ['Pola «fa‘īl» → kesinambungan', 'Khusus orang beriman', 'Kekal · di akhirat'] },
        ], catatan: 'Luas (kuantitas) sekaligus kekal (kontinuitas).' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
    ],
    hikmahPoin: [
      'Mulai dengan nama-Nya — bukan dengan kekuatanmu.',
      'Yang biasa pun berubah jadi ibadah.',
      'Berat melangkah? Bismillah dulu.',
    ],
    visual: [
      { tipe: 'akar', huruf: ['ر', 'ح', 'م'], teks: 'Satu akar: raḥmah (rahmat)' },
      { tipe: 'banding', item: [
        { arab: 'الرَّحْمَٰن', latin: 'Ar-Raḥmān', sifat: ['Pola «fa‘lān» → keluasan', 'Meliputi SELURUH makhluk', 'Di dunia · semua'] },
        { arab: 'الرَّحِيم', latin: 'Ar-Raḥīm', sifat: ['Pola «fa‘īl» → kesinambungan', 'Khusus orang beriman', 'Kekal · di akhirat'] },
      ], catatan: 'Berpasangan: rahmat yang luas (kuantitas) sekaligus kekal (kontinuitas).' },
    ],
    surah: 'Al-Fātiḥah',
    surahNo: 1,
    ayatNo: '1',
    juz: 1,
    tema: ['Pembuka', 'Rahmat', 'Nama Allah'],
    gratis: true, // etalase — terbuka penuh sebagai contoh kualitas
    arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    latin: 'Bismillāhir-raḥmānir-raḥīm.',
    arti: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus untuk basmalah sebagai pembuka Al-Fatihah. Al-Fatihah dikenal sebagai "Ummul Kitab" (induk Al-Qur’an) dan "As-Sab‘ul Maṡāni" (tujuh ayat yang diulang), dibaca pada setiap rakaat salat. Basmalah menjadi pembuka hampir seluruh surah, mengajarkan memulai segala hal dengan nama Allah.',
    tafsir:
      'Memulai dengan menyebut nama Allah, memohon pertolongan dan keberkahan-Nya, sekaligus menegaskan bahwa segala aktivitas dilakukan karena dan dengan-Nya. Dua sifat rahmat disebut untuk menanamkan harap kepada kasih sayang Allah sejak kata pertama.',
    hikmah:
      'Hidup yang diawali "Bismillah" adalah hidup yang disandarkan pada Allah, bukan pada kekuatan diri. Membiasakannya menjadikan aktivitas biasa bernilai ibadah.',
    linguistik:
      'Dua nama dipilih dari akar yang sama (raḥmah): «Ar-Raḥmān» dan «Ar-Raḥīm». «Ar-Raḥmān» berpola «fa‘lān» yang menunjukkan keluasan dan kepenuhan — rahmat yang meliputi SELURUH makhluk, mukmin maupun kafir, di dunia. «Ar-Raḥīm» berpola «fa‘īl» yang menunjukkan kesinambungan & kekhususan — rahmat yang terus-menerus, khusus bagi orang beriman di akhirat. Maka berpasangan keduanya merangkum rahmat Allah yang luas (kuantitas) sekaligus kekal (kontinuitas) — keseimbangan yang tak terwakili satu kata saja.',
    amalan:
      'Biasakan ucapkan "Bismillah" saat makan, masuk rumah, bekerja, hingga menyalakan kendaraan. Saat merasa berat memulai sesuatu (tugas, taubat, langkah baru), mulailah dengan menyebut nama Allah agar hati lebih ringan dan yakin ditolong.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-fatihah-2',
    kajianKata: [
      {
        kata: 'الْحَمْدُ', latin: 'Al-Ḥamd', arti: 'Segala puji',
        poin: [
          '«Al-» (istighrāq) = SEGALA macam pujian, dari siapa pun, kapan pun — seluruhnya milik Allah.',
          'Dia dipuji atas keindahan Dzat-Nya, bukan hanya atas pemberian — dipuji walau kau belum menerima apa-apa.',
          'Disusun tanpa kata kerja → pujian itu TETAP & abadi milik-Nya, bukan kejadian sesaat.',
        ],
        asalKata: { huruf: ['ح', 'م', 'د'], makna: 'pujian tulus yang disertai cinta',
          gambar: 'Bahasa Arab punya tiga kata untuk "memuji". «Madḥ» (sanjungan) bisa keluar <b>tanpa hati</b> — bahkan untuk benda mati atau demi pamrih. «Syukr» (terima kasih) hanya muncul <b>sebagai balasan atas nikmat</b> yang sudah diterima. «Ḥamd» berdiri di puncak keduanya: memuji karena <b>kebaikan & keindahan Dzat itu sendiri</b>, lahir dari cinta dan pengagungan — baik kau sedang menerima nikmat maupun tidak. Maka «al-ḥamdu lillāh» bukan sekadar "terima kasih, ya Allah", tapi <b>"segala pujian terindah, dari segenap makhluk, hanya layak untuk-Mu."</b>' },
        banding: { tipe: 'banding', item: [
          { arab: 'حَمْد', latin: 'Ḥamd', sifat: ['Pujian + cinta + pengagungan', 'Atas Dzat & nikmat sekaligus'] },
          { arab: 'مَدْح', latin: 'Madḥ', alt: true, sifat: ['Bisa tanpa rasa / demi pamrih', 'Untuk siapa & apa saja'] },
          { arab: 'شُكْر', latin: 'Syukr', alt: true, sifat: ['Hanya atas nikmat yang diterima', 'Tak mencakup pujian atas Dzat'] },
        ], catatan: 'Dipilih «al-ḥamd» — puncak pujian: tulus, atas Dzat-Nya, bukan sekadar balas budi.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'لِلَّهِ', latin: 'Lillāh', arti: 'Bagi / milik Allah',
        poin: [
          'Huruf «لِ» — "milik" sekaligus "untuk". Pujian itu hak-Nya, bukan pinjaman.',
          'Memuji-Nya bukan memberi; hanya mengembalikan yang memang milik-Nya.',
        ],
        sumber: ['Tafsir Al-Qurthubi'],
      },
      {
        kata: 'رَبِّ', latin: 'Rabb', arti: 'Tuhan — Pencipta, Pemilik, Pemelihara',
        poin: [
          'Satu kata padat: Pencipta, Pemilik, Pemelihara, Pengatur sekaligus.',
          'Jauh lebih luas dari sekadar "Tuhan".',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'رَبّ', latin: 'Rabb', sifat: ['Pencipta + Pemilik', 'Pemelihara + Pengatur'] },
          { arab: 'خَالِق', latin: 'Khāliq', alt: true, sifat: ['"Pencipta" saja', 'Tak mencakup memelihara & mengatur'] },
        ], catatan: '«Rabb» jauh lebih luas — mencipta sekaligus terus memelihara.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'الْعَالَمِينَ', latin: 'Al-‘ālamīn', arti: 'Seluruh alam',
        poin: [
          'Bukan hanya manusia — seluruh alam: manusia, jin, langit, bumi.',
          'Rububiyah-Nya tak terbatas pada satu jenis makhluk.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'الْعَالَمِين', latin: 'Al-‘ālamīn', sifat: ['SELURUH alam', 'Manusia, jin, langit, bumi'] },
          { arab: 'النَّاس', latin: 'An-nās', alt: true, sifat: ['"Manusia" saja', 'Membatasi rububiyah-Nya'] },
        ], catatan: 'Dipakai «al-‘ālamīn» — Tuhan SEMUA alam, bukan hanya manusia.' },
        sumber: ['Tafsir Ibnu Katsir'],
      },
    ],
    hikmahPoin: [
      'Segala puji kembali kepada-Nya, bukan kepada dirimu.',
      'Syukur mengusir ujub.',
      'Setiap kebaikanmu: pemberian-Nya.',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'حَمْد', latin: 'Ḥamd', sifat: ['Pujian + cinta', 'Disertai pengagungan'] },
        { arab: 'مَدْح', latin: 'Madḥ', sifat: ['Sekadar sanjungan', 'Bisa tanpa rasa'] },
      ], catatan: 'Dipilih «al-ḥamd» (berdefinit): SEGALA pujian, hanya milik Allah.' },
    ],
    surah: 'Al-Fātiḥah',
    surahNo: 1,
    ayatNo: '2',
    juz: 1,
    tema: ['Syukur', 'Pujian', 'Tauhid Rububiyah'],
    gratis: false,
    arab: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    latin: 'Al-ḥamdu lillāhi rabbil-‘ālamīn.',
    arti: 'Segala puji bagi Allah, Tuhan seluruh alam.',
    asbabunNuzul:
      'Tidak ada asbabun nuzul khusus. Ayat ini adalah pujian pembuka yang Allah ajarkan kepada hamba-Nya. Dalam hadis qudsi (HR. Muslim), saat hamba membaca "Alhamdulillāhi rabbil ‘ālamīn", Allah menjawab: "Hamba-Ku telah memuji-Ku."',
    tafsir:
      'Segala bentuk pujian — atas zat, nikmat, dan perbuatan-Nya — adalah milik Allah semata. Dia "Rabb" seluruh alam: yang menciptakan, memiliki, memelihara, dan mengatur segala sesuatu, dari manusia, jin, hingga seluruh makhluk.',
    hikmah:
      'Kesadaran bahwa segala pujian kembali kepada Allah membersihkan hati dari ujub dan menumbuhkan syukur. Setiap kebaikan yang kita miliki hakikatnya pemberian-Nya.',
    linguistik:
      'Dipilih «al-ḥamd» (dengan alif-lam istighrāq) bukan «ḥamd» — maknanya SEGALA jenis pujian, mutlak dan menyeluruh, hanya milik Allah. «Ḥamd» pun berbeda dari «madḥ»: ḥamd adalah pujian yang disertai cinta dan pengagungan, sedangkan madḥ bisa sekadar sanjungan tanpa rasa. Lalu «Rabb» — satu kata padat yang mencakup Pencipta, Pemilik, Pemelihara, sekaligus Pengatur; jauh lebih luas dari sekадar "Tuhan". «Al-‘ālamīn» (seluruh alam) menegaskan rububiyah-Nya tak terbatas pada manusia saja.',
    amalan:
      'Jadikan "Alhamdulillah" refleks atas nikmat kecil sekalipun (napas, makanan, kesehatan). Latih "jurnal syukur" — tulis 3 nikmat tiap malam. Saat mengeluh, hentikan dan ganti dengan menghitung yang sudah Allah beri.',
    sumber: ['Tafsir Ibnu Katsir', 'Sahih Muslim no. 395', 'Tafsir As-Sa‘di'],
  },
  {
    id: 'al-fatihah-3',
    kajianKata: [
      {
        kata: 'الرَّحْمَٰنِ الرَّحِيمِ', latin: 'Ar-Raḥmān Ar-Raḥīm', arti: 'Yang Maha Pengasih lagi Maha Penyayang',
        poin: [
          'Dua nama rahmat — diulang lagi tepat setelah «Rabbil ‘ālamīn».',
          'Setelah keagungan yang bisa membuat gentar, hati segera ditenangkan.',
          'Pengulangan di sini menata emosi pembaca, bukan sekadar penegasan.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'رَبِّ الْعَالَمِين', latin: 'Rabbil ‘ālamīn', sifat: ['Keagungan & kuasa', 'Bisa membangkitkan gentar'] },
          { arab: 'الرَّحْمٰنِ الرَّحِيم', latin: 'Ar-Raḥmān Ar-Raḥīm', sifat: ['Rahmat & kasih', 'Menenangkan jiwa'] },
        ], catatan: 'Susunannya menyeimbangkan takut & harap.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
    ],
    hikmahPoin: [
      'Agungkan Dia — tapi jangan putus harap.',
      'Antara takut dan harap, di situ iman berdiri.',
      'Sebanyak apa pun dosamu, rahmat-Nya lebih luas.',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'رَبِّ الْعَالَمِين', latin: 'Rabbil ‘ālamīn', sifat: ['Keagungan & kuasa', 'Bisa membangkitkan gentar'] },
        { arab: 'الرَّحْمٰنِ الرَّحِيم', latin: 'Ar-Raḥmān Ar-Raḥīm', sifat: ['Rahmat & kasih', 'Menenangkan jiwa'] },
      ], catatan: 'Susunannya menata hati: diagungkan, lalu segera ditenangkan.' },
    ],
    surah: 'Al-Fātiḥah',
    surahNo: 1,
    ayatNo: '3',
    juz: 1,
    tema: ['Rahmat', 'Harap', 'Nama Allah'],
    gratis: false,
    arab: 'الرَّحْمَٰنِ الرَّحِيمِ',
    latin: 'Ar-raḥmānir-raḥīm.',
    arti: 'Yang Maha Pengasih lagi Maha Penyayang.',
    asbabunNuzul:
      'Tidak ada asbabun nuzul khusus. Penyebutan ulang dua nama rahmat setelah "Rabbil ‘ālamīn" punya peran retoris penting dalam susunan surah.',
    tafsir:
      'Setelah menegaskan Allah sebagai Penguasa & Pengatur seluruh alam, Dia menyebut kembali rahmat-Nya agar pengagungan tidak melahirkan rasa takut yang berlebihan, melainkan diimbangi harap pada kasih sayang-Nya.',
    hikmah:
      'Mengenal Allah harus seimbang antara mengagungkan keperkasaan-Nya dan mengharap rahmat-Nya. Inilah jalan tengah antara takut dan harap (khauf wa rajā’).',
    linguistik:
      'Perhatikan penempatannya. Setelah «Rabbil ‘ālamīn» yang menonjolkan kekuasaan dan keagungan (bisa membangkitkan rasa gentar), Allah segera mengulang «Ar-Raḥmānir-Raḥīm». Susunan ini menyeimbangkan jiwa: tepat saat hati membesarkan keagungan-Nya, ia langsung ditenangkan oleh rahmat-Nya. Pengulangan di sini bukan sekadar penegasan, tapi penataan emosi pembaca — sebuah keindahan struktur (naẓm) yang khas Al-Qur’an.',
    amalan:
      'Saat merasa dosa terlalu banyak hingga putus asa dari ampunan, ingat ayat ini: Penguasa semesta itu Maha Pengasih. Jangan biarkan rasa takut menjauhkanmu dari-Nya; justru datang dan memohon ampun adalah wujud beriman pada rahmat-Nya.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-fatihah-4',
    kajianKata: [
      {
        kata: 'مَالِكِ', latin: 'Mālik', arti: 'Pemilik / Raja',
        poin: [
          'Dua qira’at mutawatir: «Mālik» (Pemilik) & «Malik» (Raja) — dua-duanya sahih & dibaca Nabi ﷺ.',
          '«Mālik»: memiliki SEGALANYA hari itu — dirimu, amalmu, nasibmu. «Malik»: berdaulat mutlak memutus & menghukum.',
          'Disandarkan ke «yaumid-dīn»: di dunia ada raja & pemilik semu; hari itu kepemilikan & kuasa hanya milik-Nya — tak terbagi.',
        ],
        asalKata: { huruf: ['م', 'ل', 'ك'], makna: 'memiliki sekaligus menguasai',
          gambar: 'Akar «m-l-k» melahirkan dua kata mulia: «mulk» (kekuasaan) dan «milk» (kepemilikan). Di dunia keduanya bisa <b>terpisah</b> — seorang raja memerintah negeri yang bukan miliknya, seorang pemilik tak punya kuasa menghukum. Pada Hari Pembalasan, Allah menyandang <b>keduanya sekaligus</b>: Yang memiliki segala sesuatu, sekaligus Yang berdaulat memutuskan — tanpa ada raja atau pemilik lain yang tersisa untuk dimintai tolong.' },
        banding: { tipe: 'banding', item: [
          { arab: 'مَالِك', latin: 'Mālik', sifat: ['Pemilik — kepemilikan penuh', 'Dirimu & amalmu milik-Nya'] },
          { arab: 'مَلِك', latin: 'Malik', sifat: ['Raja — kedaulatan & otoritas', 'Berkuasa memutus & menghukum'] },
        ], catatan: 'Dua qira’at mutawatir yang menyatu: Pemilik segalanya, sekaligus Raja yang berdaulat.' },
        sumber: ['Tafsir Al-Qurthubi', 'Kitab qira’at mutawatir'],
      },
      {
        kata: 'يَوْمِ الدِّينِ', latin: 'Yaumid-dīn', arti: 'Hari pembalasan',
        poin: [
          '«dīn» di sini bermakna balasan / perhitungan.',
          'Hari keadilan sempurna — bukan sekadar akhir kehidupan.',
          'Setiap amal dihisab, tak ada yang luput.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'يَوْمِ الدِّين', latin: 'Yaumid-dīn', sifat: ['Hari PEMBALASAN / perhitungan', 'Menonjolkan keadilan & hisab'] },
          { arab: 'يَوْمِ الْقِيَامَة', latin: 'Yaumil-qiyāmah', alt: true, sifat: ['"Hari kebangkitan"', 'Menonjolkan peristiwa, bukan hisab'] },
        ], catatan: 'Dipilih «dīn» — fokus pada keadilan & pertanggungjawaban.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
    ],
    hikmahPoin: [
      'Ada hari saat segalanya dihisab.',
      'Itu rem terkuat saat tak ada yang melihat.',
      'Jujur — bukan karena manusia, tapi karena-Nya.',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'مَالِك', latin: 'Mālik', sifat: ['Pemilik', 'Kepemilikan penuh hari itu'] },
        { arab: 'مَلِك', latin: 'Malik', sifat: ['Raja', 'Kedaulatan & otoritas'] },
      ], catatan: 'Dua bacaan sahih (mutawatir) — saling melengkapi makna.' },
    ],
    surah: 'Al-Fātiḥah',
    surahNo: 1,
    ayatNo: '4',
    juz: 1,
    tema: ['Akhirat', 'Hisab', 'Tanggung jawab'],
    gratis: false,
    arab: 'مَالِكِ يَوْمِ الدِّينِ',
    latin: 'Māliki yaumid-dīn.',
    arti: 'Pemilik (Raja) hari pembalasan.',
    asbabunNuzul:
      'Tidak ada asbabun nuzul khusus. Ayat ini mengalihkan kesadaran pembaca dari rahmat ke pertanggungjawaban, menyeimbangkan harap dengan rasa tanggung jawab.',
    tafsir:
      'Allah satu-satunya Penguasa mutlak pada hari pembalasan — hari ketika setiap jiwa menerima balasan amalnya, tanpa ada kekuasaan lain yang berbagi otoritas dengan-Nya.',
    hikmah:
      'Keyakinan akan hari pembalasan adalah rem moral terkuat: ia menjaga manusia tetap jujur saat sendirian, karena sadar semua dipertanggungjawabkan.',
    linguistik:
      'Ada dua qira’at mutawatir yang keduanya sahih: «Māliki» (Pemilik) dan «Māliki» dibaca «Māliki/Māaliki» (Raja/Penguasa). Keindahannya, kedua bacaan saling melengkapi makna: «Mālik» menekankan kepemilikan penuh atas hari itu, sedangkan «Malik» menekankan kedaulatan & otoritas memerintah. Dipilih pula «yaumid-dīn» (hari pembalasan) — kata «dīn» di sini bermakna "balasan/perhitungan", menegaskan bahwa hari itu adalah hari keadilan sempurna, bukan sekadar akhir kehidupan.',
    amalan:
      'Sebelum mengambil keputusan saat tidak ada yang melihat (transaksi, ujian, janji), hadirkan kesadaran "Māliki yaumid-dīn" — ada hari ketika ini semua dihisab. Ini melatih integritas dari dalam, bukan karena takut manusia.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi', 'Kitab qira’at mutawatir'],
  },
  {
    id: 'al-fatihah-5',
    kajianKata: [
      {
        kata: 'إِيَّاكَ نَعْبُدُ', latin: 'Iyyāka na‘budu', arti: 'Hanya kepada-Mu kami menyembah',
        poin: [
          'Objek «iyyāka» didahulukan dari kata kerja → ḥaṣr: "hanya kepada-Mu, sama sekali bukan yang lain".',
          'Terjadi «iltifāt»: setelah 4 ayat membicarakan Allah sebagai "Dia", tiba-tiba beralih menyapa-Nya langsung — "Engkau".',
          'Itulah gerak hati seorang hamba: makin dikenal-Nya (Pengasih, Raja, Hakim), makin dekat — hingga tak tahan lagi bicara TENTANG Dia, lalu bicara KEPADA Dia.',
        ],
        taqdim: { tipe: 'taqdim', normal: ['na‘budu', 'iyyāka'], quran: ['iyyāka', 'na‘budu'], catatan: 'Mendahulukan objek = pembatasan mutlak.' },
        banding: { tipe: 'banding', item: [
          { arab: 'نَعْبُدُ', latin: 'Na‘budu', sifat: ['Ibadah: cinta + tunduk + taat penuh', 'Penghambaan total'] },
          { arab: 'نُطِيعُ', latin: 'Nuṭī‘', alt: true, sifat: ['Sekadar "menaati"', 'Tanpa kedalaman cinta & penghambaan'] },
        ], catatan: '«na‘budu» (ibadah) jauh lebih dalam dari sekadar taat.' },
        sumber: ['Tafsir Ibnu Katsir', 'Sahih Muslim no. 395'],
      },
      {
        kata: 'وَإِيَّاكَ نَسْتَعِينُ', latin: 'wa iyyāka nasta‘īn', arti: 'dan hanya kepada-Mu kami memohon pertolongan',
        poin: [
          'Ibadah didahulukan dari permohonan: hak Allah dulu, baru kebutuhanmu.',
          '«iyyāka» diulang — pembatasan ditegaskan dua kali.',
        ],
        sumber: ['Tafsir As-Sa‘di'],
      },
    ],
    hikmahPoin: [
      'Hanya kepada-Nya. Bukan gengsi, atasan, atau harta.',
      'Tunaikan hak Allah dulu, baru kebutuhanmu.',
      'Datangi Dia sebelum bergantung pada makhluk.',
    ],
    visual: [
      { tipe: 'taqdim',
        normal: ['na‘budu', 'iyyāka'], quran: ['iyyāka', 'na‘budu'],
        catatan: 'Objek «iyyāka» didahulukan → ḥaṣr (pembatasan): "hanya kepada-Mu, bukan yang lain."' },
    ],
    surah: 'Al-Fātiḥah',
    surahNo: 1,
    ayatNo: '5',
    juz: 1,
    tema: ['Tauhid', 'Ibadah', 'Tawakal'],
    gratis: false,
    arab: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    latin: 'Iyyāka na‘budu wa iyyāka nasta‘īn.',
    arti: 'Hanya kepada Engkau kami menyembah dan hanya kepada Engkau kami memohon pertolongan.',
    asbabunNuzul:
      'Tidak ada asbabun nuzul khusus. Ayat ini adalah poros Al-Fatihah: peralihan dari memuji Allah (ayat 1–4) menuju ikrar penghambaan dan permohonan (ayat 5–7). Dalam hadis qudsi, Allah menyebut ayat ini "antara Aku dan hamba-Ku".',
    tafsir:
      'Pengakuan bahwa ibadah hanya ditujukan kepada Allah, dan pertolongan hanya dimohon dari-Nya. Ibadah didahulukan atas permohonan: tunaikan dulu hak Allah, baru sampaikan kebutuhan diri.',
    hikmah:
      'Tauhid sejati: tidak menyembah selain Allah dan tidak menggantungkan harap pada selain-Nya. Inilah inti kemerdekaan jiwa dari perbudakan kepada makhluk.',
    linguistik:
      'Inilah keajaiban yang sering membuat orang merinding. Kata «iyyāka» (objek: "hanya kepada-Mu") didahulukan sebelum kata kerja «na‘budu» (menyembah). Dalam kaidah balaghah, mendahulukan objek (taqdīmul ma‘mūl) berfungsi sebagai «ḥaṣr» — pembatasan mutlak: "hanya kepada-Mu, tidak kepada yang lain." Lebih menakjubkan lagi, terjadi «iltifāt» (peralihan gaya): dari membicarakan Allah sebagai orang ketiga ("Dia, Tuhan semesta alam") menjadi menyapa-Nya langsung sebagai orang kedua ("Engkau"). Seolah, setelah memuji-Nya, hamba menjadi begitu dekat hingga berani berbicara langsung di hadapan-Nya. Dan «na‘budu» didahulukan dari «nasta‘īn»: hak Allah (ibadah) sebelum kepentingan diri (pertolongan).',
    amalan:
      'Resapi ayat ini di setiap salat sebagai pembaruan ikrar: aku tak mengabdi pada gengsi, atasan, atau harta — hanya pada Allah. Saat menghadapi masalah, datangi Allah lebih dulu (doa, salat hajat) sebelum bergantung pada manusia.',
    sumber: ['Tafsir Ibnu Katsir', 'Sahih Muslim no. 395 (hadis qudsi)', 'Tafsir As-Sa‘di'],
  },
  {
    id: 'al-fatihah-6',
    kajianKata: [
      {
        kata: 'اهْدِنَا', latin: 'Ihdinā', arti: 'Tunjukilah kami',
        poin: [
          'Kata perintah «ihdinā» — diucapkan oleh orang yang sudah beriman.',
          'Hidayah berlapis: menuju kebenaran DAN keteguhan di atasnya.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'اهْدِنَا', latin: 'Ihdinā', sifat: ['Menuntun lembut + tunjukkan jalan', 'Sekaligus teguhkan di atasnya'] },
          { arab: 'أَرْشِدْنَا', latin: 'Arshidnā', alt: true, sifat: ['Sekadar "beri petunjuk arah"', 'Tanpa kelembutan menuntun'] },
        ], catatan: '«hidāyah» menuntun dengan lembut sampai tujuan — lebih dari sekadar menunjukkan arah.' },
        sumber: ['Tafsir As-Sa‘di', 'Tafsir Ibnu Katsir'],
      },
      {
        kata: 'الصِّرَاطَ الْمُسْتَقِيمَ', latin: 'aṣ-Ṣirāṭal-mustaqīm', arti: 'jalan yang lurus',
        poin: [
          '«aṣ-ṣirāṭ» tunggal-definitif: SATU jalan lurus yang jelas.',
          '«al-mustaqīm»: lurus tanpa belok — jalan terdekat menuju tujuan.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'الصِّرَاط', latin: 'aṣ-Ṣirāṭ', sifat: ['Tunggal & definitif', 'Satu jalan lurus'] },
          { arab: 'سُبُل', latin: 'Subul', alt: true, sifat: ['Bentuk jamak', 'Jalan-jalan yang bercabang / sesat'] },
        ], catatan: 'Satu jalan lurus — melawan banyak jalan yang menyesatkan.' },
        asalKata: { huruf: ['ص', 'ر', 'ط'], makna: 'menelan / melahap',
          gambar: 'Akar «ṣ-r-ṭ» bermakna <b>menelan</b> (saraṭa asy-syai’a: ia melahapnya). Orang Arab menamai jalan besar «ṣirāṭ» karena ia begitu <b>luas dan terang</b> hingga seakan "menelan" siapa pun yang melaluinya — pejalan seolah lenyap ditelan lebarnya, tak tersesat ke tepi. Maka «aṣ-ṣirāṭ al-mustaqīm» bukan lorong sempit yang membuat ragu, melainkan jalan benderang yang sanggup menampung semua penempuhnya menuju satu tujuan.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'],
      },
    ],
    hikmahPoin: [
      'Sudah muslim pun, tetap minta hidayah tiap hari.',
      'Hidayah bukan status — tapi bimbingan tiap langkah.',
      'Bingung memilih? "Tunjukkan jalan yang lurus."',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'الصِّرَاط', latin: 'aṣ-Ṣirāṭ', sifat: ['Tunggal & definitif', 'Satu jalan lurus', 'Tanpa belok'] },
        { arab: 'سُبُل', latin: 'Subul', sifat: ['Bentuk jamak', 'Jalan bercabang', 'Jalan-jalan sesat'] },
      ], catatan: 'Satu jalan lurus — melawan banyak jalan yang menyesatkan.' },
    ],
    surah: 'Al-Fātiḥah',
    surahNo: 1,
    ayatNo: '6',
    juz: 1,
    tema: ['Hidayah', 'Doa', 'Istiqamah'],
    gratis: false,
    arab: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    latin: 'Ihdinaṣ-ṣirāṭal-mustaqīm.',
    arti: 'Tunjukilah kami jalan yang lurus.',
    asbabunNuzul:
      'Tidak ada asbabun nuzul khusus. Inilah inti permohonan dalam Al-Fatihah; karena itu kita memintanya minimal 17 kali sehari dalam salat fardu.',
    tafsir:
      'Permohonan agar Allah membimbing kepada jalan yang lurus — yaitu Islam, kebenaran, dan jalan para nabi serta orang saleh — sekaligus diteguhkan di atasnya hingga akhir hayat.',
    hikmah:
      'Meski sudah muslim, kita tetap memohon hidayah setiap hari, karena hidayah bukan sekadar status, melainkan bimbingan yang terus dibutuhkan di setiap langkah dan keputusan.',
    linguistik:
      'Dipilih «aṣ-ṣirāṭ» (jalan) dalam bentuk tunggal-definitif (ma‘rifah): satu jalan lurus yang jelas, berlawanan dengan ayat lain yang menyebut «subul» (jalan-jalan, jamak) untuk jalan-jalan sesat yang bercabang. «Al-mustaqīm» berarti lurus tanpa belok — jalan terdekat menuju tujuan. Menariknya, doa ini memakai kata kerja perintah «ihdinā» (bimbinglah kami) padahal diucapkan oleh orang yang sudah beriman — menyiratkan bahwa hidayah berlapis: hidayah menuju kebenaran DAN hidayah keteguhan di atasnya.',
    amalan:
      'Saat membaca ayat ini dalam salat, hadirkan benar-benar permohonannya — jangan otomatis. Jadikan ia doa saat bingung mengambil keputusan besar (karier, jodoh, hijrah): "Ya Allah, tunjukkan jalan yang lurus." Lalu ikhtiar dengan ilmu dan istikharah.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-fatihah-7',
    kajianKata: [
      {
        kata: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ', latin: 'ṣirāṭal-lażīna an‘amta ‘alaihim', arti: 'jalan orang yang Engkau beri nikmat',
        poin: [
          'Nikmat disandarkan LANGSUNG ke Allah: «an‘amta» — Engkau yang memberi.',
          'Mereka: para nabi, shiddiqin, syuhada, & orang saleh.',
          'Adab Qur’an: nikmat dinisbatkan langsung kepada-Nya, tapi murka dibiarkan pasif (tak "Engkau murkai") — rahmat-Nya didahulukan bahkan dalam keadilan.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'أَنْعَمْتَ عَلَيْهِم', latin: 'an‘amta ‘alaihim', sifat: ['Bentuk AKTIF', 'Disandarkan ke Allah'] },
          { arab: 'الْمَغْضُوبِ عَلَيْهِم', latin: 'al-magḍūbi ‘alaihim', alt: true, sifat: ['Bentuk PASIF', 'Tak disandarkan langsung'] },
        ], catatan: 'Adab: kebaikan dinisbatkan kepada-Nya; murka tidak.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ', latin: 'gairil-magḍūbi ‘alaihim', arti: 'bukan (jalan) mereka yang dimurkai',
        poin: [
          'Bentuk pasif «al-magḍūb» — tak dikatakan "yang Engkau murkai".',
          'Yakni mereka yang tahu kebenaran lalu meninggalkannya.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Jami‘ at-Tirmidzi'],
      },
      {
        kata: 'وَلَا الضَّالِّينَ', latin: 'wa laḍ-ḍāllīn', arti: 'dan bukan (pula) mereka yang sesat',
        poin: [
          'Mereka yang beramal tanpa ilmu → tersesat.',
          'Selamat menuntut dua: ilmu yang benar + amal yang lurus.',
        ],
        sumber: ['Tafsir As-Sa‘di'],
      },
    ],
    hikmahPoin: [
      'Selamat = ilmu yang benar + amal yang lurus.',
      'Ilmu tanpa amal: tergelincir.',
      'Amal tanpa ilmu: tersesat.',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'أَنْعَمْتَ عَلَيْهِم', latin: 'an‘amta ‘alaihim', sifat: ['Bentuk AKTIF', 'Disandarkan ke Allah', '"Engkau yang beri nikmat"'] },
        { arab: 'الْمَغْضُوبِ عَلَيْهِم', latin: 'al-magḍūbi ‘alaihim', sifat: ['Bentuk PASIF', 'Tak disandarkan langsung', 'Murka lahir dari hamba'] },
      ], catatan: 'Puncak adab: kebaikan kepada-Nya, keburukan tak dilekatkan pada-Nya.' },
    ],
    surah: 'Al-Fātiḥah',
    surahNo: 1,
    ayatNo: '7',
    juz: 1,
    tema: ['Teladan', 'Adab', 'Jalan keselamatan'],
    gratis: false,
    arab: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    latin: 'Ṣirāṭal-lażīna an‘amta ‘alaihim gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn.',
    arti: '(Yaitu) jalan orang-orang yang telah Engkau beri nikmat, bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.',
    asbabunNuzul:
      'Tidak ada asbabun nuzul khusus. Nabi ﷺ menjelaskan tiga golongan ini: yang diberi nikmat adalah para nabi, shiddiqin, syuhada, dan saleh; yang dimurkai dan yang sesat disebutkan dalam beberapa riwayat sebagai gambaran umum dua bentuk penyimpangan (mengetahui kebenaran lalu meninggalkannya, dan beramal tanpa ilmu).',
    tafsir:
      'Jalan lurus diperjelas sebagai jalan orang-orang yang Allah beri nikmat hidayah, bukan jalan dua golongan yang menyimpang: yang menyimpang karena meninggalkan kebenaran yang diketahui, dan yang menyimpang karena beramal tanpa ilmu.',
    hikmah:
      'Keselamatan menuntut dua hal sekaligus: ilmu yang benar DAN amal yang lurus. Ilmu tanpa amal dan amal tanpa ilmu sama-sama tergelincir.',
    linguistik:
      'Perhatikan keindahan adab dalam pemilihan kata. Saat menyebut nikmat, Allah memakai kalimat aktif yang menyandarkan langsung kepada diri-Nya: «an‘amta ‘alaihim» (Engkau yang memberi nikmat). Namun saat menyebut murka, dipakai bentuk pasif «al-magḍūbi ‘alaihim» (mereka yang dimurkai) — TIDAK dikatakan "yang Engkau murkai". Penyandaran nikmat kepada Allah dan penghindaran penyandaran murka secara langsung adalah puncak adab dalam berbicara tentang Allah: kebaikan dinisbatkan kepada-Nya, sedangkan keburukan tidak dilekatkan langsung pada-Nya, sebab murka itu lahir dari perbuatan hamba sendiri.',
    amalan:
      'Setelah membaca ayat ini, ucapkan "āmīn" dengan penuh harap. Jadikan ia pengingat untuk selalu memadukan ilmu dan amal: jangan menunda mengamalkan kebaikan yang sudah diketahui, dan jangan beribadah/bermuamalah tanpa belajar dasarnya lebih dulu.',
    sumber: ['Tafsir Ibnu Katsir', 'Jami‘ at-Tirmidzi (riwayat tiga golongan)', 'Tafsir As-Sa‘di'],
  },

  /* ============ SURAH AL-BAQARAH (2) ============ */
  {
    id: 'al-baqarah-1',
    kajianKata: [
      {
        kata: 'الم', latin: 'Alif Lām Mīm', arti: '(huruf-huruf terpisah)',
        poin: [
          'Huruf «muqaṭṭa‘ah» — sikap paling selamat: "Allah lebih tahu maksudnya".',
          'Al-Qur’an tersusun dari huruf yang SAMA yang kalian kuasai — namun tak tertandingi.',
          'Tantangan i‘jāz lewat bahan baku yang paling dikenal lawan.',
        ],
        akar: { tipe: 'akar', huruf: ['ا', 'ل', 'م'], teks: 'Huruf yang kamu kuasai — namun tak tertandingi.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'],
      },
    ],
    hikmahPoin: [
      'Tak semua harus dipahami tuntas untuk diimani.',
      'Ada ilmu yang menuntut tunduk.',
      'Akui batas dirimu — lalu terus belajar.',
    ],
    visual: [
      { tipe: 'akar', huruf: ['ا', 'ل', 'م'], teks: 'Huruf yang kamu kuasai — namun tak tertandingi.' },
    ],
    surah: 'Al-Baqarah',
    surahNo: 2,
    ayatNo: '1',
    juz: 1,
    tema: ['Mukjizat', 'Tantangan i\'jaz', 'Tawadu ilmu'],
    gratis: false,
    arab: 'الم',
    latin: 'Alif Lām Mīm.',
    arti: 'Alif Lām Mīm.',
    asbabunNuzul:
      'Tidak ada asbabun nuzul khusus. "Alif Lām Mīm" termasuk «al-ḥurūf al-muqaṭṭa‘ah» (huruf-huruf terpisah) yang membuka 29 surah. Para ulama berbeda pendapat tentang maknanya; sikap paling selamat: "Allah lebih tahu maksudnya" sembari merenungkan hikmah penempatannya.',
    tafsir:
      'Huruf-huruf terpotong yang mengawali sebagian surah. Banyak ulama salaf menyerahkan maknanya kepada Allah, namun sepakat akan adanya hikmah besar di baliknya, terutama kaitannya dengan kemukjizatan Al-Qur’an.',
    hikmah:
      'Tidak semua hal harus kita pahami tuntas untuk kita imani. Ada wilayah ilmu yang menuntut ketundukan dan kerendahan hati di hadapan Allah.',
    linguistik:
      'Inilah salah satu isyarat i‘jāz yang paling memukau. Surah-surah berhuruf muqaṭṭa‘ah hampir selalu disusul penyebutan tentang Al-Qur’an (di sini: «Żālikal-kitāb…»). Seolah Allah menantang: Al-Qur’an ini tersusun dari huruf-huruf yang SAMA PERSIS dengan yang kalian (bangsa Arab) kuasai dan banggakan — alif, lām, mīm — namun kalian tetap tak mampu menyusun yang menyamainya. Tantangan «i‘jāz» disampaikan justru lewat bahan baku yang paling dikenal lawan, membungkam mereka dengan "senjata" mereka sendiri. Para ahli bahasa Arab terbaik pun tak sanggup menjawabnya.',
    amalan:
      'Saat menemui hal dalam agama yang belum kau pahami, jangan terburu menolak; akui keterbatasan ilmu dan teruslah belajar. Jadikan huruf-huruf ini pengingat untuk merenungi betapa Al-Qur’an mustahil dikarang manusia — penguat iman saat ragu.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi', 'Tafsir As-Sa‘di'],
  },
  {
    id: 'al-baqarah-2',
    kajianKata: [
      {
        kata: 'ذَٰلِكَ', latin: 'Żālika', arti: 'Itu (kitab itu)',
        poin: [
          'Dipakai isyarat "jauh" «żālika», bukan "dekat" «hāżā» — padahal kitab ada di hadapan.',
          'Justru untuk MENGAGUNGKAN: menunjuk ketinggian derajat kitab ini.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'ذٰلِكَ', latin: 'Żālika (itu)', sifat: ['Isyarat "jauh"', 'Mengagungkan', 'Kedudukan tinggi'] },
          { arab: 'هٰذَا', latin: 'Hāżā (ini)', alt: true, sifat: ['Isyarat "dekat"', 'Biasa'] },
        ], catatan: 'Dipilih «żālika» — meninggikan derajat kitab ini.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'الْكِتَابُ', latin: 'Al-Kitāb', arti: 'Kitab (Al-Qur’an)',
        poin: [
          'Dengan alif-lam: Kitab yang sudah dikenal keagungannya.',
          'Bukan sekadar tulisan — tapi "Al-Kitab" yang menjadi rujukan & ketetapan.',
        ],
        asalKata: { huruf: ['ك', 'ت', 'ب'], makna: 'menulis sekaligus menetapkan/mewajibkan',
          gambar: 'Akar «k-t-b» menyimpan dua makna yang menyatu: <b>menulis</b> dan <b>menetapkan/mewajibkan</b> — dari akar yang sama lahir «kutiba ‘alaikum» (telah <b>diwajibkan</b> atas kamu, QS 2:183). Maka «Al-Kitāb» bukan sekadar lembar bertinta, melainkan <b>ketetapan yang mengikat</b> — hukum yang pasti & berlaku, bukan bacaan yang boleh diabaikan. Menyebutnya «al-Kitāb» menegaskan: isinya <b>untuk dijalani</b>, bukan sekadar dinikmati.' },
        banding: { tipe: 'banding', item: [
          { arab: 'الْكِتَاب', latin: 'Al-Kitāb', sifat: ['Akar k-t-b: tertulis & ditetapkan', 'Sesuatu yang pasti & mengikat'] },
          { arab: 'الْقُرْآن', latin: 'Al-Qur’ān', alt: true, sifat: ['Menekankan sisi "dibaca"', 'Tak menonjolkan ketetapan'] },
        ], catatan: '«al-Kitāb» menonjolkan: ini ketetapan yang pasti, bukan sekadar bacaan.' },
        sumber: ['Tafsir Ibnu Katsir'],
      },
      {
        kata: 'لَا رَيْبَ فِيهِ', latin: 'lā raiba fīh', arti: 'tidak ada keraguan di dalamnya',
        poin: [
          '«lā» menafikan JENIS: tak ada keraguan apa pun, sekecil apa pun.',
          'Dipilih «rayb» (keraguan + gelisah), bukan «syakk» yang ringan — lalu dihapuskan.',
          '«fīhi» (di DALAM): keraguan tak bisa hidup di dalamnya. Kamu bisa ragu dari luar.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'رَيْب', latin: 'Rayb', sifat: ['Keraguan + gelisah / curiga', 'Bentuk paling berat'] },
          { arab: 'شَكّ', latin: 'Syakk', alt: true, sifat: ['Ragu biasa', 'Lebih ringan'] },
        ], catatan: 'Allah menafikan «rayb» — bahkan keraguan terberat pun tak punya tempat.' },
        viz: [
          { tipe: 'banding', item: [
            { arab: 'فِيهِ', latin: 'Fīhi (di dalamnya)', sifat: ['Keraguan tak bisa hidup DI DALAMnya', 'Masuk ke dalam → temukan keyakinan'] },
            { arab: 'عَنْهُ', latin: '‘Anhu (tentangnya)', alt: true, sifat: ['"Tentangnya" — dari luar', 'Kamu bisa ragu dari kejauhan'] },
          ], catatan: '«fīhi» (di dalam), bukan «‘anhu» (tentang): keyakinan menanti yang masuk ke dalamnya.' },
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'],
      },
      {
        kata: 'هُدًى لِّلْمُتَّقِينَ', latin: 'hudal lil-muttaqīn', arti: 'petunjuk bagi orang yang bertakwa',
        poin: [
          '«hudan» nakirah → mengisyaratkan keagungan & keluasan petunjuk.',
          'Petunjuk objektif & sempurna; yang memetiknya: hati yang bertakwa.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'لِّلْمُتَّقِينَ', latin: 'lil-muttaqīn', sifat: ['Membimbing khusus yang bertakwa', 'Hati yang siap menerima'] },
          { arab: 'لِلنَّاسِ', latin: 'lin-nās', alt: true, sifat: ['Petunjuk untuk semua (2:185)', 'Tersedia, tapi tak semua memetik'] },
        ], catatan: 'Tersedia bagi semua (lin-nās), tapi yang benar-benar TERBIMBING: muttaqīn.' },
        sumber: ['Tafsir As-Sa‘di', 'Tafsir Ibnu Katsir'],
      },
    ],
    hikmahPoin: [
      'Petunjuknya sempurna; yang memetiknya: hati yang bertakwa.',
      'Butuh kitab yang benar + hati yang terbuka.',
      'Ragu dalam hidup? Kembali ke yang "tanpa keraguan".',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'ذٰلِكَ', latin: 'Żālika (itu)', sifat: ['Isyarat "jauh"', 'Mengagungkan', 'Kedudukan tinggi'] },
        { arab: 'هٰذَا', latin: 'Hāżā (ini)', sifat: ['Isyarat "dekat"', 'Biasa'] },
      ], catatan: 'Dipilih «żālika» — justru untuk meninggikan derajat kitab ini.' },
    ],
    surah: 'Al-Baqarah',
    surahNo: 2,
    ayatNo: '2',
    juz: 1,
    tema: ['Petunjuk', 'Takwa', 'Keyakinan'],
    gratis: false,
    arab: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
    latin: 'Żālikal-kitābu lā raiba fīh, hudal lil-muttaqīn.',
    arti: 'Kitab (Al-Qur’an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa.',
    asbabunNuzul:
      'Tidak ada asbabun nuzul khusus. Ayat ini menegaskan kedudukan Al-Qur’an sebagai kitab yang pasti benar dan menjadi petunjuk, tepat setelah isyarat kemukjizatan pada "Alif Lām Mīm".',
    tafsir:
      'Al-Qur’an adalah kitab yang sama sekali tidak mengandung keraguan tentang asal (dari Allah) maupun isinya. Ia menjadi petunjuk yang benar-benar membimbing — khususnya berbuah pada orang yang bertakwa, karena merekalah yang membuka hati untuk menerimanya.',
    hikmah:
      'Petunjuk Al-Qur’an bersifat objektif & sempurna, tetapi yang memetik manfaatnya adalah hati yang siap (bertakwa). Hidayah butuh kitab yang benar sekaligus hati yang terbuka.',
    linguistik:
      'Dipilih kata tunjuk «żālika» (itu — untuk yang jauh), bukan «hāżā» (ini — untuk yang dekat), padahal Al-Qur’an ada di hadapan. Pemakaian isyarat "jauh" di sini justru untuk MENGAGUNGKAN: menunjuk ketinggian dan keluhuran derajat kitab ini, seakan kedudukannya jauh tinggi di atas. Lalu «lā raiba fīh» — peniadaan keraguan dengan «lā» yang menafikan jenis (tidak ada keraguan apa pun, sekecil apa pun). Dan «hudan» (petunjuk) berbentuk nakirah untuk mengisyaratkan keagungan dan keluasan petunjuk itu. Susunan ini menegaskan kepastian mutlak sekaligus kemuliaan kitab dalam beberapa kata ringkas.',
    amalan:
      'Bangun hubungan harian dengan Al-Qur’an meski sedikit (satu ayat dengan maknanya). Tingkatkan takwa — sebab makin bertakwa, makin terbuka pintu memahami petunjuknya. Saat ragu dalam hidup, kembalikan standar pada Al-Qur’an yang "lā raiba fīh".',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-baqarah-3-4',
    kajianKata: [
      {
        kata: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ', latin: 'allażīna yu’minūna bil-gaib', arti: 'mereka yang beriman kepada yang gaib',
        poin: [
          'Hakikat iman: membenarkan yang tak terindra karena percaya pada sumbernya (wahyu).',
          'Bukan karena melihat — tapi karena yakin pada Yang mengabarkan.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'يُؤْمِنُونَ', latin: 'Yu’minūn (kini)', sifat: ['Bentuk present · berkelanjutan', 'Iman yang sedang dijalani'] },
          { arab: 'آمَنُوا', latin: 'Āmanū (lampau)', alt: true, sifat: ['Bentuk lampau · selesai', 'Seolah peristiwa yang telah usai'] },
        ], catatan: 'Dipakai bentuk «kini» — iman bukan peristiwa yang telah terjadi, tapi keadaan yang terus hidup.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'وَيُقِيمُونَ الصَّلَاةَ', latin: 'wa yuqīmūnaṣ-ṣalāh', arti: 'dan menegakkan salat',
        poin: [
          'Dipakai «yuqīmūn» (menegakkan), bukan sekadar «yuṣallūn» (mengerjakan).',
          'Iqāmah = menunaikan dengan sempurna syarat, rukun, & kekhusyukan.',
        ],
        asalKata: { huruf: ['ق', 'و', 'م'], makna: 'menegakkan tegak & kokoh',
          gambar: 'Akar «q-w-m» berarti <b>berdiri tegak</b>; «iqāmah» = membuat sesuatu <b>berdiri lurus & kokoh</b> — seperti menegakkan tiang penyangga. Maka salat bukan sekadar "dikerjakan" lalu gugur, melainkan <b>ditegakkan</b>: lurus rukun & syaratnya, hidup khusyuknya — hingga ia menjadi <b>tiang yang menyangga seluruh bangunan</b> iman & keseharian, bukan tempelan di sela jadwal.' },
        banding: { tipe: 'banding', item: [
          { arab: 'يُقِيمُونَ', latin: 'Yuqīmūn', sifat: ['Menegakkan', 'Sempurna & khusyuk'] },
          { arab: 'يُصَلُّونَ', latin: 'Yuṣallūn', alt: true, sifat: ['Sekadar mengerjakan', 'Gugur kewajiban'] },
        ], catatan: 'Salat bukan dalam jadwal mereka — ia dalam arsitektur mereka.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ', latin: 'wa mimmā razaqnāhum yunfiqūn', arti: 'dan menginfakkan sebagian rezeki Kami',
        poin: [
          '«min» (sebagian) — meringankan; tak diminta semuanya.',
          '"Rezeki dari Kami" — harta itu titipan; berinfak = mengembalikan pemberian-Nya.',
        ],
        sumber: ['Tafsir As-Sa‘di', 'Tafsir Ibnu Katsir'],
      },
      {
        kata: 'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ', latin: 'wallażīna yu’minūna bimā unzila ilaika wa mā unzila min qablik', arti: 'dan beriman pada wahyu kepadamu & sebelummu',
        poin: [
          'Iman menyeluruh: pada Al-Qur’an DAN kitab-kitab sebelumnya.',
          'Tak memilah-milah wahyu — membenarkan seluruh rangkaian risalah.',
        ],
        sumber: ['Tafsir Ibnu Katsir'],
      },
      {
        kata: 'وَبِالْآخِرَةِ هُمْ يُوقِنُونَ', latin: 'wa bil-ākhirati hum yūqinūn', arti: 'dan mereka yakin akan adanya akhirat',
        poin: [
          '«hum» didahulukan → kekhususan: MEREKAlah yang benar-benar yakin.',
          'Yakin, bukan sekadar tahu — keyakinan yang menggerakkan amal.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'يُوقِنُونَ', latin: 'Yūqinūn', sifat: ['Yaqīn: keyakinan pasti', 'Menggerakkan amal'] },
          { arab: 'يَعْلَمُونَ', latin: 'Ya‘lamūn', alt: true, sifat: ['Sekadar "tahu"', 'Bisa tahu tapi tak tergerak'] },
        ], catatan: 'Dipilih «yūqinūn» — yakin yang membekas, bukan sekadar pengetahuan.' },
        sumber: ['Tafsir As-Sa‘di', 'Tafsir Ibnu Katsir'],
      },
    ],
    hikmahPoin: [
      'Takwa bukan klaim di hati.',
      'Ia terbukti: salat, sedekah, yakin pada wahyu & akhirat.',
      'Iman batin → ibadah nyata + peduli sesama.',
    ],
    visual: [
      { tipe: 'hitung', item: [
        { label: 'Ciri orang bertakwa', jumlah: 5, nuansa: 'iman gaib · salat · infak · iman wahyu · yakin akhirat' },
      ], catatan: '«Yuqīmūna» = MENEGAKKAN salat (sempurna khusyuk), bukan sekadar mengerjakan.' },
    ],
    surah: 'Al-Baqarah',
    surahNo: 2,
    ayatNo: '3–4',
    juz: 1,
    tema: ['Iman', 'Salat', 'Sedekah'],
    gratis: false,
    arab: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ ۝ وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ',
    latin: 'Allażīna yu’minūna bil-gaibi wa yuqīmūnaṣ-ṣalāta wa mimmā razaqnāhum yunfiqūn. Wallażīna yu’minūna bimā unzila ilaika wa mā unzila min qablika wa bil-ākhirati hum yūqinūn.',
    arti: '(Yaitu) mereka yang beriman kepada yang gaib, menegakkan salat, dan menginfakkan sebagian rezeki yang Kami berikan. Dan mereka yang beriman kepada (Al-Qur’an) yang diturunkan kepadamu dan (kitab-kitab) yang diturunkan sebelummu, serta yakin akan adanya akhirat.',
    asbabunNuzul:
      'Tidak ada asbabun nuzul khusus. Ayat ini merinci sifat "al-muttaqīn" yang disebut pada ayat sebelumnya — siapa sebenarnya mereka yang memperoleh petunjuk Al-Qur’an.',
    tafsir:
      'Allah menyebut lima ciri orang bertakwa: beriman pada yang gaib, menegakkan salat, berinfak, beriman pada seluruh wahyu (yang diturunkan kepada Nabi ﷺ dan para nabi sebelumnya), serta yakin penuh akan akhirat. Iman batin diwujudkan dalam ibadah (salat) dan kepedulian sosial (infak).',
    hikmah:
      'Takwa bukan klaim di hati saja; ia terbukti dalam ibadah ritual (salat), kepedulian harta (infak), dan keyakinan yang utuh pada wahyu dan akhirat.',
    linguistik:
      'Cermati pilihan kata «yu’minūna bil-gaib» — beriman pada yang GAIB; inilah hakikat iman: membenarkan apa yang tak terindra karena percaya pada sumbernya (wahyu). Lalu «yuqīmūna» (menegakkan), bukan sekadar "mengerjakan" salat — «iqāmah» berarti menunaikannya dengan sempurna syarat, rukun, dan kekhusyukannya. Pada infak dipilih «mimmā razaqnāhum» (SEBAGIAN dari rezeki yang KAMI berikan): kata "sebagian" (huruf «min» yang menunjukkan tab‘īḍ) meringankan — tak diminta semuanya; dan "rezeki dari Kami" mengingatkan bahwa harta itu titipan Allah, sehingga berinfak sejatinya mengembalikan sebagian pemberian-Nya. Pada keyakinan akhirat, kata «hum» didahulukan («hum yūqinūn») untuk menegaskan kekhususan: merekalah yang benar-benar yakin.',
    amalan:
      'Audit lima ciri ini pada dirimu: kualitas imanmu pada yang gaib, kekhusyukan salatmu (bukan sekadar gugur kewajiban), rutinitas sedekahmu (mulai dari nominal kecil tapi konsisten), dan kesungguhan menyiapkan bekal akhirat. Pilih satu yang paling lemah untuk diperbaiki pekan ini.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-baqarah-5',
    kajianKata: [
      {
        kata: 'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ', latin: 'ulā’ika ‘alā hudam mir rabbihim', arti: 'merekalah yang mendapat petunjuk dari Tuhannya',
        poin: [
          '«‘alā» (di ATAS): mereka kokoh menopang di atas hidayah, bukan sekadar tersentuh.',
          'Seperti penunggang yang menguasai kendaraannya.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'عَلَىٰ هُدًى', latin: '‘alā hudan', sifat: ['DI ATAS petunjuk', 'Kokoh & menguasai'] },
          { arab: 'أَصَابَهُ هُدًى', latin: 'sekadar "tersentuh"', alt: true, sifat: ['Tersentuh sesekali', 'Tak mantap'] },
        ], catatan: 'Bukan sekadar tersentuh hidayah — tapi kokoh di atasnya.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ', latin: 'wa ulā’ika humul-mufliḥūn', arti: 'dan merekalah orang-orang yang beruntung',
        poin: [
          '«hum» (kata ganti pemisah) → ḥaṣr: HANYA merekalah yang beruntung.',
          '«falāḥ» dari makna "membelah/menembus": meraih harapan & selamat dari yang ditakuti.',
        ],
        asalKata: { huruf: ['ف', 'ل', 'ح'], makna: 'membelah & menembus tanah',
          gambar: 'Dalam bahasa Arab klasik, «fallāḥ» adalah <b>petani</b>: ia membelah tanah keras dengan bajak, menanam benih, lalu menembuslah tunas kehidupan dari bawah. Dari sinilah «falāḥ» bermakna keberuntungan sejati — bukan rezeki yang jatuh gratis, tapi keselamatan yang diraih setelah <b>menembus</b> kesulitan dan merawat amal hingga berbuah. Itulah yang diserukan tiap azan: «ḥayya ‘alal-falāḥ» — mari menuju keberuntungan.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
    ],
    hikmahPoin: [
      'Sukses sejati bukan harta atau jabatan.',
      'Tapi hidayah & selamat di akhirat.',
      'Ukur dirimu dengan itu — bukan dengan layar orang lain.',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'عَلَىٰ هُدًى', latin: '‘alā hudan', sifat: ['DI ATAS petunjuk', 'Kokoh & menguasai', 'Seperti penunggang mahir'] },
        { arab: 'هُمُ الْمُفْلِحُون', latin: 'humul-mufliḥūn', sifat: ['«hum» → ḥaṣr', 'HANYA mereka', 'yang beruntung'] },
      ], catatan: 'Bukan sekadar tersentuh hidayah — tapi kokoh di atasnya.' },
    ],
    surah: 'Al-Baqarah',
    surahNo: 2,
    ayatNo: '5',
    juz: 1,
    tema: ['Keberuntungan', 'Hidayah', 'Optimisme'],
    gratis: false,
    arab: 'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
    latin: 'Ulā’ika ‘alā hudam mir rabbihim, wa ulā’ika humul-mufliḥūn.',
    arti: 'Merekalah yang mendapat petunjuk dari Tuhannya, dan merekalah orang-orang yang beruntung.',
    asbabunNuzul:
      'Tidak ada asbabun nuzul khusus. Ayat ini adalah kesimpulan & "kabar gembira" bagi orang-orang yang memiliki sifat takwa pada ayat 3–4.',
    tafsir:
      'Orang-orang dengan sifat di atas itulah yang benar-benar berada di atas petunjuk dari Tuhan mereka, dan merekalah yang meraih keberuntungan hakiki — kemenangan di dunia dan keselamatan di akhirat.',
    hikmah:
      'Keberuntungan sejati (falāḥ) bukan diukur dari harta atau jabatan, melainkan dari hidayah dan keselamatan akhirat. Inilah definisi sukses dalam pandangan Al-Qur’an.',
    linguistik:
      'Dipilih ungkapan «‘alā hudan» — dengan kata «‘alā» (di atas) — bukan sekadar "mendapat petunjuk". Gambarannya: mereka seakan BERADA DI ATAS dan ditopang oleh petunjuk, kokoh dan mantap, seperti penunggang yang menguasai kendaraannya — bukan sekadar tersentuh hidayah sesekali. Lalu pengulangan «ulā’ika» (mereka itu) dua kali menegaskan dan memuliakan kedudukan mereka. Penutupnya «humul-mufliḥūn» memakai «hum» (kata ganti pemisah) yang berfungsi «ḥaṣr»: HANYA merekalah orang-orang yang beruntung — keberuntungan sejati dikhususkan bagi mereka, bukan yang lain. «Al-falāḥ» sendiri berasal dari makna "membelah/menembus", yakni meraih yang diharapkan dan selamat dari yang ditakuti.',
    amalan:
      'Definisikan ulang "sukses" dalam hidupmu memakai standar ayat ini. Saat membandingkan diri dengan pencapaian dunia orang lain di media sosial, ingat: «al-mufliḥūn» adalah mereka yang di atas hidayah. Tetapkan satu target "keberuntungan akhirat" (mis. konsistensi ibadah) sepenting target karier.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-baqarah-255',
    kajianKata: [
      { kata: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ', latin: 'Allāhu lā ilāha illā huw', arti: 'Allah, tak ada tuhan selain Dia',
        poin: ['Pembuka: keesaan mutlak — tak ada sesembahan yang benar selain-Nya.'],
        sumber: ['Tafsir Ibnu Katsir'] },
      { kata: 'الْحَيُّ الْقَيُّومُ', latin: 'Al-Ḥayyul-Qayyūm', arti: 'Yang Maha Hidup, terus mengurus',
        poin: [
          'Dua nama poros: «Al-Ḥayy» (Maha Hidup, sempurna & kekal) + «Al-Qayyūm» (berdiri sendiri, menegakkan segala yang lain).',
          'Di sinilah para ulama menyebut tersimpan «ismullāhil a‘ẓam» — nama Allah teragung.',
        ],
        asalKata: { huruf: ['ق', 'و', 'م'], makna: 'berdiri sendiri & menegakkan yang lain',
          gambar: '«Al-Qayyūm» berpola «fay‘ūl» — bentuk <b>mubalaghah</b> (sangat & terus-menerus) dari akar «q-w-m». Maknanya berlapis: Dia <b>berdiri sendiri</b> tanpa butuh apa pun, sekaligus <b>yang menegakkan & mengurus seluruh makhluk</b> tiada henti. Langit, bumi, dan dirimu tegak <b>bukan dengan sendirinya</b> — ditopang-Nya tiap detik; andai Dia berhenti "menegakkan" sekejap, semua runtuh. Maka tepat sesudahnya: «tak mengantuk & tak tidur».' },
        sumber: ['Tafsir As-Sa‘di', 'Tafsir Ibnu Katsir'] },
      { kata: 'لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ', latin: 'lā ta’khużuhū sinatuw wa lā naum', arti: 'tak mengantuk dan tak tidur',
        poin: ['Urutan menaik: kantuk samar pun tak menyentuh-Nya, apalagi tidur.'],
        banding: { tipe: 'banding', item: [
          { arab: 'سِنَة', latin: 'Sinah', sifat: ['Kantuk ringan', 'Pendahulu tidur'] },
          { arab: 'نَوْم', latin: 'Naum', sifat: ['Tidur lelap', 'Puncaknya'] },
        ], catatan: 'Penegasan kesempurnaan «Al-Qayyūm» — tanpa jeda.' },
        sumber: ['Tafsir Ibnu Katsir'] },
      { kata: 'لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ', latin: 'lahū mā fis-samāwāti wa mā fil-arḍ', arti: 'milik-Nya seluruh langit dan bumi',
        poin: ['Kepemilikan mutlak atas segala yang ada.'],
        sumber: ['Tafsir Ibnu Katsir'] },
      { kata: 'مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ', latin: 'man żal-lażī yasyfa‘u ‘indahū illā bi’iżnih', arti: 'siapa yang memberi syafaat tanpa izin-Nya',
        poin: ['Tak ada syafaat kecuali dengan izin-Nya — menutup celah kesyirikan.'],
        sumber: ['Tafsir As-Sa‘di'] },
      { kata: 'يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ', latin: 'ya‘lamu mā baina aidīhim wa mā khalfahum', arti: 'Dia tahu yang di depan & di belakang mereka',
        poin: ['Ilmu-Nya meliputi masa lalu & masa depan makhluk.'],
        sumber: ['Tafsir Ibnu Katsir'] },
      { kata: 'وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ', latin: 'wa lā yuḥīṭūna bisyai’im min ‘ilmihī illā bimā syā’', arti: 'mereka tak meliputi ilmu-Nya kecuali yang Dia kehendaki',
        poin: ['Pengetahuan makhluk hanyalah pemberian-Nya, sebatas yang Dia izinkan.'],
        sumber: ['Tafsir Ibnu Katsir'] },
      { kata: 'وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ', latin: 'wasi‘a kursiyyuhus-samāwāti wal-arḍ', arti: 'Kursi-Nya meliputi langit dan bumi',
        poin: ['Keluasan kekuasaan-Nya melampaui semesta.'],
        sumber: ['Tafsir Ibnu Katsir'] },
      { kata: 'وَلَا يَئُودُهُ حِفْظُهُمَا', latin: 'wa lā ya’ūduhū ḥifẓuhumā', arti: 'Dia tak merasa berat memelihara keduanya',
        poin: ['«ya’ūduhū»: menjaga semesta sama sekali tak membebani-Nya.'],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'وَهُوَ الْعَلِيُّ الْعَظِيمُ', latin: 'wa huwal-‘aliyyul-‘aẓīm', arti: 'Dia Maha Tinggi, Maha Besar',
        poin: ['Penutup: ketinggian & keagungan yang sempurna.'],
        sumber: ['Tafsir Ibnu Katsir'] },
    ],
    hikmahPoin: [
      'Penjaga semestamu tak pernah tidur.',
      'Lalu untuk apa cemas berlebihan?',
      'Kenal keagungan-Nya = hati yang tenang.',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'سِنَة', latin: 'Sinah', sifat: ['Kantuk ringan', 'Awal / pendahulu tidur'] },
        { arab: 'نَوْم', latin: 'Naum', sifat: ['Tidur lelap', 'Puncaknya'] },
      ], catatan: 'Keduanya dinafikan — bahkan kantuk samar pun tak menyentuh «Al-Qayyūm».' },
    ],
    surah: 'Al-Baqarah',
    surahNo: 2,
    ayatNo: '255 (Ayat Kursi)',
    juz: 3,
    tema: ['Tauhid', 'Perlindungan', 'Keagungan Allah'],
    gratis: false,
    arab: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: 'Allāhu lā ilāha illā huw, al-ḥayyul-qayyūm. Lā ta’khużuhū sinatuw wa lā naum…',
    arti: 'Allah, tidak ada tuhan selain Dia, Yang Maha Hidup lagi terus-menerus mengurus (makhluk-Nya). Tidak mengantuk dan tidak tidur… Kursi-Nya meliputi langit dan bumi, dan Dia tidak merasa berat memelihara keduanya. Dialah Yang Maha Tinggi lagi Maha Besar.',
    asbabunNuzul:
      'Ayat Kursi tidak memiliki riwayat asbabun nuzul khusus yang sahih — ia bagian dari Surah Al-Baqarah yang turun di Madinah. Namun keutamaannya sangat masyhur: Nabi ﷺ menyebutnya ayat teragung dalam Al-Qur’an (HR. Muslim), dan membacanya menjadi pelindung, sebagaimana kisah Abu Hurairah dengan setan yang mencuri zakat (HR. Bukhari).',
    tafsir:
      'Ayat ini merangkum keagungan Allah: keesaan-Nya, kehidupan-Nya yang sempurna, pengaturan-Nya yang tak pernah lalai, kepemilikan-Nya atas segala isi langit-bumi, luasnya ilmu dan kekuasaan-Nya, hingga Kursi-Nya yang meliputi semesta — semua tanpa membuat-Nya lelah.',
    hikmah:
      'Mengenal keagungan Allah membuat hati tenang dan tidak takut pada makhluk. Jika Dzat yang mengurus seluruh alam tidak pernah mengantuk menjaga kita, untuk apa kita gelisah berlebihan?',
    linguistik:
      'Perhatikan urutan «sinah» (سِنَة, kantuk ringan) lalu «naum» (نَوْم, tidur lelap). Sinah adalah awal/pendahulu tidur, naum puncaknya. Allah menafikan keduanya dengan urutan menaik: bahkan kantuk paling samar pun tidak menyentuh-Nya, apalagi tidur — penegasan kesempurnaan «Al-Qayyūm» (Yang terus-menerus mengurus tanpa jeda). Dua nama agung dirangkai: «Al-Ḥayy» (sumber kehidupan) dan «Al-Qayyūm» (penegak segala sesuatu); para ulama menyebut padanya tersimpan «ismullāhil a‘ẓam». Kata «ya’ūduhū» (memberatkan-Nya) dipilih untuk menegaskan: menjaga semesta sama sekali tak membebani-Nya.',
    amalan:
      'Biasakan membaca Ayat Kursi setelah tiap salat fardu dan menjelang tidur — sunnah yang menjadi benteng perlindungan. Saat dilanda rasa takut, cemas, atau merasa sendiri menghadapi masalah, baca dan resapi artinya: Penjaga semestamu tidak pernah tidur.',
    sumber: ['Tafsir Ibnu Katsir', 'Sahih Muslim no. 810', 'Sahih Bukhari (kisah Abu Hurairah)'],
  },
  {
    id: 'al-baqarah-286',
    kajianKata: [
      {
        kata: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا', latin: 'lā yukallifullāhu nafsan illā wus‘ahā', arti: 'Allah tak membebani melainkan sesuai kesanggupannya',
        poin: [
          'Dipilih «wus‘» (kelapangan), bukan «ṭāqah» (batas maksimal).',
          'Wus‘ = kadar yang masih lapang, DI BAWAH batas akhir kekuatanmu.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'وُسْع', latin: 'Wus‘', sifat: ['Kadar yang lapang', 'Di bawah batas maksimal'] },
          { arab: 'طَاقَة', latin: 'Ṭāqah', alt: true, sifat: ['Batas maksimal kemampuan', 'Mepet, memberatkan'] },
        ], catatan: 'Allah membebani jauh lebih ringan dari batas akhir kekuatan kita.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ', latin: 'lahā mā kasabat wa ‘alaihā maktasabat', arti: 'baginya kebaikan yang ia usahakan, atasnya keburukan yang ia perbuat',
        poin: [
          'Kebaikan «kasabat» (sederhana); keburukan «iktasabat» (usaha & kesengajaan lebih).',
          'Kebaikan dicatat meski niat ringan; keburukan "membebani" bila diupayakan.',
        ],
        asalKata: { huruf: ['ك', 'س', 'ب'], makna: 'usaha biasa vs usaha yang ditekuni',
          gambar: 'Dua kata dari satu akar «k-s-b» (mengusahakan). Untuk <b>kebaikan</b> dipakai «kasabat» — bentuk ringan, seakan kebaikan itu <b>mudah & selaras dengan fitrah</b>. Untuk <b>keburukan</b> dipakai «iktasabat» — pola «ifti‘āl» yang <b>menambah huruf</b>; dan dalam balaghah, tambahan huruf menyiratkan <b>tambahan usaha</b>: keburukan perlu <b>diupayakan, dikejar, disengaja</b>. Satu pergeseran bentuk kata kerja diam-diam berkata: <b>berbuat baik itu dimudahkan; berbuat jahat justru "melawan arus."</b>' },
        banding: { tipe: 'banding', item: [
          { arab: 'كَسَبَتْ', latin: 'kasabat', sifat: ['Bentuk sederhana', 'Untuk KEBAIKAN'] },
          { arab: 'اكْتَسَبَتْ', latin: 'iktasabat', alt: true, sifat: ['Bentuk «ifti‘āl»', 'Untuk KEBURUKAN — perlu kesengajaan'] },
        ], catatan: 'Luasnya rahmat tersembunyi dalam satu pilihan kata kerja.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا', latin: 'rabbanā lā tu’ākhiżnā in nasīnā au akhṭa’nā', arti: 'Ya Tuhan kami, jangan hukum kami bila lupa atau salah',
        poin: [
          'Lupa & keliru yang tak disengaja — dimaafkan.',
          'Doa yang Allah jawab: "qad fa‘altu" (sudah Aku kabulkan).',
        ],
        sumber: ['Sahih Muslim no. 125', 'Tafsir Ibnu Katsir'],
      },
    ],
    hikmahPoin: [
      'Allah tak membebani di luar kesanggupanmu.',
      'Cemas berlebihan melawan kelapangan yang Dia tetapkan.',
      'Agama ini tidak memberatkan.',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'كَسَبَتْ', latin: 'kasabat', sifat: ['Bentuk sederhana', 'Untuk KEBAIKAN', 'Dicatat meski niat ringan'] },
        { arab: 'اكْتَسَبَتْ', latin: 'iktasabat', sifat: ['Bentuk «ifti‘āl»', 'Untuk KEBURUKAN', 'Perlu usaha & kesengajaan'] },
      ], catatan: 'Luasnya rahmat tersembunyi dalam satu pilihan kata kerja.' },
    ],
    surah: 'Al-Baqarah',
    surahNo: 2,
    ayatNo: '286',
    juz: 3,
    tema: ['Kelapangan', 'Doa', 'Tanggung jawab'],
    gratis: false,
    arab: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا',
    latin: 'Lā yukallifullāhu nafsan illā wus‘ahā, lahā mā kasabat wa ‘alaihā maktasabat. Rabbanā lā tu’ākhiżnā in nasīnā au akhṭa’nā…',
    arti: 'Allah tidak membebani seseorang melainkan sesuai kesanggupannya. Ia mendapat (pahala) dari kebajikan yang dikerjakannya dan ia mendapat (siksa) dari kejahatan yang diperbuatnya. (Mereka berdoa): Ya Tuhan kami, janganlah Engkau hukum kami jika kami lupa atau salah…',
    asbabunNuzul:
      'Ketika turun ayat sebelumnya — "jika kamu nyatakan apa yang ada dalam hatimu atau kamu sembunyikan, Allah memperhitungkannya" — para sahabat merasa sangat berat, seakan lintasan hati pun dihisab. Mereka mengadu kepada Nabi ﷺ. Maka turunlah ayat ini yang melapangkan: beban hanya sebatas kesanggupan, dan lintasan hati yang tak disengaja dimaafkan (HR. Muslim).',
    tafsir:
      'Allah menetapkan prinsip rahmat: tak ada beban di luar kemampuan. Setiap jiwa memikul hasil amalnya sendiri. Lalu Allah mengajarkan rangkaian doa indah memohon ampun atas kelupaan, keringanan beban, dan pertolongan menghadapi musuh.',
    hikmah:
      'Agama ini tidak memberatkan. Rasa cemas berlebihan terhadap dosa kecil yang tak disengaja justru bertentangan dengan kelapangan yang Allah tetapkan sendiri.',
    linguistik:
      'Dipilih kata «wus‘ahā» (kesanggupan/kelapangan) — bukan «ṭāqatahā» (batas maksimal kemampuan). Wus‘ adalah kadar yang masih lapang dan nyaman dijangkau, DI BAWAH batas maksimal — menunjukkan Allah membebani jauh lebih ringan dari batas akhir kekuatan kita. Lebih halus lagi: kebaikan disebut «kasabat» (bentuk sederhana), sedangkan keburukan «iktasabat» (bentuk if‘ti‘āl yang menyiratkan usaha & kesengajaan lebih). Isyaratnya: kebaikan dicatat dengan mudah meski niat ringan, sementara keburukan baru "membebani" bila diupayakan dan disengaja — gambaran luasnya rahmat Allah yang tersembunyi dalam satu pilihan kata kerja.',
    amalan:
      'Jika kamu terjebak rasa bersalah berlebihan (overthinking dosa, was-was), kembalikan pada prinsip ayat: Allah hanya menuntut sekadar wus‘ (yang lapang) bagimu. Hafalkan rangkaian doa di ujung ayat ini sebagai penutup ibadah; ia doa para sahabat yang dijawab "qad fa‘altu" (sudah Aku kabulkan) oleh Allah.',
    sumber: ['Tafsir Ibnu Katsir', 'Sahih Muslim no. 125', 'Tafsir As-Sa‘di'],
  },

  /* ============ JUZ 30 — Ayat masyhur ============ */
  {
    id: 'al-insyirah-5-6',
    kajianKata: [
      {
        kata: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', latin: 'fa inna ma‘al-‘usri yusrā', arti: 'maka sesungguhnya bersama kesulitan ada kemudahan',
        poin: [
          'Dipakai «ma‘a» (bersama), bukan «ba‘da» (sesudah) — kemudahan menempel pada kesulitan.',
          '«al-‘usr» (alif-lam, definitif): satu kesulitan tertentu.',
        ],
        asalKata: { huruf: ['ي', 'س', 'ر'], makna: 'lapang & mudah — mengalir tanpa hambatan',
          gambar: 'Akar «‘-s-r» («‘usr») berarti <b>sempit, seret, sukar</b> — bagai jalan yang menyempit. Lawannya «y-s-r» («yusr»): <b>lapang, mudah, mengalir</b> — orang Arab memakainya untuk tanah datar yang gampang dilalui dan untuk harta yang berkecukupan. Susunan ayat sengaja <b>mengapit</b>: kesempitan dikepung kelapangan di kedua sisinya. Maka pesannya bukan "sabar, nanti juga berlalu", melainkan <b>"kelapangan itu sudah menyertai kesempitanmu — sekarang."</b>' },
        banding: { tipe: 'banding', item: [
          { arab: 'مَعَ', latin: 'Ma‘a (bersama)', sifat: ['Menempel pada kesulitan', 'Bukan menunggu jauh'] },
          { arab: 'بَعْدَ', latin: 'Ba‘da (sesudah)', alt: true, sifat: ['Menunggu di kejauhan', 'Tertunda'] },
        ], catatan: 'Kemudahan itu menyertai kesulitan, bukan datang belakangan.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', latin: 'inna ma‘al-‘usri yusrā', arti: '(diulang) sesungguhnya bersama kesulitan ada kemudahan',
        poin: [
          '«al-‘usr» (ma‘rifah / definitif) diulang → kesulitan yang SAMA & tertentu.',
          '«yusrā» (nakirah / indefinitif) diulang → kemudahan yang BERBEDA — jadi lebih dari satu.',
          'Tanwin nakirah «yusrā» juga bermakna ta‘zhīm: kemudahan yang BESAR & tak terbatas jenisnya — bukan yang remeh.',
          'Ibnu ‘Abbas: "Satu kesulitan takkan mengalahkan dua kemudahan."',
        ],
        hitung: { tipe: 'hitung', item: [
          { label: 'Kesulitan — «al-‘usr»', jumlah: 1, nuansa: 'Definitif, diulang → SAMA & tertentu' },
          { label: 'Kemudahan — «yusrā»', jumlah: 2, nuansa: 'Indefinitif, diulang → BERBEDA & luas' },
        ], catatan: 'Satu kesulitan tertentu — dikepung kemudahan yang lebih banyak & agung.' },
        sumber: ['Riwayat Ibnu ‘Abbas (atsar masyhur)', 'Tafsir Ibnu Katsir'],
      },
    ],
    hikmahPoin: [
      'Di titik terberat, benih kemudahan sedang tumbuh.',
      'Tugasmu bukan menunggu badai reda — tapi terus bergerak.',
      'Pertolongan-Nya sedang dalam perjalanan.',
    ],
    visual: [
      { tipe: 'hitung', item: [
        { label: 'Kesulitan — «al-‘usr»', jumlah: 1, nuansa: 'Pakai alif-lam (ma‘rifah). Diulang → benda yang SAMA.' },
        { label: 'Kemudahan — «yusrā»', jumlah: 2, nuansa: 'Tanpa alif-lam (nakirah). Diulang → dua hal BERBEDA.' },
      ], catatan: 'Maka: satu kesulitan, DUA kemudahan. Dipakai «ma‘a» (bersama), bukan «ba‘da» (sesudah).' },
    ],
    surah: 'Asy-Syarh',
    surahNo: 94,
    ayatNo: '5–6',
    juz: 30,
    tema: ['Sabar', 'Harapan', 'Ujian'],
    gratis: true,
    arab: 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
    latin: 'Fa inna ma‘al-‘usri yusrā. Inna ma‘al-‘usri yusrā.',
    arti: 'Maka sesungguhnya bersama kesulitan ada kemudahan. Sesungguhnya bersama kesulitan ada kemudahan.',
    asbabunNuzul:
      'Surah Asy-Syarh turun di Makkah untuk menenangkan hati Nabi ﷺ di tengah beratnya tekanan dakwah, penolakan kaum Quraisy, dan kemiskinan kaum muslimin awal. Ayat ini menjadi penutup penghibur: setelah Allah mengingatkan nikmat melapangkan dada beliau, Dia menjanjikan bahwa kesempitan yang sedang dihadapi pasti diiringi jalan keluar.',
    tafsir:
      'Allah menegaskan satu sunnatullah: tidak ada kesulitan yang berdiri sendiri tanpa disertai kemudahan. Bukan sekadar "kemudahan akan datang nanti", tetapi kemudahan itu menyertai kesulitan itu sendiri. Pengulangan kalimat dua kali adalah penekanan (taukid) bahwa janji ini pasti dan tidak main-main.',
    hikmah:
      'Saat berada di titik terberat, justru di situlah benih kemudahan sedang tumbuh. Tugas hamba bukan menunggu badai reda, melainkan terus bergerak dengan yakin bahwa pertolongan Allah sedang dalam perjalanan.',
    linguistik:
      'Inilah keajaiban yang membuat para ulama takjub. Kata «al-‘usr» (kesulitan) memakai alif-lam (ma‘rifah/definitif) dan diulang dua kali — dalam kaidah Arab, isim ma‘rifah yang diulang menunjuk benda yang SAMA. Sebaliknya «yusrā» (kemudahan) tanpa alif-lam (nakirah/indefinitif) dan diulang — isim nakirah yang diulang menunjuk dua hal BERBEDA. Maka maknanya: satu kesulitan, tetapi DUA kemudahan. Ibnu ‘Abbas pun menyimpulkan: «Satu kesulitan tidak akan pernah mengalahkan dua kemudahan.» Tambahan: dipakai kata «ma‘a» (bersama), bukan «ba‘da» (sesudah) — kemudahan itu menempel pada kesulitan, bukan menunggu di kejauhan.',
    amalan:
      'Ketika menghadapi masalah berat — utang, sakit, pekerjaan, atau kegagalan — tuliskan satu kesulitanmu di kertas, lalu daftar dua kemudahan/jalan keluar yang mungkin Allah siapkan. Ini melatih otak melihat peluang, sekaligus mengamalkan keyakinan ayat. Jadikan kalimat ini zikir penenang saat cemas.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Riwayat Ibnu ‘Abbas (atsar masyhur)'],
  },
  {
    id: 'al-asr-1-3',
    kajianKata: [
      { kata: 'وَالْعَصْرِ', latin: 'Wal-‘aṣr', arti: 'Demi masa',
        poin: ['Allah bersumpah demi waktu — padanya tersingkap untung-rugi manusia.'],
        asalKata: { huruf: ['ع', 'ص', 'ر'], makna: 'memeras hingga keluar sarinya',
          gambar: 'Akar «‘-ṣ-r» berarti <b>memeras</b> — seperti memeras anggur sampai keluar perasannya («‘aṣīr»). Dari sinilah «‘aṣr»: masa, juga waktu sore ketika hari "diperas" menuju ujungnya. Sumpah «demi masa» seakan berkata: hidupmu sedang <b>diperas</b> tetes demi tetes oleh waktu yang tak kembali. Pertanyaannya — adakah "sari" amal yang kau hasilkan dari perasan itu, atau habis sia-sia?' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ', latin: 'innal-insāna lafī khusr', arti: 'sungguh manusia berada dalam kerugian',
        poin: ['«al-insān» (alif-lam jenis): SELURUH manusia tanpa kecuali.', '«lafī khusr»: tenggelam DI DALAM kerugian, bukan sekadar menyentuhnya.'],
        banding: { tipe: 'banding', item: [
          { arab: 'الْإِنْسَان', latin: 'Al-Insān', sifat: ['Manusia yang mencinta, lupa, diberi amanah', 'Sisi ruhani & tanggung jawab'] },
          { arab: 'الْبَشَر', latin: 'Al-Basyar', alt: true, sifat: ['Manusia dari sisi fisik / biologis', 'Tak menyentuh sisi pertanggungjawaban'] },
        ], catatan: 'Dipilih «al-insān» — yang merugi bukan sekadar tubuh, tapi manusia seutuhnya.' },
        asalKata: { huruf: ['خ', 'س', 'ر'], makna: 'rugi dalam perdagangan',
          gambar: 'Akar «kh-s-r» lahir dari dunia <b>dagang</b>: «khasira fit-tijārah» — modalnya susut, ia pulang membawa lebih sedikit dari yang dibawanya. Al-Qur’an memotret manusia sebagai pedagang yang <b>modalnya adalah umur</b>. Tiap hari modal itu terpakai; bila ditukar dengan yang sia-sia, jadilah «khusr» — bangkrut. Maka surah ini langsung menyebut empat hal yang membuat dagang umur itu <b>untung</b>: iman, amal saleh, saling menasihati kebenaran & kesabaran.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ', latin: 'illal-lażīna āmanū wa ‘amiluṣ-ṣāliḥāt', arti: 'kecuali yang beriman dan beramal saleh',
        poin: ['«illā» — satu-satunya pintu keluar dari kerugian.', 'Iman + amal: dua syarat yang bersifat pribadi.'],
        sumber: ['Tafsir As-Sa‘di'] },
      { kata: 'وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ', latin: 'wa tawāṣau bil-ḥaqqi wa tawāṣau biṣ-ṣabr', arti: 'saling menasihati dalam kebenaran & kesabaran',
        poin: ['Dari individual ke komunal: tak cukup baik sendiri.', 'Saling menguatkan dalam kebenaran & kesabaran.'],
        banding: { tipe: 'banding', item: [
          { arab: 'تَوَاصَوْا', latin: 'Tawāṣau', sifat: ['Bentuk timbal-balik', 'SALING menasihati'] },
          { arab: 'وَصَّى', latin: 'Waṣṣā', alt: true, sifat: ['Satu arah', 'Menasihati tapi tak mau dinasihati'] },
        ], catatan: 'Dipakai «tawāṣau» — saling, bukan satu arah. Kebaikan itu dua arah.' },
        sumber: ['Tafsir Ibnu Katsir', 'Ucapan Imam Asy-Syāfi‘i (riwayat masyhur)'] },
    ],
    hikmahPoin: [
      'Waktu: modal yang terus berkurang, tak terbeli kembali.',
      'Selamat butuh lebih dari kebaikan pribadi.',
      'Iman, amal, lalu saling menasihati.',
    ],
    visual: [
      { tipe: 'hitung', item: [
        { label: 'Pengecualian «illā» — 4 syarat selamat', jumlah: 4, nuansa: 'iman · amal saleh · nasihat kebenaran · nasihat sabar' },
      ], catatan: '«lafī khusr»: manusia tenggelam DI DALAM kerugian — kecuali empat ini.' },
    ],
    surah: 'Al-‘Aṣr',
    surahNo: 103,
    ayatNo: '1–3',
    juz: 30,
    tema: ['Waktu', 'Amal', 'Nasihat'],
    gratis: false,
    arab: 'وَالْعَصْرِ ۝ إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
    latin: 'Wal-‘aṣr. Innal-insāna lafī khusr. Illal-lażīna āmanū wa ‘amiluṣ-ṣāliḥāti wa tawāṣau bil-ḥaqqi wa tawāṣau biṣ-ṣabr.',
    arti: 'Demi masa. Sungguh, manusia berada dalam kerugian. Kecuali orang-orang yang beriman dan mengerjakan kebajikan, serta saling menasihati untuk kebenaran dan saling menasihati untuk kesabaran.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus untuk surah Makkiyah ini; ia bersifat universal. Imam Asy-Syāfi‘i berkata tentangnya: "Seandainya manusia merenungkan surah ini saja, niscaya cukup bagi mereka" — karena ia merangkum jalan keselamatan dalam tiga ayat.',
    tafsir:
      'Allah bersumpah demi waktu bahwa semua manusia merugi — modal umurnya habis terpakai — kecuali yang memenuhi empat syarat: beriman, beramal saleh, saling menasihati dalam kebenaran, dan saling menasihati dalam kesabaran.',
    hikmah:
      'Waktu adalah modal yang terus berkurang dan tak bisa dibeli kembali. Keselamatan menuntut bukan hanya kebaikan pribadi (iman + amal), tetapi juga kepedulian sosial (saling menasihati).',
    linguistik:
      'Allah memilih bersumpah «wal-‘aṣr» — demi waktu/masa — karena padanya tersingkap untung-rugi manusia. Kata «al-insān» dengan alif-lam jenis (istighrāq) mencakup SELURUH manusia tanpa kecuali. Lalu «lafī khusr»: huruf «la» penegas + «fī» (di dalam) menggambarkan manusia seolah tenggelam, terbenam DI DALAM kerugian, bukan sekadar menyentuhnya; «khusr» nakirah menyiratkan kerugian yang besar dan tak terkira. Setelah vonis menyeluruh itu, datang «illā» (kecuali) — satu-satunya pintu keluar — diikuti empat sifat yang tersusun rapi dari individual ke komunal. Struktur "vonis umum lalu pengecualian" ini menghentak dan menancap kuat.',
    amalan:
      'Audit waktumu seperti audit keuangan: catat ke mana jam-jammu pergi hari ini. Tetapkan satu amal saleh harian dan satu "saling menasihati" (mengingatkan kebaikan ke orang lain dengan lembut). Jadikan surah ini bacaan saat menutup hari untuk evaluasi diri.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Ucapan Imam Asy-Syāfi‘i (riwayat masyhur)'],
  },
  {
    id: 'al-kautsar-1-3',
    kajianKata: [
      { kata: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', latin: 'innā a‘ṭainākal-kauṡar', arti: 'sungguh Kami telah memberimu (nikmat) yang banyak',
        poin: ['«a‘ṭainā» bentuk lampau + kata ganti keagungan — pemberian yang sudah pasti.', '«al-Kauṡar» pola «fau‘al» → kebaikan melimpah-ruah tak terhingga.'],
        akar: { tipe: 'akar', huruf: ['ك', 'ث', 'ر'], teks: 'Dari «kaṡrah» — banyak. «al-Kauṡar»: melimpah tak terhingga.' },
        asalKata: { huruf: ['ك', 'ث', 'ر'], makna: 'banyak yang berlimpah',
          gambar: 'Dari akar «kaṡrah» (banyak), dibentuk pada pola «fau‘al» — pola yang dipakai orang Arab untuk sesuatu yang <b>melampaui kelaziman</b>. Bayangkan mata air yang memancar tak pernah surut: makin diambil, makin meluap. Begitulah «al-Kauṡar» — bukan sekadar "banyak", tapi kebaikan yang <b>melimpah-ruah tanpa habis</b>, diberikan kepada Nabi ﷺ sebagai bantahan atas ejekan musuh yang menyebutnya «abtar» (terputus).' },
        banding: { tipe: 'banding', item: [
          { arab: 'أَعْطَيْنَا', latin: 'A‘ṭainā (lampau)', sifat: ['Bentuk lampau — sudah pasti', 'Pemberian yang terjamin'] },
          { arab: 'سَنُعْطِي', latin: 'Sanu‘ṭī (akan datang)', alt: true, sifat: ['Bentuk akan datang', 'Masih berupa janji yang ditunggu'] },
        ], catatan: 'Dipakai bentuk «lampau» — pemberian yang sudah terjamin, bukan janji yang masih menunggu.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
      { kata: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', latin: 'faṣalli lirabbika wanḥar', arti: 'maka salatlah karena Tuhanmu dan berkurbanlah',
        poin: ['Syukur atas nikmat diwujudkan: salat & kurban.', 'Respon atas pemberian = ibadah, bukan kesombongan.'],
        sumber: ['Tafsir Ibnu Katsir'] },
      { kata: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', latin: 'inna syāni’aka huwal-abtar', arti: 'sungguh pembencimu, dialah yang terputus',
        poin: ['Musuh menuduh Nabi «abtar» (terputus); Allah balikkan kata itu tepat ke pelakunya.'],
        banding: { tipe: 'banding', item: [
          { arab: 'الْكَوْثَر', latin: 'al-Kauṡar', sifat: ['Untukmu — melimpah', 'Sudah diberi (pasti)'] },
          { arab: 'الْأَبْتَر', latin: 'al-Abtar', alt: true, sifat: ['"Terputus"', 'Tuduhan musuh — berbalik padanya'] },
        ], catatan: 'Surah terpendek — menumbangkan ejekan terbesar.' },
        sumber: ['Asbabun Nuzul Al-Wahidi', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Hinaan manusia tak menentukan nilaimu di sisi-Nya.',
      'Balas cemooh dengan ketaatan — bukan dendam.',
      'Mengadu pada salat, bukan pada media sosial.',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'الْكَوْثَر', latin: 'al-Kauṡar', sifat: ['Pola «fau‘al» → melimpah', 'Kebaikan tak terhingga', 'Sudah diberi (pasti)'] },
        { arab: 'الْأَبْتَر', latin: 'al-Abtar', sifat: ['"Terputus"', 'Tuduhan si pencemooh', 'Berbalik ke pelakunya'] },
      ], catatan: 'Surah terpendek — menumbangkan ejekan terbesar.' },
    ],
    surah: 'Al-Kauṡar',
    surahNo: 108,
    ayatNo: '1–3',
    juz: 30,
    tema: ['Syukur', 'Penghiburan', 'Optimisme'],
    gratis: false,
    arab: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
    latin: 'Innā a‘ṭainākal-kauṡar. Faṣalli lirabbika wanḥar. Inna syāni’aka huwal-abtar.',
    arti: 'Sesungguhnya Kami telah memberimu (nikmat) yang banyak. Maka laksanakan salat karena Tuhanmu dan berkurbanlah. Sesungguhnya orang yang membencimu, dialah yang terputus (dari kebaikan).',
    asbabunNuzul:
      'Ketika putra Nabi ﷺ wafat, kaum musyrikin — di antaranya disebut Al-‘Āṣ bin Wā’il — mengejek beliau sebagai "abtar" (terputus keturunan, tanpa penerus). Maka Allah menurunkan surah ini: bukan beliau yang terputus, justru beliau diberi «al-kauṡar» (kebaikan melimpah), dan si pencemoohlah yang sejatinya terputus dari segala kebaikan.',
    tafsir:
      'Allah menghibur Nabi ﷺ dengan kabar pemberian yang melimpah — termasuk telaga Al-Kauṡar di surga — lalu memerintahkan syukur lewat salat dan kurban, serta menutup ejekan musuh dengan bantahan telak.',
    hikmah:
      'Penghinaan manusia tidak menentukan nilaimu di sisi Allah. Balasan terbaik atas cemoohan bukan dendam, melainkan menambah ketaatan dan syukur.',
    linguistik:
      'Kata «al-Kauṡar» mengikuti wazan (pola) «fau‘al» yang menunjukkan intensitas berlebih — berasal dari «kaṡrah» (banyak), sehingga maknanya bukan sekadar "banyak", tapi "kebaikan yang melimpah-ruah tak terhingga". Balaghah-nya memukau: musuh menuduh Nabi «abtar» (terputus), lalu Allah menutup surah dengan kata yang sama «al-abtar» — membalikkan tuduhan tepat ke pelakunya. Ditambah «innā a‘ṭainā» (Kami telah memberi) dengan bentuk lampau yang pasti dan kata ganti keagungan — pemberian yang sudah terjamin, bukan janji yang masih ditunggu. Surah terpendek dalam Al-Qur’an, namun menumbangkan ejekan terbesar.',
    amalan:
      'Saat direndahkan, dibully, atau merasa "tak punya apa-apa", hitung ulang nikmat yang melimpah padamu (kesehatan, iman, keluarga), lalu respons dengan menambah ibadah — bukan membalas hinaan. Jadikan salat sebagai tempat mengadu, bukan media sosial.',
    sumber: ['Tafsir Ibnu Katsir', 'Asbabun Nuzul Al-Wahidi', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-ikhlas-1-4',
    kajianKata: [
      { kata: 'قُلْ هُوَ اللَّهُ أَحَدٌ', latin: 'Qul huwallāhu aḥad', arti: 'Katakanlah: Dialah Allah, Yang Maha Esa',
        poin: [
          '«Wāḥid» = "satu dalam hitungan": ada sebelum & sesudahnya, bisa dijamak & dibandingkan — ia masuk kategori bilangan.',
          '«Aḥad» = satu yang tak masuk barisan apa pun: tak bisa dijamak, tak bisa dibandingkan, tak ada yang kedua.',
          'Andai Allah berkata «Wāḥid», kita masih bisa bertanya: "satu dibanding apa?" — «Aḥad» menutup pertanyaan itu selamanya.',
          'Maka keesaan Allah bukan soal JUMLAH (satu, bukan dua), tapi SIFAT: Dia melampaui kategori bilangan itu sendiri.',
        ],
        asalKata: { huruf: ['ء', 'ح', 'د'], makna: 'keesaan yang menolak bilangan',
          gambar: '«Aḥad» kata yang istimewa: dalam bahasa Arab ia hampir selalu muncul dalam <b>penolakan</b> — «mā fid-dāri aḥad» (tak ada SEORANG pun di rumah). Ia menolak dijamakkan, ditambah, bahkan diduakan. Maka ketika Allah menyebut diri-Nya «Aḥad» dalam kalimat <b>positif</b>, dipilih satu-satunya kata yang strukturnya sendiri menolak adanya "yang kedua" — bukan sekadar "satu", tapi <b>Yang mustahil ada bandingannya</b>.' },
        banding: { tipe: 'banding', item: [
          { arab: 'أَحَد', latin: 'Aḥad', sifat: ['Satu yang tak terbanding', 'Di luar hitungan — tak bisa dijamak', 'Tak ada sebelum / sesudah'] },
          { arab: 'وَاحِد', latin: 'Wāḥid', alt: true, sifat: ['Satu di antara banyak', 'Masuk kategori bilangan', 'Bisa dibandingkan'] },
        ], catatan: 'Dipilih «Aḥad» — keesaan yang melampaui bilangan, bukan sekadar "bukan dua".' },
        sumber: ['Tafsir Ibnu Katsir', 'Jami‘ at-Tirmidzi no. 3364'] },
      { kata: 'اللَّهُ الصَّمَدُ', latin: 'Allāhuṣ-ṣamad', arti: 'Allah tempat bergantung segala sesuatu',
        poin: [
          'Dua makna menyatu: (1) tempat SEMUA makhluk bergantung memenuhi hajat, (2) Dia sendiri tak butuh apa pun & tak berkekurangan.',
          'Pakai alif-lam «Aṣ-Ṣamad» — kebergantungan total itu HANYA tertuju kepada-Nya.',
        ],
        asalKata: { huruf: ['ص', 'م', 'د'], makna: 'yang dituju semua hajat; padat tanpa rongga',
          gambar: 'Akar «ṣ-m-d» memadukan dua warna makna yang indah. Pertama, «ṣamada ilaihi» = <b>menuju & bersandar kepadanya untuk segala keperluan</b> — bagai seluruh rakyat menghadap satu-satunya raja. Kedua, benda disebut «ṣamad» bila <b>padat, tanpa rongga</b> — tak berlubang, tak berisi, tak perlu asupan. Gabungannya memukau: Allah adalah Dzat yang <b>dituju setiap makhluk</b>, sementara Dia sendiri <b>utuh sempurna — tak makan, tak butuh, tak pernah berkurang</b>.' },
        banding: { tipe: 'banding', item: [
          { arab: 'يُصْمَدُ إِلَيْهِ', latin: 'dituju', sifat: ['Tempat SEMUA bergantung', 'Setiap hajat menghadap-Nya'] },
          { arab: 'صَمَدٌ', latin: 'utuh / tanpa rongga', sifat: ['Tak butuh apa pun', 'Tak makan, tak berkurang'] },
        ], catatan: 'Satu kata merangkum dua sisi: Yang dibutuhkan semua, tapi tak membutuhkan apa pun.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', latin: 'lam yalid wa lam yūlad', arti: 'tidak beranak dan tidak diperanakkan',
        poin: ['Menafikan keturunan dari dua arah sekaligus — tidak menurunkan & tidak diturunkan.', 'Menutup setiap celah penyimpangan akidah.'],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
      { kata: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', latin: 'wa lam yakul lahū kufuwan aḥad', arti: 'dan tidak ada sesuatu pun yang setara dengan Dia',
        poin: ['Tak ada tandingan bagi-Nya dalam bentuk apa pun.', 'Ditutup dengan «Aḥad» — menegaskan keunikan mutlak.'],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Akidah bersih = fondasi semua amal.',
      'Hanya Allah tempat bergantung.',
      'Lepaskan harap berlebih pada makhluk yang lemah.',
    ],
    visual: [
      { tipe: 'banding', item: [
        { arab: 'أَحَد', latin: 'Aḥad', sifat: ['Keesaan MUTLAK', 'Tak dapat dibagi/ditambah', 'Khusus bagi Allah'] },
        { arab: 'وَاحِد', latin: 'Wāḥid', sifat: ['"Satu" biasa', 'Bisa diikuti dua, tiga…', 'Dipakai untuk makhluk'] },
      ], catatan: 'Dipilih «Aḥad», bukan «Wāḥid» — menutup celah penyekutuan.' },
    ],
    surah: 'Al-Ikhlāṣ',
    surahNo: 112,
    ayatNo: '1–4',
    juz: 30,
    tema: ['Tauhid', 'Mengenal Allah'],
    gratis: false,
    arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    latin: 'Qul huwallāhu aḥad. Allāhuṣ-ṣamad. Lam yalid wa lam yūlad. Wa lam yakul lahū kufuwan aḥad.',
    arti: 'Katakanlah: Dialah Allah, Yang Maha Esa. Allah tempat bergantung segala sesuatu. Dia tidak beranak dan tidak diperanakkan. Dan tidak ada sesuatu pun yang setara dengan Dia.',
    asbabunNuzul:
      'Diriwayatkan kaum musyrikin (dan dalam riwayat lain orang Yahudi) berkata kepada Nabi ﷺ: "Gambarkan kepada kami Tuhanmu, dari apa Dia tercipta?" Maka turunlah surah ini sebagai jawaban menyeluruh tentang hakikat Allah (HR. Tirmidzi dan Ahmad). Surah ini setara sepertiga Al-Qur’an karena memuat inti akidah.',
    tafsir:
      'Surah ini menjawab pertanyaan paling mendasar manusia: siapa Allah? Jawabannya disusun bertahap & menutup tiap celah keliru. «Aḥad» menolak sekutu sekaligus pembagian. «Aṣ-Ṣamad» menegaskan seluruh makhluk bergantung kepada-Nya, sedang Dia tak bergantung pada apa pun. «Lam yalid wa lam yūlad» memutus gagasan Allah beranak atau diperanakkan — membantah keyakinan kaum musyrik & sebagian ahli kitab. Penutupnya «lam yakun lahū kufuwan aḥad» menafikan adanya yang setara dalam bentuk apa pun. Empat ayat ini adalah inti tauhid — sebab itu dinilai setara sepertiga Al-Qur’an.',
    hikmah:
      'Akidah yang bersih adalah fondasi seluruh amal. Memahami bahwa hanya Allah tempat bergantung membebaskan hati dari menggantungkan harap pada makhluk yang lemah.',
    linguistik:
      'Dipilih kata «Aḥad» bukan «Wāḥid». «Wāḥid» (satu) bisa diikuti dua, tiga, dan seterusnya; sedangkan «Aḥad» menunjuk keesaan mutlak yang tak dapat dibagi, ditambah, atau disusun — keunikan yang khusus bagi Allah. Lalu «Aṣ-Ṣamad»: tuan yang menjadi tumpuan seluruh kebutuhan makhluk, sementara Dia tidak butuh apa pun — sebuah kata padat yang sulit diterjemahkan satu kata. Frasa «lam yalid wa lam yūlad» menafikan keturunan dari dua arah sekaligus (tidak menurunkan & tidak diturunkan), menutup celah penyimpangan akidah. Surah dibuka «Aḥad» dan ditutup «Aḥad» — bingkai sempurna.',
    amalan:
      'Jadikan Al-Ikhlas wirid harian — Nabi ﷺ membacanya bersama Al-Falaq & An-Nas tiap pagi-petang dan menjelang tidur; membacanya 3x menyamai pahala sepertiga Al-Qur’an (HR. Bukhari). Secara batin: tiap kali hatimu mulai menggantung berlebihan pada atasan, pasangan, atau harta, ucapkan «Allāhuṣ-Ṣamad» dan kembalikan kebergantungan kepada satu-satunya yang tak pernah mengecewakan. Cinta boleh pada makhluk; tapi bergantung, hanya kepada-Nya.',
    sumber: ['Tafsir Ibnu Katsir', 'Jami‘ at-Tirmidzi no. 3364', 'Sahih Bukhari (keutamaan Al-Ikhlas)'],
  },
  {
    id: 'al-falaq-1-5',
    kajianKata: [
      { kata: 'بِرَبِّ الْفَلَقِ', latin: 'bi rabbil-falaq', arti: 'kepada Tuhan yang menyingsingkan subuh',
        poin: [
          'Berlindung kepada «Rabb» — yang memelihara & menguasai, bukan sekadar mencipta.',
          'Dipilih «al-falaq», bukan «aṣ-ṣubḥ»: yang dimohon adalah Tuhan yang MEMBELAH gelap untuk memunculkan terang.',
        ],
        asalKata: { huruf: ['ف', 'ل', 'ق'], makna: 'membelah hingga terbuka',
          gambar: 'Akar «f-l-q» berarti <b>membelah</b> sampai sesuatu terbuka dan keluar isinya — biji membelah lalu tunas muncul, fajar membelah pekat malam lalu cahaya merekah (bandingkan «fāliqul-iṣbāḥ», QS 6:96). Maka «al-falaq» bukan sekadar "subuh", tapi <b>segala yang Allah belah lalu Dia keluarkan terang & kehidupan darinya</b>. Memohon perlindungan kepada «Rabbil-falaq» berarti bersandar pada Dzat yang sanggup <b>membelah</b> kegelapan ketakutanmu dan memunculkan jalan keluar.' },
        banding: { tipe: 'banding', item: [
          { arab: 'الْفَلَق', latin: 'al-Falaq', sifat: ['Akar: membelah & mengeluarkan', 'Segala yang Allah singkapkan dari gelap'] },
          { arab: 'الصُّبْح', latin: 'aṣ-Ṣubḥ', alt: true, sifat: ['Hanya "waktu subuh"', 'Tak menonjolkan kuasa membelah gelap'] },
        ], catatan: 'Dipilih «al-falaq» — menegaskan Tuhan yang membelah gelap & memunculkan terang.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'غَاسِقٍ إِذَا وَقَبَ', latin: 'gāsiqin iżā waqab', arti: 'kejahatan malam apabila telah gelap gulita',
        poin: [
          '«gāsiq»: kegelapan malam yang pekat — saat kejahatan & rasa takut paling leluasa.',
          '«iżā waqab»: "apabila ia masuk menyusup" — bahaya yang datang diam-diam tanpa terasa.',
        ],
        asalKata: { huruf: ['و', 'ق', 'ب'], makna: 'masuk menyusup ke dalam',
          gambar: 'Akar «w-q-b» melukiskan sesuatu yang <b>masuk perlahan ke dalam celah/lubang</b> — seperti gelap yang merembes memenuhi lembah saat matahari tenggelam. Pilihan kata ini menangkap watak banyak keburukan: <b>tak menyerbu terang-terangan, tapi menyusup pelan</b> saat kita lengah. Maka kita diajari memohon perlindungan justru sebelum ia "waqab".' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
      { kata: 'النَّفَّاثَاتِ فِي الْعُقَدِ', latin: 'an-naffāṡāti fil-‘uqad', arti: 'tukang sihir yang meniup pada buhul-buhul',
        poin: [
          '«an-naffāṡāt»: yang BERULANG-ULANG meniup pada simpul tali (praktik sihir).',
          'Pola «fa‘‘āl» menyiratkan keseringan & kesungguhan — bukan sekali tiup.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'النَّفَّاثَات', latin: 'an-Naffāṡāt', sifat: ['Pola «fa‘‘āl» → berulang & intens', 'Menekuni perbuatannya'] },
          { arab: 'النَّافِثَات', latin: 'an-Nāfiṡāt', alt: true, sifat: ['Sekadar "yang meniup"', 'Tak menyiratkan keseringan'] },
        ], catatan: 'Dipakai «naffāṡāt» — sihir digambarkan sebagai perbuatan yang ditekuni berulang.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
      { kata: 'حَاسِدٍ إِذَا حَسَدَ', latin: 'ḥāsidin iżā ḥasad', arti: 'pendengki apabila ia mendengki',
        poin: [
          'Bukan "dari pendengki" saja, tapi «iżā ḥasad» — "APABILA ia melampiaskan dengkinya".',
          'Dengki yang terpendam belum membahayakan; ia berbahaya saat digerakkan jadi tindakan.',
        ],
        asalKata: { huruf: ['ح', 'س', 'د'], makna: 'mengharap lenyapnya nikmat orang',
          gambar: 'Sebagian ahli bahasa mengaitkan «ḥasad» dengan «al-ḥasdal» — <b>kutu yang menggerogoti</b> kulit hingga rontok. Begitulah dengki: ia <b>menggerogoti pelakunya dari dalam</b> sebelum mengenai yang didengki, dan baru menjelma bahaya nyata «iżā ḥasad» — ketika ia bertindak. Surah ditutup dengan keburukan hati ini karena ia akar banyak kejahatan lahir.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Tiap takut, kembalikan pada Yang membelah gelap jadi terang.',
      'Banyak bahaya menyusup pelan saat lengah — berlindunglah sejak dini.',
      'Jaga nikmatmu dari mata yang dengki, dan jangan jadi orang yang memendam dengki.',
    ],
    surah: 'Al-Falaq',
    surahNo: 113,
    ayatNo: '1–5',
    juz: 30,
    tema: ['Perlindungan', 'Tauhid', 'Penjagaan diri'],
    gratis: false,
    arab: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    latin: 'Qul a‘ūżu bi rabbil-falaq. Min syarri mā khalaq. Wa min syarri gāsiqin iżā waqab. Wa min syarri an-naffāṡāti fil-‘uqad. Wa min syarri ḥāsidin iżā ḥasad.',
    arti: 'Katakanlah: Aku berlindung kepada Tuhan yang menyingsingkan subuh, dari kejahatan makhluk-Nya, dari kejahatan malam apabila telah gelap gulita, dari kejahatan (perempuan) penyihir yang meniup pada buhul-buhul, dan dari kejahatan orang yang dengki apabila ia dengki.',
    asbabunNuzul:
      'Al-Falaq dan An-Nas (al-Mu‘awwiżatān) dikenal sebagai surah perlindungan. Diriwayatkan dalam Sahih bahwa Nabi ﷺ pernah terkena sihir dari Labid bin al-A‘ṣam, lalu kedua surah ini menjadi sarana ruqyah & penjagaan (HR. Bukhari–Muslim). Nabi ﷺ juga rutin membacanya menjelang tidur dan seusai salat.',
    tafsir:
      'Surah ini mengajarkan berlindung kepada Allah, «Rabbil-falaq», dari empat sumber keburukan: kejahatan seluruh makhluk secara umum, kegelapan malam saat bahaya menyusup, sihir para peniup buhul, dan kedengkian saat dilampiaskan. Dimulai dari yang umum lalu menyebut yang khusus & tersembunyi — mengajarkan kewaspadaan menyeluruh dengan bersandar penuh kepada Allah.',
    hikmah:
      'Sumber rasa takut manusia banyak dan sebagiannya tak terlihat — gelap, sihir, dengki. Surah ini menautkan semua ketakutan itu pada satu sandaran: Allah yang sanggup membelah kegelapan dan memunculkan jalan keluar.',
    linguistik:
      'Dipilih «al-falaq» (yang dibelah) alih-alih «aṣ-ṣubḥ» (subuh) untuk menonjolkan kuasa Allah membelah gelap demi memunculkan terang & kehidupan. Lalu «gāsiqin iżā waqab» memotret bahaya yang menyusup diam-diam; «an-naffāṡāt» berpola «fa‘‘āl» yang menyiratkan perbuatan berulang & ditekuni; dan penutup «ḥāsidin iżā ḥasad» menegaskan bahwa dengki membahayakan justru saat dilampiaskan — sebuah urutan dari yang umum (mā khalaq) menuju yang paling tersembunyi (hati yang dengki).',
    amalan:
      'Baca Al-Falaq & An-Nas tiap pagi-petang dan menjelang tidur (digabung Al-Ikhlas, ditiupkan ke telapak lalu diusapkan ke tubuh, sesuai sunnah). Saat cemas tanpa sebab atau merasa diganggu, kembalikan hati pada «Rabbil-falaq». Dan jaga hatimu sendiri dari dengki — ia menggerogoti pemiliknya lebih dulu.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Sahih Bukhari–Muslim (riwayat ruqyah)'],
  },
  {
    id: 'an-nas-1-6',
    kajianKata: [
      { kata: 'بِرَبِّ النَّاسِ · مَلِكِ النَّاسِ · إِلَٰهِ النَّاسِ', latin: 'bi rabbin-nās · malikin-nās · ilāhin-nās', arti: 'Tuhan manusia · Raja manusia · Sembahan manusia',
        poin: [
          'Tiga nama Allah bertingkat: «Rabb» (pemelihara) → «Malik» (raja) → «Ilāh» (sembahan).',
          'Naik dari yang umum ke yang paling khusus: dipelihara, lalu dikuasai, lalu hanya Dia yang disembah.',
          '«an-nās» diulang pada ketiganya — menanamkan kedekatan: Dia mengenalmu dalam setiap peran itu.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'رَبّ', latin: 'Rabb', sifat: ['Pemelihara & pengasuh', 'Mengurus dari luar diri'] },
          { arab: 'مَلِك', latin: 'Malik', sifat: ['Raja & penguasa', 'Memerintah & menata'] },
          { arab: 'إِلٰه', latin: 'Ilāh', sifat: ['Sembahan satu-satunya', 'Pemilik hati dari dalam'] },
        ], catatan: 'Tiga tingkat sandaran: dipelihara → dikuasai → disembah. Hanya Dia yang sanggup mengusir bisikan dari dalam dada.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'الْوَسْوَاسِ الْخَنَّاسِ', latin: 'al-waswāsil-khannās', arti: 'bisikan (setan) yang bersembunyi',
        poin: [
          '«al-waswās»: bisikan halus berulang-ulang yang nyaris tak terdengar.',
          '«al-khannās»: yang MUNDUR & bersembunyi saat nama Allah disebut, lalu kembali saat lengah.',
        ],
        asalKata: { huruf: ['خ', 'ن', 'س'], makna: 'mundur & bersembunyi',
          gambar: 'Akar «kh-n-s» berarti <b>menyusut, mundur, lalu bersembunyi</b> — dipakai untuk bintang yang lenyap di siang hari («al-khunnas», QS 81:15) dan hewan yang menarik diri ke sarang. Begitulah setan: ia <b>maju membisik saat hati lalai, dan langsung menciut mundur begitu Allah disebut</b>. Maka senjata melawannya bukan adu kuat, melainkan zikir — sebut nama-Nya, dan si pembisik pun "khanasa", surut.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
      { kata: 'مِنَ الْجِنَّةِ وَالنَّاسِ', latin: 'minal-jinnati wan-nās', arti: 'dari (golongan) jin dan manusia',
        poin: [
          'Bisikan jahat tak hanya dari jin — juga dari MANUSIA (teman, lingkungan, media).',
          'Penutup yang membuka mata: waspadai pembisik tak kasat mata DAN yang berwujud manusia.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Dia memeliharamu, menguasaimu, dan satu-satunya yang layak disembah — tiga alasan berhenti gelisah.',
      'Lawan bisikan bukan dengan tegang, tapi dengan zikir: sebut nama-Nya, ia surut.',
      'Tak semua racun datang dari yang gaib — pilih teman & layar yang tak membisikkan keburukan.',
    ],
    surah: 'An-Nās',
    surahNo: 114,
    ayatNo: '1–6',
    juz: 30,
    tema: ['Perlindungan', 'Tauhid', 'Melawan waswas'],
    gratis: false,
    arab: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: 'Qul a‘ūżu bi rabbin-nās. Malikin-nās. Ilāhin-nās. Min syarril-waswāsil-khannās. Allażī yuwaswisu fī ṣudūrin-nās. Minal-jinnati wan-nās.',
    arti: 'Katakanlah: Aku berlindung kepada Tuhan manusia, Raja manusia, Sembahan manusia, dari kejahatan (bisikan) setan yang bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia.',
    asbabunNuzul:
      'An-Nas bersama Al-Falaq (al-Mu‘awwiżatān) berfungsi sebagai surah perlindungan, terkait riwayat sihir yang menimpa Nabi ﷺ (HR. Bukhari–Muslim). Nabi ﷺ rutin membacanya menjelang tidur dan seusai salat sebagai penjagaan.',
    tafsir:
      'Surah ini memohon perlindungan kepada Allah dengan tiga nama bertingkat — Rabb, Malik, Ilāh manusia — dari satu musuh utama: bisikan setan yang bersembunyi, yang menyusup ke dalam dada, baik dari golongan jin maupun manusia. Tiga nama Allah dihadapkan pada satu sumber keburukan batin, menandakan betapa kita butuh sandaran penuh untuk menjaga hati.',
    hikmah:
      'Pertarungan terbesar sering terjadi di dalam dada — melawan bisikan. Surah ini mengajarkan bahwa kuncinya bukan kekuatan diri, tapi berlindung pada Allah yang memelihara, menguasai, dan berhak disembah; dan bahwa zikir membuat si pembisik surut.',
    linguistik:
      'Tiga nama «Rabb–Malik–Ilāh» disusun menaik dari pemeliharaan yang umum menuju penyembahan yang paling khusus, dengan «an-nās» diulang untuk menegaskan kedekatan & cakupan. Kata «al-khannās» (pola mubalaghah dari kh-n-s: mundur & bersembunyi) menggambarkan watak setan yang menciut saat Allah disebut. Penutup «minal-jinnati wan-nās» memperluas ancaman: pembisik bisa berwujud gaib maupun manusia.',
    amalan:
      'Jadikan al-Mu‘awwiżatān (Al-Falaq & An-Nas) bersama Al-Ikhlas sebagai wirid pagi-petang dan menjelang tidur. Saat dilanda waswas — dalam ibadah, keputusan, atau prasangka — segera berta‘awuż dan sebut nama Allah; amati bagaimana bisikan itu surut. Pilih pula teman & asupan media yang tak menjadi "pembisik" dari golongan manusia.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Sahih Bukhari–Muslim (riwayat ruqyah)'],
  },
  {
    id: 'al-kafirun-1-6',
    kajianKata: [
      { kata: 'لَا أَعْبُدُ مَا تَعْبُدُونَ', latin: 'lā a‘budu mā ta‘budūn', arti: 'aku tidak menyembah apa yang kamu sembah',
        poin: [
          'Pengulangan ayat di surah ini bukan sia-sia: ia menafikan penyembahan berhala di SEMUA waktu — kini, lampau, & nanti.',
          '«lā a‘budu» (kata kerja → kini/nanti) ≠ «mā ‘abadtum» (lampau) ≠ «‘ābid» (kata sifat → identitas tetap).',
          'Maka pemisahan akidah ini total & permanen — bukan penolakan sesaat.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'أَعْبُدُ', latin: 'a‘budu (kata kerja)', sifat: ['Terikat waktu', 'Menafikan tiap masa: kini & nanti'] },
          { arab: 'عَابِد', latin: '‘ābid (kata sifat)', sifat: ['Identitas yang melekat', 'Menafikan sebagai jati diri'] },
        ], catatan: 'Ditolak di setiap waktu (kata kerja) sekaligus sebagai jati diri (kata sifat) — total.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ', latin: 'lakum dīnukum wa liya dīn', arti: 'untukmu agamamu, dan untukku agamaku',
        poin: [
          'Ketegasan akidah, bukan kebencian: tiap pihak bertanggung jawab penuh atas pilihannya.',
          'Toleransi sejati = hidup berdampingan TANPA mencampur-adukkan keyakinan.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Tegas dalam akidah, santun dalam pergaulan — keduanya bisa menyatu.',
      'Tak perlu mencampur keyakinan demi diterima.',
      'Katakan "tidak" yang jelas pada yang batil, tanpa membenci orangnya.',
    ],
    surah: 'Al-Kāfirūn',
    surahNo: 109,
    ayatNo: '1–6',
    juz: 30,
    tema: ['Tauhid', 'Akidah', 'Toleransi'],
    gratis: false,
    arab: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ ۝ لَا أَعْبُدُ مَا تَعْبُدُونَ ۝ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ۝ وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ ۝ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ۝ لَكُمْ دِينُكُمْ وَلِيَ دِينِ',
    latin: 'Qul yā ayyuhal-kāfirūn. Lā a‘budu mā ta‘budūn. Wa lā antum ‘ābidūna mā a‘bud. Wa lā anā ‘ābidum mā ‘abadtum. Wa lā antum ‘ābidūna mā a‘bud. Lakum dīnukum wa liya dīn.',
    arti: 'Katakanlah: Wahai orang-orang kafir! Aku tidak menyembah apa yang kamu sembah, dan kamu bukan penyembah Tuhan yang aku sembah. Aku tidak pernah menjadi penyembah apa yang kamu sembah, dan kamu tidak pernah (pula) menjadi penyembah Tuhan yang aku sembah. Untukmu agamamu, dan untukku agamaku.',
    asbabunNuzul:
      'Diriwayatkan bahwa tokoh-tokoh Quraisy menawari Nabi ﷺ kompromi: menyembah Tuhan beliau & sesembahan mereka secara bergantian. Maka turun surah ini sebagai penolakan tegas atas segala bentuk kompromi akidah (Tafsir Ibnu Katsir).',
    tafsir:
      'Surah pemutus (al-barā’ah): penegasan pemisahan total antara tauhid & syirik. Pengulangannya menafikan penyembahan berhala dalam segala waktu dan sebagai identitas — sehingga tertutup setiap celah pencampuran keyakinan. Penutupnya «lakum dīnukum wa liya dīn» menetapkan tanggung jawab masing-masing pihak, bukan paksaan dan bukan pula kompromi.',
    hikmah:
      'Tegas pada prinsip tak berarti kasar pada manusia. Seorang mukmin bisa hidup damai dengan siapa pun sambil menjaga akidahnya tetap murni — tak larut, tak menukar.',
    linguistik:
      'Permainan bentuk kata: «a‘budu» (fi‘l muḍāri‘) menafikan ibadah pada masa kini & mendatang, «‘abadtum» (fi‘l māḍī) pada masa lampau, dan «‘ābid» (ism fā‘il) menafikannya sebagai sifat yang melekat. Tiga bentuk berbeda untuk satu pesan: pemisahan yang menyeluruh di setiap dimensi waktu & jati diri.',
    amalan:
      'Terapkan «lakum dīnukum» dalam keseharian: hormati tetangga & rekan beda keyakinan, bantu urusan sosial mereka, tapi jangan ikut ritual atau kompromi yang mencederai tauhid. Toleransi sosial: ya; sinkretisme akidah: tidak. Saat ditekan agar "ikut sedikit demi rukun", surah ini jawabannya.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'an-nasr-1-3',
    kajianKata: [
      { kata: 'نَصْرُ اللَّهِ وَالْفَتْحُ', latin: 'naṣrullāhi wal-fatḥ', arti: 'pertolongan Allah dan kemenangan',
        poin: [
          '«naṣr» (pertolongan Allah) disebut lebih dulu dari «fatḥ» (kemenangan) — kemenangan hanyalah BUAH dari pertolongan-Nya.',
          'Disandarkan ke Allah: «naṣrullāh» — bukan hasil kehebatan pasukan.',
        ],
        asalKata: { huruf: ['ف', 'ت', 'ح'], makna: 'membuka yang tertutup',
          gambar: 'Akar «f-t-ḥ» berarti <b>membuka</b> — pintu atau gerbang yang tadinya terkunci. Al-Qur’an tak menyebut kemenangan dengan kata "menaklukkan" atau "menghancurkan", melainkan «fatḥ»: <b>terbukanya</b> Mekah, dan lebih dalam lagi — <b>terbukanya hati manusia</b> hingga berbondong masuk Islam. Kemenangan sejati bukan meremukkan lawan, tapi <b>membuka pintu hidayah</b>.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ', latin: 'fa sabbiḥ biḥamdi rabbika wastagfirh', arti: 'maka bertasbihlah memuji Tuhanmu dan mohonlah ampun',
        poin: [
          'Puncak kemenangan justru diperintah «istigfar» (mohon ampun) — bukan pesta. Adab yang membalik logika dunia.',
          '«tawwāb» (pola mubalaghah): Allah BERULANG & sangat menerima taubat, tiap kali hamba kembali.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'تَوَّاب', latin: 'Tawwāb', sifat: ['Pola mubalaghah → berulang', 'Sangat & terus menerima taubat'] },
          { arab: 'تَائِب', latin: 'Tā’ib', alt: true, sifat: ['Sekadar "yang menerima"', 'Tak menyiratkan keseringan'] },
        ], catatan: 'Dipakai «tawwāb» — pintu taubat tak pernah lelah terbuka.' },
        sumber: ['Tafsir Ibnu Katsir', 'Sahih Bukhari (pemahaman Ibnu ‘Abbas)'] },
    ],
    hikmahPoin: [
      'Saat di puncak, ingat Pemberi kemenangan — bukan dirimu.',
      'Tutup setiap pencapaian dengan istighfar, bukan kesombongan.',
      'Pintu taubat tak pernah tutup — Dia "Tawwāb".',
    ],
    surah: 'An-Naṣr',
    surahNo: 110,
    ayatNo: '1–3',
    juz: 30,
    tema: ['Kemenangan', 'Syukur', 'Taubat'],
    gratis: false,
    arab: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا ۝ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا',
    latin: 'Iżā jā’a naṣrullāhi wal-fatḥ. Wa ra’aitan-nāsa yadkhulūna fī dīnillāhi afwājā. Fa sabbiḥ biḥamdi rabbika wastagfirh, innahū kāna tawwābā.',
    arti: 'Apabila telah datang pertolongan Allah dan kemenangan, dan engkau melihat manusia berbondong-bondong masuk agama Allah, maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampun kepada-Nya. Sungguh, Dia Maha Penerima taubat.',
    asbabunNuzul:
      'Surah ini termasuk wahyu lengkap yang terakhir turun. Ibnu ‘Abbas memahaminya sebagai isyarat dekatnya ajal Nabi ﷺ — sebab tugas telah tuntas (kemenangan & manusia masuk Islam berbondong), lalu diperintah memperbanyak tasbih & istighfar (HR. Bukhari).',
    tafsir:
      'Ketika pertolongan Allah & terbukanya Mekah tiba, dan manusia memeluk Islam berbondong-bondong, Nabi ﷺ tidak diperintah berpesta, melainkan bertasbih, memuji, dan beristighfar. Inilah puncak adab: kemenangan dikembalikan kepada Allah, dan amal sebesar apa pun ditutup dengan pengakuan akan kekurangan diri.',
    hikmah:
      'Dunia merayakan kemenangan dengan kebanggaan; wahyu mengajarkan menutupnya dengan kerendahan & istighfar. Sebab yang menolongmu bukan kekuatanmu, dan tak ada amal yang sempurna tanpa cela.',
    linguistik:
      '«Naṣr» didahulukan atas «fatḥ» — kemenangan adalah akibat, pertolongan Allah adalah sebab. Kata «fatḥ» (membuka) dipilih, bukan penaklukan, menyiratkan terbukanya hati. Dan penutup «tawwāb» (pola mubalaghah) menegaskan keluasan ampunan-Nya yang tak pernah jemu.',
    amalan:
      'Biasakan menutup ibadah & pencapaian dengan istighfar (Nabi ﷺ beristighfar 3x seusai salat). Saat meraih sukses — lulus, naik jabatan, proyek selesai — tahan euforia, ucapkan "alhamdulillah" lalu "astaghfirullah": akui itu pemberian-Nya dan tutupi kekuranganmu.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Sahih Bukhari'],
  },
  {
    id: 'al-fil-1-5',
    kajianKata: [
      { kata: 'فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ', latin: 'fa ja‘alahum ka‘aṣfim ma’kūl', arti: 'lalu Dia menjadikan mereka seperti daun yang dimakan (ulat)',
        poin: [
          'Pasukan gajah yang perkasa diakhiri jadi «ka‘aṣfin ma’kūl» — daun kering yang sudah dimakan: remuk, berlubang, tak berarti.',
          'Imaji yang menampar: kesombongan terbesar pun, di tangan Allah, bisa jadi seremeh ampas makanan ternak.',
        ],
        asalKata: { huruf: ['ع', 'ص', 'ف'], makna: 'daun & jerami kering sisa tanaman',
          gambar: '«‘Aṣf» adalah <b>kulit & daun kering</b> yang tersisa setelah biji dipanen — lalu «ma’kūl»: <b>sudah dikunyah</b> ternak hingga berlubang dan hancur. Bayangkan: pasukan bergajah, kekuatan militer paling menakutkan di zamannya, diakhiri menjadi <b>ampas yang terinjak & tercerna</b>. Allah tak perlu tentara tandingan — cukup burung kecil membawa batu. Begitulah akhir kesombongan yang menantang-Nya.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ', latin: 'wa arsala ‘alaihim ṭairan abābīl', arti: 'dan Dia mengirim kepada mereka burung yang berbondong-bondong',
        poin: [
          '«ṭairan abābīl»: burung berbondong-bondong — makhluk kecil dijadikan tentara Allah.',
          'Dia menundukkan yang besar dengan yang kecil — agar jelas: kekuatan hanya milik-Nya.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Yang menyombongkan kekuatan, diruntuhkan dengan yang terkecil.',
      'Saat penindas merasa tak terkalahkan, ingat pasukan gajah.',
      'Pertolongan Allah kerap datang dari arah yang tak terduga.',
    ],
    surah: 'Al-Fīl',
    surahNo: 105,
    ayatNo: '1–5',
    juz: 30,
    tema: ['Kuasa Allah', 'Kesombongan', 'Perlindungan'],
    gratis: false,
    arab: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ ۝ أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ ۝ وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ ۝ تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ ۝ فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ',
    latin: 'Alam tara kaifa fa‘ala rabbuka bi’aṣḥābil-fīl. Alam yaj‘al kaidahum fī taḍlīl. Wa arsala ‘alaihim ṭairan abābīl. Tarmīhim biḥijāratim min sijjīl. Fa ja‘alahum ka‘aṣfim ma’kūl.',
    arti: 'Tidakkah engkau memperhatikan bagaimana Tuhanmu bertindak terhadap pasukan bergajah? Bukankah Dia menjadikan tipu daya mereka sia-sia? Dan Dia mengirim kepada mereka burung yang berbondong-bondong, yang melempari mereka dengan batu dari tanah liat yang dibakar, sehingga Dia menjadikan mereka seperti daun-daun yang dimakan (ulat).',
    asbabunNuzul:
      'Mengabadikan peristiwa pasukan bergajah pimpinan Abrahah yang hendak menghancurkan Ka‘bah, lalu Allah membinasakan mereka dengan burung pembawa batu — terjadi pada tahun kelahiran Nabi ﷺ (Tahun Gajah). (Tafsir Ibnu Katsir).',
    tafsir:
      'Allah mengingatkan keajaiban perlindungan-Nya atas tanah haram: pasukan terkuat di masanya dihancurkan tanpa peperangan, hanya dengan burung kecil pembawa batu dari tanah terbakar, hingga jadi seperti sisa daun yang dikunyah. Sebuah bukti bahwa tak ada kekuatan yang menandingi-Nya.',
    hikmah:
      'Ketika kezaliman tampak perkasa & tak tergoyahkan, kisah ini menenangkan: Allah sanggup meruntuhkannya dengan sebab yang paling remeh. Tugas kita berpihak pada yang benar, bukan gentar pada besarnya kebatilan.',
    linguistik:
      'Puncak penghinaan dilukiskan dengan «ka‘aṣfin ma’kūl» — bukan sekadar "hancur", tapi seperti daun kering sisa panen yang telah dikunyah ternak: hampa, berlubang, terinjak. Kontras tajam dengan kebesaran "aṣḥābul-fīl" di awal surah menegaskan betapa kecil kesombongan di hadapan Allah.',
    amalan:
      'Saat menghadapi pihak zalim yang tampak mustahil dilawan (atasan sewenang-wenang, sistem timpang), tegakkan yang benar semampumu lalu serahkan hasilnya pada Allah — Pemilik "burung ababil". Dan periksa dirimu: jangan jadi pihak yang sombong dengan kekuatan, sebab akhirnya bisa seremeh «‘aṣf».',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Sirah Ibnu Hisyam'],
  },
  {
    id: 'quraisy-1-4',
    kajianKata: [
      { kata: 'أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ', latin: 'aṭ‘amahum min jū‘iw wa āmanahum min khauf', arti: 'memberi mereka makan dari kelaparan & mengamankan dari ketakutan',
        poin: [
          'Dua nikmat fondasi hidup: «aṭ‘amahum min jū‘» (kenyang dari lapar) & «āmanahum min khauf» (aman dari takut).',
          'Rezeki & rasa aman — dua tiang yang membuat hidup tegak; keduanya murni pemberian-Nya.',
          'Sambungan dari Al-Fīl: keamanan Quraisy (termasuk dari pasukan gajah) itu anugerah — maka «fal-ya‘budū» (maka sembahlah Dia).',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'لِإِيلَافِ قُرَيْشٍ', latin: 'li’īlāfi quraisy', arti: 'karena kebiasaan (kemudahan) orang Quraisy',
        poin: [
          '«īlāf»: kebiasaan & jaminan aman perjalanan dagang Quraisy — musim dingin ke Yaman, musim panas ke Syam.',
          'Kemakmuran rutin yang Allah mudahkan, sampai terasa "biasa" — padahal itu nikmat besar.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Dua nikmat yang paling sering dilupa: perut kenyang & hati aman.',
      'Kemakmuran yang rutin pun anugerah — bukan semata hasil cerdikmu.',
      'Balas nikmat dengan menyembah Pemberinya, bukan dengan lupa.',
    ],
    surah: 'Quraisy',
    surahNo: 106,
    ayatNo: '1–4',
    juz: 30,
    tema: ['Syukur', 'Rezeki', 'Keamanan'],
    gratis: false,
    arab: 'لِإِيلَافِ قُرَيْشٍ ۝ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ ۝ فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ ۝ الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ',
    latin: 'Li’īlāfi quraisy. Īlāfihim riḥlatasy-syitā’i waṣ-ṣaif. Fal-ya‘budū rabba hāżal-bait. Allażī aṭ‘amahum min jū‘iw wa āmanahum min khauf.',
    arti: 'Karena kebiasaan orang Quraisy, (yaitu) kebiasaan mereka bepergian pada musim dingin dan musim panas, maka hendaklah mereka menyembah Tuhan (pemilik) rumah ini (Ka‘bah), yang telah memberi makan kepada mereka untuk menghilangkan lapar dan mengamankan mereka dari rasa takut.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Surah ini erat berkait dengan Al-Fīl: setelah Allah menjaga tanah haram & memuliakan Quraisy dengan keamanan dagang, mereka diajak mensyukurinya dengan menyembah Pemilik Ka‘bah. (Tafsir Ibnu Katsir).',
    tafsir:
      'Allah mengingatkan Quraisy akan dua nikmat besar: kemudahan & keamanan perjalanan dagang dua musim yang menjadi sumber kemakmuran, serta jaminan kenyang & aman di negeri mereka. Konsekuensinya satu: hendaklah mereka menyembah Tuhan pemilik Ka‘bah yang menganugerahkan semua itu.',
    hikmah:
      'Nikmat yang paling mudah dilupakan justru yang paling rutin: makanan tiap hari & rasa aman. Surah ini menautkan kemakmuran dengan ibadah — sebab cara terbaik menjaga nikmat adalah mensyukurinya kepada Pemberinya.',
    linguistik:
      'Dua kebutuhan paling mendasar manusia diringkas indah: «aṭ‘amahum min jū‘» (pangan) lalu «āmanahum min khauf» (keamanan) — urutan yang menutup seluruh fondasi hidup tenteram. Huruf «fa» pada «fal-ya‘budū» menjadikan ibadah sebagai konsekuensi logis & wajar dari limpahan nikmat itu.',
    amalan:
      'Mulai harimu dengan menghitung dua nikmat ini: ada makanan, ada rasa aman. Banyak orang kehilangan salah satunya. Lalu sambungkan rasa syukur itu ke ibadah — sujud sebagai "balasan" atas kenyang & aman yang sering kau anggap biasa.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-maun-1-7',
    kajianKata: [
      { kata: 'فَوَيْلٌ لِّلْمُصَلِّينَ ۝ الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ', latin: 'fa wailul lil-muṣallīn, allażīna hum ‘an ṣalātihim sāhūn', arti: 'maka celakalah orang yang salat, yang lalai dari salatnya',
        poin: [
          'Celaan yang mengejutkan: «fa wailul lil-muṣallīn» — celaka bagi yang SALAT (bukan yang meninggalkannya).',
          'Kuncinya «‘an ṣalātihim» (lalai DARI salat), bukan «fī ṣalātihim» (lalai DI DALAM salat).',
          'Yang dicela bukan pikiran yang sesekali melayang saat salat — tapi yang melalaikan hakikat, waktu, & ruhnya.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'عَن صَلَاتِهِم', latin: '‘an (dari/tentang)', sifat: ['Melalaikan hakikat & waktunya', 'Salat kosong — inilah yang dicela'] },
          { arab: 'فِي صَلَاتِهِم', latin: 'fī (di dalam)', alt: true, sifat: ['Pikiran sesekali melayang', 'Manusiawi — tidak dicela'] },
        ], catatan: 'Satu huruf — «‘an» vs «fī» — memisahkan celaan dari kelalaian manusiawi biasa.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'وَيَمْنَعُونَ الْمَاعُونَ', latin: 'wa yamna‘ūnal-mā‘ūn', arti: 'dan enggan (memberi) bantuan kecil',
        poin: [
          '«al-mā‘ūn»: bantuan kecil sehari-hari — barang pinjaman, pertolongan ringan — yang pun mereka enggan beri.',
          'Bukti agama itu sosial: mendustakan agama tampak pada hati yang keras pada yatim & miskin, bahkan pada hal terkecil.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Salat sejati menjelma kasih pada yang lemah; bila tidak, ia kosong.',
      'Yang dicela bukan "tak salat" — tapi salat tanpa ruh & tanpa peduli.',
      'Iman diuji juga pada hal terkecil: maukah kau menolong?',
    ],
    surah: 'Al-Mā‘ūn',
    surahNo: 107,
    ayatNo: '1–7',
    juz: 30,
    tema: ['Keikhlasan', 'Kepedulian sosial', 'Riya'],
    gratis: false,
    arab: 'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ ۝ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ ۝ وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ ۝ فَوَيْلٌ لِّلْمُصَلِّينَ ۝ الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ ۝ الَّذِينَ هُمْ يُرَاءُونَ ۝ وَيَمْنَعُونَ الْمَاعُونَ',
    latin: 'Ara’aital-lażī yukażżibu bid-dīn. Fa żālikal-lażī yadu‘‘ul-yatīm. Wa lā yaḥuḍḍu ‘alā ṭa‘āmil-miskīn. Fa wailul lil-muṣallīn. Allażīna hum ‘an ṣalātihim sāhūn. Allażīna hum yurā’ūn. Wa yamna‘ūnal-mā‘ūn.',
    arti: 'Tahukah kamu (orang) yang mendustakan agama? Itulah orang yang menghardik anak yatim, dan tidak mendorong memberi makan orang miskin. Maka celakalah orang yang salat, (yaitu) yang lalai dari salatnya, yang berbuat riya, dan enggan (memberi) bantuan.',
    asbabunNuzul:
      'Sebagian riwayat menyebut surah ini turun berkenaan dengan tokoh munafik atau penghardik anak yatim di masa itu; para ulama berbeda dalam menentukan sosoknya. Inti pesannya berlaku umum: pendustaan agama tampak pada kekerasan terhadap yang lemah & kelalaian dalam ibadah. (Tafsir Ibnu Katsir).',
    tafsir:
      'Surah ini menyingkap wajah "pendusta agama": bukan sekadar yang tak percaya, tapi yang menghardik yatim, tak peduli pada miskin, salat tanpa ruh & demi pamrih, serta enggan menolong dalam hal terkecil sekalipun. Agama yang benar membuahkan kasih & kepedulian; bila ibadah tak menumbuhkan keduanya, ada yang keliru pada hatinya.',
    hikmah:
      'Ibadah ritual dan kepedulian sosial tak terpisah. Surah ini menampar lembut: periksa apakah salatmu menjadikanmu lebih peka pada yatim, miskin, dan orang di sekitarmu — atau hanya gerakan kosong yang dilihat orang.',
    linguistik:
      'Pilihan «‘an ṣalātihim» (bukan «fī ṣalātihim») sangat tajam: «fī» berarti lalai sesaat di dalam salat — wajar & manusiawi; «‘an» berarti lalai akan salat itu sendiri — meremehkan waktu, makna, & kelangsungannya. Lalu ditutup «al-mā‘ūn» (bantuan terkecil) untuk menunjukkan betapa kerasnya hati yang dimaksud.',
    amalan:
      'Jadikan salatmu "berbekas": seusai salat, lakukan satu kebaikan sosial — pinjamkan barang, bantu tetangga, sisihkan untuk yatim/miskin. Periksa niat: apakah ibadahmu untuk Allah atau untuk dilihat? Dan jangan remehkan pertolongan kecil — di situ iman diuji.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'at-takatsur-1-8',
    kajianKata: [
      { kata: 'أَلْهَاكُمُ التَّكَاثُرُ', latin: 'alhākumut-takāṡur', arti: 'bermegah-megahan telah melalaikan kamu',
        poin: [
          '«at-takāṡur» pola «tafā‘ul» = saling berlomba MEMPERBANYAK — harta, pengikut, status; lomba tanpa garis akhir.',
          '«alhākum»: ia MELALAIKAN — bukan sekadar menyibukkan, tapi memalingkan dari yang hakiki.',
          '«ḥattā zurtumul-maqābir»: sampai kamu "berziarah" ke kubur — disebut "berkunjung", isyarat dunia hanya persinggahan.',
        ],
        asalKata: { huruf: ['ك', 'ث', 'ر'], makna: 'saling berlomba memperbanyak',
          gambar: 'Dari akar «k-ṡ-r» (banyak) — akar yang sama dengan «al-Kauṡar». Tapi di pola «tafā‘ul» («takāṡur») maknanya menjadi <b>saling berlomba menumpuk</b>: siapa punya lebih banyak. Pola ini menyiratkan <b>kompetisi tanpa ujung</b>, sebab "lebih banyak" tak pernah terasa cukup. Sindirannya abadi: angka pengikut, pamer harta, scroll tanpa henti — perlombaan yang baru berhenti «ḥattā zurtumul-maqābir», saat kau diantar ke kubur.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'عِلْمَ الْيَقِينِ ۝ عَيْنَ الْيَقِينِ', latin: '‘ilmal-yaqīn … ‘ainal-yaqīn', arti: 'pengetahuan yang yakin … penglihatan yang yakin',
        poin: [
          'Tingkat keyakinan: «‘ilmul-yaqīn» (yakin lewat ilmu/kabar) lalu «‘ainul-yaqīn» (yakin lewat melihat langsung).',
          'Andai yakin dengan ilmu saja, kemegahan tak akan melalaikan — tapi banyak yang baru sadar saat sudah melihat (terlambat).',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Lomba menumpuk tak punya garis finish — kecuali kubur.',
      'Tiap nikmat akan ditanya: "untuk apa kau pakai?"',
      '"Cukup" itu keputusan, bukan jumlah.',
    ],
    surah: 'At-Takāṡur',
    surahNo: 102,
    ayatNo: '1–8',
    juz: 30,
    tema: ['Dunia & akhirat', 'Kesadaran', 'Syukur'],
    gratis: false,
    arab: 'أَلْهَاكُمُ التَّكَاثُرُ ۝ حَتَّىٰ زُرْتُمُ الْمَقَابِرَ ۝ كَلَّا سَوْفَ تَعْلَمُونَ ۝ ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ ۝ كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ ۝ لَتَرَوُنَّ الْجَحِيمَ ۝ ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ ۝ ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ',
    latin: 'Alhākumut-takāṡur. Ḥattā zurtumul-maqābir. Kallā saufa ta‘lamūn. Ṡumma kallā saufa ta‘lamūn. Kallā lau ta‘lamūna ‘ilmal-yaqīn. Latarawunnal-jaḥīm. Ṡumma latarawunnahā ‘ainal-yaqīn. Ṡumma latus’alunna yauma’iżin ‘anin-na‘īm.',
    arti: 'Bermegah-megahan telah melalaikan kamu, sampai kamu masuk ke dalam kubur. Sekali-kali tidak! Kelak kamu akan mengetahui. Kemudian sekali-kali tidak! Kelak kamu akan mengetahui. Sekali-kali tidak! Sekiranya kamu mengetahui dengan pengetahuan yang yakin, niscaya kamu benar-benar akan melihat (neraka) Jahim. Kemudian kamu benar-benar akan melihatnya dengan mata kepala sendiri. Kemudian kamu benar-benar akan ditanya pada hari itu tentang kenikmatan (yang kamu megahkan).',
    asbabunNuzul:
      'Sebagian riwayat menyebut surah ini menegur kabilah-kabilah yang saling membanggakan jumlah & kemuliaan, hingga menghitung-hitung yang telah mati di kubur. Pesannya berlaku umum bagi siapa pun yang dilalaikan oleh perlombaan duniawi. (Tafsir Ibnu Katsir).',
    tafsir:
      'Surah ini menelanjangi penyakit abadi manusia: berlomba memperbanyak dunia hingga lupa tujuan, sampai ajal menjemput. Allah memperingatkan dengan keras (kallā, diulang) bahwa kelak semua akan tahu hakikatnya, melihat Jahim dengan mata kepala, dan ditanya tentang setiap nikmat yang dimegahkan.',
    hikmah:
      'Bukan harta yang dicela, tapi "perlombaan menumpuk" yang melalaikan. Ukuran kecukupan bukan pada angka, tapi pada hati yang sadar bahwa semua akan dimintai pertanggungjawaban — termasuk nikmat yang kau anggap remeh.',
    linguistik:
      'Pola «tafā‘ul» pada «takāṡur» menyiratkan kompetisi timbal-balik yang tak berujung. Kata «zurtum» (berziarah/berkunjung) untuk kubur menyindir bahwa dunia hanya persinggahan. Lalu gradasi «‘ilmul-yaqīn» → «‘ainul-yaqīn» menggambarkan keyakinan yang naik dari kabar menjadi penglihatan langsung.',
    amalan:
      'Lawan "takāṡur" dengan jeda syukur: sebelum membeli/memamerkan, tanya "apakah ini kebutuhan atau sekadar lomba?". Kurangi membandingkan diri di media sosial. Dan biasakan bertanya pada tiap nikmat: "akan kujawab apa nanti saat ditanya tentang ini?"',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-humazah-1-9',
    kajianKata: [
      { kata: 'هُمَزَةٍ لُّمَزَةٍ', latin: 'humazatil lumazah', arti: 'pengumpat lagi pencela',
        poin: [
          'Dua wajah pencelaan: «humazah» (mencela dengan isyarat/perbuatan, di belakang) & «lumazah» (mencela dengan lisan, terang-terangan).',
          'Pola «fu‘alah» menandakan KEBIASAAN yang melekat — bukan sesekali tergelincir, tapi tabiat mencela.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'هُمَزَة', latin: 'Humazah', sifat: ['Mencela dgn isyarat/perbuatan', 'Diam-diam, di belakang'] },
          { arab: 'لُمَزَة', latin: 'Lumazah', sifat: ['Mencela dgn lisan', 'Terang-terangan, di depan'] },
        ], catatan: 'Pola «fu‘alah» → keduanya menjadi TABIAT, bukan keseleo sesekali.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
      { kata: 'لَيُنبَذَنَّ فِي الْحُطَمَةِ', latin: 'layunbażanna fil-ḥuṭamah', arti: 'pasti ia dilemparkan ke dalam Huthamah',
        poin: [
          '«al-ḥuṭamah»: api yang «meremukkan» segalanya berkeping-keping.',
          'Ia «taṭṭali‘u ‘alal-af’idah» — membakar naik sampai ke HATI: tempat kesombongan mencela & cinta harta bersarang.',
        ],
        asalKata: { huruf: ['ح', 'ط', 'م'], makna: 'meremukkan hingga berkeping',
          gambar: 'Akar «ḥ-ṭ-m» berarti <b>meremukkan, menghancurkan jadi serpihan</b> — dipakai untuk kayu kering yang patah berderak. Neraka ini dinamai «al-Ḥuṭamah» karena <b>meremukkan</b> apa pun yang dilempar ke dalamnya. Dan azabnya menukik tepat ke sasaran: «taṭṭali‘u ‘alal-af’idah» — <b>naik sampai ke hati</b>, sebab di hati itulah bersarang kesombongan mencela dan ilusi bahwa harta bisa mengekalkan.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Mencela dengan lisan atau isyarat — dosa yang diremehkan, azabnya meremukkan.',
      'Harta tak mengekalkan — ia ditinggal, kau yang pergi.',
      'Jaga hati dari merasa lebih tinggi dari orang lain.',
    ],
    surah: 'Al-Humazah',
    surahNo: 104,
    ayatNo: '1–9',
    juz: 30,
    tema: ['Akhlak lisan', 'Bahaya harta', 'Kesombongan'],
    gratis: false,
    arab: 'وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ ۝ الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ ۝ يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ ۝ كَلَّا ۖ لَيُنبَذَنَّ فِي الْحُطَمَةِ ۝ وَمَا أَدْرَاكَ مَا الْحُطَمَةُ ۝ نَارُ اللَّهِ الْمُوقَدَةُ ۝ الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ ۝ إِنَّهَا عَلَيْهِم مُّؤْصَدَةٌ ۝ فِي عَمَدٍ مُّمَدَّدَةٍ',
    latin: 'Wailul likulli humazatil lumazah. Allażī jama‘a mālaw wa ‘addadah. Yaḥsabu anna mālahū akhladah. Kallā layunbażanna fil-ḥuṭamah. Wa mā adrāka mal-ḥuṭamah. Nārullāhil-mūqadah. Allatī taṭṭali‘u ‘alal-af’idah. Innahā ‘alaihim mu’ṣadah. Fī ‘amadim mumaddadah.',
    arti: 'Celakalah bagi setiap pengumpat lagi pencela, yang mengumpulkan harta dan menghitung-hitungnya, dia mengira hartanya itu dapat mengekalkannya. Sekali-kali tidak! Pasti dia akan dilemparkan ke dalam Huthamah. Tahukah kamu apa Huthamah itu? (Yaitu) api Allah yang dinyalakan, yang membakar sampai ke hati. Sungguh, api itu ditutup rapat atas mereka, (sedang mereka diikat) pada tiang-tiang yang panjang.',
    asbabunNuzul:
      'Sebagian ahli tafsir menyebut surah ini turun berkenaan dengan orang-orang yang gemar mencela & merendahkan Nabi ﷺ serta kaum muslim; para ulama berbeda menentukan sosoknya. Maknanya berlaku umum bagi setiap pencela yang dimabuk harta. (Tafsir Ibnu Katsir).',
    tafsir:
      'Ancaman keras bagi orang yang menjadikan mencela sebagai tabiat & menumpuk harta sambil mengira ia kekal. Balasannya «al-Ḥuṭamah» — api yang meremukkan dan menembus sampai ke hati, lalu ditutup rapat. Surah ini menautkan dua penyakit: lisan yang melukai & hati yang diperbudak harta.',
    hikmah:
      'Lidah yang suka mencela dan hati yang mengukur diri dari harta adalah dua penyakit yang sering dianggap sepele, padahal merusak. Surah ini menamparnya dengan gambaran azab yang "meremukkan hati" — persis tempat penyakit itu bersemayam.',
    linguistik:
      'Pola «fu‘alah» pada «humazah/lumazah» menunjukkan kebiasaan yang mendarah daging. Nama neraka «al-Ḥuṭamah» (dari ḥ-ṭ-m: meremukkan) dipilih agar selaras dengan watak pelakunya yang "meremukkan" kehormatan orang. Dan «taṭṭali‘u ‘alal-af’idah» (naik ke hati) menukik ke akar penyakitnya.',
    amalan:
      'Jaga lisan & jari dari ghibah, mencela fisik (body-shaming), dan komentar merendahkan di media sosial — itu "humaz/lumaz" zaman ini. Dan periksa hubunganmu dengan harta: kau yang memilikinya, atau ia yang menguasaimu? Perbanyak sedekah agar harta jadi bekal, bukan beban.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-adiyat-1-11',
    kajianKata: [
      { kata: 'وَالْعَادِيَاتِ ضَبْحًا', latin: 'wal-‘ādiyāti ḍabḥā', arti: 'demi kuda perang yang berlari terengah',
        poin: [
          'Sumpah demi kuda perang: «ḍabḥā» (napas terengah saat berpacu), «qadḥā» (percik api dari kuku), «ṣubḥā» (menyerbu saat subuh).',
          'Gambaran kesungguhan & pengorbanan total seekor kuda demi tuannya — disusun cepat & berderap seperti larinya.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
      { kata: 'إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ', latin: 'innal-insāna li-rabbihī lakanūd', arti: 'sungguh manusia sangat ingkar kepada Tuhannya',
        poin: [
          '«kanūd» bukan sekadar "tak bersyukur": ia mengingat satu musibah & melupakan seribu nikmat.',
          'Penegasan ganda «inna … la-kanūd»: tabiat ingkar nikmat itu melekat kuat pada manusia.',
        ],
        asalKata: { huruf: ['ك', 'ن', 'د'], makna: 'sangat ingkar nikmat; tanah tandus',
          gambar: 'Orang Arab menyebut «arḍun kanūd» — <b>tanah tandus</b> yang sudah disiram & ditanami namun <b>tak menumbuhkan apa-apa</b>. «Kanūd» juga dipakai untuk orang yang <b>mengingat satu musibah dan melupakan seribu nikmat</b>. Maka ayat ini melukis hati yang seperti tanah gersang: dicurahi karunia tiada henti, tapi tak "menumbuhkan" syukur. Indahnya, sumpah dibuka dengan <b>kuda perang yang setia mengerahkan segenap tenaganya</b> untuk tuannya — kontras tajam dengan manusia yang ingkar pada Penciptanya.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Kuda pun setia berkorban untuk tuannya — bagaimana kita kepada Pencipta?',
      'Jangan jadi hati yang gersang: dicurahi nikmat, tapi tak menumbuhkan syukur.',
      'Yang tersembunyi di dada akan dikeluarkan — jaga niatmu.',
    ],
    surah: 'Al-‘Ādiyāt',
    surahNo: 100,
    ayatNo: '1–11',
    juz: 30,
    tema: ['Syukur', 'Mengenal diri', 'Hari akhir'],
    gratis: false,
    arab: 'وَالْعَادِيَاتِ ضَبْحًا ۝ فَالْمُورِيَاتِ قَدْحًا ۝ فَالْمُغِيرَاتِ صُبْحًا ۝ فَأَثَرْنَ بِهِ نَقْعًا ۝ فَوَسَطْنَ بِهِ جَمْعًا ۝ إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ ۝ وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ ۝ وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ ۝ أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ ۝ وَحُصِّلَ مَا فِي الصُّدُورِ ۝ إِنَّ رَبَّهُم بِهِمْ يَوْمَئِذٍ لَّخَبِيرٌ',
    latin: 'Wal-‘ādiyāti ḍabḥā. Fal-mūriyāti qadḥā. Fal-mugīrāti ṣubḥā. Fa aṡarna bihī naq‘ā. Fa wasaṭna bihī jam‘ā. Innal-insāna li-rabbihī lakanūd. Wa innahū ‘alā żālika lasyahīd. Wa innahū liḥubbil-khairi lasyadīd. Afalā ya‘lamu iżā bu‘ṡira mā fil-qubūr. Wa ḥuṣṣila mā fiṣ-ṣudūr. Inna rabbahum bihim yauma’iżil lakhabīr.',
    arti: 'Demi kuda perang yang berlari kencang terengah-engah, yang memercikkan bunga api (dengan pukulan kukunya), yang menyerang dengan tiba-tiba di waktu subuh, sehingga menerbangkan debu, lalu menyerbu ke tengah-tengah kumpulan musuh. Sungguh, manusia itu sangat ingkar kepada Tuhannya, dan sesungguhnya dia menyaksikan (mengakui) keingkarannya, dan sesungguhnya cintanya kepada harta sungguh berlebihan. Maka tidakkah dia mengetahui apabila apa yang di dalam kubur dikeluarkan, dan apa yang tersimpan dalam dada dilahirkan? Sungguh, Tuhan mereka pada hari itu Mahateliti terhadap keadaan mereka.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Surah Makkiyah ini membuka dengan sumpah demi kuda perang lalu menegur tabiat manusia yang ingkar nikmat & berlebihan cinta harta, diakhiri pengingat hari pembalasan.',
    tafsir:
      'Allah bersumpah demi kuda perang yang berjuang sepenuh tenaga untuk menyingkap tabiat manusia: «kanūd» — ingkar pada nikmat Tuhannya, padahal ia sendiri menyaksikannya, dan amat mencintai harta. Lalu peringatan: ingatlah hari ketika isi kubur dibangkitkan dan isi hati dibongkar, dan Allah Mahateliti atas semuanya.',
    hikmah:
      'Kontras yang menohok: hewan tunggangan rela mengerahkan seluruh tenaga untuk tuannya, sementara manusia kerap lupa berterima kasih kepada Penciptanya. Surah ini mengajak memeriksa hati: apakah ia subur dengan syukur, atau tandus seperti «arḍun kanūd»?',
    linguistik:
      'Rangkaian «ḍabḥā – qadḥā – ṣubḥā» berirama cepat & berderap, meniru gerak kuda yang berpacu. Kata «kanūd» dipilih karena maknanya kaya: ingkar nikmat sekaligus "tanah yang tak menumbuhkan". Dan «ḥuṣṣila mā fiṣ-ṣudūr» (dilahirkan/dibongkar isi dada) menegaskan bahwa yang dinilai bukan sekadar lahir, tapi isi hati.',
    amalan:
      'Lawan sifat «kanūd» dengan jurnal syukur: tiap malam catat 3 nikmat hari itu, agar hatimu tak gersang. Saat tertimpa satu masalah, sengaja hitung nikmat yang masih ada agar tak "mengingat musibah & melupakan karunia". Dan jaga niat dalam dada — sebab kelak ia yang dibongkar.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-qariah-1-11',
    kajianKata: [
      { kata: 'الْقَارِعَةُ', latin: 'Al-Qāri‘ah', arti: 'Hari Kiamat (yang menggedor)',
        poin: [
          '«al-qāri‘ah» dari «qar‘» = mengetuk/menggedor keras — Hari yang "menggedor" hati dengan kengerian.',
          'Diulang tiga kali (al-qāri‘ah… mal-qāri‘ah… wa mā adrāka) → membangun keagungan & kegentaran yang tak terlukiskan.',
        ],
        asalKata: { huruf: ['ق', 'ر', 'ع'], makna: 'mengetuk & memukul keras hingga berbunyi',
          gambar: 'Akar «q-r-‘» berarti <b>mengetuk/memukul dengan keras</b> sampai berbunyi — «qar‘ul-bāb» = menggedor pintu. Kiamat disebut «al-Qāri‘ah»: Hari yang <b>menggedor</b> — memukul telinga dengan dahsyat suaranya, menggedor hati dengan kengeriannya, hingga tak seorang pun bisa pura-pura tak mendengar. Bukan ketukan halus; ini gedoran yang <b>memaksa seluruh makhluk terjaga & sadar</b>.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'كَالْفَرَاشِ الْمَبْثُوثِ ۝ كَالْعِهْنِ الْمَنفُوشِ', latin: 'kal-farāsyil-mabṡūṡ … kal-‘ihnil-manfūsy', arti: 'seperti laron beterbangan … seperti bulu dihambur',
        poin: [
          'Manusia «kal-farāsyil-mabṡūṡ»: laron beterbangan — panik, tak tentu arah, menghambur tanpa sadar bahaya.',
          'Gunung «kal-‘ihnil-manfūsy»: bulu (wol) yang dihambur — yang paling kokoh pun jadi seringan kapas.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Yang hari ini tampak kokoh — kuasa, gunung, harta — hari itu seringan kapas.',
      'Yang menentukan: berat timbangan amal, bukan berat hartamu.',
      'Isi harimu agar timbanganmu berat saat ditimbang.',
    ],
    surah: 'Al-Qāri‘ah',
    surahNo: 101,
    ayatNo: '1–11',
    juz: 30,
    tema: ['Hari akhir', 'Timbangan amal', 'Kesadaran'],
    gratis: false,
    arab: 'الْقَارِعَةُ ۝ مَا الْقَارِعَةُ ۝ وَمَا أَدْرَاكَ مَا الْقَارِعَةُ ۝ يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ ۝ وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنفُوشِ ۝ فَأَمَّا مَن ثَقُلَتْ مَوَازِينُهُ ۝ فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ ۝ وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ ۝ فَأُمُّهُ هَاوِيَةٌ ۝ وَمَا أَدْرَاكَ مَا هِيَهْ ۝ نَارٌ حَامِيَةٌ',
    latin: 'Al-qāri‘ah. Mal-qāri‘ah. Wa mā adrāka mal-qāri‘ah. Yauma yakūnun-nāsu kal-farāsyil-mabṡūṡ. Wa takūnul-jibālu kal-‘ihnil-manfūsy. Fa ammā man ṡaqulat mawāzīnuh. Fa huwa fī ‘īsyatir rāḍiyah. Wa ammā man khaffat mawāzīnuh. Fa ummuhū hāwiyah. Wa mā adrāka mā hiyah. Nārun ḥāmiyah.',
    arti: 'Hari Kiamat. Apakah hari Kiamat itu? Tahukah kamu apakah hari Kiamat itu? Pada hari itu manusia seperti laron yang beterbangan, dan gunung-gunung seperti bulu yang dihambur-hamburkan. Maka adapun orang yang berat timbangan (kebaikan)nya, dia berada dalam kehidupan yang memuaskan. Dan adapun orang yang ringan timbangan (kebaikan)nya, maka tempat kembalinya adalah Hawiyah. Dan tahukah kamu apakah Hawiyah itu? (Yaitu) api yang sangat panas.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Surah Makkiyah ini menggambarkan dahsyatnya Hari Kiamat dan penimbangan amal sebagai penentu nasib.',
    tafsir:
      'Surah ini menghadirkan kengerian Hari Kiamat: manusia berhamburan bagai laron, gunung-gunung melumer seringan bulu. Lalu nasib terbagi pada timbangan amal: yang berat kebaikannya hidup dalam keridaan, yang ringan terjerumus ke Hawiyah, api yang sangat panas. Pesannya jelas: yang menyelamatkan adalah berat amal, bukan berat dunia.',
    hikmah:
      'Segala yang kita anggap kokoh & abadi — kekuasaan, gunung, kekayaan — pada hari itu tak berbobot. Yang berbobot hanya amal. Surah ini menggeser ukuran "berat" dari harta yang ditimbun ke kebaikan yang ditimbang.',
    linguistik:
      'Nama «al-Qāri‘ah» (yang menggedor) langsung menanamkan kegentaran, diperkuat pengulangan retoris «mal-qāri‘ah… wa mā adrāka». Dua tasybih (perumpamaan) berturut — laron yang berhamburan & bulu yang dihambur — melukiskan kelemahan makhluk & runtuhnya yang kokoh dengan imaji yang mudah terbayang.',
    amalan:
      'Jadikan "timbangan" sebagai lensa harian: sebelum bertindak, tanya "ini menambah berat timbangan kebaikan atau tidak?". Perbanyak amal ringan bernilai berat (zikir, senyum, menyingkirkan gangguan di jalan, sedekah kecil rutin) — sebab di hari itu, yang menyelamatkan adalah beratnya, bukan besarnya di mata manusia.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-masad-1-5',
    kajianKata: [
      { kata: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ', latin: 'tabbat yadā abī lahabiw wa tabb', arti: 'binasalah kedua tangan Abu Lahab, dan benar-benar binasa ia',
        poin: [
          'Permainan kata takdir: julukan «Abū Lahab» (bapak nyala api) → balasannya «nāran żāta lahab» (api yang bernyala).',
          '«tabbat yadā… wa tabb»: tangannya binasa DAN dirinya binasa — usaha & jiwanya sama-sama merugi total.',
          'Mukjizat: surah turun semasa hidupnya; cukup ia berpura-pura masuk Islam untuk mendustakannya — tapi ia tak pernah, persis seperti yang Allah kabarkan.',
        ],
        asalKata: { huruf: ['ل', 'ه', 'ب'], makna: 'nyala & jilatan api',
          gambar: '«Lahab» berarti <b>lidah/jilatan api</b> yang menyala-nyala. Julukan «Abū Lahab» semula karena wajahnya yang kemerahan berseri — tapi Al-Qur’an membalik maknanya: orang "berwajah api" itu justru akan <b>masuk api yang ber-«lahab»</b>. Sebuah ketepatan bahasa yang menggetarkan — nama yang dahulu ia banggakan berubah menjadi <b>cap azabnya</b>.' },
        sumber: ['Tafsir Ibnu Katsir', 'Sahih Bukhari'] },
      { kata: 'مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ', latin: 'mā agnā ‘anhu māluhū wa mā kasab', arti: 'hartanya & apa yang ia usahakan tak berguna baginya',
        poin: [
          'Harta & pengaruh yang ia banggakan tak sedikit pun menolongnya di hadapan azab.',
          'Istrinya «ḥammālatal-ḥaṭab» (pembawa kayu bakar): kiasan penyebar fitnah & penabur duri di jalan dakwah.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Harta & nasab tak menyelamatkan bila dipakai menentang kebenaran.',
      'Permusuhan pada kebenaran akhirnya membakar diri sendiri.',
      'Jangan jadi "pembawa kayu bakar" — penyebar fitnah yang menyulut perpecahan.',
    ],
    surah: 'Al-Masad',
    surahNo: 111,
    ayatNo: '1–5',
    juz: 30,
    tema: ['Akibat permusuhan', 'Bahaya harta', 'Lisan & fitnah'],
    gratis: false,
    arab: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ۝ مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ ۝ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ ۝ وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ ۝ فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ',
    latin: 'Tabbat yadā abī lahabiw wa tabb. Mā agnā ‘anhu māluhū wa mā kasab. Sayaṣlā nāran żāta lahab. Wamra’atuhū ḥammālatal-ḥaṭab. Fī jīdihā ḥablum mim masad.',
    arti: 'Binasalah kedua tangan Abu Lahab dan benar-benar binasa dia! Tidaklah berguna baginya hartanya dan apa yang dia usahakan. Kelak dia akan masuk ke dalam api yang bergejolak. Dan (begitu pula) istrinya, pembawa kayu bakar (penyebar fitnah). Di lehernya ada tali dari sabut yang dipintal.',
    asbabunNuzul:
      'Ketika Nabi ﷺ menyeru kerabatnya di bukit Shafa untuk beriman, Abu Lahab — pamannya sendiri — menghardik: "Celakalah engkau! Apa untuk ini engkau kumpulkan kami?" Maka turunlah surah ini sebagai jawaban (HR. Bukhari).',
    tafsir:
      'Surah ini mengabadikan kebinasaan Abu Lahab yang memusuhi Nabi ﷺ dengan sengit, padahal ia kerabat dekat & berharta. Hartanya tak menolongnya, dan ia beserta istrinya yang gemar menyakiti Nabi ﷺ diancam api yang bergejolak. Sebuah penegasan bahwa kedekatan nasab & limpahan harta tak berarti tanpa iman.',
    hikmah:
      'Tak ada nasab atau kekayaan yang menyelamatkan seseorang yang memusuhi kebenaran. Sebaliknya, kebencian yang dipelihara hanya membakar pemiliknya. Surah ini juga memperingatkan bahaya menjadi "pembawa kayu bakar": menyebar fitnah yang menyulut permusuhan.',
    linguistik:
      'Keindahannya pada permainan kata: nama «Abū Lahab» (lahab = nyala api) berpadu dengan ancaman «nāran żāta lahab». Pengulangan «tabbat… wa tabb» menegaskan kebinasaan ganda (usaha & diri). Dan «ḥammālatal-ḥaṭab» memakai kiasan pembawa kayu bakar untuk melukiskan penyebar fitnah yang "menyalakan" api permusuhan.',
    amalan:
      'Jadikan cermin: jangan andalkan status, koneksi, atau harta sebagai "jaminan" — yang menjamin hanyalah iman & amal. Dan jauhi peran "ḥammālatal-ḥaṭab" zaman kini: meneruskan gosip, tangkapan layar, atau berita yang menyulut permusuhan. Berhentikan fitnah di tanganmu, jangan menyebarkannya.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Sahih Bukhari'],
  },
  {
    id: 'ad-duha-1-11',
    kajianKata: [
      { kata: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ', latin: 'mā wadda‘aka rabbuka wa mā qalā', arti: 'Tuhanmu tidak meninggalkanmu dan tidak (pula) membencimu',
        poin: [
          'Konteks: wahyu sempat terhenti, musuh mengejek "Tuhanmu telah meninggalkanmu." Allah menjawab dengan kelembutan luar biasa.',
          '«wadda‘aka» bukan sekadar "pergi" — «wadā‘» = perpisahan yang disengaja & menyakitkan; justru itu yang dinafikan.',
          'Halusnya menggetarkan: «mā qalā» — kata ganti "-mu" sengaja DIBUANG (tak dikatakan "membencimu"), seolah Allah tak sudi menyandingkan kata "benci" dengan dirimu.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'وَدَّعَ', latin: 'Wadda‘a', sifat: ['Perpisahan yang DISENGAJA', 'Bentuk paling menyakitkan'] },
          { arab: 'تَرَكَ', latin: 'Taraka', alt: true, sifat: ['Sekadar "meninggalkan"', 'Lebih ringan'] },
        ], catatan: 'Dinafikan «wadda‘a» — bahkan perpisahan terhalus pun tak terjadi antara kau & Tuhanmu.' },
        sumber: ['Tafsir Ibnu Katsir', 'Sahih Bukhari–Muslim'] },
      { kata: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ', latin: 'wa lasaufa yu‘ṭīka rabbuka fa tarḍā', arti: 'dan kelak Tuhanmu pasti memberimu, sehingga engkau ridha',
        poin: [
          'Janji paling melapangkan: "Tuhanmu akan terus memberi sampai engkau RIDHA (puas)."',
          'Batas pemberian-Nya adalah kepuasanmu — «fa tarḍā» — bukan sekadar kecukupan minimal.',
        ],
        sumber: ['Tafsir As-Sa‘di', 'Tafsir Ibnu Katsir'] },
      { kata: 'وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ', latin: 'wa ammā bini‘mati rabbika fa ḥaddiṡ', arti: 'dan terhadap nikmat Tuhanmu, ceritakanlah',
        poin: [
          'Tiga pemberian masa lalu berbuah tiga perintah: yatim→dilindungi, bingung→ditunjuki, miskin→dicukupkan.',
          'Maka: dulu yatim → jangan keras pada yatim; dulu meminta → jangan hardik peminta; diberi nikmat → ceritakan (syukuri).',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Saat merasa "ditinggalkan" Allah, surah ini turun untukmu: Dia tak pergi.',
      'Yang terbaik bukan di belakang (dunia), tapi di depan (akhirat & janji-Nya).',
      'Kebaikan yang dulu kau terima, jadikan alasan berbuat baik pada yang kini lemah.',
    ],
    surah: 'Aḍ-Ḍuḥā',
    surahNo: 93,
    ayatNo: '1–11',
    juz: 30,
    tema: ['Penghiburan', 'Harapan', 'Syukur'],
    gratis: false,
    arab: 'وَالضُّحَىٰ ۝ وَاللَّيْلِ إِذَا سَجَىٰ ۝ مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ ۝ وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ ۝ أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ ۝ وَوَجَدَكَ ضَالًّا فَهَدَىٰ ۝ وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ ۝ فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ ۝ وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ ۝ وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ',
    latin: 'Waḍ-ḍuḥā. Wal-laili iżā sajā. Mā wadda‘aka rabbuka wa mā qalā. Wa lal-ākhiratu khairul laka minal-ūlā. Wa lasaufa yu‘ṭīka rabbuka fa tarḍā. Alam yajidka yatīman fa āwā. Wa wajadaka ḍāllan fa hadā. Wa wajadaka ‘ā’ilan fa agnā. Fa ammal-yatīma fa lā taqhar. Wa ammas-sā’ila fa lā tanhar. Wa ammā bini‘mati rabbika fa ḥaddiṡ.',
    arti: 'Demi waktu duha, dan demi malam apabila telah sunyi, Tuhanmu tidak meninggalkanmu dan tidak (pula) membencimu. Dan sungguh, yang kemudian (akhirat) lebih baik bagimu daripada yang permulaan (dunia). Dan kelak Tuhanmu pasti memberikan karunia-Nya kepadamu, sehingga engkau menjadi puas. Bukankah Dia mendapatimu sebagai yatim, lalu Dia melindungimu? Dan Dia mendapatimu sebagai orang yang bingung, lalu Dia memberi petunjuk. Dan Dia mendapatimu sebagai orang yang kekurangan, lalu Dia memberi kecukupan. Maka terhadap anak yatim janganlah engkau berlaku sewenang-wenang, dan terhadap orang yang meminta janganlah engkau menghardik, dan terhadap nikmat Tuhanmu hendaklah engkau menyatakannya (bersyukur).',
    asbabunNuzul:
      'Wahyu sempat terhenti turun selama beberapa waktu, lalu ada yang berkata Tuhan Muhammad telah meninggalkannya. Maka turun surah ini menghibur Nabi ﷺ dengan penegasan kasih sayang Allah (HR. Bukhari–Muslim).',
    tafsir:
      'Allah bersumpah demi terang duha & tenangnya malam untuk menenangkan Nabi ﷺ: Dia tidak meninggalkan & tidak membenci beliau; akhirat lebih baik dari dunia; dan Allah akan terus memberi hingga beliau ridha. Lalu Allah mengingatkan tiga karunia masa lalu (perlindungan, hidayah, kecukupan) dan menjadikannya dasar tiga perintah: menyayangi yatim, lembut pada peminta, & menyebarkan syukur.',
    hikmah:
      'Jeda & kesepian dalam perjalanan iman bukan tanda ditinggalkan. Justru di situ Allah menanamkan harap: yang terbaik ada di depan, dan kebaikan yang pernah kau terima adalah panggilan untuk membaikkan orang lain.',
    linguistik:
      'Dipilih «wadda‘a» (perpisahan yang disengaja) untuk dinafikan — meniadakan bentuk perpisahan yang paling menyakitkan. Lalu pada «mā qalā», objek "-ka" sengaja dibuang demi kelembutan, agar kata "benci" tak pernah bersanding dengan diri sang kekasih. Susunan «alam yajidka… fa…» (tiga karunia) lalu «fa ammā… fa…» (tiga perintah) membentuk paralel yang memikat: tiap nikmat melahirkan tanggung jawab.',
    amalan:
      'Saat hatimu terasa "kosong" & jauh dari Allah, baca & resapi Ad-Duha — itu bukan tanda ditinggalkan. Lalu amalkan penutupnya: santuni yatim, jangan hardik orang yang meminta tolong, dan "ceritakan nikmat" dengan bersyukur (bukan pamer) agar orang termotivasi pada kebaikan.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Sahih Bukhari–Muslim'],
  },
  {
    id: 'at-tin-1-8',
    kajianKata: [
      { kata: 'لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ', latin: 'laqad khalaqnal-insāna fī aḥsani taqwīm', arti: 'sungguh Kami menciptakan manusia dalam bentuk sebaik-baiknya',
        poin: [
          '«aḥsani taqwīm» — sebaik-baik bentuk: tegak fisiknya, sempurna akal & fitrahnya; potensi tertinggi.',
          'Lalu «asfala sāfilīn» (serendah-rendahnya) — manusia berpotensi DUA arah: paling mulia atau paling hina.',
          'Pembedanya: «illal-lażīna āmanū wa ‘amiluṣ-ṣāliḥāt» — iman & amal saleh yang menahan di puncak.',
        ],
        asalKata: { huruf: ['ق', 'و', 'م'], makna: 'menjadikan tegak & seimbang sempurna',
          gambar: 'Akar «q-w-m» (berdiri tegak — akar yang sama dengan «iqāmah» salat & «al-Qayyūm») melahirkan «taqwīm»: <b>menata sesuatu agar tegak, lurus, & seimbang sempurna</b>. Manusia dicipta «fī aḥsani taqwīm» — bukan hanya tubuh yang tegak, tapi <b>akal, fitrah, & potensi</b> yang ditata paling pas. Namun ketegakan itu amanah: ia bisa runtuh ke «asfala sāfilīn». Sosok yang sama bisa naik semulia malaikat atau jatuh sehina binatang — <b>pilihan ada padanya</b>.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ', latin: 'alaisallāhu bi’aḥkamil-ḥākimīn', arti: 'bukankah Allah hakim yang paling adil?',
        poin: [
          '«aḥkamil-ḥākimīn» (bentuk superlatif): seadil & sebijak-bijak hakim — penutup yang menjawab "kenapa mendustakan hari pembalasan?".',
          'Mustahil Yang mencipta manusia "sebaik bentuk" lalu membiarkannya tanpa hisab — itu bukan keadilan.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Kau dicipta dalam bentuk terbaik — jangan turunkan dirimu ke yang terhina.',
      'Yang menjaga di puncak: iman + amal saleh.',
      'Hidup pasti dihisab — Allah hakim yang paling adil.',
    ],
    surah: 'At-Tīn',
    surahNo: 95,
    ayatNo: '1–8',
    juz: 30,
    tema: ['Kemuliaan manusia', 'Iman & amal', 'Hari akhir'],
    gratis: false,
    arab: 'وَالتِّينِ وَالزَّيْتُونِ ۝ وَطُورِ سِينِينَ ۝ وَهَٰذَا الْبَلَدِ الْأَمِينِ ۝ لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ ۝ ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ ۝ فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ ۝ أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ',
    latin: 'Wat-tīni waz-zaitūn. Wa ṭūri sīnīn. Wa hāżal-baladil-amīn. Laqad khalaqnal-insāna fī aḥsani taqwīm. Ṡumma radadnāhu asfala sāfilīn. Illal-lażīna āmanū wa ‘amiluṣ-ṣāliḥāti fa lahum ajrun gairu mamnūn. Fa mā yukażżibuka ba‘du bid-dīn. Alaisallāhu bi’aḥkamil-ḥākimīn.',
    arti: 'Demi (buah) tin dan zaitun, demi gunung Sinai, dan demi negeri (Mekah) yang aman ini. Sungguh, Kami telah menciptakan manusia dalam bentuk yang sebaik-baiknya. Kemudian Kami kembalikan dia ke tempat yang serendah-rendahnya, kecuali orang-orang yang beriman dan mengerjakan kebajikan; maka mereka akan mendapat pahala yang tidak ada putus-putusnya. Maka apa yang menyebabkan (mereka) mendustakanmu tentang hari pembalasan setelah itu? Bukankah Allah hakim yang paling adil?',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Surah ini bersumpah dengan tempat-tempat & nikmat penuh berkah, lalu menegaskan kemuliaan asal penciptaan manusia & tanggung jawabnya.',
    tafsir:
      'Setelah bersumpah dengan tin, zaitun, Tursina, & Mekah yang aman, Allah menegaskan bahwa manusia dicipta dalam sebaik-baik bentuk, namun dapat jatuh ke serendah-rendahnya — kecuali yang beriman & beramal saleh. Ditutup dengan penegasan keadilan Allah sebagai hakim teragung: mustahil ciptaan semulia ini dibiarkan tanpa hisab.',
    hikmah:
      'Manusia bukan sekadar tubuh yang tegak, tapi potensi yang ditata sempurna. Yang menjaga potensi itu tetap "di atas" adalah iman & amal; tanpanya, makhluk termulia bisa jatuh paling rendah.',
    linguistik:
      'Kata «taqwīm» (dari q-w-m: menegakkan & menyeimbangkan) menggambarkan kesempurnaan tata cipta manusia, dikontraskan tajam dengan «asfala sāfilīn». Penutup «aḥkamil-ḥākimīn» dalam bentuk superlatif menutup argumen tentang keniscayaan hari pembalasan: keadilan sempurna menuntut adanya hisab.',
    amalan:
      'Hargai dirimu sebagai ciptaan "sebaik bentuk": jaga tubuh, asah akal, & rawat fitrah dengan iman + amal saleh — itulah yang menahanmu di puncak. Saat tergoda merendahkan diri pada hal hina, ingat: kau diciptakan untuk derajat yang jauh lebih tinggi.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-qadr-1-5',
    kajianKata: [
      { kata: 'لَيْلَةِ الْقَدْرِ', latin: 'lailatil-qadr', arti: 'malam kemuliaan (Lailatul Qadr)',
        poin: [
          '«al-qadr» berlapis makna: malam KEMULIAAN (agung) sekaligus malam KETETAPAN (takdir tahunan ditetapkan).',
          '«khairum min alfi syahr» — lebih baik dari 1000 bulan (≈ 83 tahun): satu malam mengungguli seumur hidup.',
        ],
        asalKata: { huruf: ['ق', 'د', 'ر'], makna: 'kemuliaan & ketetapan/ukuran',
          gambar: 'Akar «q-d-r» menyimpan dua makna yang menyatu indah: <b>kemuliaan & keagungan</b> (orang ber-"qadar" tinggi), sekaligus <b>ukuran & ketetapan</b> (taqdir). Maka «Lailatul-Qadr» adalah malam yang <b>agung kedudukannya</b> sekaligus malam <b>ditetapkannya takdir</b> setahun ke depan. Pantas ia "lebih baik dari seribu bulan" — pada malam inilah Al-Qur’an yang mengubah dunia mulai diturunkan.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ', latin: 'salāmun hiya ḥattā maṭla‘il-fajr', arti: 'sejahteralah (malam itu) sampai terbit fajar',
        poin: [
          '«salāmun hiya» — malam itu seluruhnya KESELAMATAN & kedamaian, hingga fajar.',
          'Turun para malaikat & Ruh (Jibril) "min kulli amr" — membawa segala urusan kebaikan dengan izin-Nya.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Satu malam bisa lebih berharga dari 83 tahun — jangan sia-siakan Ramadhan.',
      'Nilai waktu bukan dari panjangnya, tapi dari berkahnya.',
      'Cari Lailatul Qadr di sepuluh malam terakhir Ramadhan.',
    ],
    surah: 'Al-Qadr',
    surahNo: 97,
    ayatNo: '1–5',
    juz: 30,
    tema: ['Lailatul Qadr', 'Keutamaan waktu', 'Al-Qur’an'],
    gratis: false,
    arab: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ۝ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ ۝ لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ ۝ تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ ۝ سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',
    latin: 'Innā anzalnāhu fī lailatil-qadr. Wa mā adrāka mā lailatul-qadr. Lailatul-qadri khairum min alfi syahr. Tanazzalul-malā’ikatu war-rūḥu fīhā bi’iżni rabbihim min kulli amr. Salāmun hiya ḥattā maṭla‘il-fajr.',
    arti: 'Sesungguhnya Kami telah menurunkannya (Al-Qur’an) pada malam kemuliaan. Dan tahukah kamu apakah malam kemuliaan itu? Malam kemuliaan itu lebih baik daripada seribu bulan. Pada malam itu turun para malaikat dan Ruh (Jibril) dengan izin Tuhannya untuk mengatur segala urusan. Sejahteralah (malam itu) sampai terbit fajar.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul tunggal yang masyhur. Keutamaan Lailatul Qadr ditegaskan banyak hadis sahih, dan Nabi ﷺ menganjurkan mencarinya pada sepuluh malam terakhir Ramadhan, terutama malam-malam ganjil.',
    tafsir:
      'Surah ini mengagungkan malam diturunkannya Al-Qur’an: malam yang nilainya melampaui seribu bulan, saat para malaikat & Jibril turun membawa ketetapan kebaikan dengan izin Allah, dan malam itu penuh keselamatan hingga fajar. Sebuah karunia waktu yang menuntut kita memburu keberkahannya.',
    hikmah:
      'Allah memuliakan umat ini dengan satu malam yang ibadahnya menandingi puluhan tahun. Pelajarannya: nilai sebuah waktu tak diukur dari durasinya, tapi dari keberkahan & ketaatan yang mengisinya.',
    linguistik:
      'Kata «al-qadr» sengaja bermakna ganda — kemuliaan & ketetapan takdir — keduanya benar & menyatu. Pengulangan «lailatul-qadr» tiga kali mengagungkan kedudukannya, dan «salāmun hiya» (didahulukan) menegaskan bahwa malam itu seutuhnya keselamatan, dari awal hingga fajar.',
    amalan:
      'Hidupkan sepuluh malam terakhir Ramadhan dengan salat, tilawah, & doa — terutama "Allāhumma innaka ‘afuwwun tuḥibbul-‘afwa fa‘fu ‘annī" (doa yang diajarkan Nabi ﷺ untuk malam Qadr). Perlakukan waktu luangmu sebagai modal: isi dengan yang berkah, bukan yang sia-sia.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Jami‘ at-Tirmidzi (doa malam Qadr)'],
  },
  {
    id: 'al-alaq-1-5',
    kajianKata: [
      { kata: 'اقْرَأْ بِاسْمِ رَبِّكَ', latin: 'iqra’ bismi rabbik', arti: 'bacalah dengan (menyebut) nama Tuhanmu',
        poin: [
          'Kata WAHYU PERTAMA kepada manusia adalah «Iqra’» — "Bacalah!". Bukan perintah ritual, tapi ILMU.',
          '«iqra’ bismi rabbika» — membaca yang DIIKAT dengan nama Tuhan: ilmu yang berpijak pada-Nya, bukan ilmu yang sombong.',
          'Diturunkan kepada Nabi yang ummi (tak bisa baca-tulis) — menegaskan sumbernya wahyu, bukan karangan.',
        ],
        asalKata: { huruf: ['ق', 'ر', 'ء'], makna: 'membaca & menghimpun-merangkai',
          gambar: 'Akar «q-r-’» bukan sekadar "membaca tulisan" — maknanya <b>menghimpun & merangkai</b> (dari sini «Qur’ān» = "yang dihimpun lalu dibaca"). «Iqra’» memerintah <b>menyerap, merangkai, lalu menyampaikan</b> ilmu. Menakjubkan: agama ini dibuka bukan dengan perintah perang atau ritual, melainkan <b>"Bacalah!"</b> — meletakkan ilmu sebagai fondasi, dan mengikatnya «bismi rabbika» agar tak pernah lepas dari Penciptanya.' },
        sumber: ['Tafsir Ibnu Katsir', 'Sahih Bukhari–Muslim'] },
      { kata: 'الَّذِي عَلَّمَ بِالْقَلَمِ', latin: 'allażī ‘allama bil-qalam', arti: 'yang mengajar (manusia) dengan pena',
        poin: [
          '«‘allama bil-qalam» — Allah mengajar dengan PENA: ilmu diabadikan & diwariskan lewat tulisan.',
          '«‘allamal-insāna mā lam ya‘lam» — sumber semua ilmu manusia adalah pengajaran-Nya; maka tetaplah rendah hati.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Agama ini lahir dengan "Bacalah" — menuntut ilmu adalah ibadah.',
      'Ikat ilmumu dengan nama Tuhan, agar tak melahirkan kesombongan.',
      'Apa pun yang kau tahu, asalnya Dia yang ajarkan.',
    ],
    surah: 'Al-‘Alaq',
    surahNo: 96,
    ayatNo: '1–5',
    juz: 30,
    tema: ['Ilmu', 'Wahyu pertama', 'Rendah hati'],
    gratis: false,
    arab: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ',
    latin: 'Iqra’ bismi rabbikal-lażī khalaq. Khalaqal-insāna min ‘alaq. Iqra’ wa rabbukal-akram. Allażī ‘allama bil-qalam. ‘Allamal-insāna mā lam ya‘lam.',
    arti: 'Bacalah dengan (menyebut) nama Tuhanmu yang menciptakan. Dia telah menciptakan manusia dari segumpal darah. Bacalah, dan Tuhanmulah Yang Mahamulia, Yang mengajar (manusia) dengan pena. Dia mengajarkan manusia apa yang tidak diketahuinya.',
    asbabunNuzul:
      'Inilah wahyu pertama. Di Gua Hira, malaikat Jibril datang memeluk Nabi ﷺ dan berkata "Iqra’ (Bacalah)" tiga kali; beliau menjawab "Aku tidak bisa membaca", lalu turunlah ayat-ayat ini (HR. Bukhari–Muslim).',
    tafsir:
      'Pembuka wahyu kepada umat manusia: perintah membaca dengan nama Tuhan yang menciptakan, mengingatkan asal manusia dari segumpal darah, dan mengagungkan Allah yang Maha Pemurah — yang mengajarkan ilmu lewat pena dan mengajarkan apa yang sebelumnya tak diketahui. Sejak kata pertamanya, Islam meletakkan ilmu sebagai pondasi.',
    hikmah:
      'Wahyu tidak dibuka dengan perintah berperang atau ritual, melainkan dengan "Bacalah". Ilmu adalah jalan mengenal Allah; namun ia harus diikat dengan nama-Nya agar menumbuhkan kerendahan hati, bukan kesombongan.',
    linguistik:
      'Kata «iqra’» (dari q-r-’: menghimpun & membaca) dipilih sebagai pembuka — fondasi ilmu — dan langsung diikat «bismi rabbika». Penyebutan «al-qalam» (pena) menegaskan keabadian ilmu lewat tulisan, dan «mā lam ya‘lam» mengingatkan bahwa seluruh pengetahuan manusia bersumber dari pengajaran-Nya.',
    amalan:
      'Jadikan menuntut ilmu (terutama ilmu agama) sebagai ibadah rutin — sisihkan waktu membaca tiap hari. Awali belajar dengan menyebut nama Allah & niat mengenal-Nya. Dan tiap kali ilmumu bertambah, tambah pula kerendahan hatimu, sebab semua itu pemberian-Nya.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Sahih Bukhari–Muslim'],
  },
  {
    id: 'al-bayyinah-1-8',
    kajianKata: [
      { kata: 'لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ', latin: 'liya‘budullāha mukhliṣīna lahud-dīn', arti: 'agar menyembah Allah dengan memurnikan ketaatan kepada-Nya',
        poin: [
          'Inti SEMUA syariat diringkas: menyembah Allah dengan IKHLAS, lurus (ḥunafā’), tegakkan salat, tunaikan zakat.',
          '«wa żālika dīnul-qayyimah» — ITULAH agama yang lurus & kokoh; bukan ritual yang kosong dari ikhlas.',
        ],
        asalKata: { huruf: ['خ', 'ل', 'ص'], makna: 'murni, jernih, tanpa campuran',
          gambar: 'Akar «kh-l-ṣ» berarti <b>murni & jernih, bebas dari campuran</b> — emas «khāliṣ» = emas tanpa karat. «Mukhliṣīna lahud-dīn» = memurnikan ibadah <b>hanya untuk Allah</b>, tak dicampuri riya atau pamrih. Inilah benang merah seluruh nabi: bukan banyaknya ritual, tapi <b>kemurnian niat</b> di baliknya. Ibadah yang tercampur tujuan lain, seperti emas bercampur logam, turun nilainya.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'أُولَٰئِكَ هُمْ خَيْرُ الْبَرِيَّةِ', latin: 'ulā’ika hum khairul-bariyyah', arti: 'mereka itulah sebaik-baik makhluk',
        poin: [
          'Orang beriman & beramal saleh disebut «khairul bariyyah» — sebaik-baik makhluk, mengungguli seluruh ciptaan.',
          'Lawannya «syarrul bariyyah» (seburuk-buruk makhluk). Yang menentukan derajat: iman + amal, bukan rupa atau nasab.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Inti agama: murnikan ibadah hanya untuk Allah.',
      'Yang meninggikan derajat di sisi Allah: iman & amal, bukan rupa atau nasab.',
      '"Sebaik-baik makhluk" itu gelar yang diperjuangkan dengan ketaatan.',
    ],
    surah: 'Al-Bayyinah',
    surahNo: 98,
    ayatNo: '1–8',
    juz: 30,
    tema: ['Keikhlasan', 'Iman & amal', 'Agama yang lurus'],
    gratis: false,
    arab: 'لَمْ يَكُنِ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ مُنفَكِّينَ حَتَّىٰ تَأْتِيَهُمُ الْبَيِّنَةُ ۝ رَسُولٌ مِّنَ اللَّهِ يَتْلُو صُحُفًا مُّطَهَّرَةً ۝ فِيهَا كُتُبٌ قَيِّمَةٌ ۝ وَمَا تَفَرَّقَ الَّذِينَ أُوتُوا الْكِتَابَ إِلَّا مِن بَعْدِ مَا جَاءَتْهُمُ الْبَيِّنَةُ ۝ وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ ۚ وَذَٰلِكَ دِينُ الْقَيِّمَةِ ۝ إِنَّ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ فِي نَارِ جَهَنَّمَ خَالِدِينَ فِيهَا ۚ أُولَٰئِكَ هُمْ شَرُّ الْبَرِيَّةِ ۝ إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أُولَٰئِكَ هُمْ خَيْرُ الْبَرِيَّةِ ۝ جَزَاؤُهُمْ عِندَ رَبِّهِمْ جَنَّاتُ عَدْنٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا ۚ رَّضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ ۚ ذَٰلِكَ لِمَنْ خَشِيَ رَبَّهُ',
    latin: 'Lam yakunil-lażīna kafarū min ahlil-kitābi wal-musyrikīna munfakkīna ḥattā ta’tiyahumul-bayyinah. Rasūlum minallāhi yatlū ṣuḥufam muṭahharah. Fīhā kutubun qayyimah. Wa mā tafarraqal-lażīna ūtul-kitāba illā mim ba‘di mā jā’at-humul-bayyinah. Wa mā umirū illā liya‘budullāha mukhliṣīna lahud-dīna ḥunafā’a wa yuqīmuṣ-ṣalāta wa yu’tuz-zakāta wa żālika dīnul-qayyimah. Innal-lażīna kafarū min ahlil-kitābi wal-musyrikīna fī nāri jahannama khālidīna fīhā, ulā’ika hum syarrul-bariyyah. Innal-lażīna āmanū wa ‘amiluṣ-ṣāliḥāti ulā’ika hum khairul-bariyyah. Jazā’uhum ‘inda rabbihim jannātu ‘adnin tajrī min taḥtihal-anhāru khālidīna fīhā abadā, raḍiyallāhu ‘anhum wa raḍū ‘anhu, żālika liman khasyiya rabbah.',
    arti: 'Orang-orang yang kafir dari golongan Ahli Kitab dan orang-orang musyrik tidak akan meninggalkan (kekafiran) sampai datang kepada mereka bukti yang nyata, (yaitu) seorang Rasul dari Allah yang membacakan lembaran-lembaran yang suci, di dalamnya terdapat (isi) kitab-kitab yang lurus. Dan tidaklah terpecah-belah orang-orang yang diberi kitab kecuali setelah datang kepada mereka bukti yang nyata. Padahal mereka hanya diperintah menyembah Allah dengan ikhlas menaati-Nya semata-mata karena agama, dengan lurus, dan agar menegakkan salat serta menunaikan zakat; dan itulah agama yang lurus. Sungguh, orang-orang yang kafir dari golongan Ahli Kitab dan orang-orang musyrik (akan masuk) ke neraka Jahanam, kekal di dalamnya. Mereka itu seburuk-buruk makhluk. Sungguh, orang-orang yang beriman dan mengerjakan kebajikan, mereka itu sebaik-baik makhluk. Balasan mereka di sisi Tuhan mereka ialah surga ‘Adn yang mengalir di bawahnya sungai-sungai, mereka kekal di dalamnya selama-lamanya. Allah ridha terhadap mereka dan mereka pun ridha kepada-Nya. Yang demikian itu bagi orang yang takut kepada Tuhannya.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus yang masyhur. Surah ini berbicara tentang datangnya bukti nyata (Rasul & wahyu), inti perintah agama (ikhlas), serta pembagian akhir manusia: seburuk & sebaik-baik makhluk.',
    tafsir:
      'Allah menegaskan bahwa seluruh syariat para nabi berintikan satu hal: menyembah Allah dengan ikhlas & lurus, menegakkan salat, menunaikan zakat — itulah agama yang lurus. Lalu manusia terbagi: yang kufur menjadi seburuk-buruk makhluk, sedangkan yang beriman & beramal saleh menjadi sebaik-baik makhluk dengan balasan surga ‘Adn dan ridha Allah.',
    hikmah:
      'Yang dituntut bukan banyaknya amal semata, tapi kemurnian niat di baliknya. Dan derajat tertinggi — "sebaik-baik makhluk" — bukan ditentukan rupa, harta, atau keturunan, melainkan iman yang dibuktikan dengan amal.',
    linguistik:
      'Kata «mukhliṣīna» (dari kh-l-ṣ: memurnikan) menjadi kunci: ibadah yang sah adalah yang murni untuk Allah. Penyebutan «dīnul-qayyimah» (agama yang lurus & kokoh) membingkai keikhlasan sebagai esensi. Dan kontras «syarrul-bariyyah» vs «khairul-bariyyah» menutup surah dengan pembagian nasib yang ditentukan iman & amal.',
    amalan:
      'Periksa niat dalam tiap ibadah: untuk Allah, atau untuk dilihat orang? Latih keikhlasan dengan menyembunyikan sebagian amal kebaikanmu. Dan kejar gelar "khairul bariyyah" bukan dengan pencitraan, tapi dengan iman yang konsisten dibuktikan amal nyata.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'az-zalzalah-1-8',
    kajianKata: [
      { kata: 'مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ', latin: 'miṡqāla żarratin khairay yarah', arti: 'seberat zarrah kebaikan pun, ia akan melihatnya',
        poin: [
          '«miṡqāla żarratin» — seberat ZARRAH (partikel terkecil): sekecil apa pun kebaikan/keburukan, TERLIHAT balasannya.',
          'Diulang simetris: «khairan yarah» / «syarran yarah» — tak ada yang luput, sekecil apa pun.',
          'Pesannya: jangan remehkan kebaikan kecil, & jangan anggap sepele dosa kecil.',
        ],
        asalKata: { huruf: ['ذ', 'ر', 'ر'], makna: 'partikel terkecil — debu/semut terkecil',
          gambar: 'Orang Arab memakai «żarrah» untuk <b>sesuatu yang paling kecil</b> — semut terkecil, atau debu halus yang tampak melayang dalam seberkas cahaya matahari. Al-Qur’an memilihnya untuk menegaskan: timbangan akhirat <b>sehalus itu</b>. Tak ada senyum, langkah, atau bisikan niat yang terlalu kecil untuk dicatat. Yang "sedikit" di matamu bisa jadi penentu di mata-Nya.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'تُحَدِّثُ أَخْبَارَهَا', latin: 'tuḥaddiṡu akhbārahā', arti: 'bumi menyampaikan beritanya',
        poin: [
          '«tuḥaddiṡu akhbārahā» — bumi sendiri "bercerita" tentang segala yang diperbuat di atasnya: saksi yang tak terbantah.',
          'Tempat kau berbuat pun akan bersaksi — tak ada yang benar-benar tersembunyi.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Jangan remehkan kebaikan sekecil apa pun — ia terlihat.',
      'Jangan sepelekan dosa kecil — ia pun terlihat.',
      'Bahkan bumi tempatmu berpijak akan bersaksi.',
    ],
    surah: 'Az-Zalzalah',
    surahNo: 99,
    ayatNo: '1–8',
    juz: 30,
    tema: ['Hari akhir', 'Amal kecil', 'Pertanggungjawaban'],
    gratis: false,
    arab: 'إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا ۝ وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا ۝ وَقَالَ الْإِنسَانُ مَا لَهَا ۝ يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا ۝ بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا ۝ يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِّيُرَوْا أَعْمَالَهُمْ ۝ فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۝ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ',
    latin: 'Iżā zulzilatil-arḍu zilzālahā. Wa akhrajatil-arḍu aṡqālahā. Wa qālal-insānu mā lahā. Yauma’iżin tuḥaddiṡu akhbārahā. Bi’anna rabbaka auḥā lahā. Yauma’iżiy yaṣdurun-nāsu asytātal liyurau a‘mālahum. Fa may ya‘mal miṡqāla żarratin khairay yarah. Wa may ya‘mal miṡqāla żarratin syarray yarah.',
    arti: 'Apabila bumi diguncangkan dengan guncangannya (yang dahsyat), dan bumi telah mengeluarkan beban-beban beratnya, dan manusia bertanya, "Apa yang terjadi padanya?" Pada hari itu bumi menyampaikan beritanya, karena sesungguhnya Tuhanmu telah memerintahkannya. Pada hari itu manusia keluar (dari kubur) dalam keadaan berkelompok-kelompok, untuk diperlihatkan kepada mereka (balasan) perbuatannya. Maka barangsiapa mengerjakan kebaikan seberat zarrah, niscaya dia akan melihat(nya). Dan barangsiapa mengerjakan kejahatan seberat zarrah, niscaya dia akan melihat(nya).',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus tunggal. Sebagian ulama menyebut konteks pengingat agar tidak meremehkan kebaikan kecil maupun dosa kecil; maknanya berlaku umum tentang ketelitian hisab.',
    tafsir:
      'Surah ini melukiskan dahsyatnya Hari Kiamat: bumi berguncang & mengeluarkan isinya, bahkan "bercerita" tentang amal yang diperbuat di atasnya. Manusia keluar berkelompok untuk diperlihatkan amalnya — hingga kebaikan & keburukan seberat zarrah pun terlihat balasannya. Tak ada yang terlalu kecil untuk dihitung.',
    hikmah:
      'Ketelitian hisab Allah menggeser cara kita memandang amal: tak ada kebaikan yang sia-sia, dan tak ada dosa yang benar-benar "kecil". Bahkan bumi menjadi saksi — maka berhati-hatilah, dan jangan pernah meremehkan secuil kebaikan.',
    linguistik:
      'Pilihan «żarrah» (partikel terkecil) menegaskan kehalusan timbangan akhirat. Pengulangan simetris «khairan yarah / syarran yarah» menutup surah dengan keseimbangan yang menggetarkan. Dan «tuḥaddiṡu akhbārahā» (bumi bercerita) adalah personifikasi yang menghidupkan betapa tak ada perbuatan yang tersembunyi.',
    amalan:
      'Perbanyak kebaikan-kebaikan kecil yang sering diremehkan: menyingkirkan duri di jalan, senyum, sedekah receh rutin, menahan kata buruk. Dan jauhi dosa-dosa "kecil" yang dianggap sepele. Bayangkan "rekaman bumi" atas perbuatanmu — ia akan bersaksi.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-ala-14-17',
    kajianKata: [
      { kata: 'قَدْ أَفْلَحَ مَن تَزَكَّىٰ', latin: 'qad aflaḥa man tazakkā', arti: 'sungguh beruntung orang yang menyucikan diri',
        poin: [
          '«aflaḥa» (beruntung — dari akar falāḥ/petani membelah tanah) diraih oleh «man tazakkā».',
          '«tazakkā» bukan sekadar "membersihkan" — akar z-k-w berarti SUCI sekaligus TUMBUH.',
        ],
        asalKata: { huruf: ['ز', 'ك', 'و'], makna: 'suci sekaligus tumbuh-berkembang',
          gambar: 'Akar «z-k-w» (akar yang sama dengan "zakat") menyatukan dua makna indah: <b>menyucikan</b> dan <b>menumbuhkan</b>. Seperti kebun yang dibersihkan dari gulma justru makin subur, jiwa yang disucikan dari dosa & kikir justru <b>tumbuh & berkembang</b>. Maka «qad aflaḥa man tazakkā»: keberuntungan milik yang membersihkan hatinya — dan pembersihan itu <b>bukan mengurangi, melainkan menumbuhkan</b>.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'وَالْآخِرَةُ خَيْرٌ وَأَبْقَىٰ', latin: 'wal-ākhiratu khairuw wa abqā', arti: 'padahal akhirat lebih baik dan lebih kekal',
        poin: [
          'Diagnosis abadi: «bal tu’ṡirūnal-ḥayātad-dunyā» — kamu LEBIH MEMILIH dunia (yang dekat & cepat).',
          'Padahal akhirat «khairun» (lebih baik — kualitas) DAN «abqā» (lebih kekal — durasi): dua keunggulan sekaligus.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Sukses = menyucikan jiwa, bukan menumpuk dunia.',
      'Membersihkan hati bukan mengurangi — justru menumbuhkan.',
      'Dunia cepat & fana; akhirat lebih baik & kekal.',
    ],
    surah: 'Al-A‘lā',
    surahNo: 87,
    ayatNo: '14–17',
    juz: 30,
    tema: ['Menyucikan jiwa', 'Dunia vs akhirat', 'Keberuntungan'],
    gratis: false,
    arab: 'قَدْ أَفْلَحَ مَن تَزَكَّىٰ ۝ وَذَكَرَ اسْمَ رَبِّهِ فَصَلَّىٰ ۝ بَلْ تُؤْثِرُونَ الْحَيَاةَ الدُّنْيَا ۝ وَالْآخِرَةُ خَيْرٌ وَأَبْقَىٰ',
    latin: 'Qad aflaḥa man tazakkā. Wa żakarasma rabbihī fa ṣallā. Bal tu’ṡirūnal-ḥayātad-dunyā. Wal-ākhiratu khairuw wa abqā.',
    arti: 'Sungguh beruntung orang yang menyucikan diri (dengan beriman), dan mengingat nama Tuhannya, lalu dia salat. Tetapi kamu (orang-orang kafir) memilih kehidupan dunia, padahal kehidupan akhirat itu lebih baik dan lebih kekal.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus untuk potongan ayat ini. Bagian penutup Al-A‘lā ini merangkum jalan keberuntungan (menyucikan jiwa, zikir, salat) dan menegur kecenderungan manusia mengutamakan dunia.',
    tafsir:
      'Allah menegaskan bahwa keberuntungan sejati milik orang yang menyucikan jiwanya, mengingat Tuhannya, lalu menegakkan salat. Lalu Dia menegur kecenderungan manusia yang lebih memilih kehidupan dunia yang dekat, padahal akhirat lebih baik mutunya dan lebih kekal masanya.',
    hikmah:
      'Ukuran sukses dibalik: bukan seberapa banyak dunia kau kumpulkan, tapi seberapa bersih jiwamu. Dan pembersihan jiwa, seperti merawat kebun, justru menumbuhkannya — bukan menguranginya.',
    linguistik:
      'Kata «tazakkā» (dari z-k-w: suci + tumbuh) menyiratkan bahwa menyucikan diri adalah pertumbuhan, bukan kehilangan. Penutup «khairuw wa abqā» menggabungkan dua keunggulan akhirat sekaligus: lebih baik (kualitas) dan lebih kekal (durasi) — menjawab tuntas kenapa tak layak menukar akhirat dengan dunia.',
    amalan:
      'Sisihkan waktu "menyucikan jiwa" tiap hari: istighfar, muhasabah, sedekah (yang menumbuhkan, bukan mengurangi harta). Saat tergoda mengutamakan dunia, ucap pada diri: "khairuw wa abqā" — yang di sana lebih baik & lebih kekal.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-ghasyiyah-17-20',
    kajianKata: [
      { kata: 'أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ', latin: 'afalā yanẓurūna ilal-ibili kaifa khuliqat', arti: 'tidakkah mereka memperhatikan unta, bagaimana ia diciptakan?',
        poin: [
          'Renungan dimulai dari «al-ibil» (UNTA) — makhluk paling dekat & akrab bagi orang Arab, bukan yang jauh.',
          'Empat tatapan menaik: unta (dekat) → langit (tinggi) → gunung (kokoh) → bumi (hamparan).',
          'Pertanyaannya «KAIFA» (bagaimana) — mengajak mengamati DESAIN & ketelitiannya, bukan sekadar keberadaannya.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'وَإِلَى الْجِبَالِ كَيْفَ نُصِبَتْ', latin: 'wa ilal-jibāli kaifa nuṣibat', arti: 'dan gunung-gunung, bagaimana ia ditegakkan?',
        poin: [
          'Tiap detail unta "pas" untuk gurun (punuk, kaki, mata, perut) — bukti adanya Perancang.',
          'Iman menguat lewat MEMPERHATIKAN ciptaan dengan saksama, bukan sekadar melewatinya.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Tanda kebesaran-Nya ada di hal terdekat — perhatikanlah.',
      'Iman menguat lewat tadabbur ciptaan, bukan hanya teori.',
      'Mulai mengenal Allah dari yang dekat (unta), bukan yang jauh.',
    ],
    surah: 'Al-Ghāsyiyah',
    surahNo: 88,
    ayatNo: '17–20',
    juz: 30,
    tema: ['Tadabbur ciptaan', 'Bukti keesaan', 'Akal & iman'],
    gratis: false,
    arab: 'أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ ۝ وَإِلَى السَّمَاءِ كَيْفَ رُفِعَتْ ۝ وَإِلَى الْجِبَالِ كَيْفَ نُصِبَتْ ۝ وَإِلَى الْأَرْضِ كَيْفَ سُطِحَتْ',
    latin: 'Afalā yanẓurūna ilal-ibili kaifa khuliqat. Wa ilas-samā’i kaifa rufi‘at. Wa ilal-jibāli kaifa nuṣibat. Wa ilal-arḍi kaifa suṭiḥat.',
    arti: 'Maka tidakkah mereka memperhatikan unta, bagaimana ia diciptakan? Dan langit, bagaimana ia ditinggikan? Dan gunung-gunung, bagaimana ia ditegakkan? Dan bumi, bagaimana ia dihamparkan?',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Ayat ini mengajak orang yang ragu untuk memperhatikan ciptaan di sekitarnya sebagai bukti kekuasaan & kebijaksanaan Penciptanya.',
    tafsir:
      'Allah mengajak manusia menatap empat hal: unta yang akrab di kehidupan mereka, langit yang ditinggikan tanpa tiang, gunung yang ditegakkan kokoh, dan bumi yang dihamparkan. Semua dirancang dengan ketelitian yang menuntun akal jujur kepada pengakuan akan Sang Pencipta.',
    hikmah:
      'Bukti keimanan tak selalu jauh & rumit; ia tersebar pada hal-hal terdekat yang kita lewati tiap hari. Yang dibutuhkan hanyalah berhenti sejenak untuk benar-benar "memperhatikan", bukan sekadar melihat.',
    linguistik:
      'Dipilih «al-ibil» (unta) sebagai contoh pertama karena ialah makhluk paling lekat dengan keseharian audiens awal — pelajaran dimulai dari yang dekat. Kata tanya «kaifa» (bagaimana) mengarahkan perhatian pada cara & desain penciptaan, bukan sekadar fakta keberadaannya — mengundang perenungan, bukan hafalan.',
    amalan:
      'Biasakan "tadabbur 1 menit": saat melihat langit, hujan, tubuhmu, atau hewan, berhenti & tanya "bagaimana ini dirancang?" lalu ucapkan "Subḥānallāh". Jadikan alam sekitar sebagai pengingat harian akan kebesaran-Nya.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-fajr-27-30',
    kajianKata: [
      { kata: 'يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ', latin: 'yā ayyatuhan-nafsul-muṭma’innah', arti: 'wahai jiwa yang tenang',
        poin: [
          '«al-muṭma’innah» — jiwa yang TENANG & mantap: berlabuh pada Allah hingga tak gelisah oleh dunia.',
          'Panggilan paling lembut di akhir hidup: "wahai jiwa yang tenang, kembalilah…" — sambutan, bukan hardikan.',
        ],
        asalKata: { huruf: ['ط', 'م', 'ن'], makna: 'tenang yang kokoh & menetap',
          gambar: 'Akar «ṭ-m-’-n» menggambarkan <b>ketenangan yang kokoh & menetap</b> — tanah rata yang stabil disebut "muṭma’inn". Maka «an-nafsul-muṭma’innah» adalah jiwa yang <b>berlabuh tenang pada Allah</b>: tak diombang-ambing ketakutan dunia, tak gelisah oleh kehilangan. Ketenangan ini buah dari zikir — «alā biżikrillāhi taṭma’innul-qulūb» (QS 13:28). Dialah jiwa yang dipanggil pulang dengan penuh kasih.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً', latin: 'irji‘ī ilā rabbiki rāḍiyatam marḍiyyah', arti: 'kembalilah kepada Tuhanmu dengan ridha dan diridhai',
        poin: [
          'Pulang dalam keadaan «rāḍiyah» (kamu ridha pada Allah) DAN «marḍiyyah» (Allah ridha padamu): dua arah cinta bertemu.',
          'Puncak kebahagiaan: bukan sekadar kau ridha pada-Nya, tapi Dia pun ridha padamu.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Ketenangan sejati lahir dari bergantung pada Allah, bukan pada dunia.',
      'Akhir terindah: dipanggil pulang dengan lembut.',
      'Kejar ridha-Nya, bukan sekadar ridha-mu.',
    ],
    surah: 'Al-Fajr',
    surahNo: 89,
    ayatNo: '27–30',
    juz: 30,
    tema: ['Ketenangan jiwa', 'Husnul khatimah', 'Ridha'],
    gratis: false,
    arab: 'يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ۝ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً ۝ فَادْخُلِي فِي عِبَادِي ۝ وَادْخُلِي جَنَّتِي',
    latin: 'Yā ayyatuhan-nafsul-muṭma’innah. Irji‘ī ilā rabbiki rāḍiyatam marḍiyyah. Fadkhulī fī ‘ibādī. Wadkhulī jannatī.',
    arti: 'Wahai jiwa yang tenang! Kembalilah kepada Tuhanmu dengan hati yang ridha dan diridhai-Nya. Maka masuklah ke dalam golongan hamba-hamba-Ku, dan masuklah ke dalam surga-Ku.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus yang pasti. Ayat penutup Al-Fajr ini melukiskan sambutan terindah bagi jiwa yang tenang saat kembali kepada Tuhannya.',
    tafsir:
      'Setelah memaparkan kesudahan orang yang tamak pada dunia, Allah menutup dengan sambutan bagi jiwa yang tenang: dipanggil dengan lembut untuk kembali kepada Tuhannya dalam keadaan ridha & diridhai, lalu dipersilakan masuk ke golongan hamba-hamba-Nya dan ke dalam surga-Nya.',
    hikmah:
      'Tujuan perjalanan jiwa adalah ketenangan yang berlabuh pada Allah. Jiwa yang tenang itulah yang kelak dipanggil pulang dengan kasih — bukan dengan ketakutan. Ketenangan itu dilatih sejak di dunia, lewat zikir & kepasrahan.',
    linguistik:
      'Kata «al-muṭma’innah» (dari ṭ-m-’-n: tenang yang kokoh) menggambarkan jiwa yang tak goyah. Pasangan «rāḍiyah» (subjek-aktif: ia ridha) & «marḍiyyah» (objek-pasif: ia diridhai) membentuk keseimbangan indah — cinta dua arah antara hamba & Tuhannya, puncak kebahagiaan yang dituju.',
    amalan:
      'Latih "jiwa yang tenang" sejak sekarang: perbanyak zikir (sumber ketenangan, QS 13:28), latih ridha pada takdir, & kurangi kegelisahan pada dunia. Tujuanmu bukan sekadar ridha pada Allah, tapi sampai Dia ridha padamu — kejar itu lewat ketaatan.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'an-naba-1-5',
    kajianKata: [
      { kata: 'عَنِ النَّبَإِ الْعَظِيمِ', latin: '‘anin-naba’il-‘aẓīm', arti: 'tentang berita yang besar',
        poin: [
          'Dibuka dengan pertanyaan retoris «‘amma yatasā’alūn» (tentang apa mereka bertanya?) — memancing perhatian sebelum menjawab.',
          '«an-naba’» = berita BESAR & pasti benar (bukan «khabar» biasa) — yakni hari Kebangkitan.',
        ],
        asalKata: { huruf: ['ن', 'ب', 'ء'], makna: 'berita besar, penting, & benar',
          gambar: 'Bahasa Arab membedakan «khabar» (kabar biasa, apa saja) dari «naba’»: <b>berita besar, penting, & bermanfaat yang pasti benar</b> — dari akar yang sama lahir kata «nabī» (pembawa berita agung dari langit). Maka hari Kebangkitan disebut «an-naba’ al-‘aẓīm» — bukan gosip yang bisa diabaikan, tapi <b>berita terbesar</b> yang menentukan nasib tiap orang, yang anehnya justru paling sering diperdebatkan & dilalaikan.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'كَلَّا سَيَعْلَمُونَ', latin: 'kallā saya‘lamūn', arti: 'sekali-kali tidak! kelak mereka akan mengetahui',
        poin: [
          'Pengulangan «kallā saya‘lamūn» — ancaman bertingkat bagi yang meragukan hari Kebangkitan.',
          'Kepastian ditegaskan dua kali: keraguan mereka pasti terjawab — tapi terlambat.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Berita terbesar hidupmu (akhirat) justru paling sering dilalaikan.',
      'Yang kini diragukan, kelak pasti diketahui — siapkan dirimu.',
      'Hidup bukan tanpa kelanjutan; ada "naba’ ‘aẓīm" yang menanti.',
    ],
    surah: 'An-Naba’',
    surahNo: 78,
    ayatNo: '1–5',
    juz: 30,
    tema: ['Hari Kebangkitan', 'Keyakinan', 'Kelalaian'],
    gratis: false,
    arab: 'عَمَّ يَتَسَاءَلُونَ ۝ عَنِ النَّبَإِ الْعَظِيمِ ۝ الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ ۝ كَلَّا سَيَعْلَمُونَ ۝ ثُمَّ كَلَّا سَيَعْلَمُونَ',
    latin: '‘Amma yatasā’alūn. ‘Anin-naba’il-‘aẓīm. Allażī hum fīhi mukhtalifūn. Kallā saya‘lamūn. Ṡumma kallā saya‘lamūn.',
    arti: 'Tentang apakah mereka saling bertanya? Tentang berita yang besar (hari Kebangkitan), yang mereka perselisihkan. Sekali-kali tidak! Kelak mereka akan mengetahui. Kemudian sekali-kali tidak! Kelak mereka akan mengetahui.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Surah ini turun menjawab perdebatan & keraguan kaum musyrik tentang hari Kebangkitan, lalu memaparkan bukti-bukti kuasa Allah.',
    tafsir:
      'Allah membuka dengan pertanyaan retoris: apa yang mereka perdebatkan? Yaitu "berita besar" — hari Kebangkitan yang mereka ragukan. Lalu ditegaskan dua kali "kelak mereka akan mengetahui" sebagai ancaman, sebelum surah memaparkan tanda-tanda kekuasaan Allah di alam sebagai bukti keniscayaannya.',
    hikmah:
      'Hal terbesar yang menentukan nasib abadi manusia justru paling banyak dilalaikan & diperdebatkan. Orang sibuk pada kabar receh, tapi lalai pada "berita besar" yang pasti datang.',
    linguistik:
      'Dipilih «naba’» (berita besar & pasti benar), bukan «khabar» (kabar biasa) — menegaskan bobot hari Kebangkitan. Pertanyaan «‘amma yatasā’alūn» menarik perhatian, dan pengulangan «kallā saya‘lamūn» memberi tekanan ancaman yang berlapis.',
    amalan:
      'Periksa porsi perhatianmu: berapa banyak untuk kabar dunia yang fana, berapa untuk "berita besar" akhirat? Sisihkan waktu mengingat akhirat tiap hari (ziarah kubur sesekali, baca ayat hari akhir) agar ia tak terlalaikan.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'an-naziat-37-41',
    kajianKata: [
      { kata: 'وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ', latin: 'wa nahan-nafsa ‘anil-hawā', arti: 'dan menahan diri dari hawa nafsu',
        poin: [
          'Dua poros nasib: «ṭagā wa āṡaral-ḥayātad-dunyā» (melampaui batas & utamakan dunia) → neraka.',
          'Lawannya: «khāfa maqāma rabbihī wa nahan-nafsa ‘anil-hawā» (takut kebesaran Tuhan & MENAHAN jiwa dari hawa) → surga.',
          'Surga diraih bukan hanya dengan banyak amal, tapi dengan MENAHAN nafsu dari yang dilarang.',
        ],
        asalKata: { huruf: ['ه', 'و', 'ي'], makna: 'kecenderungan nafsu yang menjatuhkan',
          gambar: 'Akar «h-w-y» berarti <b>jatuh & turun ke bawah</b> (dari sini «hāwiyah» = jurang neraka). «Hawā» = kecenderungan nafsu yang <b>menarik jiwa ke bawah</b> — ke kenikmatan sesaat yang menjatuhkan. Menggetarkan: kata untuk "keinginan nafsu" satu akar dengan "jatuh". Maka «nahan-nafsa ‘anil-hawā» = menahan jiwa dari yang menjatuhkannya — itulah harga surga.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'مَنْ خَافَ مَقَامَ رَبِّهِ', latin: 'man khāfa maqāma rabbih', arti: 'orang yang takut akan kebesaran Tuhannya',
        poin: [
          'Bukan sekadar takut, tapi «khāfa maqāma rabbih» — sadar akan KEBESARAN & pengawasan Tuhannya.',
          'Rasa diawasi itulah yang melahirkan kekuatan menahan diri saat sendirian.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Surga bukan hanya soal banyak amal — tapi berani menahan nafsu.',
      '"Hawa" seakar dengan "jatuh": menurutinya berarti menjatuhkan diri.',
      'Rasa diawasi Allah adalah rem terkuat saat tak ada yang melihat.',
    ],
    surah: 'An-Nāzi‘āt',
    surahNo: 79,
    ayatNo: '37–41',
    juz: 30,
    tema: ['Melawan hawa nafsu', 'Takut kepada Allah', 'Surga & neraka'],
    gratis: false,
    arab: 'فَأَمَّا مَن طَغَىٰ ۝ وَآثَرَ الْحَيَاةَ الدُّنْيَا ۝ فَإِنَّ الْجَحِيمَ هِيَ الْمَأْوَىٰ ۝ وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ ۝ فَإِنَّ الْجَنَّةَ هِيَ الْمَأْوَىٰ',
    latin: 'Fa ammā man ṭagā. Wa āṡaral-ḥayātad-dunyā. Fa innal-jaḥīma hiyal-ma’wā. Wa ammā man khāfa maqāma rabbihī wa nahan-nafsa ‘anil-hawā. Fa innal-jannata hiyal-ma’wā.',
    arti: 'Maka adapun orang yang melampaui batas, dan lebih mengutamakan kehidupan dunia, maka sungguh, nerakalah tempat tinggalnya. Dan adapun orang yang takut kepada kebesaran Tuhannya dan menahan diri dari keinginan hawa nafsunya, maka sungguh, surgalah tempat tinggalnya.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Penutup An-Nāzi‘āt ini meringkas dua jalan manusia & kesudahannya: mengikuti hawa, atau menahannya karena takut kepada Allah.',
    tafsir:
      'Allah membagi manusia menjadi dua: yang melampaui batas & mengutamakan dunia, tempatnya neraka; dan yang takut akan kebesaran Tuhannya lalu menahan jiwanya dari hawa nafsu, tempatnya surga. Penentu nasib bukan keadaan lahir, tapi sikap hati terhadap nafsu & terhadap Allah.',
    hikmah:
      'Inti perjuangan seorang hamba adalah menahan nafsunya dari yang dilarang. Yang menggerakkan kekuatan itu bukan pengawasan manusia, tapi kesadaran akan kebesaran & pengawasan Allah di setiap saat.',
    linguistik:
      'Kata «hawā» (dari h-w-y: jatuh) menyiratkan bahwa menuruti nafsu berarti menjatuhkan diri ke bawah. Frasa «maqāma rabbih» (kedudukan/kebesaran Tuhannya) memperdalam makna takut — bukan takut biasa, tapi pengagungan yang melahirkan pengendalian diri.',
    amalan:
      'Latih "menahan nafsu" dari hal kecil: tahan pandangan, tahan kata, tahan belanja impulsif, tahan amarah. Saat sendirian & tergoda, hadirkan «maqāma rabbih» — bahwa Allah melihat. Itulah otot takwa yang menentukan tempat tinggalmu kelak.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'abasa-1-7',
    kajianKata: [
      { kata: 'عَبَسَ وَتَوَلَّىٰ أَن جَاءَهُ الْأَعْمَىٰ', latin: '‘abasa wa tawallā an jā’ahul-a‘mā', arti: 'dia bermuka masam dan berpaling karena seorang buta datang kepadanya',
        poin: [
          'Allah menegur Nabi ﷺ — kekasih-Nya — karena bermuka masam pada «al-a‘mā» (Ibnu Ummi Maktum) yang tulus mencari ilmu, demi melayani pembesar Quraisy.',
          'Pelajaran keras: yang menentukan perhatian bukan STATUS, tapi kesungguhan mencari kebenaran.',
          'Bahkan Nabi pun ditegur — bukti Al-Qur’an wahyu, bukan karangan beliau (mustahil seseorang menegur diri sendiri sekeras ini).',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'الْأَعْمَىٰ', latin: 'Al-a‘mā', sifat: ['Tulus & sungguh mencari', 'Layak diutamakan'] },
          { arab: 'مَنِ اسْتَغْنَىٰ', latin: 'Manistagnā', alt: true, sifat: ['Merasa cukup, tak butuh', 'Dipalingkan dari kebenaran'] },
        ], catatan: 'Yang diutamakan: si tulus pencari kebenaran, bukan si pongah yang merasa cukup.' },
        sumber: ['Tafsir Ibnu Katsir', 'Jami‘ at-Tirmidzi'] },
      { kata: 'وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ', latin: 'wa mā yudrīka la‘allahū yazzakkā', arti: 'tahukah engkau, barangkali dia ingin menyucikan diri',
        poin: [
          '«la‘allahū yazzakkā» — boleh jadi sang buta itu (akan) menyucikan diri: nilai seseorang dari potensi takwanya, bukan rupa/hartanya.',
          'Yang miskin & lemah bisa jadi lebih mulia di sisi Allah daripada pembesar yang berpaling.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
    ],
    hikmahPoin: [
      'Hargai orang dari ketulusannya mencari kebenaran, bukan dari status & hartanya.',
      'Jangan abaikan yang lemah demi mengambil hati yang berpengaruh.',
      'Al-Qur’an menegur Nabi sendiri — bukti kejujuran wahyu.',
    ],
    surah: '‘Abasa',
    surahNo: 80,
    ayatNo: '1–7',
    juz: 30,
    tema: ['Keadilan sikap', 'Kemuliaan sejati', 'Kejujuran wahyu'],
    gratis: false,
    arab: 'عَبَسَ وَتَوَلَّىٰ ۝ أَن جَاءَهُ الْأَعْمَىٰ ۝ وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ ۝ أَوْ يَذَّكَّرُ فَتَنفَعَهُ الذِّكْرَىٰ ۝ أَمَّا مَنِ اسْتَغْنَىٰ ۝ فَأَنتَ لَهُ تَصَدَّىٰ ۝ وَمَا عَلَيْكَ أَلَّا يَزَّكَّىٰ',
    latin: '‘Abasa wa tawallā. An jā’ahul-a‘mā. Wa mā yudrīka la‘allahū yazzakkā. Au yażżakkaru fa tanfa‘ahuż-żikrā. Ammā manistagnā. Fa anta lahū taṣaddā. Wa mā ‘alaika allā yazzakkā.',
    arti: 'Dia (Muhammad) bermuka masam dan berpaling, karena seorang buta telah datang kepadanya. Dan tahukah engkau barangkali dia ingin menyucikan dirinya, atau dia ingin mendapatkan pengajaran yang memberi manfaat kepadanya? Adapun orang yang merasa dirinya serba cukup, maka engkau melayaninya. Padahal tidak ada (cela) atasmu kalau dia tidak menyucikan diri.',
    asbabunNuzul:
      'Diriwayatkan bahwa ketika Nabi ﷺ sedang berbicara dengan para pembesar Quraisy yang diharap masuk Islam, datang Ibnu Ummi Maktum (seorang buta) bertanya tentang Islam. Nabi ﷺ tampak kurang berkenan karena fokus pada para pembesar, lalu turun teguran ini (riwayat masyhur, lihat Tafsir Ibnu Katsir & Tirmidzi).',
    tafsir:
      'Allah menegur Nabi ﷺ yang bermuka masam pada seorang buta yang tulus mencari ilmu, sementara beliau sibuk melayani pembesar yang merasa cukup. Teguran ini menegaskan timbangan Allah: yang berharga adalah kesungguhan mencari kebenaran & potensi takwa, bukan status sosial.',
    hikmah:
      'Allah menggeser ukuran kemuliaan dari pangkat & harta ke ketulusan hati. Bahwa Al-Qur’an menegur Nabi-Nya sendiri dengan begitu terbuka adalah bukti ia wahyu murni, bukan karangan manusia.',
    linguistik:
      'Pembukaan dengan kata kerja orang ketiga «‘abasa» (dia bermuka masam) sebelum beralih menyapa langsung adalah bentuk teguran yang lembut sekaligus tegas. Kontras «al-a‘mā» (yang tulus) dengan «manistagnā» (yang merasa cukup) menukik ke inti pelajaran: perhatian layak diberikan pada pencari kebenaran.',
    amalan:
      'Periksa caramu memperlakukan orang: apakah hangat pada yang "berguna" & dingin pada yang lemah? Latih memberi perhatian tulus pada pencari ilmu/kebaikan tanpa memandang status. Muliakan orang kecil yang bersungguh-sungguh menuju Allah.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Jami‘ at-Tirmidzi'],
  },
  {
    id: 'at-takwir-8-9',
    kajianKata: [
      { kata: 'وَإِذَا الْمَوْءُودَةُ سُئِلَتْ', latin: 'wa iżal-mau’ūdatu su’ilat', arti: 'dan apabila bayi perempuan yang dikubur hidup-hidup ditanya',
        poin: [
          '«al-mau’ūdah» — bayi perempuan yang dulu dikubur hidup-hidup oleh sebagian Arab jahiliah karena dianggap aib.',
          'Di Hari Kiamat, justru SI KORBAN yang ditanya — sebuah tuntutan keadilan yang menohok pelakunya.',
          'Al-Qur’an membela yang paling tak berdaya: bahkan bayi yang dibungkam, kelak diberi suara.',
        ],
        asalKata: { huruf: ['و', 'أ', 'د'], makna: 'mengubur (bayi) hidup-hidup',
          gambar: 'Akar «w-’-d» bermakna khusus: <b>mengubur bayi hidup-hidup</b> — kebiadaban jahiliah terhadap anak perempuan. Al-Qur’an menyebut korbannya «al-mau’ūdah» (yang dikubur) lalu menjadikannya <b>SAKSI yang ditanya</b>, bukan pelakunya. Susunannya menggetarkan: yang lemah & dibungkam di dunia, di akhirat <b>diberi suara untuk menuntut</b>. Keadilan-Nya tak melewatkan satu korban pun.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'بِأَيِّ ذَنبٍ قُتِلَتْ', latin: 'bi’ayyi żambin qutilat', arti: 'karena dosa apa dia dibunuh?',
        poin: [
          'Pertanyaan yang menohok pelakunya: "karena dosa APA ia dibunuh?" — sebab ia tak punya dosa sama sekali.',
          'Membela hak hidup & martabat anak perempuan, berabad sebelum isu itu mendunia.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Keadilan Allah tak melewatkan korban mana pun — bahkan yang dibungkam.',
      'Yang lemah di dunia akan diberi suara di akhirat.',
      'Islam memuliakan & membela anak perempuan sejak awal.',
    ],
    surah: 'At-Takwīr',
    surahNo: 81,
    ayatNo: '8–9',
    juz: 30,
    tema: ['Keadilan', 'Membela yang lemah', 'Hari akhir'],
    gratis: false,
    arab: 'وَإِذَا الْمَوْءُودَةُ سُئِلَتْ ۝ بِأَيِّ ذَنبٍ قُتِلَتْ',
    latin: 'Wa iżal-mau’ūdatu su’ilat. Bi’ayyi żambin qutilat.',
    arti: 'Dan apabila bayi-bayi perempuan yang dikubur hidup-hidup ditanya, karena dosa apa dia dibunuh?',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus untuk dua ayat ini. Keduanya bagian dari rangkaian tanda Hari Kiamat dalam At-Takwīr, menyinggung tradisi keji jahiliah mengubur bayi perempuan hidup-hidup.',
    tafsir:
      'Di antara peristiwa dahsyat Hari Kiamat: bayi perempuan yang dahulu dikubur hidup-hidup ditanya "karena dosa apa engkau dibunuh?". Pertanyaan kepada korban ini sejatinya tuntutan keadilan atas pelakunya, menegaskan bahwa tak ada kezaliman yang luput dari perhitungan Allah.',
    hikmah:
      'Allah membela yang paling lemah & tak bersuara. Pesan ini menanamkan penghormatan pada kehidupan & martabat manusia — khususnya anak perempuan — dan menenangkan setiap korban kezaliman bahwa keadilan pasti datang.',
    linguistik:
      'Dipilih kata «al-mau’ūdah» (dari w-’-d: mengubur hidup-hidup) yang spesifik & menggugah. Yang ditanya adalah korban, bukan pelaku — gaya bahasa yang justru melipatgandakan beratnya tuntutan atas pelakunya, sekaligus mengangkat martabat sang korban.',
    amalan:
      'Hormati & lindungi kehidupan, terutama yang lemah & tak bersuara (anak, perempuan, kaum tertindas). Jangan pernah meremehkan kezaliman "kecil" pada mereka — semua dicatat. Dan syukuri ajaran yang memuliakan martabat manusia.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-infitar-6-8',
    kajianKata: [
      { kata: 'مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ', latin: 'mā garraka bi rabbikal-karīm', arti: 'apa yang memperdayakanmu terhadap Tuhanmu Yang Maha Pemurah?',
        poin: [
          'Pertanyaan yang menyentuh: «mā garraka» — APA yang memperdayamu hingga berani durhaka?',
          'Disebut «bi rabbikal-KARĪM» (Yang Maha Pemurah), bukan "Yang Maha Keras" — seakan kemurahan-Nya sendiri yang membuatmu lengah & berani.',
          'Pelajaran halus: jangan jadikan kesabaran & kemurahan Allah sebagai alasan meremehkan-Nya.',
        ],
        asalKata: { huruf: ['غ', 'ر', 'ر'], makna: 'tertipu oleh yang tampak aman',
          gambar: 'Akar «gh-r-r» berarti <b>tertipu oleh sesuatu yang tampak aman</b> — «al-garar» dalam jual-beli = transaksi menipu yang tampak menguntungkan. «Mā garraka» = apa yang menipumu hingga lengah? Jawabannya tersirat pada «al-Karīm»: <b>justru kemurahan & kesabaran Allah</b> yang sering disalahpahami — ditutup-Nya aibmu, ditunda-Nya hukuman, lalu kau kira Dia tak peduli. Padahal itu kemurahan, bukan kelalaian.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'الَّذِي خَلَقَكَ فَسَوَّاكَ فَعَدَلَكَ', latin: 'allażī khalaqaka fa sawwāka fa ‘adalak', arti: 'yang menciptakanmu, menyempurnakanmu, dan menyeimbangkanmu',
        poin: [
          'Tiga karunia berurutan: «khalaqaka» (mencipta) → «sawwāka» (menyempurnakan) → «‘adalaka» (menyeimbangkan).',
          'Tubuh & dirimu adalah bukti kemurahan-Nya — maka malulah durhaka pada Yang begitu memuliakanmu.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Jangan salah paham: kemurahan Allah bukan tanda Dia tak peduli.',
      'Tubuhmu yang sempurna sudah cukup jadi alasan untuk taat, bukan durhaka.',
      'Yang menutupi aibmu & menunda hukumanmu layak kau syukuri, bukan kau remehkan.',
    ],
    surah: 'Al-Infiṭār',
    surahNo: 82,
    ayatNo: '6–8',
    juz: 30,
    tema: ['Kemurahan Allah', 'Mengenal diri', 'Syukur'],
    gratis: false,
    arab: 'يَا أَيُّهَا الْإِنسَانُ مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ ۝ الَّذِي خَلَقَكَ فَسَوَّاكَ فَعَدَلَكَ ۝ فِي أَيِّ صُورَةٍ مَّا شَاءَ رَكَّبَكَ',
    latin: 'Yā ayyuhal-insānu mā garraka bi rabbikal-karīm. Allażī khalaqaka fa sawwāka fa ‘adalak. Fī ayyi ṣūratim mā syā’a rakkabak.',
    arti: 'Wahai manusia! Apakah yang telah memperdayakanmu (berbuat durhaka) terhadap Tuhanmu Yang Maha Pemurah? Yang telah menciptakanmu lalu menyempurnakan kejadianmu dan menjadikan (susunan tubuh)mu seimbang. Dalam bentuk apa saja yang Dia kehendaki, Dia menyusun tubuhmu.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Ayat ini menyentil manusia dengan pertanyaan lembut: apa yang membuatnya berani durhaka kepada Tuhan yang justru Maha Pemurah kepadanya.',
    tafsir:
      'Allah menegur manusia dengan pertanyaan menggugah: apa yang memperdayamu sehingga lalai & durhaka kepada Tuhanmu Yang Maha Pemurah — yang menciptakan, menyempurnakan, & menyeimbangkan tubuhmu dalam bentuk terbaik? Penyebutan sifat "al-Karīm" justru menambah dalam rasa malu seharusnya.',
    hikmah:
      'Banyak orang menyalahartikan kemurahan & kesabaran Allah sebagai kelalaian, lalu berani bermaksiat. Surah ini meluruskan: kelembutan-Nya menutupi aib & menunda hukuman adalah anugerah, bukan tanda Dia tak peduli.',
    linguistik:
      'Penyebutan «al-Karīm» (Maha Pemurah) di tempat yang menuntut taat justru menukik: kemurahan-Nya itulah yang sering "memperdaya". Kata «garra» (dari gh-r-r: tertipu oleh yang tampak aman) menangkap psikologi manusia yang terlena oleh penangguhan hukuman.',
    amalan:
      'Saat tergoda menunda taubat karena "toh Allah Maha Pengampun", ingat ayat ini: jangan jadikan kemurahan-Nya sebagai modal bermaksiat. Sebaliknya, balas kemurahan dengan rasa malu & ketaatan. Renungi kesempurnaan tubuhmu sebagai pengingat harian.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-mutaffifin-1-3',
    kajianKata: [
      { kata: 'وَيْلٌ لِّلْمُطَفِّفِينَ', latin: 'wailul lil-muṭaffifīn', arti: 'celakalah orang-orang yang curang (dalam takaran)',
        poin: [
          '«at-taṭfīf» = curang yang SEDIKIT — mengurangi takaran/timbangan secuil; namun balasannya «wail» (celaka).',
          'Mengerikan: dosa "kecil" yang dianggap remeh pun mendatangkan ancaman keras.',
        ],
        asalKata: { huruf: ['ط', 'ف', 'ف'], makna: 'sedikit; curang dalam jumlah kecil',
          gambar: 'Akar «ṭ-f-f» bermakna <b>sesuatu yang sedikit & di tepi</b> (ṭaff = pinggir). «Taṭfīf» = curang dalam <b>jumlah yang sedikit</b> — mengurangi takaran secuil yang nyaris tak terlihat. Mengerikan: Al-Qur’an menjatuhkan «wail» (celaka) untuk kecurangan SEKECIL itu. Sebab yang dirusak bukan sekadar timbangan, tapi <b>kejujuran & kepercayaan</b> — dan dosa kecil yang diremehkan sering jadi pintu kehancuran.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'وَإِذَا كَالُوهُمْ أَو وَّزَنُوهُمْ يُخْسِرُونَ', latin: 'wa iżā kālūhum au wazanūhum yukhsirūn', arti: 'apabila menakar/menimbang untuk orang lain, mereka menguranginya',
        poin: [
          'Penyakitnya: STANDAR GANDA — minta dipenuhi saat menerima, tapi mengurangi saat memberi.',
          'Berlaku luas: bukan cuma timbangan pedagang, tapi setiap "mengurangi hak" orang — kerja, janji, pelayanan.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Curang sedikit pun mengundang celaka — kejujuran tak boleh ditawar.',
      'Jangan berstandar ganda: adil untuk diri, longgar untuk orang.',
      '"Mengurangi hak orang" tak terbatas timbangan — termasuk kerja & janji.',
    ],
    surah: 'Al-Muṭaffifīn',
    surahNo: 83,
    ayatNo: '1–3',
    juz: 30,
    tema: ['Kejujuran', 'Keadilan', 'Hak orang lain'],
    gratis: false,
    arab: 'وَيْلٌ لِّلْمُطَفِّفِينَ ۝ الَّذِينَ إِذَا اكْتَالُوا عَلَى النَّاسِ يَسْتَوْفُونَ ۝ وَإِذَا كَالُوهُمْ أَو وَّزَنُوهُمْ يُخْسِرُونَ',
    latin: 'Wailul lil-muṭaffifīn. Allażīna iżaktālū ‘alan-nāsi yastaufūn. Wa iżā kālūhum au wazanūhum yukhsirūn.',
    arti: 'Celakalah orang-orang yang curang (dalam menakar dan menimbang)! (Yaitu) orang-orang yang apabila menerima takaran dari orang lain mereka minta dipenuhi, dan apabila mereka menakar atau menimbang untuk orang lain, mereka menguranginya.',
    asbabunNuzul:
      'Diriwayatkan bahwa ketika Nabi ﷺ tiba di Madinah, penduduknya termasuk yang paling buruk dalam menakar & menimbang; lalu turun surah ini, dan mereka pun memperbaiki timbangan mereka (Tafsir Ibnu Katsir).',
    tafsir:
      'Ancaman keras "celaka" bagi para pengurang takaran & timbangan, yang berstandar ganda: menuntut penuh saat menerima hak, tetapi mengurangi saat menunaikan hak orang lain. Surah ini menegakkan kejujuran ekonomi sebagai bagian dari iman.',
    hikmah:
      'Yang dikecam bukan sekadar selisih gram, tapi mentalitas tidak jujur & standar ganda. Bila kecurangan sekecil ini diancam celaka, betapa kita harus menjaga setiap hak orang lain dalam muamalah.',
    linguistik:
      'Kata «muṭaffifīn» (dari ṭ-f-f: sedikit) menyorot bahwa kecurangan yang dikecam adalah yang kecil & samar — justru karena itulah ia berbahaya, sebab pelakunya merasa aman. Kontras «yastaufūn» (minta penuh) vs «yukhsirūn» (mengurangi) menelanjangi standar ganda mereka.',
    amalan:
      'Tegakkan kejujuran dalam takaran terkecil: penuhi hak pelanggan, karyawan, & rekan seperti kau ingin hakmu dipenuhi. Hindari "mengurangi" diam-diam — waktu kerja, kualitas, janji. Uji dirimu: apakah standarmu sama untuk diri & untuk orang lain?',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-insyiqaq-6',
    kajianKata: [
      { kata: 'إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا', latin: 'innaka kādiḥun ilā rabbika kadḥā', arti: 'sesungguhnya kamu bekerja keras menuju Tuhanmu',
        poin: [
          '«kādiḥ» — bekerja keras dengan susah-payah & lelah; hidup digambarkan sebagai PERJALANAN penuh jerih.',
          '«ilā rabbika… fa mulāqīh» — tiap langkah & susahmu menuju satu titik: berjumpa Tuhanmu. Pasti.',
          'Pertanyaannya bukan "apakah kau lelah" — tapi "MENUJU apa kelelahanmu?": menuju Allah, atau yang fana?',
        ],
        asalKata: { huruf: ['ك', 'د', 'ح'], makna: 'bekerja keras hingga berbekas & letih',
          gambar: 'Akar «k-d-ḥ» berarti <b>bekerja keras hingga membekas & meletihkan</b> — sampai meninggalkan goresan. Al-Qur’an memilihnya untuk hidup manusia: kau <b>terus mengerahkan tenaga</b>, suka atau tidak, hingga berbekas. Pertanyaannya bukan apakah kau berjerih — semua berjerih — tapi <b>ke mana</b> jerihmu bermuara. Surah ini menjawab: «ilā rabbika» — menuju Tuhanmu, dan kau pasti berjumpa dengan-Nya.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'فَمُلَاقِيهِ', latin: 'fa mulāqīh', arti: 'maka kamu akan menemui-Nya',
        poin: [
          '«fa mulāqīh» — maka kau PASTI menemui-Nya: tujuan perjalanan ini tak terhindarkan.',
          'Mengubah cara memandang lelah: bukan menuju kubur yang gelap, tapi menuju perjumpaan dengan Tuhan.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Semua orang lelah berjuang — yang membedakan: menuju apa.',
      'Arahkan jerih payahmu kepada Allah, agar tak sia-sia.',
      'Hidup adalah perjalanan menuju perjumpaan dengan-Nya.',
    ],
    surah: 'Al-Insyiqāq',
    surahNo: 84,
    ayatNo: '6',
    juz: 30,
    tema: ['Makna hidup', 'Perjumpaan dengan Allah', 'Tujuan'],
    gratis: false,
    arab: 'يَا أَيُّهَا الْإِنسَانُ إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا فَمُلَاقِيهِ',
    latin: 'Yā ayyuhal-insānu innaka kādiḥun ilā rabbika kadḥan fa mulāqīh.',
    arti: 'Wahai manusia! Sesungguhnya kamu telah bekerja keras menuju Tuhanmu dengan susah payah, maka kamu pasti akan menemui-Nya.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Ayat ini menegaskan hakikat perjalanan hidup setiap manusia: berjerih payah yang pasti bermuara pada perjumpaan dengan Allah.',
    tafsir:
      'Allah menyapa manusia: hidupmu adalah kerja keras yang melelahkan, dan ke mana pun arahnya, ia berujung pada perjumpaan dengan Tuhanmu. Pengakuan ini menuntut kesadaran agar jerih payah itu diarahkan kepada Allah, bukan habis untuk yang sia-sia.',
    hikmah:
      'Setiap orang berletih dalam hidupnya — bekerja, berjuang, menanggung. Yang menentukan nilai bukan beratnya, tapi arahnya. Mengarahkan seluruh jerih kepada Allah menjadikan lelah pun bernilai ibadah.',
    linguistik:
      'Kata «kādiḥ» (dari k-d-ḥ: kerja keras yang membekas) melukiskan hidup sebagai pengerahan tenaga tanpa henti. Frasa «ilā rabbika… fa mulāqīh» memberi arah & kepastian: jerih itu menuju Allah, dan perjumpaan dengan-Nya pasti terjadi.',
    amalan:
      'Tinjau ke mana energimu terbesar tertuju setiap hari — apakah ada porsi yang benar-benar "menuju Allah"? Niatkan pekerjaan & lelahmu sebagai ibadah & jalan mendekat kepada-Nya, agar tak ada keringat yang sia-sia di hari perjumpaan.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-buruj-14-16',
    kajianKata: [
      { kata: 'وَهُوَ الْغَفُورُ الْوَدُودُ', latin: 'wa huwal-gafūrul-wadūd', arti: 'dan Dialah Yang Maha Pengampun, Maha Pengasih',
        poin: [
          '«al-Wadūd» — Yang Maha MENCINTAI: bukan sekadar mengasihi, tapi cinta yang ditampakkan dalam perlakuan lembut.',
          'Berdampingan «al-Gafūr al-Wadūd»: Dia mengampuni dosamu, LALU tetap mencintaimu — ampunan yang disertai kasih.',
          'Di tengah kisah Aṣḥābul-Ukhdūd (penyiksaan orang beriman), nama ini menenangkan: Tuhanmu Maha Pencinta.',
        ],
        asalKata: { huruf: ['و', 'د', 'د'], makna: 'cinta yang lembut & ditampakkan',
          gambar: 'Akar «w-d-d» bukan cinta yang tersimpan diam, tapi <b>kasih yang ditampakkan dalam sikap & perlakuan</b> — dari sini «mawaddah» (kasih sayang suami-istri). Pola «fa‘ūl» pada «al-Wadūd» menambah intensitas: <b>Maha Mencintai, terus-menerus</b>. Letaknya menakjubkan: tepat setelah «al-Gafūr» — Dia tak hanya mengampuni hamba yang kembali, tapi <b>menyambutnya dengan cinta</b>. Diampuni saja sudah lega; diampuni LALU dicintai — itulah puncak kemurahan.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'فَعَّالٌ لِّمَا يُرِيدُ', latin: 'fa‘‘ālul limā yurīd', arti: 'Maha Kuasa berbuat apa yang Dia kehendaki',
        poin: [
          '«fa‘‘ālul limā yurīd» — cinta & ampunan-Nya ditopang KUASA mutlak: tak ada yang membatasi kehendak-Nya.',
          'Maka harapkan ampunan & cinta-Nya tanpa ragu — Dia sungguh mampu mewujudkannya.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Dia tak hanya mengampuni — Dia mencintai hamba yang kembali.',
      'Saat tertindas karena iman, ingat: Tuhanmu Al-Wadūd (Maha Pencinta).',
      'Ampunan & cinta-Nya ditopang kuasa tanpa batas — jangan putus asa.',
    ],
    surah: 'Al-Burūj',
    surahNo: 85,
    ayatNo: '14–16',
    juz: 30,
    tema: ['Nama Allah', 'Cinta & ampunan', 'Sabar atas ujian'],
    gratis: false,
    arab: 'وَهُوَ الْغَفُورُ الْوَدُودُ ۝ ذُو الْعَرْشِ الْمَجِيدُ ۝ فَعَّالٌ لِّمَا يُرِيدُ',
    latin: 'Wa huwal-gafūrul-wadūd. Żul-‘arsyil-majīd. Fa‘‘ālul limā yurīd.',
    arti: 'Dan Dialah Yang Maha Pengampun, Maha Pengasih, yang memiliki ‘Arsy, lagi Maha Mulia, Maha Kuasa berbuat apa yang Dia kehendaki.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus untuk ayat ini. Ia datang dalam konteks kisah Aṣḥābul-Ukhdūd (orang-orang beriman yang dibakar di parit), menenangkan kaum mukmin dengan sifat-sifat Allah yang agung.',
    tafsir:
      'Setelah memaparkan kekejaman penindas orang beriman, Allah menutup dengan sifat-sifat-Nya: Maha Pengampun lagi Maha Pengasih (al-Wadūd), pemilik ‘Arsy yang mulia, dan Maha Kuasa berbuat apa pun yang Dia kehendaki. Penyebutan kasih di tengah kisah penyiksaan menanamkan harapan & ketenangan.',
    hikmah:
      'Nama «al-Wadūd» menyingkap bahwa hubungan hamba dengan Allah bukan sekadar takut & ampunan, tapi juga cinta. Dia mengampuni lalu menyambut dengan kasih — penghiburan terbesar bagi orang yang berdosa maupun yang tertindas.',
    linguistik:
      'Kata «al-Wadūd» (dari w-d-d: cinta yang ditampakkan, pola fa‘ūl yang intensif) diletakkan tepat setelah «al-Gafūr» — menggabungkan ampunan dengan kasih. Penutup «fa‘‘ālul limā yurīd» menegaskan bahwa cinta & ampunan itu ditopang kuasa mutlak yang tak terbatas.',
    amalan:
      'Saat merasa terlalu berdosa untuk kembali, ingat «al-Gafūr al-Wadūd»: Dia mengampuni & mencintai yang pulang kepada-Nya. Tumbuhkan cinta kepada Allah, bukan sekadar takut. Dan saat diuji karena kebaikan, bersandarlah pada Tuhan yang Maha Kuasa atas segala kehendak-Nya.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'at-tariq-5-8',
    kajianKata: [
      { kata: 'فَلْيَنظُرِ الْإِنسَانُ مِمَّ خُلِقَ', latin: 'fal-yanẓuril-insānu mimma khuliq', arti: 'maka hendaklah manusia memperhatikan dari apa dia diciptakan',
        poin: [
          '«fal-yanẓuril-insānu mimma khuliq» — perhatikan asalmu: dari «mā’in dāfiq» (air yang terpancar), sesuatu yang hina & lemah.',
          'Renungan asal-usul = obat kesombongan: dari setetes, mengapa berani angkuh?',
        ],
        asalKata: { huruf: ['د', 'ف', 'ق'], makna: 'tertuang & terpancar deras',
          gambar: 'Akar «d-f-q» berarti <b>tertuang/terpancar dengan deras</b>. Al-Qur’an memilihnya untuk asal-usulmu: «mā’in dāfiq» — setetes yang terpancar, sesuatu yang <b>hina, lemah, & tak berdaya</b>. Renungan ini menampar dua arah sekaligus: <b>obat kesombongan</b> (dari air hina, mengapa angkuh?) dan <b>bukti kebangkitan</b> (Yang mampu mencipta dari setetes, tentu mampu menghidupkan kembali).' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'إِنَّهُ عَلَىٰ رَجْعِهِ لَقَادِرٌ', latin: 'innahū ‘alā raj‘ihī laqādir', arti: 'sungguh Dia benar-benar kuasa mengembalikannya (hidup)',
        poin: [
          'Argumen tak terbantah: Yang menciptakanmu dari setetes, PASTI kuasa mengembalikanmu hidup.',
          'Maka hari kebangkitan bukan dongeng — ia keniscayaan logis dari kuasa Pencipta.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Ingat asalmu dari setetes — runtuhlah kesombongan.',
      'Yang mencipta dari tiada, mudah mengulang — kebangkitan itu pasti.',
      'Tubuhmu sendiri adalah bukti & pengingat.',
    ],
    surah: 'Aṭ-Ṭāriq',
    surahNo: 86,
    ayatNo: '5–8',
    juz: 30,
    tema: ['Asal penciptaan', 'Kebangkitan', 'Rendah hati'],
    gratis: false,
    arab: 'فَلْيَنظُرِ الْإِنسَانُ مِمَّ خُلِقَ ۝ خُلِقَ مِن مَّاءٍ دَافِقٍ ۝ يَخْرُجُ مِن بَيْنِ الصُّلْبِ وَالتَّرَائِبِ ۝ إِنَّهُ عَلَىٰ رَجْعِهِ لَقَادِرٌ',
    latin: 'Fal-yanẓuril-insānu mimma khuliq. Khuliqa min mā’in dāfiq. Yakhruju mim bainiṣ-ṣulbi wat-tarā’ib. Innahū ‘alā raj‘ihī laqādir.',
    arti: 'Maka hendaklah manusia memperhatikan dari apa dia diciptakan. Dia diciptakan dari air (mani) yang terpancar, yang keluar dari antara tulang punggung dan tulang dada. Sungguh, Allah benar-benar kuasa untuk mengembalikannya (hidup setelah mati).',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Ayat ini mengajak manusia merenungi asal-usulnya yang hina sebagai bukti kuasa Allah & keniscayaan kebangkitan.',
    tafsir:
      'Allah memerintahkan manusia memperhatikan asalnya — dari setetes air yang terpancar — sebagai bukti dua hal: betapa lemah & hinanya asal-usulnya (penawar kesombongan), dan bahwa Yang menciptakannya dari ketiadaan pasti kuasa membangkitkannya kembali.',
    hikmah:
      'Mengingat asal yang hina meruntuhkan kesombongan, dan sekaligus meneguhkan keyakinan akan hari kebangkitan: tak masuk akal mengingkari kuasa mengulang bagi Dzat yang telah memulai dari tiada.',
    linguistik:
      'Kata «dāfiq» (dari d-f-q: terpancar deras) melukiskan asal manusia yang lemah. Lalu «innahū ‘alā raj‘ihī laqādir» menutup dengan logika kuat: kemampuan mencipta pertama kali adalah dalil pasti atas kemampuan mengembalikan.',
    amalan:
      'Saat kesombongan menyusup (karena harta, jabatan, prestasi), ingat asalmu dari setetes air. Dan saat ragu pada akhirat, renungi: Yang menciptamu dari tiada pasti mampu membangkitkanmu. Jadikan keduanya pengingat untuk rendah hati & bersiap.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-balad-11-16',
    kajianKata: [
      { kata: 'فَلَا اقْتَحَمَ الْعَقَبَةَ', latin: 'falaqtaḥamal-‘aqabah', arti: 'tetapi dia tidak menempuh jalan yang mendaki lagi sukar',
        poin: [
          '«al-‘aqabah» — jalan MENDAKI yang terjal: gambaran bahwa kebaikan sejati itu BERAT, melawan tarikan nafsu & harta.',
          '«iqtaḥama» (menerjang) — menempuhnya butuh keberanian & tekad, bukan langkah santai.',
          'Isi pendakian itu konkret: «fakku raqabah» (membebaskan budak), memberi makan yatim & miskin di hari kelaparan.',
        ],
        asalKata: { huruf: ['ع', 'ق', 'ب'], makna: 'tanjakan terjal di pegunungan',
          gambar: 'Akar «‘-q-b» berkait dengan <b>tumit & ujung</b>; «al-‘aqabah» = <b>jalan menanjak terjal</b> di pegunungan yang berat didaki. Al-Qur’an memakainya untuk amal kebaikan: memerdekakan budak, memberi makan yatim & miskin di masa sulit — semua itu "mendaki", <b>melawan gravitasi kikir & ego</b>. Kebaikan jarang menurun & mudah; ia menanjak. Dan «iqtaḥama» (menerjang) menegaskan: butuh tekad, bukan sekadar niat.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ', latin: 'au iṭ‘āmun fī yaumin żī masgabah', arti: 'atau memberi makan pada hari kelaparan',
        poin: [
          'Sedekah paling bernilai: «fī yaumin żī masgabah» — di masa KELAPARAN, saat memberi terasa paling berat.',
          'Diutamakan yatim kerabat & miskin yang melarat — kebaikan yang menjangkau yang paling membutuhkan.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Kebaikan sejati itu "mendaki" — berat, melawan kikir & ego.',
      'Sedekah paling bernilai saat memberi terasa paling berat.',
      'Jangkau yang paling membutuhkan: yatim & miskin yang melarat.',
    ],
    surah: 'Al-Balad',
    surahNo: 90,
    ayatNo: '11–16',
    juz: 30,
    tema: ['Amal yang berat', 'Sedekah', 'Membebaskan & memberi makan'],
    gratis: false,
    arab: 'فَلَا اقْتَحَمَ الْعَقَبَةَ ۝ وَمَا أَدْرَاكَ مَا الْعَقَبَةُ ۝ فَكُّ رَقَبَةٍ ۝ أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ ۝ يَتِيمًا ذَا مَقْرَبَةٍ ۝ أَوْ مِسْكِينًا ذَا مَتْرَبَةٍ',
    latin: 'Falaqtaḥamal-‘aqabah. Wa mā adrāka mal-‘aqabah. Fakku raqabah. Au iṭ‘āmun fī yaumin żī masgabah. Yatīman żā maqrabah. Au miskīnan żā matrabah.',
    arti: 'Tetapi dia tidak menempuh jalan yang mendaki lagi sukar. Dan tahukah kamu apakah jalan yang mendaki lagi sukar itu? (Yaitu) melepaskan perbudakan, atau memberi makan pada hari kelaparan, (kepada) anak yatim yang ada hubungan kerabat, atau orang miskin yang sangat fakir.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Surah ini menegaskan bahwa manusia diciptakan untuk berjuang, dan menyodorkan "jalan mendaki" berupa amal-amal sosial yang berat namun mulia.',
    tafsir:
      'Allah mencela orang yang tidak menempuh "al-‘aqabah" — jalan mendaki kebaikan — lalu menjelaskannya: membebaskan budak, memberi makan di masa kelaparan kepada yatim kerabat & orang miskin yang melarat. Kebaikan sejati menuntut pengorbanan, terutama saat memberi terasa berat.',
    hikmah:
      'Kebaikan yang bernilai biasanya "menanjak" — berlawanan dengan kecenderungan kikir & nyaman. Justru di titik terberat itulah amal paling dihargai. Surah ini mengarahkan kemurahan kepada yang paling membutuhkan.',
    linguistik:
      'Kata «al-‘aqabah» (tanjakan terjal) menggambarkan beratnya amal kebaikan, diperkuat «iqtaḥama» (menerjang dengan tekad). Pilihan «fī yaumin żī masgabah» (hari kelaparan) menonjolkan nilai sedekah pada saat tersulit, & «matrabah» (sangat fakir, sampai berdebu) menukik pada yang paling papa.',
    amalan:
      'Pilih satu "pendakian" pekan ini: bantu pembebasan utang seseorang, beri makan yang lapar, santuni yatim/dhuafa — terutama saat dompetmu sedang seret (di situ nilainya berlipat). Latih diri menerjang kebaikan yang berat, bukan hanya yang nyaman.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'asy-syams-7-10',
    kajianKata: [
      { kata: 'قَدْ أَفْلَحَ مَن زَكَّاهَا', latin: 'qad aflaḥa man zakkāhā', arti: 'sungguh beruntung orang yang menyucikan jiwanya',
        poin: [
          'Jiwa diberi DUA potensi: «fujūrahā wa taqwāhā» (kecenderungan jahat & takwa) — kamu yang memilih.',
          'Beruntung «man zakkāhā» (menyucikan & menumbuhkan jiwa); rugi «man dassāhā» (mengubur & mengerdilkannya).',
        ],
        asalKata: { huruf: ['د', 'س', 'س'], makna: 'menyembunyikan & mengubur dalam kotoran',
          gambar: 'Akar «d-s-s» berarti <b>menyusupkan & menyembunyikan</b> sesuatu (dari sini «dassa» — mengubur dalam tanah). Maka «man dassāhā» = orang yang <b>mengubur & mengerdilkan jiwanya</b> di bawah dosa, menyembunyikan fitrahnya yang bersih hingga lemas. Lawannya «zakkā» (menyucikan + menumbuhkan). Dua kata berlawanan arah: satu menumbuhkan jiwa ke atas, satu menguburnya ke bawah — dan pilihannya di tanganmu.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَاهَا', latin: 'fa alhamahā fujūrahā wa taqwāhā', arti: 'maka Dia mengilhamkan kepadanya (jalan) kejahatan dan ketakwaannya',
        poin: [
          '«alhamahā» — Allah mengilhamkan pada jiwa pengenalan akan jahat & takwa: kau punya kompas batin.',
          'Maka tak ada alasan "tak tahu" — fitrah membisikkan mana yang baik; tinggal kau ikuti atau kubur.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Jiwamu diberi kompas baik-buruk — ikuti, jangan kubur.',
      'Menyucikan jiwa = menumbuhkannya; mengotorinya = mengerdilkannya.',
      'Sukses & gagal sejati ditentukan di dalam jiwa, bukan di luar.',
    ],
    surah: 'Asy-Syams',
    surahNo: 91,
    ayatNo: '7–10',
    juz: 30,
    tema: ['Menyucikan jiwa', 'Fitrah', 'Pilihan'],
    gratis: false,
    arab: 'وَنَفْسٍ وَمَا سَوَّاهَا ۝ فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَاهَا ۝ قَدْ أَفْلَحَ مَن زَكَّاهَا ۝ وَقَدْ خَابَ مَن دَسَّاهَا',
    latin: 'Wa nafsiw wa mā sawwāhā. Fa alhamahā fujūrahā wa taqwāhā. Qad aflaḥa man zakkāhā. Wa qad khāba man dassāhā.',
    arti: 'Demi jiwa serta penyempurnaan (ciptaan)nya, maka Dia mengilhamkan kepadanya (jalan) kejahatan dan ketakwaannya. Sungguh beruntung orang yang menyucikannya (jiwa), dan sungguh rugi orang yang mengotorinya.',
    asbabunNuzul:
      'Tidak ada riwayat asbabun nuzul khusus. Bagian ini menegaskan bahwa jiwa dibekali pengenalan akan jalan baik & buruk, lalu keberuntungan ditentukan oleh pilihan menyucikan atau mengotorinya.',
    tafsir:
      'Setelah sumpah panjang dengan tanda-tanda alam, Allah menyebut jiwa yang disempurnakan & diilhami pengetahuan akan kejahatan & ketakwaan. Maka keberuntungan milik yang menyucikan jiwanya, dan kerugian bagi yang menguburnya dalam dosa. Inti surah: nasibmu ditentukan oleh apa yang kau lakukan pada jiwamu.',
    hikmah:
      'Setiap orang dibekali "kompas batin" yang mengenali baik & buruk. Tanggung jawab terbesar manusia adalah merawat jiwanya — menyucikan & menumbuhkannya — bukan menenggelamkannya di bawah dosa hingga fitrahnya lemas.',
    linguistik:
      'Kontras «zakkā» (menyucikan + menumbuhkan) dengan «dassā» (dari d-s-s: menyembunyikan & mengubur) menggambarkan dua arah berlawanan bagi jiwa: tumbuh ke atas atau terkubur ke bawah. Kata «alhama» (mengilhamkan) menegaskan bahwa pengenalan baik-buruk adalah bekal fitrah, bukan sesuatu yang asing.',
    amalan:
      'Rawat jiwamu seperti merawat kebun: bersihkan "gulma" (dosa, dengki, riya) & tanam "benih" (zikir, ilmu, amal). Saat hati membisikkan keburukan, ingat kau punya kompas takwa — ikuti bisikan kebaikan, jangan kubur ia.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
  {
    id: 'al-lail-5-7',
    kajianKata: [
      { kata: 'فَأَمَّا مَنْ أَعْطَىٰ وَاتَّقَىٰ', latin: 'fa ammā man a‘ṭā wattaqā', arti: 'adapun orang yang memberi dan bertakwa',
        poin: [
          'Tiga kunci: «a‘ṭā» (memberi/sedekah) + «ittaqā» (bertakwa) + «ṣaddaqa bil-ḥusnā» (membenarkan balasan terbaik).',
          'Balasannya «sanuyassiruhū lil-yusrā» — Kami MUDAHKAN ia menuju kemudahan: tiap kebaikan membuka kebaikan berikutnya.',
          'Lawannya (ayat 8–10): yang kikir & merasa cukup → "dimudahkan menuju kesukaran". Hidup memantulkan pilihanmu.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'الْيُسْرَىٰ', latin: 'Al-Yusrā', sifat: ['Buah memberi + takwa', 'Tiap kebaikan membuka kebaikan'] },
          { arab: 'الْعُسْرَىٰ', latin: 'Al-‘Usrā', alt: true, sifat: ['Buah kikir + merasa cukup', 'Tiap keburukan menyeret keburukan'] },
        ], catatan: 'Hidup memudahkan jalan yang kau pilih — menuju kemudahan, atau kesukaran.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'] },
      { kata: 'وَصَدَّقَ بِالْحُسْنَىٰ', latin: 'wa ṣaddaqa bil-ḥusnā', arti: 'dan membenarkan (adanya pahala) yang terbaik',
        poin: [
          '«ṣaddaqa bil-ḥusnā» — membenarkan & yakin pada balasan terbaik (surga): keyakinan yang menggerakkan kemurahan.',
          'Memberi jadi ringan saat kau YAKIN ada ganti yang lebih baik di sisi Allah.',
        ],
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir Al-Qurthubi'] },
    ],
    hikmahPoin: [
      'Memberi + takwa + yakin pada balasan → hidup dimudahkan.',
      'Tiap kebaikan membuka pintu kebaikan berikutnya.',
      'Kikir & merasa cukup justru menyeret ke kesukaran.',
    ],
    surah: 'Al-Lail',
    surahNo: 92,
    ayatNo: '5–7',
    juz: 30,
    tema: ['Kemurahan', 'Takwa', 'Kemudahan dari Allah'],
    gratis: false,
    arab: 'فَأَمَّا مَنْ أَعْطَىٰ وَاتَّقَىٰ ۝ وَصَدَّقَ بِالْحُسْنَىٰ ۝ فَسَنُيَسِّرُهُ لِلْيُسْرَىٰ',
    latin: 'Fa ammā man a‘ṭā wattaqā. Wa ṣaddaqa bil-ḥusnā. Fa sanuyassiruhū lil-yusrā.',
    arti: 'Maka barangsiapa memberikan (hartanya di jalan Allah) dan bertakwa, dan membenarkan (adanya pahala) yang terbaik (surga), maka akan Kami mudahkan baginya jalan menuju kemudahan (kebahagiaan).',
    asbabunNuzul:
      'Sebagian riwayat mengaitkan ayat-ayat ini dengan kedermawanan Abu Bakar aṣ-Ṣiddīq yang gemar membebaskan budak-budak yang disiksa karena iman. Maknanya berlaku umum bagi setiap pemberi yang bertakwa (Tafsir Ibnu Katsir).',
    tafsir:
      'Allah membagi manusia menurut sikapnya pada harta & iman: yang memberi, bertakwa, & membenarkan balasan terbaik akan dimudahkan menuju kemudahan; sedang yang kikir & merasa cukup (ayat berikutnya) dimudahkan menuju kesukaran. Pilihan kita pada kebaikan menentukan arah kemudahan hidup.',
    hikmah:
      'Kebaikan & keburukan saling berantai: satu kebaikan memudahkan kebaikan berikutnya, satu kekikiran menyeret kesulitan. Maka memberi bukan kehilangan — ia "pelumas" yang memudahkan jalan hidup & akhirat.',
    linguistik:
      'Kontras «al-yusrā» (kemudahan) vs «al-‘usrā» (kesukaran) membingkai dua jalan hidup. Kata «ṣaddaqa bil-ḥusnā» (membenarkan balasan terbaik) menautkan kemurahan dengan keyakinan — sebab memberi terasa ringan hanya bila hati yakin akan ganti yang lebih baik.',
    amalan:
      'Biasakan memberi — meski sedikit & rutin — sambil meneguhkan keyakinan akan ganti terbaik dari Allah. Amati bagaimana kemurahan justru "memudahkan" urusanmu. Jauhi sifat kikir & merasa cukup tanpa Allah, sebab ia diam-diam mempersulit hidup.',
    sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di', 'Tafsir Al-Qurthubi'],
  },
];

// Ayat Hari Ini — berputar stabil berdasarkan tanggal (sama untuk semua dalam satu hari)
function ayatHariIni() {
  const epoch = Date.UTC(2024, 0, 1);
  const hari = Math.floor((Date.now() - epoch) / 86400000);
  return AYAT[((hari % AYAT.length) + AYAT.length) % AYAT.length];
}

function cariAyat(id) { return AYAT.find(a => a.id === id) || null; }

/* ─────────────────────────── Struktur Musim & Episode ───────────────────────────
 * Konten diorganisir dalam "Musim" → daftar "Episode" (satu episode = satu ayat). */
const MUSIM = [
  { id: 'prolog', label: 'Prolog', surah: 'Al-Fātiḥah', ket: 'Induk Al-Qur’an · 7 ayat',
    episodes: ['al-fatihah-1', 'al-fatihah-2', 'al-fatihah-3', 'al-fatihah-4', 'al-fatihah-5', 'al-fatihah-6', 'al-fatihah-7'] },
  { id: 'musim-1', label: 'Musim 1', surah: 'Al-Baqarah', ket: 'Sedang berjalan',
    episodes: ['al-baqarah-1', 'al-baqarah-2', 'al-baqarah-3-4', 'al-baqarah-5', 'al-baqarah-255', 'al-baqarah-286'] },
  { id: 'pilihan', label: 'Juz 30', surah: 'Juz ‘Amma · surah pendek', ket: 'Sedang dilengkapi',
    episodes: ['an-naba-1-5', 'an-naziat-37-41', 'abasa-1-7', 'at-takwir-8-9', 'al-infitar-6-8', 'al-mutaffifin-1-3', 'al-insyiqaq-6', 'al-buruj-14-16', 'at-tariq-5-8', 'al-ala-14-17', 'al-ghasyiyah-17-20', 'al-fajr-27-30', 'al-balad-11-16', 'asy-syams-7-10', 'al-lail-5-7', 'ad-duha-1-11', 'al-insyirah-5-6', 'at-tin-1-8', 'al-alaq-1-5', 'al-qadr-1-5', 'al-bayyinah-1-8', 'az-zalzalah-1-8', 'al-adiyat-1-11', 'al-qariah-1-11', 'at-takatsur-1-8', 'al-asr-1-3', 'al-humazah-1-9', 'al-fil-1-5', 'quraisy-1-4', 'al-maun-1-7', 'al-kautsar-1-3', 'al-kafirun-1-6', 'an-nasr-1-3', 'al-masad-1-5', 'al-ikhlas-1-4', 'al-falaq-1-5', 'an-nas-1-6'] },
];

// Kata yang dikaji pada tiap ayat → ditonjolkan (glow), sisanya di-fade pada Ayah Display.
const FOKUS = {
  'al-fatihah-1': ['الرَّحْمَٰنِ', 'الرَّحِيمِ'],
  'al-fatihah-2': ['الْحَمْدُ'],
  'al-fatihah-3': ['الرَّحْمَٰنِ', 'الرَّحِيمِ'],
  'al-fatihah-4': ['مَالِكِ'],
  'al-fatihah-5': ['إِيَّاكَ', 'نَعْبُدُ'],
  'al-fatihah-6': ['الصِّرَاطَ'],
  'al-fatihah-7': ['أَنْعَمْتَ', 'الْمَغْضُوبِ'],
  'al-baqarah-1': ['الم'],
  'al-baqarah-2': ['ذَٰلِكَ'],
  'al-baqarah-3-4': ['يُؤْمِنُونَ', 'يُقِيمُونَ'],
  'al-baqarah-5': ['هُدًى', 'الْمُفْلِحُونَ'],
  'al-baqarah-255': ['سِنَةٌ', 'نَوْمٌ'],
  'al-baqarah-286': ['وُسْعَهَا', 'كَسَبَتْ', 'اكْتَسَبَتْ'],
  'al-insyirah-5-6': ['الْعُسْرِ', 'يُسْرًا'],
  'al-asr-1-3': ['خُسْرٍ'],
  'al-kautsar-1-3': ['الْكَوْثَرَ', 'الْأَبْتَرُ'],
  'al-ikhlas-1-4': ['أَحَدٌ'],
};

// Kata "alternatif" (yang TIDAK dipilih Al-Qur’an) pada kartu banding → ditampilkan pudar.
const ALT = {
  'al-fatihah-2': 'مَدْح',
  'al-fatihah-6': 'سُبُل',
  'al-baqarah-2': 'هٰذَا',
  'al-ikhlas-1-4': 'وَاحِد',
};

AYAT.forEach(a => {
  if (FOKUS[a.id]) a.fokus = FOKUS[a.id];
  const alt = ALT[a.id];
  if (alt && Array.isArray(a.visual)) {
    a.visual.forEach(b => {
      if (b.tipe === 'banding') b.item.forEach(it => { if (it.arab === alt) it.alt = true; });
    });
  }
});

// Hikmah singkat untuk SETIAP kata yang dikaji (urut sesuai kajianKata tiap episode).
const HIKMAH_KATA = {
  'al-fatihah-1': [
    'Kamu tak pernah memulai sendirian. Sebut nama-Nya, langkah kecil pun jadi besar.',
    'Saat menyebut nama-Nya, kamu sedang menyandarkan diri pada satu-satunya yang tak pernah lemah.',
    'Sebelum perintah, sebelum ancaman — Dia perkenalkan diri lewat rahmat. Begitu Dia ingin dikenal.',
  ],
  'al-fatihah-2': [
    'Memuji-Nya menjernihkan hati dari ujub. Yang hebat darimu, asalnya dari-Nya.',
    'Pujianmu bukan hadiah untuk-Nya — itu pengakuan atas yang memang milik-Nya.',
    'Dia tak sekadar mencipta lalu pergi. Dia memelihara, tiap detik, termasuk detik ini.',
    'Kamu satu di antara tak terhitung makhluk yang Dia urus — dan Dia tak pernah keteteran.',
  ],
  'al-fatihah-3': [
    'Diagungkan, lalu ditenangkan. Sebesar apa pun takutmu pada-Nya, rahmat-Nya selalu lebih besar.',
  ],
  'al-fatihah-4': [
    'Pemilik sekaligus Raja hari itu. Tak ada yang bisa menyuap, tak ada yang bisa bersembunyi.',
    'Ada hari semua dihitung. Jujurlah saat sendirian — di situ imanmu diuji.',
  ],
  'al-fatihah-5': [
    'Hanya kepada-Nya. Bukan gengsi, bukan atasan, bukan pandangan orang.',
    'Minta tolong pada-Nya dulu, sebelum pada siapa pun. Pintu-Nya tak pernah tutup.',
  ],
  'al-fatihah-6': [
    'Sudah beriman pun kamu tetap minta ditunjukkan. Hidayah bukan milik yang sombong.',
    'Satu jalan lurus, seribu jalan belok. Minta yang lurus — tiap hari.',
  ],
  'al-fatihah-7': [
    'Ikuti jejak mereka yang Dia ridai: para nabi & orang saleh. Kamu tak sendirian di jalan ini.',
    'Tahu kebenaran lalu meninggalkannya itu bahaya. Ilmu menuntut amal.',
    'Beramal tanpa ilmu sama tersesatnya. Belajar dulu, baru melangkah.',
  ],
  'al-baqarah-1': [
    'Tak semua harus kamu pahami untuk kamu imani. Kadang iman tumbuh justru dalam tunduk.',
  ],
  'al-baqarah-2': [
    'Disebut "itu" yang jauh — karena kedudukannya terlalu tinggi untuk ditunjuk biasa.',
    'Bukan sekadar buku. Ia "Al-Kitab" — rujukan saat semua rujukan lain gagal.',
    'Keraguan tak bisa hidup di dalamnya. Masuklah, dan keyakinan sudah menunggu.',
    'Petunjuknya sempurna. Yang kurang biasanya bukan kitabnya — tapi kesiapan hati.',
  ],
  'al-baqarah-3-4': [
    'Iman sejati: percaya pada yang tak terlihat, karena yakin pada Yang mengabarkan.',
    'Salat bukan sekadar gugur kewajiban. Ia ditegakkan — jadi tiang, bukan tempelan.',
    'Hartamu titipan. Berinfak hanyalah mengembalikan sebagian yang memang bukan milikmu.',
    'Iman tak memilih-milih wahyu — membenarkan seluruh rangkaian utusan-Nya.',
    'Bukan sekadar tahu akhirat, tapi yakin. Dan yakin itulah yang menggerakkan langkah.',
  ],
  'al-baqarah-5': [
    'Bukan sekadar tersentuh hidayah — tapi berdiri kokoh di atasnya.',
    'Sukses sejati bukan yang paling banyak punya, tapi yang paling selamat sampai tujuan.',
  ],
  'al-baqarah-255': [
    'Saat hatimu bergantung pada banyak hal, ayat ini menariknya kembali ke Satu.',
    'Dia mengurus tanpa lelah. Berhentilah merasa harus mengurus segalanya sendiri.',
    'Penjaga semestamu tak pernah tidur. Tidurlah dengan tenang.',
    'Segala yang kamu kejar sudah ada dalam genggaman-Nya.',
    'Tak ada yang bisa menolongmu tanpa izin-Nya. Maka dekati Dia langsung.',
    'Masa lalu & masa depanmu terlihat oleh-Nya. Tak ada yang luput, tak ada yang sia-sia.',
    'Ilmu yang kamu banggakan hanya setetes yang Dia izinkan. Tetap rendah hati.',
    'Masalahmu, sebesar apa pun, ada dalam jangkauan-Nya.',
    'Menjaga seluruh alam tak membebani-Nya — apalagi menjaga satu hamba yang berserah.',
    'Saat dunia terasa menekan, ingat siapa yang Maha Tinggi di atas segalanya.',
  ],
  'al-baqarah-286': [
    'Dia tak pernah membebanimu melebihi kuatmu. Kalau kamu masih bernapas, kamu masih sanggup.',
    'Kebaikan dicatat meski niat ringan; keburukan baru membebani bila disengaja. Begitu luas rahmat-Nya.',
    'Doa para sahabat yang Dia jawab "sudah Aku kabulkan". Lupa & keliru — dimaafkan.',
  ],
  'al-insyirah-5-6': [
    'Kemudahan tak menunggu di ujung jalan — ia berjalan bersama kesulitanmu, sekarang.',
    'Satu kesulitan, dua kemudahan. Kesulitanmu sudah kalah jumlah sejak awal.',
  ],
  'al-asr-1-3': [
    'Allah bersumpah demi waktu — karena di sanalah untung-rugimu ditentukan.',
    'Tanpa sadar, manusia tenggelam dalam kerugian. Waktu terus jalan, entah kamu isi apa.',
    'Pintu keluarnya satu: iman yang dibuktikan dengan amal.',
    'Tak cukup baik sendiri. Saling ingatkan kebenaran, saling kuatkan kesabaran.',
  ],
  'al-kautsar-1-3': [
    'Saat merasa "tak punya apa-apa", hitung ulang: nikmat-Nya padamu melimpah-ruah.',
    'Balas nikmat dengan ibadah, bukan kesombongan. Sujud, jangan jumawa.',
    'Hinaan orang tak menentukan nilaimu. Yang mencemooh, dialah yang sebenarnya terputus.',
  ],
  'al-ikhlas-1-4': [
    'Keesaan-Nya bukan soal jumlah, tapi sifat — tak ada yang sebanding. Maka jangan beri tempat bagi tandingan di hatimu.',
    'Semua bergantung pada-Nya, Dia tak butuh apa pun. Lepaskan harap berlebih pada makhluk.',
    'Tak beranak, tak diperanakkan. Dia tak seperti apa pun yang kamu kenal.',
    'Tak ada yang setara dengan-Nya. Jangan sandarkan hidupmu pada yang selemah dirimu.',
  ],
  'al-falaq-1-5': [
    'Apa pun yang kamu takuti, ingat: Tuhanmu sanggup membelah pekat malam jadi fajar.',
    'Banyak luka masuk diam-diam saat kita lengah. Pasang penjagaan sebelum ia menyusup.',
    'Kejahatan yang ditekuni itu nyata — tapi sandaranmu jauh lebih kuat darinya.',
    'Sebelum mendengki orang, ingat: dengki menggerogoti pemiliknya lebih dulu.',
  ],
  'an-nas-1-6': [
    'Dia memeliharamu, menguasaimu, dan layak kau sembah. Tiga alasan untuk berhenti gelisah.',
    'Lawan bisikan bukan dengan tegang, tapi dengan zikir. Sebut nama-Nya — ia surut.',
    'Tak semua racun datang dari yang gaib. Pilih teman & layar yang tak membisikkan keburukan.',
  ],
  'al-kafirun-1-6': [
    'Berani berkata "tidak" pada yang batil adalah bagian dari iman.',
    'Toleransi bukan mencampur akidah — tapi menghormati sambil menjaga prinsip.',
  ],
  'an-nasr-1-3': [
    'Kemenangan terbaik: terbukanya hati, bukan tumbangnya lawan.',
    'Makin tinggi pencapaianmu, makin rendah hatimu — tutup dengan istighfar.',
  ],
  'al-fil-1-5': [
    'Jangan gentar pada kebatilan yang tampak raksasa — ia bisa runtuh oleh sebab terkecil.',
    'Periksa hatimu: kekuatan yang membuat sombong, akhirnya bisa jadi ampas.',
  ],
  'quraisy-1-4': [
    'Hitung dua nikmat hari ini: makanan & rasa aman — lalu bersyukur.',
    'Yang rutin bukan berarti bukan anugerah.',
  ],
  'al-maun-1-7': [
    'Ukur salatmu dari bekasnya: makin peka pada yang lemah, atau makin kosong?',
    'Jangan remehkan pertolongan kecil — di situ imanmu diuji.',
  ],
  'at-takatsur-1-8': [
    'Berhenti sejenak dari lomba menumpuk — tanya: "untuk apa, dan sampai kapan?"',
    'Tiap nikmat akan ditanya. Pakai untuk yang akan kau banggakan di hadapan-Nya.',
  ],
  'al-humazah-1-9': [
    'Sebelum mencela, ingat: api yang meremukkan itu menukik ke hati.',
    'Harta yang kau hitung-hitung takkan menemanimu ke kubur.',
  ],
  'al-adiyat-1-11': [
    'Kuda pun setia berkorban untuk tuannya — jangan kalah setia pada Penciptamu.',
    'Hatimu tanah: subur dengan syukur, atau tandus karena lupa nikmat?',
  ],
  'al-qariah-1-11': [
    'Yang kau kira berat (harta, jabatan) hari itu tak berbobot. Yang ditimbang: amal.',
    'Kumpulkan amal ringan yang berat timbangannya — mulai hari ini.',
  ],
  'al-masad-1-5': [
    'Status, koneksi, harta — tak menjamin apa pun tanpa iman.',
    'Jangan jadi penyebar fitnah; hentikan api permusuhan di tanganmu.',
  ],
  'ad-duha-1-11': [
    'Saat merasa ditinggalkan, ingat: Dia tak pernah pamit darimu.',
    'Yang terbaik menunggu di depan — teruslah melangkah.',
    'Balas kebaikan yang dulu kau terima dengan menolong yang kini lemah.',
  ],
  'at-tin-1-8': [
    'Kau dicipta sebaik bentuk — pantang merendahkan diri pada yang hina.',
    'Iman & amal yang menahanmu tetap "di atas".',
  ],
  'al-qadr-1-5': [
    'Satu malam bisa mengalahkan 83 tahun — buru keberkahannya.',
    'Nilai waktumu dari isinya, bukan dari panjangnya.',
  ],
  'al-alaq-1-5': [
    'Wahyu pertama: "Bacalah." Menuntut ilmu itu ibadah.',
    'Ikat ilmumu dengan nama Tuhan, agar tak melahirkan kesombongan.',
  ],
  'al-bayyinah-1-8': [
    'Inti agama: murnikan ibadah hanya untuk Allah.',
    '"Sebaik-baik makhluk" itu gelar yang diraih dengan iman & amal.',
  ],
  'az-zalzalah-1-8': [
    'Jangan remehkan kebaikan sekecil zarrah — ia terlihat.',
    'Jangan sepelekan dosa sekecil zarrah — ia pun terlihat.',
  ],
  'al-ala-14-17': [
    'Sukses sejati: menyucikan jiwa, bukan menumpuk dunia.',
    'Membersihkan hati itu menumbuhkan, bukan mengurangi.',
  ],
  'al-ghasyiyah-17-20': [
    'Bukti kebesaran-Nya ada di hal terdekat — berhentilah memperhatikan.',
    'Iman menguat lewat menatap ciptaan, bukan sekadar melewatinya.',
  ],
  'al-fajr-27-30': [
    'Tenang sejati lahir dari bergantung pada Allah, bukan dunia.',
    'Kejar bukan hanya ridha-mu pada-Nya, tapi ridha-Nya padamu.',
  ],
  'an-naba-1-5': [
    'Berita terbesar hidupmu (akhirat) jangan kalah perhatian dari kabar dunia.',
    'Yang kini diragukan, kelak pasti diketahui — siapkan diri.',
  ],
  'an-naziat-37-41': [
    'Harga surga: berani menahan nafsu dari yang menjatuhkan.',
    'Rasa diawasi Allah adalah rem terkuat saat sendirian.',
  ],
  'abasa-1-7': [
    'Muliakan orang dari ketulusannya, bukan status & hartanya.',
    'Jangan abaikan yang lemah demi mengambil hati yang berpengaruh.',
  ],
  'at-takwir-8-9': [
    'Keadilan Allah tak melewatkan satu korban pun.',
    'Yang dibungkam di dunia, diberi suara di akhirat.',
  ],
  'al-infitar-6-8': [
    'Kemurahan Allah bukan tanda Dia tak peduli — jangan disalahgunakan.',
    'Tubuhmu yang sempurna sudah cukup jadi alasan untuk taat.',
  ],
  'al-mutaffifin-1-3': [
    'Curang sedikit pun mengundang celaka — kejujuran tak ditawar.',
    'Jangan berstandar ganda: adil untuk diri, longgar untuk orang.',
  ],
  'al-insyiqaq-6': [
    'Semua orang lelah — yang membedakan: menuju apa.',
    'Arahkan jerih payahmu kepada Allah, agar tak sia-sia.',
  ],
  'al-buruj-14-16': [
    'Dia tak hanya mengampuni — Dia mencintai yang kembali.',
    'Saat tertindas karena iman, ingat: Tuhanmu Al-Wadūd.',
  ],
  'at-tariq-5-8': [
    'Ingat asalmu dari setetes — runtuh sudah kesombongan.',
    'Yang mencipta dari tiada, pasti mampu membangkitkan.',
  ],
  'al-balad-11-16': [
    'Kebaikan sejati itu mendaki — beranikan diri menerjangnya.',
    'Sedekah paling bernilai saat memberi terasa paling berat.',
  ],
  'asy-syams-7-10': [
    'Rawat jiwamu: sucikan & tumbuhkan, jangan kubur dengan dosa.',
    'Kau punya kompas baik-buruk — ikuti yang baik.',
  ],
  'al-lail-5-7': [
    'Memberi bukan kehilangan — ia memudahkan jalanmu.',
    'Tiap kebaikan membuka kebaikan berikutnya.',
  ],
};

AYAT.forEach(a => {
  const hk = HIKMAH_KATA[a.id];
  if (hk && Array.isArray(a.kajianKata)) a.kajianKata.forEach((k, i) => { if (hk[i]) k.hikmah = hk[i]; });
});

function episodeMeta(id) {
  for (const m of MUSIM) {
    const i = m.episodes.indexOf(id);
    if (i >= 0) return { musim: m, no: i + 1, total: m.episodes.length };
  }
  return null;
}

/* ─────────── Koleksi bertema (kemas ulang episode jadi "journey") ─────────── */
const KOLEKSI = [
  {
    id: 'parenting',
    judul: 'Tafsir Juz Amma untuk Parenting',
    ikon: '👨‍👩‍👧',
    deskripsi: 'Nilai-nilai Juz 30 untuk mendidik anak — menjaga fitrah, menumbuhkan cinta ilmu, akidah pertama, akhlak lisan, hingga kasih sayang pada yang lemah.',
    items: [
      { id: 'at-tin-1-8', catatan: 'Tiap anak lahir dalam sebaik-baik bentuk & fitrah suci. Tugas orang tua: menjaga & menumbuhkan fitrah itu, bukan merusaknya.' },
      { id: 'asy-syams-7-10', catatan: 'Anak dibekali "kompas" baik-buruk. Peran orang tua: menumbuhkan sisi baiknya (zakkā), bukan menguburnya (dassā) dengan contoh & didikan buruk.' },
      { id: 'al-alaq-1-5', catatan: 'Wahyu pertama: "Bacalah!" Tanamkan cinta ilmu & membaca sejak dini — dan ikat dengan nama Allah agar ilmu melahirkan adab, bukan sombong.' },
      { id: 'al-ikhlas-1-4', catatan: 'Pelajaran akidah PERTAMA untuk anak: mengenal Allah Yang Esa & tempat bergantung. Fondasi sebelum yang lain.' },
      { id: 'an-nas-1-6', catatan: 'Ajari anak berlindung kepada Allah dari bisikan buruk — jadikan muʿawwiżatān (An-Nās & Al-Falaq) rutinitas menjelang tidur mereka.' },
      { id: 'ad-duha-1-11', catatan: 'Model pengasuhan penuh kasih: "jangan hardik" yang lemah, dan ajari syukur dengan "menceritakan nikmat". Allah pun menghibur Nabi-Nya dengan lembut.' },
      { id: 'al-maun-1-7', catatan: 'Didik kepedulian sosial: menyayangi yatim & miskin. Ibadah yang tak menumbuhkan kasih itu kosong — ajarkan pada anak sejak kecil.' },
      { id: 'al-humazah-1-9', catatan: 'Didik akhlak lisan: jangan mengejek, mencela, atau body-shaming. Latih anak menjaga kata & tidak merendahkan orang.' },
      { id: 'at-takatsur-1-8', catatan: 'Lawan budaya pamer & menumpuk sejak dini. Ajari anak makna "cukup" & bahwa nikmat akan ditanya penggunaannya.' },
      { id: 'az-zalzalah-1-8', catatan: 'Ajari anak: kebaikan sekecil zarrah pun berharga & terlihat. Motivasi berbuat baik kecil, dan waspada meremehkan keburukan kecil.' },
    ],
  },
];

window.AYAT = AYAT;
window.MUSIM = MUSIM;
window.KOLEKSI = KOLEKSI;
window.ayatHariIni = ayatHariIni;
window.cariAyat = cariAyat;
window.episodeMeta = episodeMeta;
