import { supabase } from "./client.js";
const id=new URLSearchParams(location.search).get("id");
const el=document.querySelector("#story");
if(!id){el.innerHTML="<h1>Novel não encontrada.</h1>";}
else {
 const {data,error}=await supabase.from("stories").select("*").eq("id",id).single();
 if(error||!data){el.innerHTML="<h1>Novel não encontrada.</h1>";}
 else {
   document.title=`${data.title} — Novels`;
   el.innerHTML=`<div class="reader-head">${data.cover_url?`<img src="${data.cover_url}" alt="">`:""}<div><div class="eyebrow">${(data.genres||"NOVEL").toUpperCase()}</div><h1>${data.title}</h1><p>por ${data.author||"Autor desconhecido"}</p><a class="btn primary" href="#texto">Ler</a></div></div><div id="texto" class="prose">${String(data.content||data.description||"").replace(/\n/g,"<br>")}</div>`;
 }
}