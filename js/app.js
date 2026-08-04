/**
 * ============================================================
 *  Project   : Kenmark Solutions Ltd — Website
 *  Author    : Vinoth Sakthivel
 *  Email     : vinoth@kandiyar.com
 *  Version   : 1.0
 * ============================================================
 */
const header=document.querySelector('.site-header');
if(header){
  addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));
}

const btn=document.querySelector('.menu-btn'), nav=document.querySelector('.nav-links');
if(btn && nav){
  btn.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

// Active navigation link highlighting
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if(href === currentPath || (currentPath === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Reveal element observer
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Number Counter Observer
const cObs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target,end=Number(el.dataset.count),suffix=el.dataset.suffix||'';
    const begin=performance.now(),duration=1400;
    const tick=t=>{
      const p=Math.min((t-begin)/duration,1),v=1-Math.pow(1-p,3);
      el.textContent=Math.floor(end*v)+suffix;
      if(p<1)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);cObs.unobserve(el);
  });
},{threshold:.7});
document.querySelectorAll('[data-count]').forEach(el=>cObs.observe(el));

// Solution cards 3D tilt effect
document.querySelectorAll('.solution-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    if(innerWidth<900)return;
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`translateY(-9px) rotateX(${-y*5}deg) rotateY(${x*6}deg)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const href = a.getAttribute('href');
 if(href && href !== '#') {
   const target=document.querySelector(href);
   if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}
 }
}));

// Interactive Tab Switcher
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    const parent = btn.closest('.tabs-container') || document;
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const content = parent.querySelector(`#${target}`);
    if(content) content.classList.add('active');
  });
});

// Interactive Category Filter Bar
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.filter;
    const filterGroup = btn.closest('.filter-container') || document;
    filterGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const items = filterGroup.querySelectorAll('[data-category]');
    items.forEach(item => {
      if(category === 'all' || item.dataset.category === category) {
        item.style.display = '';
        item.classList.add('visible');
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Dynamic Contact & Quote Form Handling
const form = document.querySelector('form.js-form');
if(form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = form.querySelector('.form-submit-success');
    if(submitBtn) {
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Request...';
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        form.reset();
        if(successMsg) {
          successMsg.style.display = 'block';
          setTimeout(() => successMsg.style.display = 'none', 7000);
        }
      }, 900);
    }
  });
}
