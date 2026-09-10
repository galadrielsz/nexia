import { supabase } from "./client.js";
const $=s=>document.querySelector(s), loginPanel=$("#login-panel"), dash=$("#dashboard"), logout=$("#logout"), editor=$("#editor");
function msg(el,t){el.textContent=t;}
async function session(){const {data}=await supabase.auth.getSession(); if(data.session){loginPanel.classList.add("hidden");dash.classList.remove("hidden");logout.classList.remove("hidden");load();}}
$("#login").onclick=async()=>{const {error}=await supabase.auth.signInWithPassword({email:$("#email").value,password:$("#password").value}); if(error)msg($("#login-msg"),error.message); else session();};
logout.onclick=async()=>{await supabase.auth.signOut();location.reload();};
$("#new-story").onclick=()=>{editor.classList.remove("hidden"); $("#editor-title").textContent="Nova novel"; ["story-id","title","author","genres","description","cover","banner","content"].forEach(id=>$("#"+id).value=""); $("#featured").checked=false;};
$("#cancel").onclick=()=>editor.classList.add("hidden");
$("#save").onclick=async()=>{
 const id=$("#story-id").value;
 const obj={title:$("#title").value.trim(),author:$("#author").value.trim(),genres:$("#genres").value.trim(),description:$("#description").value.trim(),cover_url:$("#cover").value.trim(),banner_url:$("#banner").value.trim(),content:$("#content").value,featured:$("#featured").checked};
 if(!obj.title||!obj.content){msg($("#save-msg"),"Título e conteúdo são obrigatórios.");return;}
 const r=id?await supabase.from("stories").update(obj).eq("id",id):await supabase.from("stories").insert(obj);
 if(r.error)msg($("#save-msg"),r.error.message); else {msg($("#save-msg"),"Publicado com sucesso.");editor.classList.add("hidden");load();}
};
async function load(){
 const {data,error}=await supabase.from("stories").select("*").order("created_at",{ascending:false});
 if(error){$("#admin-list").innerHTML=`<p class="msg">${error.message}</p>`;return;}
 $("#admin-list").innerHTML=(data||[]).map(s=>`<div class="admin-item"><div><b>${s.title}</b><small>${s.author||""}</small></div><div class="row"><button class="btn ghost edit" data-id="${s.id}">Editar</button><button class="btn danger del" data-id="${s.id}">Excluir</button></div></div>`).join("")||"<p>Nenhuma novel.</p>";
 document.querySelectorAll(".edit").forEach(b=>b.onclick=()=>edit(b.dataset.id));
 document.querySelectorAll(".del").forEach(b=>b.onclick=()=>del(b.dataset.id));
}
async function edit(id){const {data}=await supabase.from("stories").select("*").eq("id",id).single();if(!data)return; editor.classList.remove("hidden");$("#editor-title").textContent="Editar novel"; $("#story-id").value=data.id; for(const [k,v] of Object.entries({title:data.title,author:data.author,genres:data.genres,description:data.description,cover:data.cover_url,banner:data.banner_url,content:data.content}))$("#"+k).value=v||"";$("#featured").checked=!!data.featured;}
async function del(id){if(!confirm("Excluir esta novel?"))return;const {error}=await supabase.from("stories").delete().eq("id",id);if(error)alert(error.message);else load();}
session();