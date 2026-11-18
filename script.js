/* ===== EDIT BAGIAN INI ===== */
var CONFIG = {
  ip: "0.0.0.0", port: "7777",                       // ganti dengan IP & port server
  discord: "https://dc.gg/httpsdc.highlandliferoleplay",   // ganti dengan link invite Discord
  whatsapp: "6287790284571",                         // nomor WA format 62..., tanpa + atau 0
  waText: "Halo, saya mau tanya soal Highland Life Roleplay"
};
var GALLERY = [  // src: isi data URI gambar jika ada; kosong = placeholder warna
  {cap:"Pusat kota", src:"", c:["#4db6d4","#12263a"]},
  {cap:"Pelabuhan malam hari", src:"", c:["#d4437c","#2a1230"]},
  {cap:"Kantor kepolisian", src:"", c:["#3a8fb0","#15203a"]},
  {cap:"Jalan perbukitan", src:"", c:["#833a85","#1a1230"]},
  {cap:"Event komunitas", src:"", c:["#4db6d4","#2a1230"]},
  {cap:"Balap jalanan", src:"", c:["#d4437c","#10263a"]}
];
var RULES = [
 {t:"Aturan umum", i:[
  "<b>Roleplay serius.</b> Bersikap sesuai karakter selama berada di dalam game (IC).",
  "<b>Pisahkan IC dan OOC.</b> Jangan membawa urusan di luar game ke dalam karakter, begitu pula sebaliknya.",
  "<b>Hormati pemain dan staf.</b> Dilarang menghina, rasis, atau melakukan provokasi.",
  "<b>Dilarang cheat dan mod ilegal</b> yang memberi keuntungan tidak adil.",
  "<b>Satu orang, satu akun utama.</b> Jangan menyalahgunakan akun lain untuk keuntungan."]},
 {t:"Pelanggaran roleplay", i:[
  "<b>RDM</b> (Random Deathmatch): membunuh tanpa alasan roleplay.",
  "<b>VDM</b> (Vehicle Deathmatch): menabrak atau membunuh pemain memakai kendaraan tanpa alasan.",
  "<b>Metagaming:</b> memakai informasi OOC (Discord, voice, live) untuk keuntungan karakter.",
  "<b>Powergaming:</b> memaksakan aksi yang tidak memberi lawan main kesempatan merespons.",
  "<b>Fail RP:</b> bertindak tidak realistis, misalnya tidak takut saat ditodong senjata."]},
 {t:"Kriminal dan faction", i:[
  "Setiap aksi kriminal harus punya alasan dan alur roleplay yang jelas.",
  "Hormati aturan cooldown dan batas jumlah peserta untuk tiap aktivitas kriminal.",
  "Anggota faction wajib menjalankan tugas sesuai peran, tanpa menyalahgunakan wewenang.",
  "Dilarang melakukan revenge kill setelah karakter mati (New Life Rule)."]},
 {t:"Sanksi", i:[
  "Pelanggaran ditindak bertahap: peringatan, jail, kick, hingga ban.",
  "Pelanggaran berat seperti cheat atau bug abuse dapat langsung berujung ban permanen.",
  "Keberatan atas sanksi disampaikan lewat tiket di Discord, bukan di chat publik."]}
];
var TERMS = [
 ["IC","In Character. Segala hal yang terjadi sebagai karakter di dalam game."],
 ["OOC","Out Of Character. Percakapan sebagai pemain, di luar peran karakter."],
 ["MG","Metagaming. Memakai info OOC untuk keuntungan IC."],
 ["PG","Powergaming. Memaksakan aksi tanpa memberi ruang respons."],
 ["RDM","Random Deathmatch. Membunuh tanpa alasan roleplay."],
 ["CK","Character Kill. Karakter dinyatakan mati permanen, biasanya atas persetujuan staf."],
 ["NLR","New Life Rule. Setelah mati, karakter lupa kejadian sebelum kematiannya."],
 ["FRP","Fail Roleplay. Perilaku yang tidak masuk akal bagi karakter."]
];
/* ===== SELESAI ===== */

var $=function(id){return document.getElementById(id)};
var addr=CONFIG.ip+":"+CONFIG.port;
$("ipText").textContent=addr;
["dcHero","dcCard"].forEach(function(id){$(id).href=CONFIG.discord});
$("waCard").href="https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(CONFIG.waText);

$("copyBtn").onclick=function(){
  var b=this;
  function done(){b.textContent="Tersalin";setTimeout(function(){b.textContent="Salin IP"},1800)}
  try{navigator.clipboard.writeText(addr).then(done,fb)}catch(e){fb()}
  function fb(){var t=document.createElement("textarea");t.value=addr;document.body.appendChild(t);t.select();try{document.execCommand("copy");done()}catch(e){}t.remove()}
};

$("rulesList").innerHTML=RULES.map(function(r,n){
  return '<details'+(n===0?' open':'')+'><summary>'+r.t+'</summary><ul>'+r.i.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></details>'}).join('');

$("terms").innerHTML=TERMS.map(function(t){
  return '<div class="term reveal"><b>'+t[0]+'</b><p>'+t[1]+'</p></div>'}).join('');

var g=$("gallery"),dlg=$("dlg"),lb=$("lb");
GALLERY.forEach(function(it,n){
  var b=document.createElement("button");b.type="button";b.className="shot";b.setAttribute("aria-label","Perbesar: "+it.cap);
  b.innerHTML=(it.src?'<img src="'+it.src+'" alt="'+it.cap+'">':'<div class="ph" style="background:linear-gradient(135deg,'+it.c[0]+','+it.c[1]+')"></div>')+'<span class="cap">'+it.cap+'</span>';
  b.onclick=function(){
    lb.innerHTML='<button class="close" type="button" aria-label="Tutup">×</button>'+(it.src?'<img src="'+it.src+'" alt="'+it.cap+'">':'<div class="ph" style="background:linear-gradient(135deg,'+it.c[0]+','+it.c[1]+')"></div>')+'<div class="cap">'+it.cap+'</div>';
    lb.querySelector(".close").onclick=function(){dlg.close()};
    dlg.showModal();
  };
  g.appendChild(b);
});
dlg.addEventListener("click",function(e){if(e.target===dlg)dlg.close()});

var els=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  els.forEach(function(el,i){el.style.transitionDelay=(i%4)*70+"ms";io.observe(el)});
}else{els.forEach(function(el){el.classList.add("in")})}
