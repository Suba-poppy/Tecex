tailwind.config = {
    theme: {
      extend: {
        colors: {
          deep: "#070B14",
          panel: "#0D1420",
          ink: "#EAF1FB",
          muted: "#8FA0BE",
          cyan: "#00D8FF",
          blue: "#2F6BFF",
          sky: "#5AC8FA",
          crimson: "#E63946",
          line: "rgba(148,163,184,.14)",
        },
        fontFamily: {
          display: ["var(--font-display)", "sans-serif"],
          body: ["var(--font-body)", "sans-serif"],
        },
        backgroundImage: {
          "grid-glow": "linear-gradient(rgba(56,189,248,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.06) 1px, transparent 1px)",
        },
        boxShadow: {
          glow: "0 0 0 1px rgba(0,216,255,.25), 0 20px 60px -20px rgba(0,216,255,.35)",
          card: "0 24px 60px -30px rgba(0,0,0,.6)",
        },
        keyframes: {
          float: {
            "0%,100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-14px)" },
          },
          floatDown: {
            "0%,100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(16px)" },
          },
          "spin-slow": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
          marquee: {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-50%)" },
          },
          pulseGlow: {
            "0%,100%": { opacity: "0.5" },
            "50%": { opacity: "1" },
          },
        },
        animation: {
          float: "float 6s ease-in-out infinite",
          floatDown: "floatDown 7s ease-in-out infinite",
          "spin-slow": "spin-slow 24s linear infinite",
          marquee: "marquee 28s linear infinite",
          pulseGlow: "pulseGlow 3s ease-in-out infinite",
        },
      },
    },
  };

/* Everything below needs the page to exist first, so it waits for DOMContentLoaded. */
document.addEventListener('DOMContentLoaded', () => {

/* ============================= DATA ============================= */
const SERVICES = [
  {icon:"camera", name:"CCTV & Surveillance", short:"AI-enabled IP camera systems with intelligent analytics and central monitoring.", image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80"},
  {icon:"cable", name:"Structured Cabling", short:"Cat6, Cat6A and fiber backbones built to certified TIA-568 standards.", image:"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"},
  {icon:"shield-check", name:"Security Integration", short:"Access control, intrusion, video and fire on one coordinated platform.", image:"https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80"},
  {icon:"network", name:"Enterprise Networking", short:"Switched, routed and segmented networks engineered for uptime.", image:"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"},
  {icon:"wifi", name:"Wi-Fi Solutions", short:"Heat-mapped wireless designed for density, roaming and coverage.", image:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=1200&q=80"},
  {icon:"flame", name:"Firewalls & Security", short:"Perimeter defense, VPN and content control managed properly.", image:"https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1200&q=80"},
  {icon:"router", name:"Network Switching", short:"Managed PoE switching from access edge to 10G core.", image:"https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=1200&q=80"},
  {icon:"cloud", name:"Cloud Managed Networking", short:"Every site, one dashboard — zero-touch provisioning included.", image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"},
  {icon:"graduation-cap", name:"Education", short:"Campus-wide Wi-Fi, classroom AV and secure networks built for institutions.", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Students%20in%20a%20classroom.jpg?width=1200"},
];

const PRODUCT_BRANDS = {
  panasonic: [
    {cat:"CCTV Camera", name:"i-PRO S-Series 4K Dome", desc:"Vandal-resistant 4K dome for evidence-grade coverage.", image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80"},
    {cat:"NVR", name:"i-PRO 32-Channel NVR", desc:"RAID-protected recorder for mid to large camera estates.", image:"https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=900&q=80"},
    {cat:"AI Camera", name:"i-PRO AI Multi-Sensor", desc:"Four sensors, one drop — 270° AI detection.", image:"https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80"},
  ],
  engenius: [
    {cat:"Access Point", name:"ECW336 Wi-Fi 6E AP", desc:"Tri-band access point for device-dense floors.", image:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=900&q=80"},
    {cat:"Switch", name:"ECS2528FP Cloud PoE Switch", desc:"24-port PoE+ workhorse with 10G uplinks.", image:"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80"},
    {cat:"Cloud Platform", name:"EnGenius Cloud Suite", desc:"Single dashboard for every AP, switch and gateway.", image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"},
  ],
  cts: [
    {cat:"Copper Cable", name:"CTS Cat6A F/UTP", desc:"Shielded Cat6A for 10G runs and dense environments.", image:"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80"},
    {cat:"Fiber", name:"CTS OM4 / OS2 Fiber", desc:"Multimode & single-mode fiber for backbones and campus links.", image:"https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=900&q=80"},
    {cat:"Connectivity", name:"Patch Panels & Modules", desc:"Keystones and cords that complete a certified channel.", image:"https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=900&q=80"},
  ],
};

const INDUSTRIES = [
  {icon:"heart-pulse", name:"Healthcare", fix:"Ward-by-ward surveillance and segmented networks that keep medical devices isolated.", image:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80"},
  {icon:"building-2", name:"IT Parks & Corporate", fix:"Redundant core networking, tenant VLAN isolation and high-density Wi-Fi 6E.", image:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"},
  {icon:"landmark", name:"Government", fix:"Standards-compliant cabling with certification and tamper-evident retention.", image:"https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=900&q=80"},
  {icon:"graduation-cap", name:"Education", fix:"Campus-wide Wi-Fi with content filtering and corridor surveillance.", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Students%20in%20a%20classroom.jpg?width=900"},
  {icon:"shopping-cart", name:"Retail", fix:"AI cameras with people counting and cloud-managed multi-store rollouts.", image:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"},
  {icon:"bed-double", name:"Hospitality", fix:"Heat-mapped wireless from lobby to rooftop, discreet dome surveillance.", image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"},
  {icon:"package-search", name:"Warehouses & Logistics", fix:"High-bay camera placement and roaming-tuned Wi-Fi for handheld scanners.", image:"https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80"},
  {icon:"factory", name:"Manufacturing", fix:"Industrial-rated cameras, OT/IT separation and planned shutdown-window execution.", image:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80"},
  {icon:"building", name:"Commercial Buildings", fix:"Building-wide backbone fiber and basement-to-terrace surveillance.", image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"},
];

const PROJECTS = [
  {ind:"Healthcare", loc:"Chennai", name:"Multi-Specialty Hospital, 350 Beds", challenge:"Three disconnected camera systems, unmanaged switches, Wi-Fi that collapsed every visiting hour.", solution:"Unified 280-camera Panasonic i-PRO estate on a segmented network; Cat6A re-cabling overnight ward by ward; medical-device-isolated Wi-Fi 6.", outcome:"Zero clinical downtime during migration; alarm response time cut from minutes to seconds.", image:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"},
  {ind:"IT Parks", loc:"Taramani, Chennai", name:"IT Park Campus, 4 Towers", challenge:"9,000-seat campus needed tenant-isolated networking and a single SOC for four towers.", solution:"Dual-core 10G backbone, 340 Wi-Fi 6E APs from predictive heatmaps, 500+ cameras feeding one SOC.", outcome:"99.98% measured network availability in year one.", image:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"},
  {ind:"Retail", loc:"Tamil Nadu, 14 stores", name:"Retail Chain Rollout", challenge:"Every new store took three weeks of vendor coordination.", solution:"Standardized, cloud-provisioned store kits dispatched pre-configured.", outcome:"Store IT rollout time cut from 3 weeks to 1 day.", image:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"},
  {ind:"Hospitality", loc:"ECR, Chennai", name:"Beachfront Resort & Convention Center", challenge:"Guest reviews flagged Wi-Fi; 800-guest ballroom events overwhelmed the network.", solution:"Heat-mapped Wi-Fi 6 across rooms, pool and beach frontage with dedicated event SSIDs.", outcome:"Wi-Fi complaints in guest reviews dropped to near zero.", image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"},
];

const FAQ_DATA = [
  {q:"How long is CCTV footage retained?", a:"We size storage to your requirement — commonly 30 to 90 days at full resolution, with cloud archival options for critical channels."},
  {q:"Cat6 or Cat6A cabling — does it matter?", a:"Cat6 suits 1G desktops; Cat6A carries 10G over full 90m runs and is the safer choice for access points and long-life buildings."},
  {q:"Can you fix our existing network instead of replacing it?", a:"Yes — most engagements start with an audit. We often resolve instability with redesign and configuration before recommending new hardware."},
  {q:"Do you provide 24/7 monitoring?", a:"Yes — proactive monitoring with alerting to your team or our NOC, depending on your support plan."},
  {q:"What happens if internet to a cloud-managed site drops?", a:"The local network keeps running on its last configuration — cloud management is a control plane, not a traffic path."},
];

/* ============================= RENDER ============================= */
function el(html){ const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; }

// Services
const servicesGrid = document.getElementById('servicesGrid');
SERVICES.forEach((s,i)=>{
  const card = el(`
    <a href="#contact" class="reveal lift-card group relative block h-72 overflow-hidden rounded-2xl border border-line bg-panel" style="transition-delay:${(i%4)*0.07}s">
      <div class="absolute inset-0">
        <img src="${s.image}" alt="${s.name}" class="img-zoom h-full w-full object-cover opacity-40" />
        <div class="absolute inset-0 bg-gradient-to-t from-deep via-deep/70 to-deep/20"></div>
      </div>
      <div class="relative flex h-full flex-col justify-end p-5">
        <div class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan/30 bg-deep/60 text-cyan backdrop-blur-sm"><i data-lucide="${s.icon}" style="width:17px;height:17px;"></i></div>
        <h3 class="font-display text-base font-semibold text-ink">${s.name}</h3>
        <p class="mt-1.5 text-xs leading-relaxed text-muted">${s.short}</p>
        <span class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan opacity-0 transition-opacity group-hover:opacity-100">Explore <i data-lucide="arrow-up-right" style="width:13px;height:13px;"></i></span>
      </div>
    </a>`);
  servicesGrid.appendChild(card);
});

// Products (tabs)
const productPanels = document.getElementById('productPanels');
function renderBrand(key){
  productPanels.innerHTML = '';
  const wrap = el(`<div class="grid grid-cols-1 gap-5 sm:grid-cols-3" style="animation:fadeIn .35s ease;"></div>`);
  PRODUCT_BRANDS[key].forEach(item=>{
    wrap.appendChild(el(`
      <div class="lift-card group overflow-hidden rounded-2xl border border-line bg-panel/50 backdrop-blur-md hover:border-cyan/40 hover:shadow-glow">
        <div class="relative h-44 overflow-hidden">
          <img src="${item.image}" alt="${item.name}" class="img-zoom h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent"></div>
          <span class="absolute left-3 top-3 rounded-full border border-cyan/30 bg-deep/70 px-2.5 py-1 text-[10px] font-semibold text-cyan backdrop-blur-sm">${item.cat}</span>
        </div>
        <div class="p-4">
          <h3 class="font-display text-sm font-semibold text-ink">${item.name}</h3>
          <p class="mt-1 text-xs leading-relaxed text-muted">${item.desc}</p>
        </div>
      </div>`));
  });
  productPanels.appendChild(wrap);
  lucide.createIcons();
}
renderBrand('panasonic');
document.querySelectorAll('.brand-tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.brand-tab').forEach(b=>{
      b.classList.remove('border-cyan/50','bg-cyan/10','text-cyan','shadow-glow');
      b.classList.add('border-line','text-muted');
    });
    btn.classList.remove('border-line','text-muted');
    btn.classList.add('border-cyan/50','bg-cyan/10','text-cyan','shadow-glow');
    renderBrand(btn.dataset.brand);
  });
});

// Industries
const industriesGrid = document.getElementById('industriesGrid');
INDUSTRIES.forEach((ind,i)=>{
  industriesGrid.appendChild(el(`
    <div class="reveal lift-scale group relative h-52 overflow-hidden rounded-2xl border border-line" style="transition-delay:${(i%6)*0.06}s">
      <img src="${ind.image}" alt="${ind.name}" class="img-zoom opacity-boost h-full w-full object-cover opacity-50" />
      <div class="absolute inset-0 bg-gradient-to-t from-deep via-deep/60 to-transparent"></div>
      <div class="absolute inset-0 flex flex-col justify-end p-4">
        <div class="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-cyan/30 bg-deep/70 text-cyan backdrop-blur-sm"><i data-lucide="${ind.icon}" style="width:15px;height:15px;"></i></div>
        <h3 class="font-display text-sm font-semibold text-ink">${ind.name}</h3>
        <p class="mt-1 text-[11px] leading-relaxed text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${ind.fix}</p>
      </div>
    </div>`));
});

// Projects (accordion)
const projectsGrid = document.getElementById('projectsGrid');
PROJECTS.forEach((p,i)=>{
  const card = el(`
    <div class="reveal overflow-hidden rounded-2xl border border-line bg-panel/50 backdrop-blur-md hover:border-cyan/40" style="transition-delay:${i*0.08}s">
      <div class="relative h-48">
        <img src="${p.image}" alt="${p.name}" class="h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-panel to-transparent"></div>
        <span class="absolute left-4 top-4 rounded-full border border-cyan/30 bg-deep/70 px-3 py-1 text-[10px] font-semibold text-cyan backdrop-blur-sm">${p.ind}</span>
      </div>
      <button class="proj-toggle flex w-full items-center justify-between gap-4 p-5 text-left">
        <div>
          <div class="flex items-center gap-1.5 text-[11px] text-muted"><i data-lucide="map-pin" style="width:11px;height:11px;"></i> ${p.loc}</div>
          <h3 class="mt-1 font-display text-base font-semibold text-ink">${p.name}</h3>
        </div>
        <span class="proj-chevron shrink-0 text-cyan transition-transform duration-300"><i data-lucide="chevron-down" style="width:18px;height:18px;"></i></span>
      </button>
      <div class="proj-body overflow-hidden transition-all duration-300" style="max-height:0;">
        <div class="space-y-3 px-5 pb-5 text-xs leading-relaxed text-muted">
          <p><span class="font-semibold text-ink">Challenge — </span>${p.challenge}</p>
          <p><span class="font-semibold text-ink">Solution — </span>${p.solution}</p>
          <p><span class="font-semibold text-cyan">Outcome — </span>${p.outcome}</p>
        </div>
      </div>
    </div>`);
  projectsGrid.appendChild(card);
});
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.proj-toggle');
  if(!btn) return;
  const card = btn.closest('div.reveal, div.in-view');
  const body = btn.parentElement.querySelector('.proj-body');
  const chevron = btn.parentElement.querySelector('.proj-chevron');
  const isOpen = body.style.maxHeight && body.style.maxHeight !== '0px';
  document.querySelectorAll('.proj-body').forEach(b=>b.style.maxHeight='0px');
  document.querySelectorAll('.proj-chevron').forEach(c=>c.style.transform='rotate(0deg)');
  if(!isOpen){ body.style.maxHeight = body.scrollHeight + 'px'; chevron.style.transform='rotate(180deg)'; }
});

// FAQ (accordion)
const faqList = document.getElementById('faqList');
FAQ_DATA.forEach((f,i)=>{
  faqList.appendChild(el(`
    <div class="reveal overflow-hidden rounded-xl border border-line bg-panel/50 backdrop-blur-md" style="transition-delay:${i*0.05}s">
      <button class="faq-toggle flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span class="text-sm font-medium text-ink">${f.q}</span>
        <span class="faq-plus shrink-0 text-cyan transition-transform duration-300"><i data-lucide="plus" style="width:16px;height:16px;"></i></span>
      </button>
      <div class="faq-body overflow-hidden transition-all duration-300" style="max-height:0;">
        <p class="px-5 pb-4 text-xs leading-relaxed text-muted">${f.a}</p>
      </div>
    </div>`));
});
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.faq-toggle');
  if(!btn) return;
  const body = btn.parentElement.querySelector('.faq-body');
  const plus = btn.parentElement.querySelector('.faq-plus');
  const isOpen = body.style.maxHeight && body.style.maxHeight !== '0px';
  document.querySelectorAll('.faq-body').forEach(b=>b.style.maxHeight='0px');
  document.querySelectorAll('.faq-plus').forEach(p=>p.style.transform='rotate(0deg)');
  if(!isOpen){ body.style.maxHeight = body.scrollHeight + 'px'; plus.style.transform='rotate(45deg)'; }
});

/* ============================= COUNTERS ============================= */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const elx = entry.target;
      const target = parseInt(elx.dataset.target,10);
      const suffix = elx.dataset.suffix || '';
      const t0 = performance.now();
      const duration = 1300;
      function step(t){
        const k = Math.min((t-t0)/duration,1);
        const eased = 1-Math.pow(1-k,3);
        elx.textContent = Math.round(target*eased).toLocaleString('en-IN') + suffix;
        if(k<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(elx);
    }
  });
}, { threshold: 0.3 });
counters.forEach(c=>counterObserver.observe(c));

/* ============================= SCROLL REVEAL ============================= */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '-10% 0px -10% 0px' });
document.querySelectorAll('.reveal').forEach(r=>revealObserver.observe(r));

/* ============================= NAVBAR SCROLL + MOBILE MENU ============================= */
const navHeader = document.getElementById('navHeader');
const navInner = document.getElementById('navInner');
window.addEventListener('scroll', ()=>{
  if(window.scrollY>24){
    navHeader.classList.add('py-2'); navHeader.classList.remove('py-4');
    navInner.style.boxShadow = '0 12px 40px -20px rgba(0,216,255,.25)';
  } else {
    navHeader.classList.add('py-4'); navHeader.classList.remove('py-2');
    navInner.style.boxShadow = 'none';
  }
});
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
menuBtn.addEventListener('click', ()=>{
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuIcon.setAttribute('data-lucide', isOpen ? 'menu' : 'x');
  lucide.createIcons();
});
document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click', ()=>{
  mobileMenu.classList.add('hidden');
  menuIcon.setAttribute('data-lucide','menu');
  lucide.createIcons();
}));

/* ============================= MAGNETIC BUTTONS ============================= */
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2) * 0.3;
    const y = (e.clientY - rect.top - rect.height/2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', ()=>{ btn.style.transform = 'translate(0,0)'; });
});

/* ============================= WIFI BARS ============================= */
const wifiGrid = document.getElementById('wifiGrid');
for(let i=0;i<20;i++){
  const bar = document.createElement('div');
  bar.className = 'h-4 rounded-sm bg-gradient-to-t from-blue/40 to-cyan/60';
  bar.style.opacity = (0.4 + (i%5)*0.12).toString();
  wifiGrid.appendChild(bar);
}

/* ============================= PARTICLE FIELD (hero canvas) ============================= */
(function(){
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  const wrap = document.getElementById('particleWrap');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w=0,h=0,raf=0;
  const mouse = {x:-9999,y:-9999};
  const N = window.innerWidth < 640 ? 40 : 80;
  const LINK = 150;
  let nodes = [];

  function size(){
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    w = rect.width; h = rect.height;
  }
  size();
  nodes = Array.from({length:N}, ()=>({
    x:Math.random()*w, y:Math.random()*h,
    vx:(Math.random()-0.5)*(reduced?0:0.35), vy:(Math.random()-0.5)*(reduced?0:0.35),
    r:Math.random()*1.6+0.8
  }));

  function frame(){
    ctx.clearRect(0,0,w,h);
    for(const n of nodes){
      n.x += n.vx; n.y += n.vy;
      if(n.x<0||n.x>w) n.vx*=-1;
      if(n.y<0||n.y>h) n.vy*=-1;
      const dm = Math.hypot(n.x-mouse.x, n.y-mouse.y);
      if(dm<170){ n.x += (mouse.x-n.x)*0.004; n.y += (mouse.y-n.y)*0.004; }
    }
    for(let i=0;i<N;i++){
      for(let j=i+1;j<N;j++){
        const a=nodes[i], b=nodes[j];
        const d = Math.hypot(a.x-b.x, a.y-b.y);
        if(d<LINK){
          const o = (1-d/LINK)*0.35;
          ctx.strokeStyle = `rgba(0,216,255,${o})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    for(const n of nodes){
      const dm = Math.hypot(n.x-mouse.x, n.y-mouse.y);
      const hot = dm<170;
      ctx.fillStyle = hot ? 'rgba(0,216,255,.95)' : 'rgba(148,197,255,.55)';
      ctx.shadowColor = hot ? '#00D8FF' : 'transparent';
      ctx.shadowBlur = hot ? 10 : 0;
      ctx.beginPath(); ctx.arc(n.x,n.y, hot?n.r+1:n.r, 0, Math.PI*2); ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  wrap.addEventListener('mousemove', (e)=>{
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  wrap.addEventListener('mouseleave', ()=>{ mouse.x = mouse.y = -9999; });
  window.addEventListener('resize', size);
  frame();
})();

/* ============================= INIT ICONS ============================= */
lucide.createIcons();

/* fadeIn keyframe used by inline animation strings */
const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`;
document.head.appendChild(styleSheet);

/* ============================= ENQUIRY FORM -> SUPABASE ============================= */
const enquiryForm = document.getElementById('enquiryForm');
if(enquiryForm){
  const statusEl = document.getElementById('enquiryStatus');
  const submitBtn = document.getElementById('enquirySubmit');
  const labelEl = document.getElementById('enquiryLabel');
  const setStatus = (msg, ok)=>{
    statusEl.textContent = msg;
    statusEl.classList.remove('text-cyan','text-crimson');
    statusEl.classList.add(ok ? 'text-cyan' : 'text-crimson');
  };
  const THANKS = 'Thank you! Your enquiry has been received. We will get back to you shortly.';

  enquiryForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const f = new FormData(enquiryForm);
    if(f.get('website')){ enquiryForm.reset(); setStatus(THANKS, true); return; } // honeypot: bots only

    const data = {
      name: (f.get('name') || '').trim(),
      email: (f.get('email') || '').trim(),
      phone: (f.get('phone') || '').trim(),
      company: (f.get('company') || '').trim(),
      service: (f.get('service') || '').trim(),
      message: (f.get('message') || '').trim(),
    };
    if(data.name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email) || data.message.length < 5){
      setStatus('Please enter your name, a valid email and a short message.', false);
      return;
    }

    submitBtn.disabled = true; labelEl.textContent = 'Sending...'; setStatus('', true);
    const result = window.TecexDB ? await window.TecexDB.submitEnquiry(data) : { ok:false };
    submitBtn.disabled = false; labelEl.textContent = 'Send Enquiry';

    if(result.ok){ enquiryForm.reset(); setStatus(THANKS, true); }
    else { setStatus('Sorry, we could not send that. Please email marketing@tecex.in or call +91 962994827.', false); }
  });
}

});
