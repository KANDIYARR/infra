
const header=document.querySelector('.site-header');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));

const btn=document.querySelector('.menu-btn'), nav=document.querySelector('.nav-links');
btn.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

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

document.querySelectorAll('.solution-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    if(innerWidth<900)return;
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`translateY(-9px) rotateX(${-y*5}deg) rotateY(${x*6}deg)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}
}));
