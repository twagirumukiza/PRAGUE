/* ================================================================
   PRAGUE — JAVASCRIPT (V3)
   Organisation rapide :
   1. Menu mobile
   2. Thème clair/sombre
   3. Taille du texte
   4. Langues (FR / EN uniquement)
   5. Timeline / navigation
   6. Carte Leaflet + itinéraire (7 étapes)
   7. Galeries plein écran + clavier/tactile (une galerie par étape)
   8. FAQ rétractable
   ================================================================ */

(() => {
  const body = document.body;

  // ===== EN-TÊTE FIXE : calcule sa hauteur réelle pour éviter tout chevauchement =====
  const headerEl = document.querySelector('.header');
  function syncHeaderHeight() {
    if (headerEl) {
      document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
    }
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('load', syncHeaderHeight);

  // ===== MENU MOBILE =====
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  burger?.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ===== THÈME =====
  // Mémorise le mode clair/sombre dans localStorage
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('prague-theme') || 'dark';
  body.classList.toggle('theme-light', savedTheme === 'light');

  function refreshThemeIcon() {
    if (themeIcon) themeIcon.textContent = body.classList.contains('theme-light') ? '☀' : '☾';
  }
  refreshThemeIcon();

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('theme-light');
    localStorage.setItem('prague-theme', body.classList.contains('theme-light') ? 'light' : 'dark');
    refreshThemeIcon();
  });

  // ===== TAILLE DU TEXTE =====
  let fontSize = Number(localStorage.getItem('prague-font-size') || 16);
  const applyFont = () => {
    fontSize = Math.max(14, Math.min(20, fontSize));
    document.documentElement.style.setProperty('--font-base', fontSize + 'px');
    localStorage.setItem('prague-font-size', fontSize);
  };
  applyFont();

  document.getElementById('font-minus')?.addEventListener('click', () => { fontSize--; applyFont(); });
  document.getElementById('font-plus')?.addEventListener('click', () => { fontSize++; applyFont(); });

  // ===== LANGUES (FR / EN) : interface prête pour extension =====
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('prague-lang', btn.dataset.lang);
    });
  });

  // ===== TIMELINE =====
  document.querySelectorAll('.timeline-item[data-target]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector(item.dataset.target)?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // ===== CARTE INTERACTIVE — 7 ÉTAPES =====
  const map = L.map('map', {
    center: [50.0885, 14.4160],
    zoom: 14,
    scrollWheelZoom: true,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const places = [
    { lat:50.0865, lng:14.4278, title:'01 · Vieille Ville', anchor:'#vieille-ville' },
    { lat:50.0870, lng:14.4207, title:'02 · Horloge astronomique', anchor:'#horloge' },
    { lat:50.0865, lng:14.4114, title:'03 · Pont Charles', anchor:'#pont' },
    { lat:50.0904, lng:14.4174, title:'04 · Golem / Josefov', anchor:'#golem' },
    { lat:50.0909, lng:14.4006, title:'05 · Château de Prague', anchor:'#chateau' },
    { lat:50.0902, lng:14.4170, title:'06 · Cimetière juif', anchor:'#cimetiere' },
    { lat:50.0885, lng:14.4173, title:'07 · Prague en mouvement', anchor:'#mouvement' }
  ];

  const route = places.map(p => [p.lat,p.lng]);
  L.polyline(route, {className:'prague-route-line'}).addTo(map);

  let activePlace = -1;
  const markers = [];

  function activatePlace(i, scroll = true) {
    activePlace = i;
    document.querySelectorAll('.route-list button').forEach((b,n) => b.classList.toggle('active', n === i));
    markers.forEach((m,n) => {
      const el = m.getElement();
      if (el) el.classList.toggle('active', n === i);
    });
    if (scroll) {
      document.querySelector(places[i].anchor)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  }

  places.forEach((p, i) => {
    const icon = L.divIcon({
      className:'prague-marker',
      html:`<span><b>${String(i+1).padStart(2,'0')}</b></span>`,
      iconSize:[34,34],
      iconAnchor:[17,17]
    });

    const marker = L.marker([p.lat,p.lng], {icon})
      .addTo(map)
      .bindPopup(`<strong>${p.title}</strong><br><a href="${p.anchor}">Voir le récit →</a>`)
      .on('click', () => activatePlace(i));

    markers.push(marker);
  });

  document.querySelectorAll('.route-list button').forEach((btn,i) => {
    btn.addEventListener('click', () => {
      activatePlace(i);
      map.flyTo([places[i].lat,places[i].lng], 16, {duration:.8});
      markers[i].openPopup();
    });
  });

  // ===== GALERIES — UNE GALERIE PAR ÉTAPE (pas de galerie par sous-étape) =====
  const galleries = {
    'vieille-ville': [
      'prague-images/vieille-ville-01-maison-municipale.jpg',
      'prague-images/vieille-ville-02-tour-poudriere.jpg',
      'prague-images/vieille-ville-03-rue-celetna.jpg',
      'prague-images/vieille-ville-04-facades.jpg',
      'prague-images/vieille-ville-05-place-jan-hus.jpg',
      'prague-images/vieille-ville-06-maison-sgraffites.jpg'
    ],
    'horloge': [
      'prague-images/horloge-04-cadran-orloj.jpg',
      'prague-images/horloge-01-tour-hotel-ville.jpg',
      'prague-images/horloge-02-devant-horloge.jpg',
      'prague-images/horloge-03-tour-rapprochee.jpg'
    ],
    'pont': [
      'prague-images/pont-03-calvaire-crucifix.jpg',
      'prague-images/pont-01-tour-vieille-ville.jpg',
      'prague-images/pont-02-statue-charles-iv.jpg',
      'prague-images/pont-04-vue-vltava.jpg',
      'prague-images/pont-05-musiciens.jpg'
    ],
    'golem': [
      'prague-images/golem-02-statue-golem.jpg',
      'prague-images/golem-04-figurine.jpg',
      'prague-images/golem-01-synagogue-vieille-nouvelle.jpg',
      'prague-images/golem-03-rue-josefov.jpg'
    ],
    'chateau': [
      'prague-images/chateau-02-cathedrale-facade.jpg',
      'prague-images/chateau-01-porte-matthias.jpg',
      'prague-images/chateau-03-cathedrale-interieur.jpg',
      'prague-images/chateau-04-vitrail.jpg',
      'prague-images/chateau-05-vue-panoramique.jpg'
    ],
    'mouvement': [
      'prague-images/mouvement-01-metro-staromestska.jpg'
    ]
  };

  const viewer = document.getElementById('gallery-viewer');
  const stage = document.getElementById('gv-stage');
  const img = document.getElementById('gv-img');
  const indexEl = document.getElementById('gv-index');
  const totalEl = document.getElementById('gv-total');
  let current = [];
  let index = 0;
  let zoom = 1;

  function fitImage() {
    zoom = 1;
    img.style.transform = 'translate(0,0) scale(1)';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.width = 'auto';
    img.style.height = 'auto';
  }

  function render() {
    if (!current.length) return;
    img.src = current[index];
    indexEl.textContent = index + 1;
    totalEl.textContent = current.length;
    fitImage();
  }

  function openGallery(key) {
    current = galleries[key] || [];
    index = 0;
    if (!current.length) return;
    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    render();
  }

  function closeGallery() {
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-gallery]').forEach(btn => {
    btn.addEventListener('click', () => openGallery(btn.dataset.gallery));
  });

  document.getElementById('gv-close')?.addEventListener('click', closeGallery);
  document.getElementById('gv-plus')?.addEventListener('click', () => {
    zoom = Math.min(4, zoom + .25);
    img.style.maxWidth = 'none';
    img.style.maxHeight = 'none';
    img.style.transform = `translate(0,0) scale(${zoom})`;
  });
  document.getElementById('gv-minus')?.addEventListener('click', () => {
    zoom = Math.max(1, zoom - .25);
    img.style.transform = `translate(0,0) scale(${zoom})`;
  });
  document.getElementById('gv-fit')?.addEventListener('click', fitImage);

  document.addEventListener('keydown', e => {
    if (!viewer.classList.contains('open')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') { index = (index + 1) % current.length; render(); }
    if (e.key === 'ArrowLeft') { index = (index - 1 + current.length) % current.length; render(); }
  });

  // Swipe mobile
  let sx = 0;
  stage?.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX; }, {passive:true});
  stage?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) < 45 || !current.length) return;
    index = dx < 0 ? (index + 1) % current.length : (index - 1 + current.length) % current.length;
    render();
  }, {passive:true});

  // ===== FAQ RÉTRACTABLE =====
  const faqToggle = document.getElementById('faq-toggle');
  const faqGrid = document.getElementById('faq-grid');

  faqToggle?.addEventListener('click', () => {
    const isOpen = faqToggle.getAttribute('aria-expanded') === 'true';
    faqToggle.setAttribute('aria-expanded', String(!isOpen));
    if (isOpen) {
      faqGrid.setAttribute('hidden', '');
    } else {
      faqGrid.removeAttribute('hidden');
    }
    faqToggle.classList.toggle('open', !isOpen);
  });
})();
