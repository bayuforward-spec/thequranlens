/*
 * nahwu-data.js — Data kursus "Belajar Nahwu" (12 pertemuan, Ust. Billy Rizky).
 *
 * Skema per pertemuan (window.NAHWU[1..12]; indeks 0 sengaja kosong):
 *   title, sub   Judul & subjudul
 *   materi       HTML materi. Kelas yang dikenali: .ar (teks Arab), .ar.big,
 *                .note, table.t, .tag.{r|n|j|z|m}, <div data-widget="amil|tabel9">
 *   ayat         [{ ref, id (terjemah), t: [[kata, jenis I/F/H, i'rob r/n/j/z/m, keterangan], …] }]
 *                ref "QS. Nama S:A" (atau "S:A–B") dipakai untuk menautkan ke episode Kajian.
 *   latihan      [{ type: "classify", title, opts?, items }] atau [{ type: "transform", title, items }]
 *                classify + opts : item = [soal, indeksJawaban, alasan]
 *                classify tanpa opts: item = [soal, [pilihan…], indeksJawaban, alasan]
 *                transform       : item = [soal, jawaban, alasan?]
 *   quiz         [{ q, o: [pilihan…], a: indeksJawaban, why }]
 *
 * Kode i'rob: r = rofa' (biru), n = nashob (hijau), j = jer (merah),
 *             z = jazm (ungu), m = mabni (abu-abu). Periksa: node tools/validasi-nahwu.js
 */
(function () {
const P = [];

P[1] = {
 title: "Pengantar Nahwu",
 sub: "Apa itu nahwu, huruf vs kalimah vs jumlah mufidah, pembagian huruf",
 materi: `
<p><b>Nahwu</b> adalah ilmu tentang kaidah-kaidah yang dengannya diketahui keadaan <b>akhir kata</b> bahasa Arab ketika tersusun dalam kalimat: apakah dibaca dhammah, fathah, kasrah, atau sukun, dan mengapa.</p>
<div class="note"><b>Beda nahwu dan sharaf.</b> Nahwu mengurus <i>ujung</i> kata dalam susunan (i'rob). Sharaf mengurus <i>bentuk</i> kata itu sendiri (misalnya كَتَبَ → يَكْتُبُ → كَاتِبٌ). Keduanya saling melengkapi.</div>
<h3>Tiga tingkatan: huruf, kalimah, jumlah</h3>
<table class="t">
<tr><th>Istilah</th><th>Pengertian</th><th>Contoh</th></tr>
<tr><td>الْحَرْفُ<br><small>huruf hijaiyah</small></td><td>Satuan bunyi yang menyusun kata; sendirian belum bermakna.</td><td class="ar">ا ، ب ، ت ، ث</td></tr>
<tr><td>الْكَلِمَةُ<br><small>kalimah</small></td><td>Lafaz tunggal yang punya makna.</td><td class="ar">دَفْتَرٌ ، مَدْرَسَةٌ ، يَذْهَبُ ، عَلَى</td></tr>
<tr><td>الْجُمْلَةُ الْمُفِيدَةُ<br><small>jumlah mufidah / kalam</small></td><td>Susunan kata yang memberi faedah sempurna; pendengar tidak menunggu lanjutan.</td><td class="ar">هُوَ يَجْلِسُ عَلَى الْكُرْسِيِّ</td></tr>
</table>
<div class="note"><b>Awas istilah.</b> "Kalimah" dalam nahwu = <i>kata</i>, bukan "kalimat" dalam bahasa Indonesia. Yang setara dengan "kalimat" adalah <b>jumlah mufidah / kalam</b>.</div>
<h3>Syarat kalam (tambahan dari Al-Ajurrumiyyah)</h3>
<p class="ar big">الْكَلَامُ هُوَ اللَّفْظُ الْمُرَكَّبُ الْمُفِيدُ بِالْوَضْعِ</p>
<p>Kalam harus: berupa <b>lafaz</b> (diucapkan), <b>murakkab</b> (tersusun minimal dua kata), <b>mufid</b> (maknanya tuntas), dan <b>bil-wadh'i</b> (memakai bahasa Arab). Jadi <span class="ar">فِي الْبَيْتِ</span> ("di rumah") belum kalam karena belum tuntas.</p>
<h3>Pembagian huruf (أَقْسَامُ الْحَرْفِ)</h3>
<ol>
<li><b>Huruf mabani / hijaiyah</b>: tidak punya makna sendiri, hanya bahan bangunan kata. <span class="ar">ا ب ت ث</span></li>
<li><b>Huruf ma'ani</b>: punya makna tetapi baru jelas bila disambung kata lain. <span class="ar">وَ ، أَوْ ، ثُمَّ ، مِنْ</span></li>
</ol>
<h3>Jenis kalimah (أَنْوَاعُ الْكَلِمَةِ)</h3>
<p>Kalimah ada tiga: <b>isim</b> (kata benda/nama), <b>fi'il</b> (kata kerja), dan <b>harf</b> (kata tugas). Dibahas rinci di pertemuan 2 dan 3.</p>`,
 ayat: [
  {ref:"QS. Al-Mu'minun 23:1", id:"Sungguh beruntung orang-orang yang beriman.", t:[
   ["قَدْ","H","m","Harf tahqiq (penegas: 'sungguh'). Harf selalu mabni."],
   ["أَفْلَحَ","F","m","Fi'il madhi 'telah beruntung', mabni fathah. Didahului قَدْ, salah satu tanda fi'il."],
   ["الْمُؤْمِنُونَ","I","r","Isim; fa'il (pelaku), marfu' dengan tanda wawu karena jamak mudzakkar salim (pertemuan 6)."]]},
  {ref:"QS. Al-Ikhlas 112:1", id:"Katakanlah: Dialah Allah, Yang Maha Esa.", t:[
   ["قُلْ","F","m","Fi'il amr 'katakanlah', mabni sukun."],
   ["هُوَ","I","m","Isim dhamir 'Dia'; mubtada. Mabni fathah, kedudukannya rofa'."],
   ["اللَّهُ","I","r","Isim; khabar, marfu' dengan dhammah."],
   ["أَحَدٌ","I","r","Isim; khabar kedua, marfu' dengan dhammah (bertanwin)."]]},
  {ref:"QS. An-Nashr 110:1", id:"Apabila telah datang pertolongan Allah dan kemenangan.", t:[
   ["إِذَا","I","m","Di materi dikelompokkan sebagai huruf. Dalam kajian lanjut, إِذَا adalah isim zharaf (keterangan waktu) yang mabni sukun."],
   ["جَاءَ","F","m","Fi'il madhi 'telah datang', mabni fathah."],
   ["نَصْرُ","I","r","Isim; fa'il, marfu' dhammah. Tidak bertanwin karena mudhaf (disandarkan ke kata berikutnya)."],
   ["اللَّهِ","I","j","Isim; mudhaf ilaih, majrur dengan kasrah."],
   ["وَ","H","m","Harf 'athf 'dan', mabni."],
   ["الْفَتْحُ","I","r","Isim; ma'thuf (mengikuti نَصْرُ), marfu' dhammah."]]}
 ],
 latihan: [
  {type:"classify", title:"Huruf, kalimah, atau jumlah mufidah?", opts:["Huruf hijaiyah","Kalimah","Jumlah mufidah"], items:[
   ["ب",0,"Satu huruf, tanpa makna."],
   ["كِتَابٌ",1,"Satu kata bermakna 'buku'."],
   ["هُوَ يَجْلِسُ عَلَى الْكُرْسِيِّ",2,"Susunan dengan makna tuntas: 'Dia duduk di atas kursi'."],
   ["يَذْهَبُ",1,"Satu kata (fi'il) 'sedang pergi'."],
   ["قُلْ هُوَ اللَّهُ أَحَدٌ",2,"Ayat lengkap, maknanya sempurna."],
   ["ث",0,"Huruf hijaiyah."],
   ["عَلَى",1,"Harf ma'ani tetap termasuk kalimah (jenis harf)."],
   ["أَنَا أَكْتُبُ فِي الدَّفْتَرِ",2,"'Saya menulis di buku tulis' — tuntas."]]},
  {type:"classify", title:"Huruf mabani atau ma'ani?", opts:["Mabani (tanpa makna)","Ma'ani (bermakna)"], items:[
   ["ج",0,"Hanya bahan bangunan kata."],["مِنْ",1,"'dari'."],["ثُمَّ",1,"'kemudian'."],["خ",0,"Huruf hijaiyah."],["أَوْ",1,"'atau'."],["إِلَى",1,"'ke'."]]}
 ],
 quiz: [
  {q:"Fokus utama ilmu nahwu adalah…", o:["Keadaan akhir kata dalam susunan kalimat","Perubahan bentuk kata dasar","Cara melafalkan huruf dari makhrajnya","Keindahan gaya bahasa"], a:0, why:"Bentuk kata diurus sharaf, makhraj diurus tajwid, gaya bahasa diurus balaghah."},
  {q:"كِتَابٌ termasuk…", o:["Huruf hijaiyah","Kalimah","Jumlah mufidah","Huruf ma'ani"], a:1, why:"Satu kata yang bermakna = kalimah."},
  {q:"Mana yang sudah jumlah mufidah?", o:["فِي الْبَيْتِ","كِتَابُ زَيْدٍ","اللَّهُ أَحَدٌ","إِنْ جَاءَ زَيْدٌ"], a:2, why:"'Allah itu Esa' sudah tuntas. Pilihan lain membuat pendengar menunggu lanjutan."},
  {q:"مِنْ adalah contoh…", o:["Huruf mabani","Huruf ma'ani","Isim","Fi'il"], a:1, why:"مِنْ bermakna 'dari', tapi baru jelas bila disambung kata lain."},
  {q:"Istilah 'kalimah' dalam nahwu sepadan dengan … dalam bahasa Indonesia.", o:["Kalimat","Kata","Paragraf","Suku kata"], a:1, why:"Kalimah = kata. Kalimat = jumlah/kalam."}
 ]
};

P[2] = {
 title: "Isim dan Ciri-cirinya",
 sub: "Macam kalimah, definisi isim, 4 tanda isim",
 materi: `
<p>Kalimah (kata) terbagi tiga: <span class="ar">اِسْمٌ</span> isim, <span class="ar">فِعْلٌ</span> fi'il, dan <span class="ar">حَرْفٌ</span> harf.</p>
<h3>Definisi isim</h3>
<p class="ar big">الِاسْمُ هُوَ كَلِمَةٌ دَلَّتْ عَلَى مَعْنًى فِي نَفْسِهَا وَلَمْ تَقْتَرِنْ بِزَمَانٍ</p>
<p>Isim adalah kata yang menunjukkan makna pada dirinya sendiri dan <b>tidak terikat waktu</b>. Contoh: <span class="ar">مُحَمَّدٌ ، أُسْتَاذٌ ، تِلْمِيذٌ ، خَيْلٌ ، كَلْبٌ ، قِطٌّ ، دَفْتَرٌ ، مِرْسَمٌ ، شَمْسٌ ، قَمَرٌ</span></p>
<h3>Empat tanda isim</h3>
<table class="t">
<tr><th>Tanda</th><th>Penjelasan</th><th>Contoh</th></tr>
<tr><td>1. Khafdh / jer <span class="ar">الْخَفْضُ</span></td><td>Akhir kata dibaca jer (umumnya kasrah). Hanya isim yang bisa di-jer-kan.</td><td class="ar">بِسْمِ اللَّهِ ، مَالِكِ يَوْمِ الدِّينِ</td></tr>
<tr><td>2. Tanwin <span class="ar">التَّنْوِينُ</span></td><td>Bunyi "n" di akhir kata yang tidak ditulis sebagai huruf nun.</td><td class="ar">رَجُلٌ ، امْرَأَةٌ ، وَلَدٌ ، بِنْتٌ</td></tr>
<tr><td>3. Alif-lam <span class="ar">أَلْ</span></td><td>Awalan "al-" (ma'rifah).</td><td class="ar">الْأُسْتَاذُ ، الطَّالِبُ ، الطَّالِبَةُ</td></tr>
<tr><td>4. Didahului huruf jer</td><td>Kata setelah huruf jer pasti isim.</td><td class="ar">مِنْ ، إِلَى ، عَنْ ، عَلَى ، فِي ، رُبَّ ، الْبَاءُ ، الْكَافُ ، اللَّامُ</td></tr>
</table>
<div class="note"><b>Catatan tambahan.</b> Huruf qasam (sumpah) <span class="ar">وَ ، بِ ، تَ</span> juga menjerkan isim, seperti <span class="ar">وَالْعَصْرِ</span>, <span class="ar">وَالضُّحَى</span>, <span class="ar">تَاللَّهِ</span>. Juz Amma penuh dengan contoh ini.</div>
<div class="note"><b>Tanwin dan al- tidak berkumpul.</b> Kata yang ber-<span class="ar">أل</span> tidak bertanwin: <span class="ar">كِتَابٌ</span> → <span class="ar">الْكِتَابُ</span>, bukan <span class="ar">الْكِتَابٌ</span>. Tanwin juga hilang saat kata menjadi mudhaf: <span class="ar">كِتَابُ زَيْدٍ</span>.</div>
<p>Cukup satu tanda untuk memastikan sebuah kata adalah isim.</p>`,
 ayat: [
  {ref:"QS. Al-Fatihah 1:1", id:"Dengan nama Allah, Yang Maha Pengasih, Maha Penyayang.", t:[
   ["بِ","H","m","Harf jer 'dengan'. Kata setelahnya pasti isim."],
   ["سْمِ","I","j","Isim اسْم; majrur kasrah karena didahului بِ. Dua tanda isim sekaligus: huruf jer + khafdh."],
   ["اللَّهِ","I","j","Isim; mudhaf ilaih, majrur kasrah. Tanda isim: al- dan khafdh."],
   ["الرَّحْمَٰنِ","I","j","Isim; na'at (sifat) bagi اللَّهِ, ikut majrur kasrah."],
   ["الرَّحِيمِ","I","j","Isim; na'at kedua, majrur kasrah."]]},
  {ref:"QS. Al-Fatihah 1:2", id:"Segala puji bagi Allah, Tuhan seluruh alam.", t:[
   ["الْحَمْدُ","I","r","Isim; mubtada, marfu' dhammah. Tanda isim: al-."],
   ["لِ","H","m","Harf jer lam 'bagi'."],
   ["لَّهِ","I","j","Isim اللَّه; majrur kasrah karena lam."],
   ["رَبِّ","I","j","Isim; na'at bagi اللَّه, majrur kasrah."],
   ["الْعَالَمِينَ","I","j","Isim; mudhaf ilaih, majrur dengan ya (diperlakukan seperti jamak mudzakkar salim)."]]},
  {ref:"QS. Al-Fatihah 1:4", id:"Pemilik hari pembalasan.", t:[
   ["مَالِكِ","I","j","Isim; na'at bagi اللَّه di ayat 2, majrur kasrah."],
   ["يَوْمِ","I","j","Isim; mudhaf ilaih, majrur kasrah."],
   ["الدِّينِ","I","j","Isim; mudhaf ilaih, majrur kasrah."]]},
  {ref:"QS. Al-'Ashr 103:1", id:"Demi masa.", t:[
   ["وَ","H","m","Wawu qasam (sumpah), termasuk huruf jer."],
   ["الْعَصْرِ","I","j","Isim; majrur kasrah karena wawu qasam."]]}
 ],
 latihan: [
  {type:"classify", title:"Isim, fi'il, atau harf?", opts:["Isim","Fi'il","Harf"], items:[
   ["مُحَمَّدٌ",0,"Nama orang, bertanwin."],["يَكْتُبُ",1,"'Sedang menulis' — ada waktu."],["عَلَى",2,"Huruf jer."],["شَمْسٌ",0,"Bertanwin."],["جَلَسَ",1,"'Telah duduk'."],["فِي",2,"Huruf jer."],["الْمَدْرَسَةُ",0,"Ber-al."],["اقْرَأْ",1,"Perintah 'bacalah'."],["عَنْ",2,"Huruf jer."],["قَلَمٌ",0,"Bertanwin."]]},
  {type:"classify", title:"Tanda isim mana yang paling tampak?", opts:["Khafdh / jer","Tanwin","Alif-lam","Didahului huruf jer"], items:[
   ["رَجُلٌ",1,"Akhirnya 'un'."],["الطَّالِبَةُ",2,"Awalan al-."],["فِي الْبَيْتِ ← بَيْت",3,"Didahului فِي (juga ber-al dan kasrah, tapi yang paling menentukan huruf jernya)."],["كِتَابُ زَيْدٍ ← زَيْدٍ",0,"Mudhaf ilaih majrur, tanpa huruf jer."]]}
 ],
 quiz: [
  {q:"Isim adalah kata yang…", o:["Menunjukkan makna dan terikat waktu","Menunjukkan makna tanpa terikat waktu","Tidak bermakna tanpa kata lain","Selalu diawali al-"], a:1, why:"Terikat waktu = fi'il. Tidak bermakna sendiri = harf."},
  {q:"Mana yang BUKAN tanda isim?", o:["Tanwin","Alif-lam","قَدْ di depannya","Didahului huruf jer"], a:2, why:"قَدْ adalah tanda fi'il (pertemuan 3)."},
  {q:"Penulisan yang benar adalah…", o:["الْكِتَابٌ","الْكِتَابُ","كِتَابٌ زَيْدٍ","الْكِتَابِنْ"], a:1, why:"Al- dan tanwin tidak berkumpul; mudhaf juga tidak bertanwin."},
  {q:"Mana yang huruf jer?", o:["ثُمَّ","سَوْفَ","عَلَى","قَدْ"], a:2, why:"ثُمَّ harf 'athf, سَوْفَ dan قَدْ tanda fi'il."},
  {q:"Pada وَالْعَصْرِ, kata الْعَصْرِ majrur karena…", o:["Mudhaf ilaih","Wawu qasam","Na'at","Ber-al"], a:1, why:"Wawu sumpah termasuk huruf jer."}
 ]
};

P[3] = {
 title: "Fi'il dan Ciri-cirinya",
 sub: "Definisi fi'il, tiga zaman, empat tanda fi'il, pengertian harf",
 materi: `
<h3>Definisi fi'il</h3>
<p>Fi'il adalah kata yang menunjukkan makna dan <b>berbarengan dengan waktu</b>: sudah, sedang/akan, atau perintah.</p>
<table class="t">
<tr><th>Jenis</th><th>Waktu</th><th>Contoh</th></tr>
<tr><td>Madhi <span class="ar">الْمَاضِي</span></td><td>Lampau (telah)</td><td class="ar">خَلَقَ ، قَالَ ، جَلَسَ</td></tr>
<tr><td>Mudhari' <span class="ar">الْمُضَارِعُ</span></td><td>Sedang / akan</td><td class="ar">يَقْرَأُ ، أَكْتُبُ ، يَذْهَبُ</td></tr>
<tr><td>Amr <span class="ar">الْأَمْرُ</span></td><td>Perintah</td><td class="ar">اقْرَأْ ، قُلْ ، اجْلِسْ</td></tr>
</table>
<p>Contoh kalimat: <span class="ar">يَقْرَأُ خَالِدٌ الْقُرْآنَ فِي غُرْفَتِهِ</span> — "Khalid sedang membaca Al-Qur'an di kamarnya". <span class="ar">يَقْرَأُ</span> adalah fi'il mudhari': kegiatan sedang berlangsung.</p>
<h3>Empat tanda fi'il</h3>
<table class="t">
<tr><th>Tanda</th><th>Masuk pada</th><th>Contoh</th></tr>
<tr><td>1. <span class="ar">قَدْ</span></td><td>Madhi (makna "sungguh telah") dan mudhari' (makna "kadang/sungguh")</td><td class="ar">قَدْ قَامَتِ الصَّلَاةُ ، قَدْ أَفْلَحَ الْمُؤْمِنُونَ</td></tr>
<tr><td>2. Sin <span class="ar">سَ</span></td><td>Mudhari' → masa dekat</td><td class="ar">سَيَذْهَبُ ، سَيَرْجِعُ ، سَيَقُولُ</td></tr>
<tr><td>3. <span class="ar">سَوْفَ</span></td><td>Mudhari' → masa lebih jauh</td><td class="ar">كَلَّا سَوْفَ تَعْلَمُونَ</td></tr>
<tr><td>4. Ta ta'nits sakinah <span class="ar">تْ</span></td><td>Madhi, untuk pelaku perempuan</td><td class="ar">قَالَ → قَالَتْ</td></tr>
</table>
<div class="note"><b>Tambahan.</b> Fi'il amr dikenali dari maknanya (perintah) ditambah bisa menerima ya mukhathabah: <span class="ar">اقْرَئِي</span> "bacalah (perempuan)". Fi'il mudhari' selalu diawali salah satu huruf <span class="ar">أ ن ي ت</span> (disingkat <i>anaitu</i>).</div>
<div class="note"><b>Kenapa قَالَتِ di QS. Al-Qashash 28:9 berharakat kasrah?</b> Aslinya <span class="ar">قَالَتْ</span> (sukun). Karena bertemu huruf sukun berikutnya (<span class="ar">امْرَأَتُ</span>), ta-nya dikasrah agar bisa diucapkan. Tetap disebut ta ta'nits sakinah.</div>
<h3>Harf</h3>
<p>Harf adalah kata yang maknanya tidak bisa dipahami kecuali disambung dengan kata lain: <span class="ar">مِنْ ، فِي ، ثُمَّ ، فَ ، أَوْ ، حَتَّى</span>. Harf <b>tidak punya tanda khusus</b>; ia dikenali karena tidak menerima tanda isim maupun tanda fi'il.</p>`,
 ayat: [
  {ref:"QS. Al-'Alaq 96:1–2", id:"Bacalah dengan nama Tuhanmu yang menciptakan. Dia menciptakan manusia dari segumpal darah.", t:[
   ["اقْرَأْ","F","m","Fi'il amr 'bacalah', mabni sukun."],
   ["بِ","H","m","Harf jer."],
   ["اسْمِ","I","j","Isim; majrur kasrah."],
   ["رَبِّكَ","I","j","رَبِّ = isim, mudhaf ilaih majrur kasrah; كَ = dhamir 'mu', mabni."],
   ["الَّذِي","I","m","Isim maushul 'yang', mabni (pertemuan 11)."],
   ["خَلَقَ","F","m","Fi'il madhi 'telah menciptakan', mabni fathah."],
   ["خَلَقَ","F","m","Fi'il madhi, diulang di ayat 2."],
   ["الْإِنْسَانَ","I","n","Isim; maf'ul bih (objek), manshub fathah."],
   ["مِنْ","H","m","Harf jer."],
   ["عَلَقٍ","I","j","Isim; majrur kasrah bertanwin."]]},
  {ref:"QS. At-Takatsur 102:3", id:"Sekali-kali tidak! Kelak kamu akan mengetahui.", t:[
   ["كَلَّا","H","m","Harf rad'u (penolakan tegas), mabni."],
   ["سَوْفَ","H","m","Harf istiqbal (masa depan). Kata setelahnya pasti fi'il mudhari'."],
   ["تَعْلَمُونَ","F","r","Fi'il mudhari', marfu' dengan tetapnya nun (bentuk 'kalian')."]]},
  {ref:"QS. Al-Qashash 28:9", id:"Dan berkatalah istri Fir'aun…", t:[
   ["وَ","H","m","Harf 'athf."],
   ["قَالَتِ","F","m","Fi'il madhi + ta ta'nits sakinah (dikasrah karena bertemu sukun). Pelakunya perempuan."],
   ["امْرَأَتُ","I","r","Isim; fa'il, marfu' dhammah (mudhaf, tanpa tanwin)."],
   ["فِرْعَوْنَ","I","j","Isim; mudhaf ilaih, majrur dengan FATHAH karena ghairu munsharif (pertemuan 12)."]]},
  {ref:"Hadits (HR. Bukhari 5027)", id:"Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya.", t:[
   ["خَيْرُكُمْ","I","r","خَيْرُ isim, mubtada marfu' dhammah + كُمْ dhamir."],
   ["مَنْ","I","m","Isim maushul 'orang yang', mabni sukun; khabar."],
   ["تَعَلَّمَ","F","m","Fi'il madhi 'mempelajari', mabni fathah."],
   ["الْقُرْآنَ","I","n","Isim; maf'ul bih, manshub fathah."],
   ["وَ","H","m","Harf 'athf."],
   ["عَلَّمَهُ","F","m","Fi'il madhi 'mengajarkan' + هُ (dhamir objek)."]]}
 ],
 latihan: [
  {type:"classify", title:"Madhi, mudhari', atau amr?", opts:["Madhi","Mudhari'","Amr"], items:[
   ["كَتَبَ",0,"'Telah menulis'."],["يَقْرَأُ",1,"Diawali ya (anaitu)."],["اقْرَأْ",2,"Perintah."],["خَلَقَ",0,"'Telah menciptakan'."],["يَجْلِسُ",1,"Diawali ya."],["قُلْ",2,"'Katakanlah'."],["جَاءَ",0,"'Telah datang'."],["تَعْلَمُونَ",1,"Diawali ta."],["أَكْتُبُ",1,"Diawali hamzah: 'saya menulis'."]]},
  {type:"classify", title:"Tanda fi'il apa yang dipakai?", opts:["قَدْ","Sin","سَوْفَ","Ta ta'nits sakinah"], items:[
   ["قَدْ أَفْلَحَ",0,"قَدْ + madhi."],["سَيَقُولُ السُّفَهَاءُ",1,"Sin + mudhari'."],["سَوْفَ تَعْلَمُونَ",2,"سَوْفَ + mudhari'."],["قَالَتْ",3,"Ta sukun di akhir madhi."],["قَدْ قَامَتِ الصَّلَاةُ",0,"(Juga ada ta ta'nits pada قَامَتِ.)"],["سَيَرْجِعُ",1,"Sin."]]}
 ],
 quiz: [
  {q:"Pembeda utama fi'il dari isim adalah…", o:["Fi'il selalu diawali huruf jer","Fi'il berbarengan dengan waktu","Fi'il selalu bertanwin","Fi'il tidak punya makna"], a:1, why:"Isim tidak terikat waktu, fi'il terikat waktu."},
  {q:"Pada سَيَقُولُ, tanda fi'ilnya adalah…", o:["قَدْ","Sin","Tanwin","Ta ta'nits"], a:1, why:"Sin di depan fi'il mudhari' menunjukkan masa dekat."},
  {q:"قَالَتْ menunjukkan pelaku…", o:["Laki-laki","Perempuan","Jamak","Tidak tentu"], a:1, why:"Ta ta'nits sakinah menandai pelaku muannats."},
  {q:"اقْرَأْ termasuk…", o:["Fi'il madhi","Fi'il mudhari'","Fi'il amr","Isim"], a:2, why:"Maknanya perintah 'bacalah'."},
  {q:"Tanda khusus harf adalah…", o:["Al-","Sin","Tidak ada tanda khusus","Tanwin"], a:2, why:"Harf dikenali karena tidak menerima tanda isim maupun fi'il."}
 ]
};

P[4] = {
 title: "Jumlah Ismiyyah & Fi'liyyah",
 sub: "Dua macam kalimat, mubtada–khabar, fi'il–fa'il, pengantar jenis isim",
 materi: `
<h3>1. Jumlah ismiyyah <span class="ar">جُمْلَةٌ اسْمِيَّةٌ</span></h3>
<p>Kalimat yang <b>diawali isim atau dhamir</b>. Unsurnya: <b>mubtada</b> (subjek) + <b>khabar</b> (predikat). Keduanya marfu'.</p>
<p class="ar big">الْقَلَمُ جَدِيدٌ ، هُوَ زَيْدٌ</p>
<p>"Pulpen itu baru", "Dia adalah Zaid". <span class="ar">الْقَلَمُ</span> dan <span class="ar">هُوَ</span> = mubtada; <span class="ar">جَدِيدٌ</span> dan <span class="ar">زَيْدٌ</span> = khabar.</p>
<h3>2. Jumlah fi'liyyah <span class="ar">جُمْلَةٌ فِعْلِيَّةٌ</span></h3>
<p>Kalimat yang <b>diawali fi'il</b>. Unsurnya: <b>fi'il</b> + <b>fa'il</b> (pelaku, marfu'), kadang ditambah <b>maf'ul bih</b> (objek, manshub).</p>
<p class="ar big">جَلَسَ عَمْرٌو ، مَرِضَ أَحْمَدُ</p>
<div class="note"><b>Tambahan.</b> Khabar tidak selalu satu kata. Bisa berupa jumlah (<span class="ar">زَيْدٌ قَامَ أَبُوهُ</span>) atau syibh jumlah/jar-majrur (<span class="ar">الْحَمْدُ لِلَّهِ</span>). Dan kalimat yang diawali <span class="ar">إِنَّ</span> tetap dihitung ismiyyah: <span class="ar">إِنَّ الْمَاءَ طَهُورٌ</span>.</div>
<div class="note"><b>Tip membaca.</b> Dalam fi'liyyah, fi'il selalu tunggal walau pelakunya jamak: <span class="ar">قَالَ الرِّجَالُ</span>, bukan <span class="ar">قَالُوا الرِّجَالُ</span>.</div>
<h3>Pengantar: isim berdasarkan jumlah</h3>
<table class="t">
<tr><th>Jenis</th><th>Makna</th><th>Pertemuan</th></tr>
<tr><td>Mufrad</td><td>Satu</td><td>5</td></tr>
<tr><td>Tasniyah / mutsanna</td><td>Dua</td><td>5</td></tr>
<tr><td>Jamak mudzakkar salim</td><td>Banyak (laki-laki), pola beraturan</td><td>6</td></tr>
<tr><td>Jamak muannats salim</td><td>Banyak (perempuan), pola beraturan</td><td>7</td></tr>
<tr><td>Jamak taksir</td><td>Banyak, pola tidak beraturan</td><td>7</td></tr>
</table>`,
 ayat: [
  {ref:"QS. Al-Qadr 97:3", id:"Malam kemuliaan itu lebih baik daripada seribu bulan.", t:[
   ["لَيْلَةُ","I","r","Isim; MUBTADA, marfu' dhammah. Kalimat diawali isim → jumlah ismiyyah."],
   ["الْقَدْرِ","I","j","Isim; mudhaf ilaih, majrur kasrah."],
   ["خَيْرٌ","I","r","Isim; KHABAR, marfu' dhammah."],
   ["مِنْ","H","m","Harf jer."],
   ["أَلْفِ","I","j","Isim; majrur kasrah."],
   ["شَهْرٍ","I","j","Isim; mudhaf ilaih, majrur kasrah."]]},
  {ref:"QS. Al-Baqarah 2:30", id:"Ingatlah ketika Tuhanmu berfirman kepada para malaikat: Aku hendak menjadikan khalifah di bumi.", t:[
   ["وَ","H","m","Harf."],
   ["إِذْ","I","m","Isim zharaf 'ketika', mabni sukun."],
   ["قَالَ","F","m","Fi'il madhi. Kalimat diawali fi'il → jumlah fi'liyyah."],
   ["رَبُّكَ","I","r","رَبُّ = FA'IL, marfu' dhammah; كَ dhamir."],
   ["لِلْمَلَائِكَةِ","I","j","لِ harf jer + الْمَلَائِكَةِ isim majrur kasrah."],
   ["إِنِّي","I","m","إِنَّ + ي (dhamir 'aku', mabni); isim inna."],
   ["جَاعِلٌ","I","r","Isim; khabar inna, marfu' dhammah."],
   ["فِي","H","m","Harf jer."],
   ["الْأَرْضِ","I","j","Isim; majrur kasrah."],
   ["خَلِيفَةً","I","n","Isim; maf'ul bih dari جَاعِلٌ, manshub fathah."]]},
  {ref:"QS. Al-Ikhlas 112:2", id:"Allah tempat bergantung.", t:[
   ["اللَّهُ","I","r","Isim; MUBTADA, marfu' dhammah."],
   ["الصَّمَدُ","I","r","Isim; KHABAR, marfu' dhammah. Jumlah ismiyyah paling ringkas."]]},
  {ref:"Hadits (HR. Muslim)", id:"Bersuci itu setengah keimanan.", t:[
   ["الطُّهُورُ","I","r","Isim; mubtada, marfu' dhammah."],
   ["شَطْرُ","I","r","Isim; khabar, marfu' dhammah."],
   ["الْإِيمَانِ","I","j","Isim; mudhaf ilaih, majrur kasrah."]]}
 ],
 latihan: [
  {type:"classify", title:"Ismiyyah atau fi'liyyah?", opts:["Jumlah ismiyyah","Jumlah fi'liyyah"], items:[
   ["الْقَلَمُ جَدِيدٌ",0,"Diawali isim."],["جَلَسَ عَمْرٌو",1,"Diawali fi'il."],["هُوَ زَيْدٌ",0,"Diawali dhamir (termasuk isim)."],["مَرِضَ أَحْمَدُ",1,"Diawali fi'il."],["اجْتَهَدَ حَسَنٌ فِي فَهْمِ الدَّرْسِ",1,"Diawali fi'il اجْتَهَدَ."],["إِنَّ الْمَاءَ طَهُورٌ",0,"Inna + mubtada–khabar → ismiyyah."],["اللَّهُ الصَّمَدُ",0,"Mubtada + khabar."],["قَالَ رَبُّكَ",1,"Fi'il + fa'il."]]},
  {type:"classify", title:"Soal ustadz: isim, fi'il, atau harf? (اجْتَهَدَ حَسَنٌ فِي فَهْمِ الدَّرْسِ / إِنَّ الْمَاءَ طَهُورٌ)", opts:["Isim","Fi'il","Harf"], items:[
   ["اجْتَهَدَ",1,"Fi'il madhi 'bersungguh-sungguh'."],["حَسَنٌ",0,"Nama, bertanwin; fa'il."],["فِي",2,"Harf jer."],["فَهْمِ",0,"Didahului huruf jer."],["الدَّرْسِ",0,"Ber-al."],["إِنَّ",2,"Harf taukid."],["الْمَاءَ",0,"Ber-al."],["طَهُورٌ",0,"Bertanwin."],["يُنَجِّسُ",1,"Fi'il mudhari'."],["شَيْءٌ",0,"Bertanwin."]]}
 ],
 quiz: [
  {q:"Jumlah ismiyyah adalah kalimat yang diawali…", o:["Fi'il","Isim atau dhamir","Huruf jer","Fi'il amr"], a:1, why:"Jika diawali fi'il, namanya fi'liyyah."},
  {q:"Pada الطُّهُورُ شَطْرُ الْإِيمَانِ, mubtadanya adalah…", o:["الطُّهُورُ","شَطْرُ","الْإِيمَانِ","Tidak ada"], a:0, why:"Kata pertama yang menjadi pokok pembicaraan."},
  {q:"Pada جَلَسَ عَمْرٌو, kata عَمْرٌو berkedudukan sebagai…", o:["Mubtada","Khabar","Fa'il","Maf'ul bih"], a:2, why:"Pelaku dalam jumlah fi'liyyah = fa'il."},
  {q:"Mana yang jumlah fi'liyyah?", o:["زَيْدٌ قَائِمٌ","قَامَ زَيْدٌ","هُوَ زَيْدٌ","الْقَلَمُ جَدِيدٌ"], a:1, why:"Diawali fi'il قَامَ."},
  {q:"Pada لَيْلَةُ الْقَدْرِ خَيْرٌ, khabarnya adalah…", o:["لَيْلَةُ","الْقَدْرِ","خَيْرٌ","مِنْ"], a:2, why:"خَيْرٌ memberi keterangan tentang لَيْلَةُ الْقَدْرِ."}
 ]
};

P[5] = {
 title: "Isim Mufrad & Tasniyah",
 sub: "Makna satu dan dua, tambahan انِ / يْنِ, contoh dalam Qur'an",
 materi: `
<h3>Isim mufrad <span class="ar">الِاسْمُ الْمُفْرَدُ</span></h3>
<p>Isim yang menunjukkan makna <b>satu</b>: <span class="ar">بَيْتٌ ، دَفْتَرٌ ، وَلَدٌ ، رَجُلٌ</span>.</p>
<p>Contoh Qur'an: <span class="ar">زَوْجٍ</span> (QS. An-Nisa 4:20) mufrad, jamaknya <span class="ar">أَزْوَاجٌ</span> (QS. Al-Baqarah 2:25). <span class="ar">الشَّيْطَانِ</span> (QS. Al-A'raf 7:200) mufrad, jamaknya <span class="ar">شَيَاطِينَ</span> (QS. Al-An'am 6:112).</p>
<h3>Isim tasniyah / mutsanna <span class="ar">الْمُثَنَّى</span></h3>
<p>Isim yang menunjukkan makna <b>dua</b>, dibentuk dengan menambah:</p>
<table class="t">
<tr><th>Keadaan</th><th>Tambahan</th><th>Contoh</th></tr>
<tr><td><span class="tag r">Rofa'</span></td><td class="ar">ـَانِ</td><td class="ar">وَلَدَانِ ، بَيْتَانِ</td></tr>
<tr><td><span class="tag n">Nashob</span> / <span class="tag j">Jer</span></td><td class="ar">ـَيْنِ</td><td class="ar">وَلَدَيْنِ ، بَيْتَيْنِ</td></tr>
</table>
<div class="note"><b>Aturan tambahan yang sering keliru.</b>
<br>• Ta marbuthah berubah jadi ta biasa: <span class="ar">مَدْرَسَةٌ → مَدْرَسَتَانِ</span>, <span class="ar">جَنَّةٌ → جَنَّتَانِ</span>.
<br>• Nun tasniyah berharakat <b>kasrah</b> (<span class="ar">ـانِ</span>), tidak bertanwin.
<br>• Nun <b>dibuang</b> saat tasniyah menjadi mudhaf: <span class="ar">يَدَانِ + أَبِي لَهَبٍ → يَدَا أَبِي لَهَبٍ</span> (QS. Al-Masad 111:1).</div>`,
 ayat: [
  {ref:"QS. Al-Ma'idah 5:23 (rofa')", id:"Berkatalah dua orang laki-laki di antara mereka yang bertakwa…", t:[
   ["قَالَ","F","m","Fi'il madhi."],
   ["رَجُلَانِ","I","r","Isim tasniyah; fa'il, marfu' dengan ALIF (ـَانِ). Mufradnya رَجُلٌ."],
   ["مِنَ","H","m","Harf jer."],
   ["الَّذِينَ","I","m","Isim maushul, mabni."],
   ["يَخَافُونَ","F","r","Fi'il mudhari', marfu' dengan tetapnya nun."]]},
  {ref:"QS. Al-Qashash 28:15 (nashob)", id:"…maka ia mendapati di dalamnya dua orang laki-laki yang berkelahi.", t:[
   ["فَوَجَدَ","F","m","فَ + fi'il madhi وَجَدَ."],
   ["فِيهَا","H","m","فِي harf jer + هَا dhamir."],
   ["رَجُلَيْنِ","I","n","Isim tasniyah; maf'ul bih, manshub dengan YA (ـَيْنِ)."],
   ["يَقْتَتِلَانِ","F","r","Fi'il mudhari' (bentuk dua), marfu' dengan tetapnya nun."]]},
  {ref:"QS. Ali 'Imran 3:13 (jer)", id:"Sungguh telah ada tanda bagimu pada dua golongan yang berhadapan.", t:[
   ["فِي","H","m","Harf jer."],
   ["فِئَتَيْنِ","I","j","Isim tasniyah; majrur dengan YA. Mufradnya فِئَةٌ (ta marbuthah → ta)."],
   ["الْتَقَتَا","F","m","Fi'il madhi + ta ta'nits + alif dua."]]},
  {ref:"QS. Al-Masad 111:1 (Juz Amma)", id:"Binasalah kedua tangan Abu Lahab.", t:[
   ["تَبَّتْ","F","m","Fi'il madhi + ta ta'nits sakinah."],
   ["يَدَا","I","r","Isim tasniyah; fa'il, marfu' ALIF. Nun dibuang karena mudhaf (aslinya يَدَانِ)."],
   ["أَبِي","I","j","Isim; mudhaf ilaih, majrur dengan YA karena asmaul khamsah (pertemuan 8)."],
   ["لَهَبٍ","I","j","Isim; mudhaf ilaih, majrur kasrah."]]},
  {ref:"QS. Al-Balad 90:10 (Juz Amma)", id:"Dan Kami telah menunjukkan kepadanya dua jalan.", t:[
   ["وَهَدَيْنَاهُ","F","m","Fi'il madhi + نَا (fa'il) + هُ (objek pertama)."],
   ["النَّجْدَيْنِ","I","n","Isim tasniyah; maf'ul bih kedua, manshub YA. Mufradnya النَّجْدُ."]]}
 ],
 latihan: [
  {type:"transform", title:"Jadikan tasniyah (bentuk rofa' / nashob-jer)", items:[
   ["رَسُولٌ","رَسُولَانِ / رَسُولَيْنِ"],["نَبِيٌّ","نَبِيَّانِ / نَبِيَّيْنِ"],["مُسْلِمٌ","مُسْلِمَانِ / مُسْلِمَيْنِ"],["كَافِرٌ","كَافِرَانِ / كَافِرَيْنِ"],["مَدْرَسَةٌ","مَدْرَسَتَانِ / مَدْرَسَتَيْنِ","Ta marbuthah → ta."],["سَبُّورَةٌ","سَبُّورَتَانِ / سَبُّورَتَيْنِ"],["عُثْمَانُ","عُثْمَانَانِ / عُثْمَانَيْنِ"],["سَلْمَانُ","سَلْمَانَانِ / سَلْمَانَيْنِ"],["عِلْمٌ","عِلْمَانِ / عِلْمَيْنِ"],["عَالِمٌ","عَالِمَانِ / عَالِمَيْنِ"]]},
  {type:"transform", title:"Kembalikan ke mufrad", items:[
   ["يَدَيْنِ","يَدٌ"],["رِجْلَانِ","رِجْلٌ"],["رَجُلَيْنِ","رَجُلٌ"],["بَابَيْنِ","بَابٌ"],["جَنَّتَانِ","جَنَّةٌ","Ta kembali menjadi ta marbuthah."]]}
 ],
 quiz: [
  {q:"Tanda rofa' isim tasniyah adalah…", o:["Dhammah","Alif","Wawu","Ya"], a:1, why:"رَجُلَانِ, وَلَدَانِ."},
  {q:"Pada فَوَجَدَ فِيهَا رَجُلَيْنِ, kata رَجُلَيْنِ dibaca…", o:["Rofa' dengan alif","Nashob dengan ya","Jer dengan kasrah","Nashob dengan fathah"], a:1, why:"Ia maf'ul bih; tasniyah nashob memakai ya."},
  {q:"Tasniyah dari مَدْرَسَةٌ adalah…", o:["مَدْرَسَةَانِ","مَدْرَسَتَانِ","مَدَارِسُ","مَدْرَسَاتٌ"], a:1, why:"Ta marbuthah berubah menjadi ta maftuhah sebelum ـانِ."},
  {q:"Kenapa يَدَا أَبِي لَهَبٍ tidak memakai nun (يَدَانِ)?", o:["Salah tulis","Karena mudhaf","Karena nashob","Karena mufrad"], a:1, why:"Nun tasniyah dan jamak mudzakkar salim dibuang saat menjadi mudhaf."},
  {q:"Mufrad dari جَنَّتَانِ adalah…", o:["جَنَّتٌ","جَنَّةٌ","جِنَانٌ","جَنَّاتٌ"], a:1, why:"Ta kembali menjadi ta marbuthah."}
 ]
};

P[6] = {
 title: "Jamak Mudzakkar Salim",
 sub: "Tambahan ونَ / ينَ, syarat, contoh Qur'an",
 materi: `
<p>Isim yang menunjukkan makna <b>jamak (banyak, ≥3) laki-laki</b> dengan pola beraturan: huruf mufradnya tetap utuh (salim), hanya ditambah akhiran.</p>
<table class="t">
<tr><th>Keadaan</th><th>Tambahan</th><th>Contoh</th></tr>
<tr><td><span class="tag r">Rofa'</span></td><td class="ar">ـُونَ</td><td class="ar">مُسْلِمُونَ ، كَافِرُونَ</td></tr>
<tr><td><span class="tag n">Nashob</span> / <span class="tag j">Jer</span></td><td class="ar">ـِينَ</td><td class="ar">مُسْلِمِينَ ، كَافِرِينَ</td></tr>
</table>
<div class="note"><b>Syarat (ringkas).</b> Hanya untuk nama atau sifat <b>laki-laki yang berakal</b>. <span class="ar">زَيْدٌ → زَيْدُونَ</span>, <span class="ar">مُؤْمِنٌ → مُؤْمِنُونَ</span>. Kata benda tak berakal seperti <span class="ar">كِتَابٌ</span> atau <span class="ar">كَلْبٌ</span> tidak bisa; jamaknya taksir (<span class="ar">كُتُبٌ</span>, <span class="ar">كِلَابٌ</span>).</div>
<div class="note"><b>Beda nun tasniyah vs nun jamak.</b> Tasniyah: <span class="ar">ـَيْنِ</span> (nun kasrah, sebelum ya fathah). Jamak: <span class="ar">ـِينَ</span> (nun fathah, sebelum ya kasrah). Bandingkan <span class="ar">مُسْلِمَيْنِ</span> (dua) dan <span class="ar">مُسْلِمِينَ</span> (banyak).</div>
<div class="note"><b>Nun dibuang saat mudhaf</b>, sama seperti tasniyah: <span class="ar">مُسْلِمُو الْمَدِينَةِ</span>. Contoh Qur'an: <span class="ar">إِنَّا مُرْسِلُو النَّاقَةِ</span> (QS. Al-Qamar 54:27).</div>
<p><span class="ar">الْعَالَمِينَ</span> termasuk <i>mulhaq</i> (disamakan) dengan jamak mudzakkar salim; i'robnya sama.</p>`,
 ayat: [
  {ref:"QS. Al-'Ankabut 29:14 (rofa')", id:"Maka mereka dilanda banjir besar, sedang mereka orang-orang zalim.", t:[
   ["فَأَخَذَهُمُ","F","m","فَ + fi'il madhi أَخَذَ + هُمْ (objek)."],
   ["الطُّوفَانُ","I","r","Isim; fa'il, marfu' dhammah."],
   ["وَهُمْ","I","m","وَ haliyah + هُمْ dhamir, mabni; mubtada."],
   ["ظَالِمُونَ","I","r","Jamak mudzakkar salim; khabar, marfu' dengan WAWU. Mufradnya ظَالِمٌ."]]},
  {ref:"QS. Ash-Shaffat 37:100 (jer)", id:"Ya Tuhanku, anugerahkanlah kepadaku (anak) yang termasuk orang-orang saleh.", t:[
   ["رَبِّ","I","n","Munada (panggilan) mudhaf, manshub; ya mutakallim dibuang."],
   ["هَبْ","F","m","Fi'il amr 'berikanlah'."],
   ["لِي","H","m","لِ harf jer + ي dhamir."],
   ["مِنَ","H","m","Harf jer."],
   ["الصَّالِحِينَ","I","j","Jamak mudzakkar salim; majrur dengan YA. Mufradnya صَالِحٌ."]]},
  {ref:"QS. Al-'Ankabut 29:15 (jer)", id:"…dan Kami jadikan peristiwa itu pelajaran bagi semua manusia.", t:[
   ["وَجَعَلْنَاهَا","F","m","Fi'il madhi + نَا (fa'il) + هَا (objek)."],
   ["آيَةً","I","n","Isim; maf'ul bih kedua, manshub fathah."],
   ["لِلْعَالَمِينَ","I","j","لِ + الْعَالَمِينَ: majrur dengan YA (mulhaq jamak mudzakkar salim)."]]},
  {ref:"QS. Al-Kafirun 109:1 (Juz Amma)", id:"Katakanlah: Wahai orang-orang kafir.", t:[
   ["قُلْ","F","m","Fi'il amr."],
   ["يَا","H","m","Harf nida (panggilan)."],
   ["أَيُّهَا","I","m","أَيُّ munada mabni dhammah + هَا tanbih."],
   ["الْكَافِرُونَ","I","r","Jamak mudzakkar salim; na'at bagi أَيُّ, marfu' dengan WAWU."]]},
  {ref:"QS. Al-Ma'un 107:4 (Juz Amma)", id:"Maka celakalah orang-orang yang salat.", t:[
   ["فَوَيْلٌ","I","r","فَ + وَيْلٌ: isim, mubtada marfu' dhammah."],
   ["لِلْمُصَلِّينَ","I","j","لِ + الْمُصَلِّينَ: jamak mudzakkar salim, majrur YA; khabar (jar majrur)."]]}
 ],
 latihan: [
  {type:"transform", title:"Jadikan jamak mudzakkar salim (rofa' / nashob-jer)", items:[
   ["صَابِرٌ","صَابِرُونَ / صَابِرِينَ"],["مُحْسِنٌ","مُحْسِنُونَ / مُحْسِنِينَ"],["عَالِمٌ","عَالِمُونَ / عَالِمِينَ"],["صَالِحٌ","صَالِحُونَ / صَالِحِينَ"],["مُفْسِدٌ","مُفْسِدُونَ / مُفْسِدِينَ"],["جَالِسٌ","جَالِسُونَ / جَالِسِينَ"],["صَادِقٌ","صَادِقُونَ / صَادِقِينَ"],["مُؤْمِنٌ","مُؤْمِنُونَ / مُؤْمِنِينَ"],["مُفْلِحٌ","مُفْلِحُونَ / مُفْلِحِينَ"],["شَاكِرٌ","شَاكِرُونَ / شَاكِرِينَ"]]},
  {type:"transform", title:"Kembalikan ke mufrad", items:[
   ["كَاذِبُونَ","كَاذِبٌ"],["فَاسِقُونَ","فَاسِقٌ"],["مُنَافِقُونَ","مُنَافِقٌ"],["مُشْرِكُونَ","مُشْرِكٌ"],["رَاحِمُونَ","رَاحِمٌ"],["ضَارِبُونَ","ضَارِبٌ"],["شَارِبُونَ","شَارِبٌ"],["قَاعِدُونَ","قَاعِدٌ"]]}
 ],
 quiz: [
  {q:"Tanda rofa' jamak mudzakkar salim adalah…", o:["Alif","Wawu","Ya","Dhammah"], a:1, why:"مُسْلِمُونَ."},
  {q:"Pada مِنَ الصَّالِحِينَ, tanda jernya…", o:["Kasrah","Ya","Fathah","Alif"], a:1, why:"Jamak mudzakkar salim jer dengan ya."},
  {q:"Mana yang TIDAK bisa dijadikan jamak mudzakkar salim?", o:["مُؤْمِنٌ","صَادِقٌ","كِتَابٌ","مُسْلِمٌ"], a:2, why:"Bukan untuk makhluk berakal laki-laki; jamaknya كُتُبٌ."},
  {q:"Mufrad dari الْمُشْرِكُونَ adalah…", o:["مُشْرِكَةٌ","الْمُشْرِكُ","شِرْكٌ","مُشْرِكَانِ"], a:1, why:"Buang akhiran ـُونَ."},
  {q:"مُسْلِمَيْنِ dan مُسْلِمِينَ berbeda pada…", o:["Tidak berbeda","Yang pertama dua, yang kedua banyak","Yang pertama rofa', kedua nashob","Keduanya jamak"], a:1, why:"Perhatikan harakat sebelum ya dan pada nun."}
 ]
};

P[7] = {
 title: "Jamak Muannats Salim & Jamak Taksir",
 sub: "Tambahan اتٌ, nashob dengan kasrah, pola jamak tak beraturan",
 materi: `
<h3>Jamak muannats salim <span class="ar">جَمْعُ الْمُؤَنَّثِ السَّالِمُ</span></h3>
<p>Jamak dengan tambahan <b>alif dan ta</b> (<span class="ar">ـَاتٌ</span>) di akhir.</p>
<p class="ar big">مُسْلِمَةٌ → مُسْلِمَاتٌ ، مُؤْمِنَةٌ → مُؤْمِنَاتٌ</p>
<table class="t">
<tr><th>Keadaan</th><th>Tanda</th><th>Contoh</th></tr>
<tr><td><span class="tag r">Rofa'</span></td><td>Dhammah</td><td class="ar">مُسْلِمَاتٌ</td></tr>
<tr><td><span class="tag n">Nashob</span></td><td><b>Kasrah</b> (bukan fathah!)</td><td class="ar">مُسْلِمَاتٍ</td></tr>
<tr><td><span class="tag j">Jer</span></td><td>Kasrah</td><td class="ar">مِنْ مُسْلِمَاتٍ ، مِنَ الْمُسْلِمَاتِ</td></tr>
</table>
<div class="note"><b>Poin paling penting bab ini.</b> Jamak muannats salim dinashobkan dengan <b>kasrah</b>. Karena itu di QS. Al-'Ashr 103:3 kita membaca <span class="ar">وَعَمِلُوا الصَّالِحَاتِ</span> dengan kasrah, padahal ia maf'ul bih (objek).</div>
<h3>Jamak taksir <span class="ar">جَمْعُ التَّكْسِيرِ</span></h3>
<p>Jamak yang <b>mengubah bentuk</b> mufradnya ("dipecah"); polanya tidak beraturan sehingga perlu dihafal. I'robnya seperti mufrad: dhammah, fathah, kasrah.</p>
<table class="t">
<tr><th>Pola (wazan)</th><th>Contoh</th></tr>
<tr><td class="ar">فُعُلٌ</td><td class="ar">كِتَابٌ → كُتُبٌ ، رَسُولٌ → رُسُلٌ</td></tr>
<tr><td class="ar">فُعُولٌ</td><td class="ar">صَدْرٌ → صُدُورٌ ، قَلْبٌ → قُلُوبٌ</td></tr>
<tr><td class="ar">أَفْعَالٌ</td><td class="ar">يَوْمٌ → أَيَّامٌ ، وَلَدٌ → أَوْلَادٌ ، قَلَمٌ → أَقْلَامٌ</td></tr>
<tr><td class="ar">فِعَالٌ</td><td class="ar">رَجُلٌ → رِجَالٌ ، جَبَلٌ → جِبَالٌ</td></tr>
<tr><td class="ar">مَفَاعِلُ</td><td class="ar">مَقْبَرَةٌ → مَقَابِرُ ، مَسْجِدٌ → مَسَاجِدُ</td></tr>
</table>
<div class="note">Pola <span class="ar">مَفَاعِلُ</span> dan <span class="ar">مَفَاعِيلُ</span> tidak bertanwin dan dijer dengan fathah. Alasannya dibahas di pertemuan 12.</div>`,
 ayat: [
  {ref:"QS. Al-Falaq 113:4 (Juz Amma)", id:"Dan dari kejahatan (perempuan) penyihir yang meniup pada buhul-buhul.", t:[
   ["وَمِنْ","H","m","وَ + مِنْ harf jer."],
   ["شَرِّ","I","j","Isim; majrur kasrah."],
   ["النَّفَّاثَاتِ","I","j","Jamak muannats salim; mudhaf ilaih, majrur kasrah. Mufradnya النَّفَّاثَةُ."],
   ["فِي","H","m","Harf jer."],
   ["الْعُقَدِ","I","j","Jamak taksir dari عُقْدَةٌ; majrur kasrah."]]},
  {ref:"QS. Al-'Ashr 103:3 (Juz Amma)", id:"Kecuali orang-orang yang beriman dan mengerjakan kebajikan…", t:[
   ["إِلَّا","H","m","Harf istitsna'."],
   ["الَّذِينَ","I","m","Isim maushul, mabni."],
   ["آمَنُوا","F","m","Fi'il madhi + wawu jamak."],
   ["وَعَمِلُوا","F","m","Fi'il madhi + wawu jamak."],
   ["الصَّالِحَاتِ","I","n","Jamak muannats salim; MAF'UL BIH, manshub dengan KASRAH. Inilah contoh klasik aturan bab ini."]]},
  {ref:"QS. An-Nas 114:5 (Juz Amma)", id:"Yang membisikkan (kejahatan) ke dalam dada manusia.", t:[
   ["الَّذِي","I","m","Isim maushul, mabni."],
   ["يُوَسْوِسُ","F","r","Fi'il mudhari', marfu' dhammah."],
   ["فِي","H","m","Harf jer."],
   ["صُدُورِ","I","j","Jamak taksir dari صَدْرٌ (pola فُعُول); majrur kasrah."],
   ["النَّاسِ","I","j","Isim; mudhaf ilaih, majrur kasrah."]]},
  {ref:"QS. At-Takatsur 102:2 (Juz Amma)", id:"Sampai kamu masuk ke dalam kubur.", t:[
   ["حَتَّى","H","m","Harf 'sampai'."],
   ["زُرْتُمُ","F","m","Fi'il madhi + تُمْ (fa'il)."],
   ["الْمَقَابِرَ","I","n","Jamak taksir dari مَقْبَرَةٌ (pola مَفَاعِل); maf'ul bih, manshub fathah."]]},
  {ref:"QS. An-Nisa 4:34", id:"Perempuan-perempuan saleh adalah yang taat dan menjaga diri…", t:[
   ["فَالصَّالِحَاتُ","I","r","Jamak muannats salim; mubtada, marfu' dhammah."],
   ["قَانِتَاتٌ","I","r","Jamak muannats salim; khabar, marfu' dhammah."],
   ["حَافِظَاتٌ","I","r","Jamak muannats salim; khabar kedua, marfu' dhammah."]]}
 ],
 latihan: [
  {type:"transform", title:"Jadikan jamak (muannats salim atau taksir)", items:[
   ["مُسْلِمَةٌ","مُسْلِمَاتٌ"],["مُؤْمِنَةٌ","مُؤْمِنَاتٌ"],["صَالِحَةٌ","صَالِحَاتٌ"],["سَيَّارَةٌ","سَيَّارَاتٌ"],["كِتَابٌ","كُتُبٌ","Taksir pola فُعُل."],["يَوْمٌ","أَيَّامٌ","Taksir pola أَفْعَال."],["قَلْبٌ","قُلُوبٌ","Taksir pola فُعُول."],["رَجُلٌ","رِجَالٌ","Taksir pola فِعَال."],["مَسْجِدٌ","مَسَاجِدُ","Taksir pola مَفَاعِل."],["وَلَدٌ","أَوْلَادٌ"]]},
  {type:"classify", title:"Jenis jamak apa?", opts:["Mudzakkar salim","Muannats salim","Taksir"], items:[
   ["مُسْلِمَاتٌ",1,"Akhiran ـات."],["كُتُبٌ",2,"Bentuk berubah."],["مُسْلِمُونَ",0,"Akhiran ـون."],["أَيَّامٌ",2,"Dari يَوْمٌ."],["الصَّالِحَاتِ",1,"Akhiran ـات."],["الْعَالَمِينَ",0,"Mulhaq jamak mudzakkar salim."],["مَقَابِرُ",2,"Dari مَقْبَرَةٌ."],["أَصْوَاتٌ",2,"Jebakan: ta-nya huruf asli bukan tambahan (dari صَوْتٌ), jadi taksir pola أَفْعَال."]]}
 ],
 quiz: [
  {q:"Jamak muannats salim dinashobkan dengan…", o:["Fathah","Kasrah","Ya","Alif"], a:1, why:"Ini pengecualian penting: nashob-nya ikut jer."},
  {q:"Pada وَعَمِلُوا الصَّالِحَاتِ, kata الصَّالِحَاتِ adalah…", o:["Majrur karena huruf jer","Maf'ul bih manshub kasrah","Mudhaf ilaih","Fa'il"], a:1, why:"Objek dari عَمِلُوا, tandanya kasrah karena jamak muannats salim."},
  {q:"Jamak dari كِتَابٌ adalah…", o:["كِتَابَاتٌ","كُتُبٌ","كِتَابُونَ","أَكْتَابٌ"], a:1, why:"Jamak taksir pola فُعُل."},
  {q:"Mufrad dari صُدُورٌ adalah…", o:["صَدْرٌ","صَادِرٌ","صُدْرَةٌ","صَدِيرٌ"], a:0, why:"صُدُورٌ pola فُعُول dari صَدْرٌ."},
  {q:"I'rob jamak taksir (umumnya) mengikuti…", o:["Tasniyah","Jamak mudzakkar salim","Isim mufrad (harakat)","Asmaul khamsah"], a:2, why:"Dhammah, fathah, kasrah — kecuali bila ghairu munsharif."}
 ]
};

P[8] = {
 title: "Asmaul Khamsah, Isim Maqshur & Manqush",
 sub: "Lima isim istimewa; isim berakhiran alif lazimah dan ya lazimah",
 materi: `
<h3>Asmaul khamsah <span class="ar">الْأَسْمَاءُ الْخَمْسَةُ</span></h3>
<p>Lima isim yang i'robnya memakai <b>huruf</b>, bukan harakat:</p>
<p class="ar big">أَبٌ ، أَخٌ ، حَمٌ ، فُو ، ذُو</p>
<p><small>ayah, saudara, ipar, mulut, pemilik</small></p>
<table class="t">
<tr><th>Keadaan</th><th>Tanda</th><th>Contoh</th></tr>
<tr><td><span class="tag r">Rofa'</span></td><td>Wawu</td><td class="ar">يَقْرَأُ أَبُوكَ الْقُرْآنَ</td></tr>
<tr><td><span class="tag n">Nashob</span></td><td>Alif</td><td class="ar">يَرَى عَلِيٌّ أَبَاكَ</td></tr>
<tr><td><span class="tag j">Jer</span></td><td>Ya</td><td class="ar">مَرَّ عَلِيٌّ بِأَبِيكَ</td></tr>
</table>
<div class="note"><b>Syarat berlaku.</b> Harus mufrad, mudhaf (disambung), dan bukan disambung ke ya "saya". <span class="ar">أَبٌ</span> sendirian (tanpa idhafah) di-i'rob biasa dengan harakat. <span class="ar">ذُو</span> selalu disambung dengan isim jenis: <span class="ar">ذُو عِلْمٍ</span>, <span class="ar">ذُو الْعَرْشِ</span>.</div>
<h3>Isim maqshur <span class="ar">الْمَقْصُورُ</span></h3>
<p>Isim mu'rab yang berakhiran <b>alif lazimah</b>: <span class="ar">الْهُدَى ، الْمُصْطَفَى ، الْوُسْطَى ، الْفَتَى ، مُوسَى</span>.</p>
<p>Alif tidak bisa diberi harakat sama sekali, sehingga <b>semua</b> i'robnya <i>muqaddarah</i> (diperkirakan): dhammah, fathah, dan kasrah muqaddarah.</p>
<h3>Isim manqush <span class="ar">الْمَنْقُوصُ</span></h3>
<p>Isim mu'rab yang berakhiran <b>ya lazimah</b> dengan huruf sebelumnya berharakat kasrah: <span class="ar">الْقَاضِي ، الْهَادِي ، الدَّاعِي ، الرَّامِي ، الزَّانِي</span>.</p>
<table class="t">
<tr><th>Keadaan</th><th>Maqshur</th><th>Manqush</th></tr>
<tr><td><span class="tag r">Rofa'</span></td><td>Dhammah muqaddarah</td><td>Dhammah muqaddarah</td></tr>
<tr><td><span class="tag n">Nashob</span></td><td>Fathah muqaddarah</td><td><b>Fathah zhahirah</b> (tampak): <span class="ar">الْقَاضِيَ</span></td></tr>
<tr><td><span class="tag j">Jer</span></td><td>Kasrah muqaddarah</td><td>Kasrah muqaddarah</td></tr>
</table>
<div class="note"><b>Saat bertanwin.</b> Maqshur: <span class="ar">فَتًى ، هُدًى</span>. Manqush tanpa al- membuang ya-nya ketika rofa' dan jer: <span class="ar">قَاضٍ</span>. Qur'an: <span class="ar">وَلِكُلِّ قَوْمٍ هَادٍ</span> (QS. Ar-Ra'd 13:7).</div>`,
 ayat: [
  {ref:"QS. Al-Buruj 85:15 (Juz Amma)", id:"Yang memiliki 'Arsy lagi Maha Mulia.", t:[
   ["ذُو","I","r","Asmaul khamsah; na'at/khabar, marfu' dengan WAWU."],
   ["الْعَرْشِ","I","j","Isim; mudhaf ilaih, majrur kasrah."],
   ["الْمَجِيدُ","I","r","Isim; na'at/khabar, marfu' dhammah."]]},
  {ref:"QS. Al-Balad 90:14 (Juz Amma)", id:"Atau memberi makan pada hari terjadi kelaparan.", t:[
   ["أَوْ","H","m","Harf 'athf."],
   ["إِطْعَامٌ","I","r","Isim; marfu' dhammah."],
   ["فِي","H","m","Harf jer."],
   ["يَوْمٍ","I","j","Isim; majrur kasrah."],
   ["ذِي","I","j","Asmaul khamsah; na'at bagi يَوْمٍ, ikut majrur dengan YA."],
   ["مَسْغَبَةٍ","I","j","Isim; mudhaf ilaih, majrur kasrah."]]},
  {ref:"QS. 'Abasa 80:34–35 (Juz Amma)", id:"Pada hari itu manusia lari dari saudaranya, dan dari ibu dan bapaknya.", t:[
   ["يَوْمَ","I","n","Isim zharaf, manshub fathah."],
   ["يَفِرُّ","F","r","Fi'il mudhari', marfu' dhammah."],
   ["الْمَرْءُ","I","r","Isim; fa'il, marfu' dhammah."],
   ["مِنْ","H","m","Harf jer."],
   ["أَخِيهِ","I","j","Asmaul khamsah; majrur dengan YA."],
   ["وَأُمِّهِ","I","j","Ma'thuf, majrur kasrah."],
   ["وَأَبِيهِ","I","j","Asmaul khamsah; ma'thuf, majrur dengan YA."]]},
  {ref:"QS. Yusuf 12:8 (nashob asmaul khamsah)", id:"Sungguh ayah kita dalam kekeliruan yang nyata.", t:[
   ["إِنَّ","H","m","Harf taukid, menashobkan isimnya."],
   ["أَبَانَا","I","n","Asmaul khamsah; isim inna, manshub dengan ALIF."],
   ["لَفِي","H","m","لَ taukid + فِي harf jer."],
   ["ضَلَالٍ","I","j","Isim; majrur kasrah."],
   ["مُبِينٍ","I","j","Na'at, majrur kasrah."]]},
  {ref:"QS. Al-A'la 87:1 & Adh-Dhuha 93:1 (maqshur)", id:"Sucikanlah nama Tuhanmu Yang Maha Tinggi. / Demi waktu dhuha.", t:[
   ["سَبِّحِ","F","m","Fi'il amr."],
   ["اسْمَ","I","n","Maf'ul bih, manshub fathah."],
   ["رَبِّكَ","I","j","Mudhaf ilaih, majrur kasrah."],
   ["الْأَعْلَى","I","j","Isim MAQSHUR; na'at, majrur dengan kasrah MUQADDARAH."],
   ["وَالضُّحَى","I","j","Wawu qasam + الضُّحَى isim MAQSHUR, majrur kasrah muqaddarah."]]},
  {ref:"QS. Yunus 10:81 & An-Nur 24:2", id:"Musa berkata… / Pezina perempuan dan pezina laki-laki…", t:[
   ["قَالَ","F","m","Fi'il madhi."],
   ["مُوسَى","I","r","Isim MAQSHUR; fa'il, marfu' dhammah muqaddarah."],
   ["الزَّانِيَةُ","I","r","Isim; mubtada, marfu' dhammah (ta marbuthah, bukan manqush)."],
   ["وَالزَّانِي","I","r","Isim MANQUSH; ma'thuf, marfu' dhammah muqaddarah."]]},
  {ref:"QS. Al-Ahqaf 46:31 (manqush nashob)", id:"Wahai kaum kami, penuhilah seruan penyeru Allah.", t:[
   ["أَجِيبُوا","F","m","Fi'il amr + wawu jamak."],
   ["دَاعِيَ","I","n","Isim MANQUSH; maf'ul bih, manshub dengan fathah ZHAHIRAH (tampak)."],
   ["اللَّهِ","I","j","Mudhaf ilaih, majrur kasrah."]]}
 ],
 latihan: [
  {type:"transform", title:"Ubah ke tiga keadaan (rofa' / nashob / jer)", items:[
   ["أَبُو بَكْرٍ","أَبُو بَكْرٍ / أَبَا بَكْرٍ / أَبِي بَكْرٍ"],["أَبُو دَاوُدَ","أَبُو دَاوُدَ / أَبَا دَاوُدَ / أَبِي دَاوُدَ"],["أَخُو عَلِيٍّ","أَخُو عَلِيٍّ / أَخَا عَلِيٍّ / أَخِي عَلِيٍّ"],["أَبُو هُرَيْرَةَ","أَبُو هُرَيْرَةَ / أَبَا هُرَيْرَةَ / أَبِي هُرَيْرَةَ"],["ذُو فَضْلٍ","ذُو فَضْلٍ / ذَا فَضْلٍ / ذِي فَضْلٍ"],["ذُو عِلْمٍ","ذُو عِلْمٍ / ذَا عِلْمٍ / ذِي عِلْمٍ"],["أَبُو طَالِبٍ","أَبُو طَالِبٍ / أَبَا طَالِبٍ / أَبِي طَالِبٍ"]]},
  {type:"classify", title:"Maqshur, manqush, atau bukan keduanya?", opts:["Maqshur","Manqush","Bukan keduanya"], items:[
   ["الْهُدَى",0,"Berakhir alif lazimah."],["الْقَاضِي",1,"Ya lazimah, sebelumnya kasrah."],["مُوسَى",0,"Alif lazimah (ditulis ى)."],["الدَّاعِي",1,"Ya lazimah."],["الْفَتَى",0,"Alif."],["كِتَابٌ",2,"Huruf akhirnya ba."],["الْوُسْطَى",0,"Alif."],["ظَبْيٌ",2,"Jebakan: ya-nya sukun setelah sukun, tidak didahului kasrah."]]}
 ],
 quiz: [
  {q:"Asmaul khamsah adalah…", o:["أَبٌ أَخٌ حَمٌ فُو ذُو","أَبٌ أُمٌّ أَخٌ أُخْتٌ ابْنٌ","هُوَ هِيَ أَنْتَ أَنَا نَحْنُ","مَنْ مَا مَتَى أَيْنَ كَيْفَ"], a:0, why:"Ayah, saudara, ipar, mulut, pemilik."},
  {q:"Pada رَأَيْتُ أَبَاكَ, kata أَبَاكَ dibaca…", o:["Rofa' dengan wawu","Nashob dengan alif","Jer dengan ya","Nashob dengan fathah"], a:1, why:"Maf'ul bih; asmaul khamsah nashob dengan alif."},
  {q:"مِنْ أَخِيهِ: tanda jer أَخِيهِ adalah…", o:["Kasrah","Ya","Alif","Wawu"], a:1, why:"Asmaul khamsah jer dengan ya."},
  {q:"جَاءَ مُوسَى: tanda rofa' مُوسَى adalah…", o:["Dhammah zhahirah","Dhammah muqaddarah","Wawu","Alif"], a:1, why:"Maqshur: semua i'robnya muqaddarah."},
  {q:"رَأَيْتُ الْقَاضِيَ: tanda nashobnya…", o:["Fathah muqaddarah","Fathah zhahirah","Alif","Ya"], a:1, why:"Manqush: nashob tampak, rofa' & jer muqaddarah."},
  {q:"Isim maqshur berakhiran…", o:["Ya lazimah","Alif lazimah","Hamzah","Ta marbuthah"], a:1, why:"Contoh الْهُدَى, الْفَتَى."}
 ]
};

P[9] = {
 title: "I'rob dan Bina'",
 sub: "Kata yang berubah dan kata yang tetap; empat keadaan i'rob",
 materi: `
<h3>I'rob <span class="ar">الْإِعْرَابُ</span></h3>
<p class="ar big">الْإِعْرَابُ هُوَ تَغْيِيرُ أَوَاخِرِ الْكَلِمِ لِاخْتِلَافِ الْعَوَامِلِ الدَّاخِلَةِ عَلَيْهَا</p>
<p>I'rob adalah <b>perubahan akhir kata</b> karena <b>'amil</b> (faktor penyebab) yang masuk padanya. Coba ganti 'amil di bawah ini dan lihat akhir kata berubah atau tidak:</p>
<div data-widget="amil"></div>
<h3>Bina' <span class="ar">الْبِنَاءُ</span></h3>
<p>Bina' adalah <b>tetapnya akhir kata</b> dalam satu keadaan, apa pun 'amilnya. Kata seperti ini disebut <b>mabni</b>: <span class="ar">هُوَ ، أَنْتَ ، أَنَا ، نَحْنُ ، هَذِهِ</span>. Kata yang bisa berubah disebut <b>mu'rab</b>.</p>
<h3>Skema empat keadaan i'rob</h3>
<table class="t">
<tr><th>I'rob</th><th>Tanda asli</th><th>Masuk pada</th></tr>
<tr><td><span class="tag r">Rofa'</span></td><td>Dhammah</td><td>Isim dan fi'il</td></tr>
<tr><td><span class="tag n">Nashob</span></td><td>Fathah</td><td>Isim dan fi'il</td></tr>
<tr><td><span class="tag j">Jer / khafdh</span></td><td>Kasrah</td><td><b>Isim saja</b></td></tr>
<tr><td><span class="tag z">Jazm</span></td><td>Sukun</td><td><b>Fi'il saja</b></td></tr>
</table>
<div class="note"><b>Yang mu'rab dan yang mabni.</b> Semua harf mabni. Fi'il madhi dan amr mabni; fi'il mudhari' mu'rab (kecuali bertemu nun taukid/niswah). Isim umumnya mu'rab, kecuali isim-isim mabni di pertemuan 11.</div>
<div class="note"><b>Mahall.</b> Kata mabni tetap punya <i>kedudukan</i>. <span class="ar">هُوَ</span> dalam <span class="ar">قُلْ هُوَ اللَّهُ أَحَدٌ</span> adalah mubtada; akhirnya tidak berubah, tapi dikatakan "mabni fathah fi mahalli rofa'" (kedudukannya rofa').</div>`,
 ayat: [
  {ref:"QS. Al-A'raf 7:196", id:"Sesungguhnya pelindungku adalah Allah yang telah menurunkan Kitab, dan Dia melindungi orang-orang saleh.", t:[
   ["إِنَّ","H","m","Harf, mabni."],
   ["وَلِيِّيَ","I","n","Isim inna, manshub (muqaddar karena bersambung ya mutakallim)."],
   ["اللَّهُ","I","r","Khabar inna, marfu' dhammah."],
   ["الَّذِي","I","m","MABNI: isim maushul, akhirnya tetap."],
   ["نَزَّلَ","F","m","Fi'il madhi, MABNI fathah."],
   ["الْكِتَابَ","I","n","MU'RAB: maf'ul bih, manshub fathah."],
   ["وَهُوَ","I","m","MABNI: dhamir, mubtada."],
   ["يَتَوَلَّى","F","r","Fi'il mudhari', MU'RAB: marfu' dhammah muqaddarah."],
   ["الصَّالِحِينَ","I","n","MU'RAB: maf'ul bih, manshub ya."]]},
  {ref:"QS. Ath-Thariq 86:14 (Juz Amma)", id:"Dan (Al-Qur'an) itu bukanlah senda gurau.", t:[
   ["وَمَا","H","m","مَا nafiyah (harf), mabni."],
   ["هُوَ","I","m","MABNI: dhamir, isim مَا."],
   ["بِالْهَزْلِ","I","j","بِ tambahan (za'idah) + الْهَزْلِ: majrur secara lafaz, kedudukannya khabar مَا."]]},
  {ref:"QS. Al-Ikhlas 112:1", id:"Katakanlah: Dialah Allah, Yang Maha Esa.", t:[
   ["قُلْ","F","m","Fi'il amr, MABNI sukun."],
   ["هُوَ","I","m","MABNI fathah, kedudukan rofa' (mubtada)."],
   ["اللَّهُ","I","r","MU'RAB: khabar, marfu' dhammah."],
   ["أَحَدٌ","I","r","MU'RAB: marfu' dhammah."]]}
 ],
 latihan: [
  {type:"classify", title:"Mu'rab atau mabni?", opts:["Mu'rab","Mabni"], items:[
   ["كِتَابٌ",0,"Bisa jadi كِتَابًا, كِتَابٍ."],["هُوَ",1,"Dhamir."],["الَّذِي",1,"Maushul."],["طَالِبٌ",0,"Berubah sesuai 'amil."],["هَذِهِ",1,"Isyarah."],["نَحْنُ",1,"Dhamir."],["مَسْجِدٌ",0,"Isim biasa."],["كَتَبَ",1,"Fi'il madhi."],["يَكْتُبُ",0,"Fi'il mudhari'."],["مِنْ",1,"Semua harf mabni."]]},
  {type:"classify", title:"Kata طَالِبٌ dalam kalimat ini dibaca…", opts:["Rofa'","Nashob","Jer"], items:[
   ["هَذَا طَالِبٌ",0,"Khabar."],["رَأَيْتُ طَالِبًا",1,"Maf'ul bih."],["مَرَرْتُ بِطَالِبٍ",2,"Setelah huruf jer."],["جَاءَ طَالِبٌ",0,"Fa'il."],["إِنَّ طَالِبًا مُجْتَهِدٌ",1,"Isim inna."],["كِتَابُ طَالِبٍ",2,"Mudhaf ilaih."]]}
 ],
 quiz: [
  {q:"I'rob adalah…", o:["Tetapnya akhir kata","Perubahan akhir kata karena 'amil","Perubahan bentuk kata dasar","Cara membaca huruf"], a:1, why:"Tetapnya akhir kata = bina'."},
  {q:"Jazm hanya masuk pada…", o:["Isim","Fi'il","Harf","Isim dan fi'il"], a:1, why:"Jer khusus isim, jazm khusus fi'il."},
  {q:"Jer hanya masuk pada…", o:["Isim","Fi'il","Harf","Semua"], a:0, why:"Karena itu khafdh menjadi tanda isim."},
  {q:"Mana kata mabni?", o:["كِتَابٌ","هُوَ","طَالِبٌ","مَسْجِدٌ"], a:1, why:"Dhamir termasuk isim mabni."},
  {q:"مَرَرْتُ بِطَالِبٍ: apa 'amil yang menjerkan طَالِبٍ?", o:["مَرَّ","Huruf بِ","Tanwin","Tidak ada"], a:1, why:"Huruf jer adalah 'amil jer."}
 ]
};

P[10] = {
 title: "Sembilan Isim Mu'rab & Tanda I'robnya",
 sub: "Tabel induk: rofa', nashob, jer untuk 9 jenis isim",
 materi: `
<p>Inilah tabel yang menyatukan pertemuan 5–8 dan 12. Pilih keadaan i'rob untuk melihat tanda dan contohnya:</p>
<div data-widget="tabel9"></div>
<div class="note"><b>Cara menghafal.</b> Yang "menyimpang" dari pola dasar (dhammah–fathah–kasrah) hanya lima kelompok:
<br>• <b>Tasniyah</b>: alif / ya / ya
<br>• <b>Jamak mudzakkar salim</b>: wawu / ya / ya
<br>• <b>Asmaul khamsah</b>: wawu / alif / ya
<br>• <b>Jamak muannats salim</b>: nashob-nya kasrah
<br>• <b>Ghairu munsharif</b>: jer-nya fathah
<br>Maqshur dan manqush polanya tetap harakat, hanya muqaddarah.</div>
<div class="note"><b>Tanda asli vs tanda pengganti.</b> Dhammah, fathah, kasrah disebut tanda asli (<span class="ar">أَصْلِيَّةٌ</span>). Alif, wawu, ya, serta kasrah-untuk-nashob dan fathah-untuk-jer disebut tanda pengganti (<span class="ar">فَرْعِيَّةٌ</span>).</div>`,
 ayat: [
  {ref:"QS. Al-Fatihah 1:6–7", id:"Tunjukilah kami jalan yang lurus, jalan orang-orang yang telah Engkau beri nikmat…", t:[
   ["اهْدِنَا","F","m","Fi'il amr + نَا (objek)."],
   ["الصِّرَاطَ","I","n","Mufrad; maf'ul bih kedua, manshub FATHAH."],
   ["الْمُسْتَقِيمَ","I","n","Mufrad; na'at, manshub FATHAH."],
   ["صِرَاطَ","I","n","Mufrad; badal, manshub FATHAH."],
   ["الَّذِينَ","I","m","Isim maushul, mabni (pertemuan 11)."],
   ["أَنْعَمْتَ","F","m","Fi'il madhi + تَ."],
   ["عَلَيْهِمْ","H","m","عَلَى + هِمْ."],
   ["غَيْرِ","I","j","Mufrad; badal/na'at, majrur KASRAH."],
   ["الْمَغْضُوبِ","I","j","Mufrad; mudhaf ilaih, majrur KASRAH."],
   ["وَلَا","H","m","Harf."],
   ["الضَّالِّينَ","I","j","Jamak mudzakkar salim; ma'thuf, majrur YA."]]},
  {ref:"QS. Al-Baqarah 2:2", id:"Kitab itu tidak ada keraguan padanya; petunjuk bagi orang-orang bertakwa.", t:[
   ["ذَٰلِكَ","I","m","Isim isyarah, mabni."],
   ["الْكِتَابُ","I","r","Mufrad; marfu' DHAMMAH."],
   ["لَا","H","m","Harf nafi."],
   ["رَيْبَ","I","m","Isim لَا nafiyah lil-jins, mabni fathah."],
   ["فِيهِ","H","m","فِي + هِ."],
   ["هُدًى","I","r","MAQSHUR; khabar, marfu' dhammah MUQADDARAH."],
   ["لِلْمُتَّقِينَ","I","j","Jamak mudzakkar salim; majrur YA."]]},
  {ref:"QS. Al-Kahfi 18:46", id:"Harta dan anak-anak adalah perhiasan kehidupan dunia.", t:[
   ["الْمَالُ","I","r","Mufrad; mubtada, marfu' DHAMMAH."],
   ["وَالْبَنُونَ","I","r","Mulhaq jamak mudzakkar salim; ma'thuf, marfu' WAWU."],
   ["زِينَةُ","I","r","Mufrad; khabar, marfu' DHAMMAH."],
   ["الْحَيَاةِ","I","j","Mufrad; mudhaf ilaih, majrur KASRAH."],
   ["الدُّنْيَا","I","j","MAQSHUR (alif ta'nits); na'at, majrur kasrah MUQADDARAH."]]}
 ],
 latihan: [
  {type:"classify", title:"Soal ustadz: tentukan i'rob dan tandanya", opts:null, items:[
   ["بِالْمُؤْمِنِينَ",["Jer, tanda ya (jamak mudzakkar salim)","Jer, tanda kasrah","Nashob, tanda ya (tasniyah)","Rofa', tanda wawu"],0,"Didahului بِ; jamak mudzakkar salim."],
   ["ظُلُمَاتٌ",["Rofa', dhammah (jamak muannats salim)","Nashob, kasrah","Rofa', wawu","Jer, kasrah"],0,"Bertanwin dhammah; jamak dari ظُلْمَةٌ."],
   ["عَنْ أَبِي هُرَيْرَةَ ← أَبِي",["Jer, tanda ya (asmaul khamsah)","Jer, kasrah","Nashob, alif","Rofa', wawu"],0,"Didahului عَنْ."],
   ["عَنْ أَبِي هُرَيْرَةَ ← هُرَيْرَةَ",["Jer, tanda fathah (ghairu munsharif)","Nashob, fathah","Jer, kasrah","Rofa', dhammah"],0,"Mudhaf ilaih; nama + ta ta'nits → ghairu munsharif."],
   ["ظَالِمُونَ",["Rofa', wawu","Nashob, ya","Rofa', dhammah","Jer, ya"],0,"Jamak mudzakkar salim rofa'."],
   ["الْكَافِرِينَ",["Nashob/jer, ya","Rofa', wawu","Jer, kasrah","Nashob, fathah"],0,"Tergantung konteks: nashob atau jer, tandanya sama-sama ya."],
   ["بِالْهُدَى",["Jer, kasrah muqaddarah (maqshur)","Jer, kasrah zhahirah","Jer, ya","Rofa', dhammah muqaddarah"],0,"Maqshur."],
   ["عَيْنَيْنِ",["Nashob/jer, ya (tasniyah)","Nashob/jer, ya (jamak mudzakkar salim)","Rofa', alif","Jer, kasrah"],0,"Ya didahului fathah, nun kasrah → tasniyah."],
   ["أَنْفُسَهُمْ",["Nashob, fathah (jamak taksir)","Nashob, kasrah","Rofa', dhammah","Jer, kasrah"],0,"Jamak taksir dari نَفْسٌ."],
   ["قُلُوبِهِمْ",["Jer, kasrah (jamak taksir)","Jer, ya","Nashob, fathah","Rofa', dhammah"],0,"Jamak taksir."],
   ["عَنْ عَائِشَةَ",["Jer, fathah (ghairu munsharif)","Nashob, fathah","Jer, kasrah","Rofa', dhammah"],0,"Nama perempuan → ghairu munsharif."],
   ["ذَا عِلْمٍ",["Nashob, alif (asmaul khamsah)","Rofa', wawu","Jer, ya","Nashob, fathah"],0,"Asmaul khamsah nashob."],
   ["جَاءَ الْقَاضِي",["Rofa', dhammah muqaddarah (manqush)","Rofa', dhammah zhahirah","Jer, kasrah muqaddarah","Nashob, fathah"],0,"Fa'il; manqush."],
   ["أَبُو طَالِبٍ",["Rofa', wawu","Nashob, alif","Jer, ya","Rofa', dhammah"],0,"Asmaul khamsah rofa'."],
   ["جَنَّتَانِ",["Rofa', alif (tasniyah)","Nashob, ya","Rofa', dhammah","Jer, ya"],0,"Tasniyah rofa'."]]}
 ],
 quiz: [
  {q:"Tanda nashob jamak mudzakkar salim adalah…", o:["Fathah","Kasrah","Ya","Alif"], a:2, why:"مُسْلِمِينَ."},
  {q:"Tanda jer isim ghairu munsharif adalah…", o:["Kasrah","Fathah","Ya","Sukun"], a:1, why:"Selama tidak ber-al dan tidak mudhaf."},
  {q:"Tanda rofa' tasniyah adalah…", o:["Alif","Wawu","Dhammah","Ya"], a:0, why:"رَجُلَانِ."},
  {q:"Tanda nashob jamak muannats salim adalah…", o:["Fathah","Kasrah","Ya","Alif"], a:1, why:"Pengecualian penting: عَمِلُوا الصَّالِحَاتِ."},
  {q:"Tanda rofa' asmaul khamsah adalah…", o:["Wawu","Alif","Ya","Dhammah"], a:0, why:"أَبُوكَ."},
  {q:"Tanda jer الْقَاضِي adalah…", o:["Kasrah zhahirah","Kasrah muqaddarah","Ya","Fathah"], a:1, why:"Manqush: rofa' dan jer muqaddarah."}
 ]
};

P[11] = {
 title: "Isim-isim Mabni",
 sub: "Dhamir, isyarah, maushul, istifham, syarat",
 materi: `
<p>Lima kelompok isim yang akhirnya <b>tidak berubah</b> walau dimasuki 'amil.</p>
<h3>1. Isim dhamir (kata ganti)</h3>
<table class="t">
<tr><th></th><th>Tunggal</th><th>Jamak</th></tr>
<tr><td>Orang ke-3</td><td class="ar">هُوَ (dia lk) ، هِيَ (dia pr)</td><td class="ar">هُمْ ، هُنَّ</td></tr>
<tr><td>Orang ke-2</td><td class="ar">أَنْتَ (lk) ، أَنْتِ (pr)</td><td class="ar">أَنْتُمْ ، أَنْتُنَّ</td></tr>
<tr><td>Orang ke-1</td><td class="ar">أَنَا</td><td class="ar">نَحْنُ</td></tr>
</table>
<h3>2. Isim isyarah (kata tunjuk)</h3>
<table class="t">
<tr><th></th><th>Dekat</th><th>Jauh</th></tr>
<tr><td>Mudzakkar</td><td class="ar">هَٰذَا ، هَٰذَانِ ، هَٰؤُلَاءِ</td><td class="ar">ذَٰلِكَ ، ذَانِكَ ، أُولَٰئِكَ</td></tr>
<tr><td>Muannats</td><td class="ar">هَٰذِهِ ، هَاتَانِ ، هَٰؤُلَاءِ</td><td class="ar">تِلْكَ ، تَانِكَ ، أُولَٰئِكَ</td></tr>
</table>
<h3>3. Isim maushul (kata sambung "yang")</h3>
<table class="t">
<tr><th></th><th>Tunggal</th><th>Dua</th><th>Jamak</th></tr>
<tr><td>Mudzakkar</td><td class="ar">الَّذِي</td><td class="ar">اللَّذَانِ</td><td class="ar">الَّذِينَ</td></tr>
<tr><td>Muannats</td><td class="ar">الَّتِي</td><td class="ar">اللَّتَانِ</td><td class="ar">اللَّاتِي ، اللَّائِي</td></tr>
</table>
<div class="note"><b>Pengecualian.</b> Bentuk dua (<span class="ar">هَٰذَانِ/هَٰذَيْنِ</span>, <span class="ar">اللَّذَانِ/اللَّذَيْنِ</span>) berubah seperti tasniyah, sehingga sebagian ulama menganggapnya mu'rab.</div>
<h3>4. Isim istifham (kata tanya)</h3>
<p><span class="ar">مَنْ</span> siapa · <span class="ar">مَا</span> apa · <span class="ar">مَتَى</span> kapan · <span class="ar">أَيْنَ</span> di mana · <span class="ar">كَيْفَ</span> bagaimana · <span class="ar">كَمْ</span> berapa</p>
<div class="note"><b>Koreksi kecil.</b> <span class="ar">هَلْ</span> dan <span class="ar">أَ</span> juga kata tanya, tapi statusnya <b>harf istifham</b>, bukan isim. Sebaliknya <span class="ar">أَيُّ</span> ("yang mana") adalah isim istifham yang mu'rab.</div>
<h3>5. Isim syarat (kata syarat)</h3>
<p><span class="ar">مَنْ</span> barang siapa · <span class="ar">مَا</span> apa saja · <span class="ar">مَتَى</span> kapan saja · <span class="ar">مَهْمَا</span> apa pun. Isim syarat menjazmkan dua fi'il: <span class="ar">مَنْ يَتَوَكَّلْ … فَهُوَ حَسْبُهُ</span>.</p>
<div class="note"><b>Satu kata, beda fungsi.</b> <span class="ar">مَنْ</span> bisa istifham (<span class="ar">مَنْ رَبُّكَ؟</span> "siapa Tuhanmu?"), maushul (<span class="ar">خَيْرُكُمْ مَنْ تَعَلَّمَ</span>), atau syarat (<span class="ar">مَنْ يَعْمَلْ</span>). Tentukan dari konteks.</div>`,
 ayat: [
  {ref:"QS. Al-Baqarah 2:25 (maushul)", id:"Sampaikan kabar gembira kepada orang-orang yang beriman dan berbuat kebajikan…", t:[
   ["وَبَشِّرِ","F","m","Fi'il amr."],
   ["الَّذِينَ","I","m","ISIM MAUSHUL, mabni fathah; kedudukan maf'ul bih."],
   ["آمَنُوا","F","m","Fi'il madhi (shilah maushul)."],
   ["وَعَمِلُوا","F","m","Fi'il madhi."],
   ["الصَّالِحَاتِ","I","n","Maf'ul bih, manshub kasrah (jamak muannats salim)."]]},
  {ref:"QS. Al-Baqarah 2:29 (dhamir & maushul)", id:"Dialah yang menciptakan untukmu segala yang ada di bumi.", t:[
   ["هُوَ","I","m","ISIM DHAMIR, mabni; mubtada."],
   ["الَّذِي","I","m","ISIM MAUSHUL, mabni; khabar."],
   ["خَلَقَ","F","m","Fi'il madhi."],
   ["لَكُمْ","H","m","لَ + كُمْ (dhamir)."],
   ["مَا","I","m","ISIM MAUSHUL 'apa yang', mabni; maf'ul bih."],
   ["فِي","H","m","Harf jer."],
   ["الْأَرْضِ","I","j","Majrur kasrah."]]},
  {ref:"QS. Ar-Rum 30:21 (isyarah)", id:"Sungguh, pada yang demikian itu benar-benar terdapat tanda bagi kaum yang berpikir.", t:[
   ["إِنَّ","H","m","Harf taukid."],
   ["فِي","H","m","Harf jer."],
   ["ذَٰلِكَ","I","m","ISIM ISYARAH, mabni. Walau didahului فِي, akhirnya tidak berubah."],
   ["لَآيَاتٍ","I","n","لَ taukid + آيَاتٍ: isim inna, manshub KASRAH (jamak muannats salim)."],
   ["لِقَوْمٍ","I","j","Majrur kasrah."],
   ["يَتَفَكَّرُونَ","F","r","Fi'il mudhari', marfu' tetapnya nun."]]},
  {ref:"QS. Al-Ghasyiyah 88:1 (istifham)", id:"Sudahkah sampai kepadamu berita tentang (hari) yang menutupi?", t:[
   ["هَلْ","H","m","Kata tanya (harf istifham)."],
   ["أَتَاكَ","F","m","Fi'il madhi + كَ (objek)."],
   ["حَدِيثُ","I","r","Fa'il, marfu' dhammah."],
   ["الْغَاشِيَةِ","I","j","Mudhaf ilaih, majrur kasrah."]]},
  {ref:"QS. Ath-Thalaq 65:3 (syarat)", id:"Barang siapa bertawakal kepada Allah, niscaya Allah mencukupinya.", t:[
   ["وَمَنْ","I","m","ISIM SYARAT, mabni sukun."],
   ["يَتَوَكَّلْ","F","z","Fi'il syarat, MAJZUM dengan sukun karena مَنْ."],
   ["عَلَى","H","m","Harf jer."],
   ["اللَّهِ","I","j","Majrur kasrah."],
   ["فَهُوَ","I","m","فَ jawab + هُوَ dhamir mabni."],
   ["حَسْبُهُ","I","r","Khabar, marfu' dhammah."]]},
  {ref:"QS. Al-Ma'un 107:1–2 (Juz Amma)", id:"Tahukah kamu orang yang mendustakan agama? Itulah orang yang menghardik anak yatim.", t:[
   ["أَرَأَيْتَ","F","m","أَ (harf istifham) + fi'il madhi."],
   ["الَّذِي","I","m","ISIM MAUSHUL, mabni."],
   ["يُكَذِّبُ","F","r","Fi'il mudhari', marfu'."],
   ["بِالدِّينِ","I","j","Majrur kasrah."],
   ["فَذَٰلِكَ","I","m","ISIM ISYARAH, mabni; mubtada."],
   ["الَّذِي","I","m","ISIM MAUSHUL, mabni; khabar."],
   ["يَدُعُّ","F","r","Fi'il mudhari', marfu' dhammah."],
   ["الْيَتِيمَ","I","n","Maf'ul bih, manshub fathah."]]}
 ],
 latihan: [
  {type:"classify", title:"Termasuk isim mabni jenis apa?", opts:["Dhamir","Isyarah","Maushul","Istifham","Syarat"], items:[
   ["هُوَ",0,"Kata ganti."],["ذَٰلِكَ",1,"Kata tunjuk jauh."],["الَّتِي",2,"'Yang' (perempuan)."],["كَيْفَ حَالُكَ؟",3,"Bertanya."],["مَهْمَا تَفْعَلْ",4,"Syarat 'apa pun'."],["أُولَٰئِكَ",1,"Kata tunjuk jamak."],["الَّذِينَ",2,"'Yang' (jamak)."],["نَحْنُ",0,"'Kami'."],["مَنْ رَبُّكَ؟",3,"Bertanya 'siapa'."],["مَنْ يَعْمَلْ خَيْرًا يَرَهُ",4,"Diikuti dua fi'il majzum."],["هَٰذِهِ",1,"Kata tunjuk dekat (pr)."],["أَيْنَ",3,"'Di mana'."]]}
 ],
 quiz: [
  {q:"هُمْ termasuk…", o:["Isim isyarah","Isim dhamir","Isim maushul","Harf"], a:1, why:"Kata ganti 'mereka'."},
  {q:"الَّذِينَ termasuk…", o:["Isim maushul","Isim syarat","Isim isyarah","Jamak mudzakkar salim"], a:0, why:"Walau berakhiran ـينَ, ia mabni, bukan jamak mudzakkar salim."},
  {q:"Pada فِي ذَٰلِكَ, akhir ذَٰلِكَ…", o:["Berubah jadi kasrah","Tetap, karena mabni","Berubah jadi ya","Hilang"], a:1, why:"Isim isyarah mabni."},
  {q:"Isim istifham untuk 'kapan' adalah…", o:["أَيْنَ","كَيْفَ","مَتَى","كَمْ"], a:2, why:"أَيْنَ di mana, كَيْفَ bagaimana, كَمْ berapa."},
  {q:"Pada وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ, kata مَنْ adalah…", o:["Isim istifham","Isim syarat","Isim maushul","Harf jer"], a:1, why:"Menjazmkan يَتَوَكَّلْ dan punya jawab فَهُوَ حَسْبُهُ."}
 ]
};

P[12] = {
 title: "Isim Ghairu Munsharif",
 sub: "Isim yang tidak menerima tanwin; satu 'illat dan dua 'illat",
 materi: `
<p><b>Ghairu munsharif</b> <span class="ar">الْمَمْنُوعُ مِنَ الصَّرْفِ</span> adalah isim yang <b>tidak menerima tanwin</b>, dan ketika jer dibaca <b>fathah</b> (bukan kasrah). Penyebabnya disebut <b>'illat</b>.</p>
<p class="ar big">مَرَرْتُ بِمَسَاجِدَ</p>
<div class="note"><b>Kembali ke kasrah bila</b> ber-<span class="ar">أل</span> atau menjadi mudhaf: <span class="ar">فِي الْمَسَاجِدِ</span>, <span class="ar">مِنَ الْخَيْطِ الْأَسْوَدِ</span>.</div>
<h3>A. Cukup satu 'illat</h3>
<table class="t">
<tr><th>'Illat</th><th>Pola</th><th>Contoh</th></tr>
<tr><td>Shighat muntahal jumu' <span class="ar">صِيغَةُ مُنْتَهَى الْجُمُوعِ</span><br><small>jamak "terakhir", tak bisa dijamakkan lagi</small></td><td class="ar">مَفَاعِلُ ، مَفَاعِيلُ</td><td class="ar">مَسْجِدٌ → مَسَاجِدُ<br>دِينَارٌ → دَنَانِيرُ</td></tr>
<tr><td>Alif ta'nits maqshurah</td><td class="ar">فُعْلَى</td><td class="ar">حُبْلَى ، صُغْرَى ، كُبْرَى ، أُخْرَى</td></tr>
<tr><td>Alif ta'nits mamdudah</td><td class="ar">فَعْلَاءُ</td><td class="ar">صَفْرَاءُ ، بَيْضَاءُ ، سَوْدَاءُ ، حَمْرَاءُ</td></tr>
</table>
<h3>B. Dua 'illat (tambahan, di luar slide)</h3>
<table class="t">
<tr><th>Kombinasi</th><th>Contoh</th></tr>
<tr><td>Nama ('alam) + ta'nits</td><td class="ar">فَاطِمَةُ ، عَائِشَةُ ، زَيْنَبُ ، مَكَّةُ</td></tr>
<tr><td>Nama + 'ajam (non-Arab)</td><td class="ar">إِبْرَاهِيمُ ، يُوسُفُ ، فِرْعَوْنُ</td></tr>
<tr><td>Nama + alif-nun tambahan</td><td class="ar">عُثْمَانُ ، سُلَيْمَانُ ، رَمَضَانُ</td></tr>
<tr><td>Nama + wazan fi'il</td><td class="ar">أَحْمَدُ ، يَزِيدُ</td></tr>
<tr><td>Nama + 'adl</td><td class="ar">عُمَرُ</td></tr>
<tr><td>Sifat + wazan <span class="ar">أَفْعَلُ</span></td><td class="ar">أَكْبَرُ ، أَحْمَرُ ، أَسْوَدُ</td></tr>
<tr><td>Sifat + alif-nun tambahan</td><td class="ar">عَطْشَانُ ، غَضْبَانُ</td></tr>
</table>
<div class="note">Itulah sebabnya kita membaca <span class="ar">فِرْعَوْنَ</span>, <span class="ar">إِبْرَاهِيمَ</span>, <span class="ar">هُرَيْرَةَ</span>, dan <span class="ar">عَائِشَةَ</span> dengan fathah walau didahului huruf jer atau menjadi mudhaf ilaih.</div>`,
 ayat: [
  {ref:"QS. At-Taubah 9:18", id:"Sesungguhnya yang memakmurkan masjid Allah hanyalah orang yang beriman kepada Allah.", t:[
   ["إِنَّمَا","H","m","Harf pembatas 'hanyalah'."],
   ["يَعْمُرُ","F","r","Fi'il mudhari', marfu' dhammah."],
   ["مَسَاجِدَ","I","n","Shighat muntahal jumu' (ghairu munsharif); maf'ul bih, manshub fathah, tanpa tanwin."],
   ["اللَّهِ","I","j","Mudhaf ilaih, majrur kasrah."],
   ["مَنْ","I","m","Isim maushul; fa'il."],
   ["آمَنَ","F","m","Fi'il madhi."],
   ["بِاللَّهِ","I","j","Majrur kasrah."]]},
  {ref:"QS. Al-Baqarah 2:187", id:"Makan dan minumlah hingga jelas bagimu benang putih dari benang hitam, yaitu fajar.", t:[
   ["وَكُلُوا","F","m","Fi'il amr."],
   ["وَاشْرَبُوا","F","m","Fi'il amr."],
   ["حَتَّى","H","m","Harf."],
   ["يَتَبَيَّنَ","F","n","Fi'il mudhari', manshub fathah (karena حَتَّى)."],
   ["لَكُمُ","H","m","لَ + كُمْ."],
   ["الْخَيْطُ","I","r","Fa'il, marfu' dhammah."],
   ["الْأَبْيَضُ","I","r","Wazan أَفْعَل tapi ber-al; na'at, marfu' dhammah."],
   ["مِنَ","H","m","Harf jer."],
   ["الْخَيْطِ","I","j","Majrur kasrah."],
   ["الْأَسْوَدِ","I","j","Wazan أَفْعَل, tapi ber-al → kembali majrur KASRAH."]]},
  {ref:"QS. An-Nazi'at 79:17 (Juz Amma)", id:"Pergilah engkau kepada Fir'aun, sesungguhnya dia telah melampaui batas.", t:[
   ["اذْهَبْ","F","m","Fi'il amr."],
   ["إِلَى","H","m","Harf jer."],
   ["فِرْعَوْنَ","I","j","Ghairu munsharif (nama + 'ajam); majrur dengan FATHAH."],
   ["إِنَّهُ","H","m","إِنَّ + هُ."],
   ["طَغَى","F","m","Fi'il madhi, mabni fathah muqaddarah."]]},
  {ref:"QS. Al-A'la 87:19 (Juz Amma)", id:"(Yaitu) lembaran-lembaran Ibrahim dan Musa.", t:[
   ["صُحُفِ","I","j","Jamak taksir (munsharif); badal, majrur kasrah."],
   ["إِبْرَاهِيمَ","I","j","Ghairu munsharif (nama + 'ajam); mudhaf ilaih, majrur FATHAH."],
   ["وَمُوسَى","I","j","Maqshur + ghairu munsharif; ma'thuf, majrur fathah muqaddarah."]]},
  {ref:"QS. Al-Baqarah 2:185", id:"Bulan Ramadan, yang di dalamnya diturunkan Al-Qur'an.", t:[
   ["شَهْرُ","I","r","Marfu' dhammah."],
   ["رَمَضَانَ","I","j","Ghairu munsharif (nama + alif-nun); mudhaf ilaih, majrur FATHAH."],
   ["الَّذِي","I","m","Isim maushul, mabni."],
   ["أُنْزِلَ","F","m","Fi'il madhi majhul."],
   ["فِيهِ","H","m","فِي + هِ."],
   ["الْقُرْآنُ","I","r","Naibul fa'il, marfu' dhammah."]]}
 ],
 latihan: [
  {type:"classify", title:"Munsharif atau ghairu munsharif? Apa 'illatnya?", opts:["Munsharif (bertanwin)","Ghairu munsharif: shighat muntahal jumu'","Ghairu munsharif: alif ta'nits","Ghairu munsharif: nama + sebab lain"], items:[
   ["مَسَاجِدُ",1,"Pola مَفَاعِل."],["دَنَانِيرُ",1,"Pola مَفَاعِيل."],["حُبْلَى",2,"Alif ta'nits maqshurah."],["صَحْرَاءُ",2,"Alif ta'nits mamdudah."],["كِتَابٌ",0,"Bertanwin."],["إِبْرَاهِيمُ",3,"Nama + 'ajam."],["فَاطِمَةُ",3,"Nama + ta'nits."],["رِجَالٌ",0,"Jamak taksir biasa, bertanwin."],["عُثْمَانُ",3,"Nama + alif-nun."],["كُبْرَى",2,"Pola فُعْلَى."],["مَقَابِرُ",1,"Pola مَفَاعِل."],["زَيْدٌ",0,"Nama Arab tiga huruf, munsharif."]]}
 ],
 quiz: [
  {q:"Ciri utama isim ghairu munsharif adalah…", o:["Selalu ber-al","Tidak menerima tanwin","Selalu mabni","Selalu jamak"], a:1, why:"Munsharif = menerima tanwin (sharf)."},
  {q:"Tanda jer ghairu munsharif (tanpa al-, bukan mudhaf) adalah…", o:["Kasrah","Fathah","Ya","Sukun"], a:1, why:"إِلَى فِرْعَوْنَ."},
  {q:"Wazan shighat muntahal jumu' adalah…", o:["فُعُولٌ","أَفْعَالٌ","مَفَاعِلُ / مَفَاعِيلُ","فِعَالٌ"], a:2, why:"مَسَاجِدُ, دَنَانِيرُ."},
  {q:"حَمْرَاءُ ghairu munsharif karena…", o:["Alif ta'nits mamdudah","Shighat muntahal jumu'","Nama + 'ajam","Wazan fi'il"], a:0, why:"Pola فَعْلَاءُ."},
  {q:"Kenapa مِنَ الْخَيْطِ الْأَسْوَدِ dibaca kasrah?", o:["Bukan ghairu munsharif","Karena ber-al","Karena mudhaf","Salah baca"], a:1, why:"Ghairu munsharif yang ber-al kembali dijer dengan kasrah."}
 ]
};

/* Data widget interaktif di dalam materi */
const WIDGET = {
  // Pertemuan 9: ganti 'amil, lihat akhir kata mu'rab berubah & mabni tetap
  amil: {
    amil: [['جَاءَ …', 'r', "fa'il"], ['رَأَيْتُ …', 'n', "maf'ul bih"], ['مَرَرْتُ بِـ …', 'j', 'setelah huruf jer']],
    murab: { label: 'طَالِبٌ', kalimat: ['جَاءَ طَالِبٌ', 'رَأَيْتُ طَالِبًا', 'مَرَرْتُ بِطَالِبٍ'], akhir: ['طَالِبٌ', 'طَالِبًا', 'طَالِبٍ'] },
    mabni: { label: 'هَٰؤُلَاءِ', kalimat: ['جَاءَ هَٰؤُلَاءِ', 'رَأَيْتُ هَٰؤُلَاءِ', 'مَرَرْتُ بِهَٰؤُلَاءِ'], akhir: ['هَٰؤُلَاءِ', 'هَٰؤُلَاءِ', 'هَٰؤُلَاءِ'] },
  },
  // Pertemuan 10: tanda i'rob 9 isim mu'rab — [jenis, [tandaRofa, contoh, tandaNashob, contoh, tandaJer, contoh]]
  tabel9: {
    keadaan: [['r', "Rofa'", 'جَاءَ …'], ['n', 'Nashob', 'رَأَيْتُ …'], ['j', 'Jer', 'مَرَرْتُ بِـ …']],
    rows: [
      ['Mufrad', ['dhammah', 'وَلَدٌ', 'fathah', 'وَلَدًا', 'kasrah', 'وَلَدٍ']],
      ['Tasniyah', ['alif', 'وَلَدَانِ', 'ya', 'وَلَدَيْنِ', 'ya', 'وَلَدَيْنِ']],
      ['Jamak mudzakkar salim', ['wawu', 'مُسْلِمُونَ', 'ya', 'مُسْلِمِينَ', 'ya', 'مُسْلِمِينَ']],
      ['Jamak muannats salim', ['dhammah', 'مُسْلِمَاتٌ', 'kasrah ⚑', 'مُسْلِمَاتٍ', 'kasrah', 'مُسْلِمَاتٍ']],
      ['Jamak taksir', ['dhammah', 'أَوْلَادٌ', 'fathah', 'أَوْلَادًا', 'kasrah', 'أَوْلَادٍ']],
      ['Asmaul khamsah', ['wawu', 'أَبُوكَ', 'alif', 'أَبَاكَ', 'ya', 'أَبِيكَ']],
      ['Maqshur', ['dhammah muqaddarah', 'الْفَتَى', 'fathah muqaddarah', 'الْفَتَى', 'kasrah muqaddarah', 'الْفَتَى']],
      ['Manqush', ['dhammah muqaddarah', 'الْقَاضِي', 'fathah zhahirah', 'الْقَاضِيَ', 'kasrah muqaddarah', 'الْقَاضِي']],
      ['Ghairu munsharif', ['dhammah', 'عَائِشَةُ', 'fathah', 'عَائِشَةَ', 'fathah ⚑', 'عَائِشَةَ']],
    ],
  },
};

window.NAHWU = P;
window.NAHWU_WIDGET = WIDGET;
})();

/* ---------- Helper murni: tautan ayat Nahwu <-> episode Kajian ---------- */

// "QS. Al-'Alaq 96:1–2" → [{surah:96, dari:1, sampai:2}]; hadits → []
function nahwuParseRef(ref) {
  const out = [];
  const re = /(\d+):(\d+)(?:\s*[–-]\s*(\d+))?/g;
  let m;
  while ((m = re.exec(String(ref || '')))) {
    out.push({ surah: +m[1], dari: +m[2], sampai: +(m[3] || m[2]) });
  }
  return out;
}

// Rentang ayat sebuah episode: ayatNo "3–4" / "255 (Ayat Kursi)" / 1
function nahwuRentangEpisode(a) {
  const m = /^(\d+)(?:\s*[–-]\s*(\d+))?/.exec(String(a.ayatNo));
  if (!m) return null;
  return { surah: +a.surahNo, dari: +m[1], sampai: +(m[2] || m[1]) };
}

function nahwuBeririsan(x, y) {
  return x.surah === y.surah && x.dari <= y.sampai && y.dari <= x.sampai;
}

// Semua ayat Nahwu yang jatuh di dalam episode → [{p, vi, ref}]
function nahwuUntukEpisode(a) {
  const r = nahwuRentangEpisode(a);
  const hasil = [];
  if (!r) return hasil;
  (window.NAHWU || []).forEach((pn, p) => {
    if (!pn) return;
    pn.ayat.forEach((v, vi) => {
      if (nahwuParseRef(v.ref).some((x) => nahwuBeririsan(x, r))) hasil.push({ p, vi, ref: v.ref });
    });
  });
  return hasil;
}

// Episode Kajian pertama yang memuat ayat Nahwu ini (atau null)
function episodeUntukNahwu(ref) {
  const refs = nahwuParseRef(ref);
  if (!refs.length) return null;
  return (window.AYAT || []).find((a) => {
    const r = nahwuRentangEpisode(a);
    return r && refs.some((x) => nahwuBeririsan(x, r));
  }) || null;
}

window.nahwuParseRef = nahwuParseRef;
window.nahwuUntukEpisode = nahwuUntukEpisode;
window.episodeUntukNahwu = episodeUntukNahwu;
