(function(){
// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('nav-menu');
if(toggle && menu){
toggle.addEventListener('click', () => {
const expanded = toggle.getAttribute('aria-expanded') === 'true';
toggle.setAttribute('aria-expanded', String(!expanded));
if(menu.hasAttribute('hidden')) menu.removeAttribute('hidden'); else menu.setAttribute('hidden','');
});
}

// Back to top
const backToTop = document.querySelector('.back-to-top');
if(backToTop){
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

// FAQ accordion
document.querySelectorAll('.faq__q').forEach(btn => {
btn.addEventListener('click', () => {
const id = btn.getAttribute('aria-controls');
const panel = document.getElementById(id);
const expanded = btn.getAttribute('aria-expanded') === 'true';
btn.setAttribute('aria-expanded', String(!expanded));
if(panel) { if(panel.hasAttribute('hidden')) panel.removeAttribute('hidden'); else panel.setAttribute('hidden',''); }
});
});

// Attractions: load and filter
const grid = document.getElementById('attractions-grid');
if(grid){
const typeSel = document.getElementById('filter-type');
const areaInp = document.getElementById('filter-area');
let items = [];

fetch('data/attractions.json')
  .then(r => r.json())
  .then(data => {
    items = data;
    render(items);
  }).catch(()=>{ grid.innerHTML = '<p>Unable to load attractions.</p>'; });

function render(list){
  grid.innerHTML = list.map(card).join('');
}
function card(a){
  const img = a.img ? `src="${a.img}" srcset="${a.img}&w=400 400w, ${a.img}&w=800 800w" sizes="(max-width:600px) 100vw, 33vw"` : '';
  return `
  <article class="card">
    <img loading="lazy" class="card__img" ${img} alt="${a.name}" />
    <div class="card__body">
      <h3 class="card__title">${a.name}</h3>
      <p class="muted">${a.area} -  ${a.type}</p>
      <p>${a.shortDesc}</p>
      <p class="muted">Hours: ${a.hours} -  Entry: ${a.entryFee} -  Best: ${a.bestTime}</p>
      <a class="btn btn--link" href="${a.mapLink}" aria-label="Open map for ${a.name}">Map</a>
    </div>
  </article>`;
}
function applyFilter(){
  const t = (typeSel?.value || 'all').toLowerCase();
  const area = (areaInp?.value || '').toLowerCase().trim();
  const filtered = items.filter(a => (t==='all' || a.type===t) && (area==='' || a.area.toLowerCase().includes(area)));
  render(filtered);
}
typeSel?.addEventListener('change', applyFilter);
areaInp?.addEventListener('input', applyFilter);



}

// Trip cost estimator (rough, simple)
const form = document.getElementById('cost-form');
if(form){
const out = document.getElementById('cost-output');
form.addEventListener('submit', (e)=>{
e.preventDefault();
const days = Math.max(1, parseInt(form.days.value||'1',10));
const hotel = form.hotel.value;
const food = form.food.value;
const transport = form.transport.value;


  const hotelBase = hotel==='budget' ? 1500 : hotel==='mid' ? 3500 : 9000;
  const foodBase = food==='local' ? 600 : food==='mix' ? 1200 : 2500;
  const transBase = transport==='metro-bus' ? 200 : transport==='mixed' ? 500 : 900;

  const daily = hotelBase + foodBase + transBase;
  const total = daily * days;
  const fmt = new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(total);
  out.textContent = `≈ ${fmt} for ${days} day(s)`;
});



}
})();

