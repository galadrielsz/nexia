import { supabase } from "./client.js";
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function card(s){ return `<a class="card" href="reader.html?id=${encodeURIComponent(s.id)}"><div class="cover">${s.cover_url?`<img src="${esc(s.cover_url)}" alt="">`:"<span>▮</span>"}</div><b>${esc(s.title)}</b><small>${esc(s.author||"Autor desconhecido")}</small></a>`; }
async function load(){
  const {data,error}=await supabase.from("stories").select("*").order("created_at",{ascending:false});
  if(error){ $("#featured").innerHTML="<p class='msg'>Configure o Supabase seguindo o README.</p>"; return; }
  const q=($("#search").value||"").toLowerCase();
  const list=(data||[]).filter(s=>(s.title+" "+(s.author||"")+" "+(s.genres||"")).toLowerCase().includes(q));
  $("#count").textContent=`${list.length} história${list.length===1?"":"s"}`;
  $("#featured").innerHTML=list.filter(s=>s.featured).slice(0,8).map(card).join("") || list.slice(0,8).map(card).join("") || "<p>Nenhuma novel publicada ainda.</p>";
  $("#recent").innerHTML=list.slice(0,12).map(card).join("") || "<p>Nenhuma novel encontrada.</p>";
}
$("#search").addEventListener("input",load); load();