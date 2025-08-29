
/* client-side app: load data, search, filter, render */
let TOOLS = [];
async function loadTools(){
  const res = await fetch('/data/tools.json');
  TOOLS = await res.json();
  renderList(TOOLS);
}
function q(el){ return document.querySelector(el); }
function renderList(list){
  const container = q('#list');
  if(!list || list.length===0){ container.innerHTML = '<div class="empty">No results</div>'; return; }
  container.innerHTML = list.map(t=>`
    <a class="card" href="/pages/tool.html?id=${t.id}">
      <div><h3>${t.name}</h3></div>
      <div class="meta"><span class="badge">${t.category}</span> <span style="margin-left:8px" class="pill">${t.pricing}</span></div>
      <div style="margin-top:10px">${t.short}</div>
      <div class="meta"><span>${t.tags.join(', ')}</span></div>
    </a>
  `).join('');
}
function applyFilters(){
  const qv = q('#search').value.trim().toLowerCase();
  const pricing = q('#pricing').value;
  const cat = q('#category').value;
  let res = TOOLS.filter(t=> {
    const text = (t.name + ' ' + t.short + ' ' + t.tags.join(' ')).toLowerCase();
    if(qv && !text.includes(qv)) return false;
    if(pricing && pricing !== 'All' && t.pricing !== pricing) return false;
    if(cat && cat !== 'All' && t.category !== cat) return false;
    return true;
  });
  renderList(res);
}
function initControls(){
  q('#search').addEventListener('input', applyFilters);
  q('#pricing').addEventListener('change', applyFilters);
  q('#category').addEventListener('change', applyFilters);
  q('#paid-alt').addEventListener('click', ()=>{ window.location.href='/pages/paid-alternatives.html'; });
  q('#reset').addEventListener('click', ()=>{ q('#search').value=''; q('#pricing').value='All'; q('#category').value='All'; applyFilters(); });
}
window.addEventListener('DOMContentLoaded', ()=>{ loadTools(); initControls(); });
