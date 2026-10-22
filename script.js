(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)], data=window.SPECTRUM_DATA||{}, events=data.events||[];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let activeFilter='all', previousFocus=null, currentEvent=null;
const intro=$('#intro');
function finishIntro(){intro?.classList.add('is-leaving');document.body.classList.remove('intro-active');try{sessionStorage.setItem('spectrumEntered','1')}catch{};setTimeout(()=>{if(intro)intro.style.display='none'},900)}
if(intro){document.body.classList.add('intro-active');if(reduced) intro.classList.add('reduced-intro');$('#enterButton')?.addEventListener('click',finishIntro);$('#skipIntro')?.addEventListener('click',finishIntro);$('#replayIntro')?.addEventListener('click',()=>{intro.style.display='flex';intro.classList.remove('is-leaving');document.body.classList.add('intro-active')});try{if(sessionStorage.getItem('spectrumEntered')==='1')setTimeout(finishIntro,350)}catch{}}
const menu=$('#menuToggle'), mobile=$('#mobileMenu');menu?.addEventListener('click',()=>{let open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});$$('#mobileMenu a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const grid=$('#eventGrid'), modal=$('#eventModal'), detail=$('#eventDetail');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.addEventListener('error',event=>{
  const img=event.target;
  if(!(img instanceof HTMLImageElement) || !img.matches('.event-cover,.modal-banner,.detail-banner')) return;
  if(img.dataset.fallbackShown) return;
  img.dataset.fallbackShown='1';
  console.error('Spectrum event image failed to load:',img.getAttribute('src'));
  const fallback=document.createElement('div');
  fallback.className='event-image-error';
  fallback.setAttribute('role','img');
  fallback.setAttribute('aria-label',img.alt+' — image unavailable');
  fallback.textContent='Event artwork could not be loaded';
  fallback.style.minHeight=img.classList.contains('event-cover')?'150px':'180px';
  img.replaceWith(fallback);
},true);

function renderCards(){grid.innerHTML=events.map((e,i)=>`<article class="event-card" data-category="${esc(e.cat)}"><div class="card-number">EVENT / ${String(i+1).padStart(2,'0')}</div><img class="event-cover" src="assets/events/${e.image}" alt="${esc(e.name)} event artwork" ${i?'loading="lazy"':'fetchpriority="high"'} width="900" height="560"><div class="event-card-info"><div><span class="card-category">${esc(e.tagline)}</span><h3>${esc(e.name)}</h3><p>${esc(e.criteria)} · ${esc(e.fee)} entry</p></div></div><button class="know-more" data-event="${i}">Tap to Know More</button></article>`).join('')}
renderCards();
function formatDate(date){return new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'}).format(new Date(date))+' IST'}
function contactLinks([name,phone]){const digits=phone.replace(/\D/g,'');const normalized=digits.startsWith('91')?digits:'91'+digits;return `<div class="head-row"><div><strong>${esc(name)}</strong><small>${esc(phone)}</small></div><div class="head-actions"><a href="https://wa.me/${normalized}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ${esc(name)}">☏ WhatsApp</a><a href="tel:+${normalized}" aria-label="Call ${esc(name)}">☎ Call</a></div></div>`}
function showModal(i){currentEvent=i;const e=events[i];previousFocus=document.activeElement;$('#modalContent').innerHTML=`<img class="modal-banner" src="assets/events/${e.image}" alt="${esc(e.name)} banner" width="900" height="560"><div class="modal-inner"><span class="eyebrow-mini">SPECTRUM 2026–27 / EVENT ${String(i+1).padStart(2,'0')}</span><h2 id="modalEventName">${esc(e.name)}</h2><p>${esc(e.teaser)}</p><div class="modal-actions"><a class="quick-register" href="${e.url}" target="_blank" rel="noopener noreferrer">Quick Register ↗</a><button class="know-detail" id="knowDetail">Know More About It ↗</button></div></div>`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');$('#knowDetail').addEventListener('click',()=>showDetail(i));modal.querySelector('[data-close-modal]').focus?.()}
function showDetail(i){currentEvent=i;const e=events[i];$('#detailContent').innerHTML=`<img class="detail-banner" src="assets/events/${e.image}" alt="${esc(e.name)} banner" width="900" height="560"><div class="detail-inner"><span class="eyebrow-mini">SPECTRUM 2026–27 / EVENT ${String(i+1).padStart(2,'0')}</span><h1 id="detailName">${esc(e.name)}</h1><p class="detail-tagline">${esc(e.tagline)}</p><section><h2>Description</h2><p>${esc(e.desc)}</p></section><section><h2>Participation</h2><p>${esc(e.criteria)}</p></section><section><h2>Fees &amp; Timing</h2><div class="detail-facts"><span><small>Entry fee</small><strong>${esc(e.fee)}</strong></span><span><small>Date &amp; time</small><strong>${formatDate(e.date)}</strong></span>${e.limit?`<span><small>Listed time limit</small><strong>${esc(e.limit)}</strong></span>`:''}</div></section><section><h2>Rules &amp; Regulations</h2><ol class="rules-list">${e.rules.map(r=>`<li>${esc(r)}</li>`).join('')}</ol></section><section><h2>Contact Heads</h2><div class="heads-list">${e.heads.map(contactLinks).join('')}</div></section><a class="register-now" href="${e.url}" target="_blank" rel="noopener noreferrer">Register Now ↗</a></div>`;
modal.classList.remove('open');modal.setAttribute('aria-hidden','true');detail.classList.add('open');detail.setAttribute('aria-hidden','false');}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');previousFocus?.focus?.()}
function closeDetail(){detail.classList.remove('open');detail.setAttribute('aria-hidden','true');if(currentEvent!==null){showModal(currentEvent)}else document.body.classList.remove('modal-open')}
grid.addEventListener('click',e=>{const b=e.target.closest('[data-event]');if(b){showModal(Number(b.dataset.event));return}const card=e.target.closest('.event-card');if(!card)return;if(e.target.closest('a,button,input,select,textarea,[contenteditable="true"],[role="button"]'))return;const trigger=card.querySelector('[data-event]');if(trigger)showModal(Number(trigger.dataset.event))});
grid.addEventListener('keydown',e=>{if(e.target.closest('button,a,input,select,textarea,[contenteditable="true"]'))return;if(e.key!=='Enter'&&e.key!==' ')return;const card=e.target.closest('.event-card');if(!card)return;e.preventDefault();const trigger=card.querySelector('[data-event]');if(trigger)showModal(Number(trigger.dataset.event))});
$$('[data-close-modal]').forEach(b=>b.addEventListener('click',closeModal));$('#detailClose').addEventListener('click',closeDetail);
window.addEventListener('keydown',e=>{if(e.key==='Escape'){if(detail.classList.contains('open'))closeDetail();else if(modal.classList.contains('open'))closeModal()}});
function filter(){const q=$('#eventSearch').value.toLowerCase().trim();$$('.event-card').forEach(c=>c.classList.toggle('hidden',!c.textContent.toLowerCase().includes(q)))}
$('#eventSearch')?.addEventListener('input',filter);
const rows=$('#eventCountdownRows');
rows.innerHTML=events.map((e,i)=>`<div class="event-countdown-row"><span>${esc(e.name)}</span><strong data-countdown="${i}">--</strong></div>`).join('');
const pad=n=>String(n).padStart(2,'0');
function countdown(){const now=Date.now();let next=-1;events.forEach((e,i)=>{const diff=new Date(e.date).getTime()-now;const el=$(`[data-countdown="${i}"]`);if(diff<=0)el.textContent='Registration Closed';else{if(next<0)next=i;const sec=Math.floor(diff/1000);el.textContent=`${Math.floor(sec/86400)}d ${pad(Math.floor(sec/3600)%24)}h ${pad(Math.floor(sec/60)%60)}m ${pad(sec%60)}s`}});if(next<0){$('#mainEventName').textContent='ALL EVENTS COMPLETED';['cdDays','cdHours','cdMinutes','cdSeconds'].forEach(id=>$('#'+id).textContent='00');$('.countdown-copy h2').innerHTML='THE FEST<br><span class="outline-text">IS COMPLETE.</span>';return}const e=events[next],diff=Math.max(0,new Date(e.date).getTime()-now),sec=Math.floor(diff/1000);$('#mainEventName').textContent=e.name;$('#cdDays').textContent=pad(Math.floor(sec/86400));$('#cdHours').textContent=pad(Math.floor(sec/3600)%24);$('#cdMinutes').textContent=pad(Math.floor(sec/60)%60);$('#cdSeconds').textContent=pad(sec%60)}
countdown();setInterval(countdown,1000);
const topbar=$('#topbar');window.addEventListener('scroll',()=>topbar?.classList.toggle('scrolled',scrollY>20),{passive:true});
if(!reduced){const canvas=$('#starfield');if(canvas){const ctx=canvas.getContext('2d');let stars=[];function resize(){canvas.width=innerWidth;canvas.height=innerHeight;stars=Array.from({length:Math.min(85,Math.floor(innerWidth*innerHeight/14000))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.2+.2}))}function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#fff';stars.forEach(s=>{ctx.globalAlpha=.3+Math.random()*.6;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fill()});ctx.globalAlpha=1;if(!document.hidden)requestAnimationFrame(draw)}resize();draw();addEventListener('resize',resize)}} 
const observer='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1}):null;$$('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('visible'));
})();
