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
          'Pakai alif-lam: SEGALA puji — mutlak, menyeluruh.',
          'Ḥamd bukan sekadar memuji; ia pujian yang disertai cinta dan pengagungan.',
          'Bukan «madḥ» — sanjungan yang bisa tanpa rasa.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'حَمْد', latin: 'Ḥamd', sifat: ['Pujian + cinta', 'Disertai pengagungan'] },
          { arab: 'مَدْح', latin: 'Madḥ', alt: true, sifat: ['Sekadar sanjungan', 'Bisa tanpa rasa'] },
        ], catatan: 'Dipilih «al-ḥamd»: segala pujian, hanya milik Allah.' },
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
          'Dua bacaan sahih: «Mālik» (Pemilik) & «Malik» (Raja).',
          'Keduanya melengkapi: kepemilikan penuh + kedaulatan memerintah.',
        ],
        banding: { tipe: 'banding', item: [
          { arab: 'مَالِك', latin: 'Mālik', sifat: ['Pemilik', 'Kepemilikan penuh hari itu'] },
          { arab: 'مَلِك', latin: 'Malik', sifat: ['Raja', 'Kedaulatan & otoritas'] },
        ], catatan: 'Dua qira’at mutawatir — saling melengkapi makna.' },
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
          'Objek «iyyāka» didahulukan → ḥaṣr: "hanya kepada-Mu, bukan yang lain".',
          'Terjadi «iltifāt»: dari membicarakan Allah (Dia) beralih menyapa-Nya langsung (Engkau).',
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
          'Bukan sekadar tulisan — tapi "Al-Kitab" yang menjadi rujukan.',
        ],
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
        poin: ['Dua nama agung dirangkai: sumber kehidupan + penegak segala sesuatu.', 'Di sini para ulama menyebut tersimpan «ismullāhil a‘ẓam».'],
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
        banding: { tipe: 'banding', item: [
          { arab: 'مَعَ', latin: 'Ma‘a (bersama)', sifat: ['Menempel pada kesulitan', 'Bukan menunggu jauh'] },
          { arab: 'بَعْدَ', latin: 'Ba‘da (sesudah)', alt: true, sifat: ['Menunggu di kejauhan', 'Tertunda'] },
        ], catatan: 'Kemudahan itu menyertai kesulitan, bukan datang belakangan.' },
        sumber: ['Tafsir Ibnu Katsir', 'Tafsir As-Sa‘di'],
      },
      {
        kata: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', latin: 'inna ma‘al-‘usri yusrā', arti: '(diulang) sesungguhnya bersama kesulitan ada kemudahan',
        poin: [
          '«al-‘usr» (definitif) diulang → kesulitan yang SAMA.',
          '«yusrā» (nakirah) diulang → dua kemudahan yang BERBEDA.',
          'Ibnu ‘Abbas: "Satu kesulitan takkan mengalahkan dua kemudahan."',
        ],
        hitung: { tipe: 'hitung', item: [
          { label: 'Kesulitan — «al-‘usr»', jumlah: 1, nuansa: 'Definitif, diulang → SAMA' },
          { label: 'Kemudahan — «yusrā»', jumlah: 2, nuansa: 'Indefinitif, diulang → BERBEDA' },
        ], catatan: 'Satu kesulitan, dua kemudahan.' },
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
        poin: ['Dipilih «Aḥad», bukan «Wāḥid» — keesaan MUTLAK yang tak menerima pembagian.', 'Surah dibuka «Aḥad» dan ditutup «Aḥad» — bingkai sempurna.'],
        asalKata: { huruf: ['ء', 'ح', 'د'], makna: 'keesaan yang menolak bilangan',
          gambar: '«Aḥad» kata yang istimewa: dalam bahasa Arab ia hampir selalu muncul dalam <b>penolakan</b> — «mā fid-dāri aḥad» (tak ada SEORANG pun di rumah). Ia menolak dijamakkan, ditambah, bahkan diduakan. Maka ketika Allah menyebut diri-Nya «Aḥad» dalam kalimat <b>positif</b>, dipilih satu-satunya kata yang strukturnya sendiri menolak adanya "yang kedua" — bukan sekadar "satu", tapi <b>Yang mustahil ada bandingannya</b>.' },
        banding: { tipe: 'banding', item: [
          { arab: 'أَحَد', latin: 'Aḥad', sifat: ['Keesaan mutlak', 'Tak dapat dibagi / ditambah'] },
          { arab: 'وَاحِد', latin: 'Wāḥid', alt: true, sifat: ['"Satu" biasa', 'Bisa diikuti dua, tiga…'] },
        ], catatan: 'Dipilih «Aḥad» — menutup celah penyekutuan.' },
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
    episodes: ['al-insyirah-5-6', 'al-asr-1-3', 'al-kautsar-1-3', 'al-ikhlas-1-4', 'al-falaq-1-5', 'an-nas-1-6'] },
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
    'Esa yang tak terbagi. Akidah yang bersih = hati yang tak terpecah.',
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

window.AYAT = AYAT;
window.MUSIM = MUSIM;
window.ayatHariIni = ayatHariIni;
window.cariAyat = cariAyat;
window.episodeMeta = episodeMeta;
