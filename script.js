(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const peso = n => '₱' + Math.round(n).toLocaleString('en-PH');

  /* ================= DATA (BeautyProject Glow Guide + Facebook page) ================= */
  const GEMS = [
    { id: 'opal', name: 'Opal Teen', type: 'IV Push', color: '#d9cfe8', c2: '#f6e9f2', price: 659, reg: 1200, p6: 3295, p13: 6590, b: ['Skin lightening', 'Promotes wound healing', 'Helps balance the immune system'] },
    { id: 'topaz', name: 'Topaz Ultra Detox', type: 'IV Drip', color: '#e3b23c', c2: '#f7dc8a', price: 989, reg: 1400, p6: 4945, p13: 9890, b: ['Antioxidant', 'Skin lightening', 'Remedies vitamin C deficiency'] },
    { id: 'sapphire', name: 'Sapphire Bright', type: 'IV Drip', color: '#2c4fae', c2: '#7f9be0', price: 1399, reg: 2600, p6: 6995, p13: 13990, b: ['Rejuvenates & lightens skin', 'Reduces tiredness & boosts energy', 'Boosts immunity'] },
    { id: 'ruby', name: 'Ruby Rosy White', type: 'IV Drip', color: '#b0143c', c2: '#ef7d97', price: 1979, reg: 3600, p6: 9895, p13: 19790, b: ['Pinkish white glow', 'Smoothens and lightens complexion', 'Fades acne marks & dark spots'] },
    { id: 'jade', name: 'Jade Anti-Aging', type: 'IV Drip', color: '#2f9a72', c2: '#9fdcc0', price: 2089, reg: 3800, p6: 10445, p13: 20890, b: ['Fights free radical damage, a major driver of aging', 'Stimulates skin growth & cellular regeneration', 'Skin lightening'] },
    { id: 'diamond', name: 'Diamond Clear', type: 'IV Drip', color: '#c9d6df', c2: '#ffffff', price: 2199, reg: 4000, p6: 10995, p13: 21990, b: ['Skin glowing, whitening & antioxidant', 'Rejuvenating & energy boosting', 'Skin & cellular anti-aging', 'Upgraded with NAD+ this year'] },
    { id: 'emerald', name: 'Emerald Premium', type: 'IV Drip', color: '#127d52', c2: '#63c99a', price: 2299, reg: 4200, p6: 11495, p13: 22990, b: ['Boosts energy and brain function', 'Whitening, cleansing & antioxidant', 'Helps manage inflammation and muscle recovery after exercise'] },
    { id: 'pearl', name: 'Pearl White', type: 'IV Drip', color: '#eadfce', c2: '#fffaf1', price: 2299, reg: 4200, p6: 11495, p13: 22990, b: ['Promotes even skin tone and reduces hyperpigmentation', 'Advanced detoxification', 'Helps the body against illness and chronic fatigue'] }
  ];
  const ROYAL = [
    { name: 'Snow White Drip', sub: 'With boosted vitamin C', price: 1299, d: 'Skin lightening, immune support, less oxidative stress & inflammation.' },
    { name: 'Cinderella Drip', sub: 'With boosted vitamin B', price: 1799, d: 'Overall body detox, skin rejuvenation, and boosted metabolism for weight management.' },
    { name: 'Celestial Drip', sub: 'Vitamin B & boosted vitamin C', price: 2099, d: 'Antioxidant defense, more energy, smoother and lighter complexion.' },
    { name: 'Celebrity Drip', sub: 'Boosted vitamins B & C', price: 2899, d: 'Rapid cell turnover for skin, hydration, hair & nails, plus immune support.' }
  ];

  // [name, price or text, calc base?]
  const MENU = {
    facials: { label: 'Facials & Skin Care', groups: [
      ['Facial Skin Care', 'Promo 5+1 · 10+3 free', [['Hypoallergenic Facial', 549], ['Premium Whitening Facial', 769], ['Premium Age-defy Facial', 769], ['Luxe Brightening Facial', 1099], ['Luxe Acne-Clear Facial', 1099], ['Luxe Rejuvenation Facial', 1099], ['Hydra-Oxyderm Facial', 1759], ['Signature BeautyProject Facial', 1759], ['Facial Massage', 439], ['PDT Face Mask', 439], ['Diamond Peel', 439], ['PDT Mist Therapy (add-on)', 539]]],
      ['Back & Underarm Skin Care', 'Promo 5+1 · 10+3 free', [['Whitening Backcial (upper/lower)', 1319], ['Acne-Clear Backcial (upper/lower)', 1319], ['Whitening Underarmcial', 879], ['Whitening Buttcial', 2199]]],
      ['Skin Care Treatments', 'Promo 5+1 · 10+3 free', [['Warts Removal', '₱1,650/area'], ['Milia Removal', '₱2,750/area'], ['Syringoma Removal', '₱2,750/area'], ['Skintag Removal', '₱2,200/pc'], ['Galvanic Treatment', 879], ['Ultrasonic Lifting Treatment', 879], ['Puffy Eyebags Galva-Sonic Treatment', 1649]]],
      ['PRP & Glow', 'Signature treatments', [['Swiss PRP Vampire Facial (full face)', 3849], ['Swiss PRP (undereye)', 2199], ['PRP Hair Regrowth', 3999], ['Korean BB Glow', 3000]]]
    ] },
    lasers: { label: 'Lasers & Whitening', groups: [
      ['Diode Hair Removal & Diode Whitening', 'Female / Male · same rates for both', [['Upper Lip', '₱549 / ₱659'], ['Lower Lip', '₱549 / ₱659'], ['Full Face', '₱1,649 / ₱2,639'], ['Underarm', '₱829 / ₱1,099'], ['Arms', '₱1,379 / ₱2,199'], ['Half Legs', '₱1,929 / ₱3,299'], ['Full Legs', '₱3,299 / ₱3,839'], ['Bikini Line', '₱1,379 / ₱2,199'], ['Brazilian', '₱2,739 / ₱4,399'], ['Beard (male)', 1389], ['Upper Neck (male)', 659]]],
      ['Pico Frosting & Carbon Laser', 'Promo 5+1 · 10+3 free', [['Face Pico Frosting Laser', 2199], ['Acne Spot Pico Frosting', 1650], ['Back Pico Frosting', 2750], ['Leg Frosting Laser White', 2750], ['Black Doll Face', 2199], ['Underarm Carbon Laser Peel', 2199], ['Knee Carbon Peel', 2199], ['Butt Carbon Peel', 2750], ['Black Carbon Laser Peel', 2199]]],
      ['Pico White & Whitening Laser', 'Promo 5+1 · 10+3 free', [['Glass Skin Face', 2199], ['Lip Picolight Whitening', 1650], ['Undereye Picolight', 1650], ['Underarm Pico Whitening', 2199], ['Knee Pico Whitening', 2199], ['Butt Pico Whitening', 2199], ['Bikini Line Pico White', 2199], ['Elbow Pico White', 2199], ['Picosure White Laser', 2199], ['Tattoo Laser Removal', 2199], ['Birth Mark', 2199]]],
      ['IPL Hair Removal', 'Promo 5+1 · 10+3 free', [['Upper Lip', 440], ['Lower Lip', 440], ['Full Face', 1320], ['Underarm', 660], ['Arms', 1100], ['Half Legs', 1540], ['Full Legs', 3080], ['Bikini Line', 1100], ['Brazilian', 2199], ['Beard', 1099], ['Mustache', 549], ['Upper Neck', 549]]],
      ['Resurfacing & Dome', 'Per session', [['CO2 Fractional Laser', 2199], ['Whitening & Anti-Aging Dome', 2200]]]
    ] },
    slim: { label: 'Slimming', groups: [
      ['Cryo Lipo Fat Freezing', 'Promo 5+1 · 10+3 free', [['Double Chin', 1099], ['Abdomen', 2199], ['Arms (double)', 3299], ['Chest, male (double)', 3299], ['Abdomen (double)', 3299], ['Love Handle (double)', 3299], ['Braline (double)', 3299], ['Inner Thighs (double)', 3299], ['Outer Thighs (double)', 3299], ['Buttocks (double)', 3299]]],
      ['Body Slimming Machines', '₱799 per area · 5+1 for ₱3,995 · 10+3 for ₱7,990', [['Fat Melting Vacuum (per area)', 799], ['Lipo Cavit Slimming (per area)', 799], ['RF Slimming (per area)', 799], ['LipoLASER (per area)', 799], ['Slimming & Detox Dome', 2200]]],
      ['ExiProLift', 'Promo 5+1 · 10+3 free', [['Face', 2199], ['Undereye', 1699], ['Neck', 1099], ['Arms', 2749], ['Abdomen', 3849], ['Braline', 2749], ['Love Handle', 2749], ['Back', 3849], ['Thighs', 3299], ['Butt', 2749]]],
      ['EM ProSculpt & EMSlim NOVA', 'Per area: abdomen, buttocks, thighs, arms, calves', [['EM ProSculpt (per area)', 1650], ['EMSlim NOVA (per area)', 1650]]]
    ] },
    lift: { label: 'Contour & Lift', groups: [
      ['LemonBottle', 'Contouring & visual shaping · free RF', [['LemonBottle Double Chin', 1798], ['LemonBottle Buccal Fat', 3958], ['LemonBottle V-line', 3958], ['LemonBottle Arms', 5398], ['LemonBottle Braline', 5398], ['LemonBottle Love Handle', 5398], ['LemonBottle Thighs', 5398], ['LemonBottle Abdomen', 7198], ['LemonBottle Eyebags', 11998]]],
      ['7D HIFU', 'Lift & tightening · promo 2+1 · 5+3 free', [['Undereye', 2750], ['Forehead', 2750], ['Cheeks', 3300], ['Face + Neck', 3959], ['Arms', 4619], ['Abdomen', 5939], ['Thighs', 7259], ['Back Fat', 7259], ['Whole Body', 31680]]],
      ['Classic HIFU', 'Lift & tightening · promo 2+1 · 5+3 free', [['Undereye', 1649], ['VMax Lift Face', 2199], ['Neck', 2199], ['Face + Neck', 2749], ['Arms', 3299], ['Abdomen', 4949], ['Thighs', 5499], ['Back Fat', 5499], ['Whole Body', 21999]]],
      ['Ulthera', 'Lift & tightening · promo 2+1 · 5+3 free', [['Ulthera Neck + Chin', 5059], ['Ulthera Face Lift', 7699], ['Ulthera Arms', 7699], ['Ulthera Abdomen', 8799], ['Thighs', 12099], ['Back Fat', 12099], ['Ulthera Body', 43999], ['Ulthera Lift promo (2+1 sessions)', 15399]]],
      ['HIFU VLift', 'Unlimited shots for 20 minutes', [['HIFU VLift (3+1 sessions)', 10999], ['7D HIFU VLift (3+1 sessions)', 10999]]]
    ] },
    botox: { label: 'Botox', groups: [
      ['Medical Aesthetics · Botox', 'With a free facial · promo 5+1 · 10+3 free', [['Alartox', 5278], ['Frown Lines', 6335], ['Crow’s Feet', 7125], ['Jawtox', 7918], ['Forehead', 9498], ['Shoulder', 13198], ['Legs', 13198], ['Sweatox', 15838], ['Full Face (max. 3 parts)', 22438]]]
    ] },
    drips: { label: 'IV Drips & Push', groups: [
      ['IV Drips', 'Per session · 5+1 · 10+3 free', GEMS.filter(g => g.type === 'IV Drip').map(g => [g.name, g.price])],
      ['IV Push', 'Per session · 5+1 · 10+3 free', [['Opal Teen', 659], ['Vitamin C', 549], ['Vitamin B-Complex', 599]]],
      ['Royal Drips · Limited Edition', 'Per session', ROYAL.map(r => [r.name, r.price])],
      ['Beauty White Project', '7 sessions, great for first timers', [['Beauty White Project (7 sessions)', 10989]]]
    ] }
  };

  const PROJECTS = [
    { n: 'Acne Treatment Project', t: 'Clear skin', p: 7699, inc: ['5 sessions acne facial', '5 sessions acne PDT light', '5 sheet masks', '1 Black Doll Facial'] },
    { n: 'Barbie Face 1.0', t: 'Contour', p: 5278, inc: ['1 session HIFU VMax* or Exilis', '1 LemonBottle V-line', '1 LemonBottle Double Chin', 'Free facial & topical cream'], note: '*HIFU VMax at the Makati branch only' },
    { n: 'Barbie Face 2.0', t: 'Contour', p: 11878, inc: ['5 sessions LemonBottle V-line', '5 sessions LemonBottle Double Chin', '2 RF Slimming Face', 'Free facial'] },
    { n: 'Barbie Face 3.0', t: 'Contour', p: 18478, inc: ['1 session 7D HIFU', 'LemonBottle V-line, Double Chin & Buccal Fat', '1 session Exilis', '1 session Jawtox', 'Free facial & topical cream'] },
    { n: 'Barbie Tummy', t: 'Non-invasive tuck', p: 24958, inc: ['1 session 7D HIFU Abdomen', '2 LemonBottle Abdomen + 2 Love Handle', '2 LipoCavit Abdomen + 2 Love Handle', '2 RF Slim Abdomen + 2 Love Handle'] },
    { n: 'Barbie Arms', t: 'Botox project', p: 13198, inc: ['300 units Botox arms', '4 sessions LemonBottle', '2 sessions LipoCavitation', '2 sessions RF skin tightening'] },
    { n: 'Barbie Legs', t: 'Botox project', p: 14518, inc: ['300 units Botox legs', '4 sessions LemonBottle', '2 sessions LipoCavitation', '2 sessions RF skin tightening'] },
    { n: 'Barbie Max Project', t: '4–5 sessions', p: 26398, inc: ['Barbie Face 1.0', 'Barbie Arms', 'Barbie Legs'] },
    { n: 'Ytening Project', t: '14 inclusions', p: 25300, was: 60000, inc: ['1 Opal Teen Push', '1 each: Topaz, Sapphire, Jade, Ruby, Diamond & Emerald drips', '7 Whitening & Anti-Aging Dome or Slimming & Detox Dome'] },
    { n: 'Princess White Project', t: '45 sessions', p: 12998, inc: ['9 Gluta Push', '9 facials', '9 Diamond Peel', '9 PDT Light Therapy', '9 Whitening Underarmcial'] },
    { n: "Fit 'N White", t: '15+ sessions', p: 13198, inc: ['100 units LemonBottle', '100 units Botox', '8 sessions Gluta Push', '3 LipoCavit + 3 RF Slimming', '1 session ExiProLift'] },
    { n: 'Age Defy Project', t: '13 sessions', p: 13198, inc: ['1 Exilis ProLift Face', '3 Jade Anti-Aging Drips', '3 Vitamin B Push', '3 Premium Age-defy Facials', '3 PDT Light Treatments'] },
    { n: 'Warts Removal Project', t: 'Unlimited per area', p: 2999, inc: ['Unlimited warts removal per area', 'Free cleansing', 'Free anesthesia'] },
    { n: 'Korean BB Glow', t: 'Per session', p: 3000, inc: ['Free facial & Diamond Peel', 'Free collagen jelly mask', 'Free serum blush infusion', 'Free light treatment & cryo pore closing'] }
  ];

  const BR = [
    { id: 'mandaluyong', city: 'Mandaluyong', name: 'Mandaluyong', addr: 'GF The Facilities Center, Shaw Blvd., Mandaluyong City (landmark: Babyland)', phones: ['0991 546 4100', '0961 028 1874'], open: 10, close: 20, mon: false, home: true },
    { id: 'makati', city: 'Makati', name: 'Makati', addr: 'Unit 2D, 9641 Kamagong Building, Makati City (beside Solace Hotel, near Shopwise Makati)', phones: ['0993 487 9141'], open: 10, close: 20, mon: false },
    { id: 'timog', city: 'Quezon City', name: 'GMA Timog QC', addr: '8th flr., Caswynn Bldg., 134 Timog Ave., Sacred Heart, Quezon City (in front of GMA Network, near MRT Kamuning)', phones: ['0994 494 2344'], open: 10, close: 20, mon: false },
    { id: 'libis', city: 'Quezon City', name: 'Libis, Eastwood QC', addr: 'GF Aspire Tower, 1 Calle Industria, Brgy. Bagumbayan, Quezon City (behind SNR E. Rodriguez)', phones: ['0969 427 6440'], open: 10, close: 20, mon: false },
    { id: 'commonwealth', city: 'Quezon City', name: 'Ever Commonwealth QC', addr: '2nd flr. Ever Gotesco Mall, Commonwealth Center, Quezon City', phones: ['0920 926 9022'], open: 10, close: 21, mon: true },
    { id: 'pasig', city: 'Pasig', name: 'Pasig', addr: 'GF Unit 109 One Oasis Hub A, Ortigas Extn., Pasig City (in front of Choice Market Ortigas)', phones: ['0977 729 0649', '0927 935 5044'], open: 10, close: 20, mon: false },
    { id: 'sanjuan', city: 'San Juan', name: 'San Juan City', addr: '3rd flr. GG8 Bldg., 294 Col. Bonny Serrano Ave., San Juan City (near Avida Towers New Manila)', phones: ['0908 861 1924', '0917 513 7719'], open: 10, close: 20, mon: false },
    { id: 'manila', city: 'Manila', name: 'Manila', addr: 'Unit 14 2F SCG Building, Pedro Gil, Manila (near Zus Coffee)', phones: ['0998 581 7922'], open: 10, close: 20, mon: false },
    { id: 'alabang', city: 'Muntinlupa', name: 'Alabang', addr: 'Unit 212 Civic Prime Commercial Bldg., Alabang, Muntinlupa City (across Festival Mall Alabang)', phones: ['0908 327 1875'], open: 10, close: 20, mon: false },
    { id: 'starosa', city: 'Laguna', name: 'Sta. Rosa, Laguna', addr: '3rd flr. Banawe De Sta. Rosa, F. Reyes St., Brgy. Balibago, Sta. Rosa City, Laguna (in front of Monde Nissin)', phones: ['0962 290 1903'], open: 10, close: 20, mon: false },
    { id: 'lipa', city: 'Batangas', name: 'Lipa, Batangas', addr: 'Km. 84, Pres. J.P. Laurel Highway, Pilahan Sabang, Lipa, Batangas (in front of SM Lipa, inside Amalfi718 Hotel)', phones: ['0961 474 5913'], open: 10, close: 20, mon: false },
    { id: 'stotomas', city: 'Batangas', name: 'Sto. Tomas, Batangas', addr: '2nd flr. HMB Bldg., Sto. Tomas, Batangas', phones: ['0924 016 2095'], open: 10, close: 20, mon: false },
    { id: 'baguio', city: 'Baguio', name: 'Baguio City', addr: 'Olympian Lane, Mabini Street, Brgy. Kabayanihan, Baguio City', phones: ['0946 943 3645'], open: 10, close: 19, mon: false },
    { id: 'bacolor', city: 'Pampanga', name: 'Bacolor, Pampanga', addr: 'Unit A, C&E Romero Commercial Building, McArthur Hi-way, Cabalantian, Bacolor, Pampanga', phones: ['0956 813 3702'], open: 10, close: 19, mon: false }
  ];
  const SALE_END = new Date('2026-11-30T23:59:59+08:00');
  const MSGR = 'https://m.me/beautyprojectmandaluyong';

  /* ================= helpers ================= */
  function phNow() {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short' }).formatToParts(new Date());
    const g = t => p.find(x => x.type === t).value;
    return { y: +g('year'), m: +g('month') - 1, d: +g('day'), h: +g('hour') % 24, min: +g('minute'), wd: g('weekday') };
  }
  const fmtH = h => { const hh = Math.floor(h), mm = Math.round((h - hh) * 60); return ((hh + 11) % 12 + 1) + (mm ? ':' + String(mm).padStart(2, '0') : '') + (hh < 12 ? 'am' : 'pm'); };
  const days = b => b.mon ? 'Mon–Sun' : 'Tue–Sun';
  function status(b) {
    const n = phNow(), t = n.h + n.min / 60;
    if (!b.mon && n.wd === 'Mon') return { open: false, text: 'Closed today · opens Tue ' + fmtH(b.open) };
    if (t >= b.open && t < b.close) return { open: true, text: 'Open now · until ' + fmtH(b.close) };
    if (t < b.open) return { open: false, text: 'Opens today ' + fmtH(b.open) };
    return { open: false, text: 'Closed · opens ' + (!b.mon && n.wd === 'Sun' ? 'Tue ' : 'tomorrow ') + fmtH(b.open) };
  }
  const priceTxt = v => typeof v === 'number' ? peso(v) : v;

  /* ================= headline ================= */
  $$('.split').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) => `<span class="w"><span style="transition-delay:${.35 + i * .12}s">${esc(w)}</span></span>`).join(' ');
    setTimeout(() => el.classList.add('in'), 100);
  });

  /* ================= promo strip + countdown ================= */
  const saleOn = Date.now() < SALE_END.getTime();
  if (saleOn) $('#strip').hidden = false;
  else { $('#countdown').remove(); $('#sale1111').remove(); }
  function tick() {
    let s = Math.max(0, (SALE_END - Date.now()) / 1000);
    const d = Math.floor(s / 86400); s -= d * 86400; const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s = Math.floor(s - m * 60);
    const set = (id, v) => { const e = $(id); if (e) e.textContent = String(v).padStart(2, '0'); };
    set('#cd-d', d); set('#cd-h', h); set('#cd-m', m); set('#cd-s', s);
  }
  if (saleOn) { tick(); setInterval(tick, 1000); }

  /* ================= gems ================= */
  const gemSVG = (c, c2, id) => `<svg viewBox="0 0 60 60" aria-hidden="true"><defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><path d="M14 8h32l10 14-26 32L4 22z" fill="url(#g${id})" stroke="rgba(0,0,0,.18)"/><path d="M4 22h52M14 8l8 14 8-14 8 14 8-14M22 22l8 32 8-32" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.2"/></svg>`;
  $('#gems').innerHTML = GEMS.map((g, i) => `<button class="gem ${i === 1 ? 'on' : ''}" role="tab" aria-selected="${i === 1}" data-g="${g.id}">${gemSVG(g.color, g.c2, g.id)}<span>${g.name}</span></button>`).join('');
  function showGem(id, anim) {
    const g = GEMS.find(x => x.id === id);
    $$('.gem').forEach(b => { const on = b.dataset.g === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
    const c = $('#gemCard');
    c.innerHTML = `<span class="glow" style="background:${g.color}"></span><p class="gtype">${g.type}</p><h3>${g.name}</h3><ul>${g.b.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <div class="gprice"><b>${peso(g.price)}</b><small>per session</small><s>Regular ${peso(g.reg)}</s></div>
      <div class="gpack"><span>5+1 free · ${peso(g.p6)}</span><span>10+3 free · ${peso(g.p13)}</span></div>
      <div class="hero-ctas"><button class="btn btn-solid" data-book data-pick="${esc(g.name)} ${g.type}">Book ${esc(g.name)}</button><button class="btn btn-line dark" data-calc="${esc(g.name)}">Package calculator</button></div>`;
    if (anim) { c.classList.remove('swap'); void c.offsetWidth; c.classList.add('swap'); }
  }
  showGem('topaz');
  $('#gems').addEventListener('click', e => { const b = e.target.closest('.gem'); if (b) showGem(b.dataset.g, true); });
  $('#royalList').innerHTML = ROYAL.map(r => `<div class="rcard"><h4>${r.name}</h4><small>${r.sub}</small><p>${r.d}</p><b>${peso(r.price)}</b><button data-book data-pick="${esc(r.name)}">Book →</button></div>`).join('');

  /* ================= glow menu ================= */
  const mtabs = $('#mtabs'), mgrid = $('#mgrid'), ms = $('#mSearch');
  const order = ['facials', 'lasers', 'slim', 'lift', 'botox', 'drips'];
  let curTab = 'facials';
  mtabs.innerHTML = order.map(k => `<button class="mtab ${k === curTab ? 'on' : ''}" role="tab" aria-selected="${k === curTab}" data-t="${k}">${MENU[k].label}</button>`).join('');
  const hl = (s, q) => q ? esc(s).replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>') : esc(s);
  function renderMenu() {
    const q = ms.value.trim().toLowerCase();
    const keys = q ? order : [curTab];
    let html = '';
    keys.forEach(k => MENU[k].groups.forEach(([gn, note, rows]) => {
      const rs = q ? rows.filter(([n]) => (gn + ' ' + n).toLowerCase().includes(q)) : rows;
      if (!rs.length) return;
      html += `<div class="mgroup"><h3>${esc(gn)}</h3><p class="gnote">${esc(note)}</p>${rs.map(([n, p]) => `<div class="mrow"><span>${hl(n, q)}</span><b>${esc(priceTxt(p))}</b><button data-book data-pick="${esc(gn.includes(n) ? n : gn + ' · ' + n)}" aria-label="Book ${esc(n)}">Book</button></div>`).join('')}</div>`;
    }));
    mgrid.innerHTML = html || `<p class="mempty">No match for “${esc(ms.value)}”. Try “laser”, “underarm” or “HIFU”, or <button class="linkbtn" data-chat>ask us</button>.</p>`;
    $$('.mtab').forEach(t => t.classList.toggle('on', !q && t.dataset.t === curTab));
  }
  mtabs.addEventListener('click', e => { const t = e.target.closest('.mtab'); if (!t) return; curTab = t.dataset.t; ms.value = ''; $$('.mtab').forEach(x => x.setAttribute('aria-selected', x === t)); renderMenu(); });
  ms.addEventListener('input', renderMenu);
  renderMenu();

  /* ================= calculator ================= */
  const calcItems = [];
  GEMS.forEach(g => calcItems.push([g.name + ' (' + g.type + ')', g.price]));
  ROYAL.forEach(r => calcItems.push([r.name, r.price]));
  [['facials', 0], ['facials', 1], ['lasers', 1], ['lasers', 2], ['lasers', 4], ['slim', 2]].forEach(([k, gi]) => MENU[k].groups[gi][2].forEach(([n, p]) => typeof p === 'number' && calcItems.push([n, p])));
  [['Diode Underarm (female)', 829], ['Diode Underarm (male)', 1099], ['Diode Full Legs (female)', 3299], ['IPL Underarm', 660], ['Body slimming machine (per area)', 799]].forEach(x => calcItems.push(x));
  const cT = $('#cTreat');
  cT.innerHTML = calcItems.map(([n, p], i) => `<option value="${i}">${esc(n)} · ${peso(p)}</option>`).join('');
  let pack = 6;
  function calc() {
    const [, p] = calcItems[+cT.value];
    const paid = pack === 1 ? 1 : pack === 6 ? 5 : 10;
    $('#cPay').textContent = peso(p * paid); $('#cSes').textContent = pack; $('#cPer').textContent = peso(p * paid / pack); $('#cSave').textContent = peso(p * (pack - paid));
  }
  cT.addEventListener('change', calc);
  $('#cPack').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; pack = +b.dataset.p; $$('#cPack button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); }); calc(); });
  calc();
  $('#cBook').addEventListener('click', () => { const [n] = calcItems[+cT.value]; openBooking({ service: n + (pack === 1 ? '' : pack === 6 ? ' · 5+1 package' : ' · 10+3 package') }); });
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-calc]'); if (!c) return;
    const i = calcItems.findIndex(([n]) => n.startsWith(c.dataset.calc)); if (i > -1) cT.value = i; calc();
    $('#calc').scrollIntoView({ behavior: 'smooth' });
  });

  /* ================= projects rail ================= */
  const rail = $('#projRail'), pbar = $('#pBar');
  rail.innerHTML = PROJECTS.map(p => `<article class="proj"><span class="ptag">${esc(p.t)}</span><h3>${esc(p.n)}</h3><ul>${p.inc.map(x => `<li>${esc(x)}</li>`).join('')}</ul>${p.note ? `<p class="fine" style="margin:0">${esc(p.note)}</p>` : ''}<div class="pp"><b>${peso(p.p)}</b>${p.was ? `<s>${peso(p.was)}</s>` : ''}</div><button data-book data-pick="${esc(p.n)}">Book this project →</button></article>`).join('');
  const upd = () => { const max = rail.scrollWidth - rail.clientWidth, w = Math.min(100, rail.clientWidth / rail.scrollWidth * 100); pbar.style.width = w + '%'; pbar.style.left = (max ? rail.scrollLeft / max : 0) * (100 - w) + '%'; };
  rail.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); setTimeout(upd, 300);
  $('#pPrev').onclick = () => rail.scrollBy({ left: -316, behavior: 'smooth' });
  $('#pNext').onclick = () => rail.scrollBy({ left: 316, behavior: 'smooth' });

  /* ================= branches ================= */
  const home = BR[0];
  function renderStatus() { const st = status(home), el = $('#mStatus'); el.className = 'status' + (st.open ? ' open' : ''); el.innerHTML = `<i></i>${st.text}`; }
  renderStatus(); setInterval(renderStatus, 60000);
  const abg = $('#abGrid'), bs = $('#bSearch');
  function renderAll() {
    const q = bs.value.trim().toLowerCase();
    const list = BR.filter(b => !q || (b.name + ' ' + b.city + ' ' + b.addr).toLowerCase().includes(q));
    abg.innerHTML = list.map(b => { const st = status(b); return `<div class="abc ${b.home ? 'home' : ''}"><h4>${b.name}${b.home ? ' · you are here' : ''}</h4><p>${esc(b.addr)}</p><span class="status ${st.open ? 'open' : ''}" style="font-size:.68rem"><i></i>${st.text}</span><div class="row"><span>${days(b)} · ${fmtH(b.open)}–${fmtH(b.close)}</span>${b.phones.map(p => `<a href="tel:${p.replace(/\s/g, '')}">${p}</a>`).join('')}<button data-book data-branch="${b.id}">Book →</button></div></div>`; }).join('') || '<p class="mempty">No branch found. Try “QC”, “Laguna” or “Batangas”.</p>';
  }
  bs.addEventListener('input', renderAll); renderAll();

  /* ================= reveal / counters / scroll ================= */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el, i) => { el.style.transitionDelay = ((i % 4) * .08) + 's'; io.observe(el); });
  function countUp(el, end) {
    if (reduce) { el.textContent = peso(end); return; }
    const t0 = performance.now();
    (function f(t) { const k = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - k, 3); el.textContent = peso(end * e); if (k < 1) requestAnimationFrame(f); })(t0);
  }
  const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; cio.unobserve(e.target); if (e.target.dataset.amt) countUp(e.target, +e.target.dataset.amt); if (e.target.id === 'ringFill') e.target.style.strokeDashoffset = 0; }), { threshold: .5 });
  $$('[data-amt],#ringFill').forEach(el => cio.observe(el));
  const nav = $('#nav'), bar = $('.progress span'), fb = $('.float-book'), secs = $$('main section[id]'), navLinks = $$('.links a');
  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('solid', y > 20); fb.classList.toggle('show', y > innerHeight * .9);
    bar.style.width = Math.min(100, y / h * 100) + '%';
    let cur = ''; secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
    navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* menu */
  const burger = $('#burger'), links = $('#links');
  const setMenu = o => { links.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); document.body.style.overflow = o ? 'hidden' : ''; };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  $$('.links a, .links button').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* pointer */
  if (!reduce && fine) {
    const ar = $('.arches');
    $('.hero').addEventListener('pointermove', e => { const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; ar.style.translate = `${x * -18}px ${y * -14}px`; $$('.leaf').forEach((l, i) => l.style.translate = `${x * (20 + i * 12)}px ${y * (14 + i * 8)}px`); });
    $$('.magnet').forEach(b => { b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .16}px,${(e.clientY - r.top - r.height / 2) * .28}px)`; }); b.addEventListener('pointerleave', () => b.style.transform = ''); });
    $$('.tilt').forEach(t => { t.addEventListener('pointermove', e => { const r = t.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; t.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`; }); t.addEventListener('pointerleave', () => t.style.transform = ''); });
  }

  /* ================= modal + booking ================= */
  let lastFocus;
  const openModal = m => { lastFocus = document.activeElement; m.hidden = false; document.body.style.overflow = 'hidden'; };
  const closeModal = m => { m.hidden = true; document.body.style.overflow = ''; lastFocus && lastFocus.focus && lastFocus.focus(); };
  document.addEventListener('keydown', e => {
    const m = $$('.modal').find(x => !x.hidden);
    if (m) {
      if (e.key === 'Escape') closeModal(m);
      if (e.key === 'Tab') { const f = $$('button:not(:disabled),input,select,a[href]', m).filter(x => x.offsetParent); if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); } else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); } }
    } else if (e.key === 'Escape' && !chat.hidden) closeChat();
  });
  const bm = $('#book'), B = { branch: null, service: null, date: null, time: null, step: 0 };
  const sel = $('#bService');
  sel.innerHTML = '<optgroup label="Not sure yet"><option>Consultation (not sure yet)</option></optgroup>' +
    order.map(k => `<optgroup label="${esc(MENU[k].label)}">${MENU[k].groups.map(([gn, , rows]) => rows.map(([n]) => `<option>${esc(gn.includes(n) || k === 'drips' ? n : gn + ' · ' + n)}</option>`).join('')).join('')}</optgroup>`).join('') +
    `<optgroup label="Signature projects">${PROJECTS.map(p => `<option>${esc(p.n)}</option>`).join('')}</optgroup><optgroup label="Programs"><option>Slimpen Weight Loss Project</option><option>Project Unlimited 1.0</option><option>Project Unlimited 2.0</option><option>VVIP Unlimited 1.0</option><option>VVIP Unlimited 2.0</option><option>Year-End Sale (25% off)</option></optgroup>`;
  const brById = id => BR.find(b => b.id === id);
  const bopt = b => `<button type="button" class="bopt" data-id="${b.id}"><span><b>BeautyProject ${b.name}</b><small>${esc(b.addr)}</small></span><small>${days(b)}<br> ${fmtH(b.open)}–${fmtH(b.close)}</small></button>`;
  function renderBopts() {
    const extra = B.branch && B.branch !== 'mandaluyong' ? brById(B.branch) : null;
    $('#bBranches').innerHTML = bopt(home) + (extra ? bopt(extra) : '');
    $$('.bopt').forEach(x => x.classList.toggle('on', x.dataset.id === B.branch));
  }
  $('#bOther').innerHTML += BR.slice(1).map(b => `<option value="${b.id}">${b.name}</option>`).join('');
  $('#bBranches').addEventListener('click', e => { const o = e.target.closest('.bopt'); if (!o) return; B.branch = o.dataset.id; B.time = null; renderBopts(); refreshNav(); setTimeout(() => go(1), 250); });
  $('#bOther').addEventListener('change', e => { if (!e.target.value) return; B.branch = e.target.value; B.time = null; renderBopts(); e.target.value = ''; refreshNav(); setTimeout(() => go(1), 250); });
  sel.addEventListener('change', () => { B.service = sel.value; refreshNav(); });
  let calY, calM;
  const today = () => { const n = phNow(); return new Date(n.y, n.m, n.d); };
  function renderCal() {
    const t = today(), first = new Date(calY, calM, 1), dn = new Date(calY, calM + 1, 0).getDate(), max = new Date(t); max.setDate(max.getDate() + 60);
    const br = brById(B.branch);
    $('#calHint').textContent = br.mon ? 'Open every day.' : 'Closed on Mondays.';
    $('#calTitle').textContent = first.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' });
    $('#calPrev').disabled = calY === t.getFullYear() && calM === t.getMonth();
    $('#calNext').disabled = new Date(calY, calM + 1, 1) > max;
    let h = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => `<span class="dow">${d}</span>`).join('');
    for (let i = 0; i < first.getDay(); i++) h += '<span></span>';
    for (let d = 1; d <= dn; d++) {
      const dt = new Date(calY, calM, d), closed = !br.mon && dt.getDay() === 1, dis = dt < t || dt > max || closed;
      h += `<button type="button" data-d="${d}" ${dis ? 'disabled' : ''} class="${B.date && dt.getTime() === B.date.getTime() ? 'sel' : ''} ${dt.getTime() === t.getTime() ? 'today' : ''}" aria-label="${dt.toDateString()}${closed ? ' (closed)' : ''}">${d}</button>`;
    }
    $('#calGrid').innerHTML = h;
  }
  $('#calGrid').addEventListener('click', e => { const b = e.target.closest('button[data-d]'); if (!b) return; B.date = new Date(calY, calM, +b.dataset.d); B.time = null; renderCal(); renderSlots(); refreshNav(); });
  $('#calPrev').onclick = () => { calM--; if (calM < 0) { calM = 11; calY--; } renderCal(); };
  $('#calNext').onclick = () => { calM++; if (calM > 11) { calM = 0; calY++; } renderCal(); };
  function renderSlots() {
    const g = $('#slotGrid');
    if (!B.date) { $('#slotTitle').textContent = 'Pick a date'; g.innerHTML = ''; return; }
    const br = brById(B.branch), n = phNow(), isT = B.date.getTime() === today().getTime();
    $('#slotTitle').textContent = B.date.toLocaleDateString('en-PH', { weekday: 'long', month: 'short', day: 'numeric' });
    let h = ''; for (let t = br.open; t <= br.close - 1; t += .5) { const past = isT && t <= n.h + n.min / 60 + 1; h += `<button type="button" data-t="${t}" ${past ? 'disabled' : ''} class="${B.time === t ? 'sel' : ''}">${fmtH(t)}</button>`; }
    g.innerHTML = h; if (!$('button:not(:disabled)', g)) g.innerHTML = '<p class="hint">No more times today. Please pick another date.</p>';
  }
  $('#slotGrid').addEventListener('click', e => { const b = e.target.closest('button[data-t]'); if (!b) return; B.time = +b.dataset.t; renderSlots(); refreshNav(); });
  const panes = $$('.bpane'), stepsEl = $$('#bsteps li'), bNext = $('#bNext'), bBack = $('#bBack'), bnav = $('#bnav');
  const canNext = () => [B.branch, B.service, B.date && B.time != null, true][B.step];
  function refreshNav() { bNext.disabled = !canNext(); bBack.style.visibility = B.step ? 'visible' : 'hidden'; bNext.style.display = B.step >= 3 ? 'none' : ''; }
  const dateTxt = () => B.date.toLocaleDateString('en-PH', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }) + ', ' + fmtH(B.time);
  function go(s) {
    B.step = s;
    panes.forEach(p => p.classList.toggle('on', +p.dataset.step === s));
    stepsEl.forEach((li, i) => { li.classList.toggle('on', i === s); li.classList.toggle('done', i < s); });
    $('#bsteps').hidden = s === 4; bnav.hidden = s === 4; $('#bookT').hidden = s === 4; $('.kicker', bm).hidden = s === 4;
    if (s === 1 && !B.service) B.service = sel.value;
    if (s === 2) { const t = today(); if (calY == null) { calY = t.getFullYear(); calM = t.getMonth(); } renderCal(); renderSlots(); }
    if (s === 3) $('#bSummary').innerHTML = `<b>Branch:</b> BeautyProject ${brById(B.branch).name}<br><b>Treatment:</b> ${esc(B.service)}<br><b>Schedule:</b> ${dateTxt()}`;
    refreshNav();
    const f = $('.bpane.on button:not(:disabled), .bpane.on select, .bpane.on input', bm); f && setTimeout(() => f.focus(), 60);
  }
  bNext.onclick = () => canNext() && go(B.step + 1);
  bBack.onclick = () => go(Math.max(0, B.step - 1));
  $('#bsteps').addEventListener('click', e => { const i = stepsEl.indexOf(e.target.closest('li')); if (i > -1 && i < B.step) go(i); });
  function openBooking(o = {}) {
    B.branch = o.branch || B.branch || 'mandaluyong'; B.time = null; B.date = null;
    if (o.service) { sel.value = o.service; if (sel.value !== o.service) { sel.add(new Option(o.service, o.service), 0); sel.value = o.service; } }
    B.service = sel.value; renderBopts(); openModal(bm);
    go(o.service || o.branch ? (o.service ? 2 : 1) : 0);
  }
  let via = 'ms';
  $$('.send-row button').forEach(b => b.addEventListener('click', () => via = b.dataset.via));
  $('#bForm').addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.target), b = brById(B.branch);
    const msg = `Hi BeautyProject ${b.name}! I'd like to book an appointment.\n\nName: ${fd.get('name')}\nMobile: ${fd.get('phone')}\nBranch: ${b.name}\nTreatment: ${B.service}\nPreferred schedule: ${dateTxt()}` + (fd.get('notes') ? `\nNotes: ${fd.get('notes')}` : '') + '\n\n(Sent from the BeautyProject Mandaluyong website)';
    let url, note;
    if (via === 'ms') { try { await navigator.clipboard.writeText(msg); } catch {} url = MSGR; note = b.home ? 'We copied your booking details. Paste them in Messenger and press send.' : `We copied your booking details. Paste them in Messenger, or text the ${b.name} branch at ${b.phones[0]}.`; }
    else if (via === 'sms') { url = `sms:${b.phones[0].replace(/\s/g, '')}?&body=${encodeURIComponent(msg)}`; note = `We opened your messages app with your details for the ${b.name} branch. Just press send.`; }
    else { url = `mailto:beautyprojectmandaluyong@gmail.com?subject=${encodeURIComponent('Booking request · ' + B.service)}&body=${encodeURIComponent(msg)}`; note = 'We opened your email app with your booking details. Just press send.'; }
    if (via === 'sms') location.href = url; else window.open(url, '_blank', 'noopener');
    const s = new Date(B.date); s.setHours(Math.floor(B.time), (B.time % 1) * 60); const en = new Date(s.getTime() + 3600000);
    const f = d => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`;
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//BeautyProject//Booking//EN', 'BEGIN:VEVENT', `UID:${Date.now()}@beautyproject`, `DTSTART;TZID=Asia/Manila:${f(s)}`, `DTEND;TZID=Asia/Manila:${f(en)}`, `SUMMARY:BeautyProject · ${B.service} (to be confirmed)`, `LOCATION:${b.addr}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    $('#icsLink').href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    try { const all = JSON.parse(localStorage.getItem('bp-bookings') || '[]'); all.push({ b: b.name, s: B.service, w: dateTxt() }); localStorage.setItem('bp-bookings', JSON.stringify(all.slice(-5))); } catch {}
    $('#doneText').textContent = note + ' The team will confirm your schedule.';
    e.target.reset(); go(4);
  });
  document.addEventListener('click', e => {
    const bk = e.target.closest('[data-book]');
    if (bk) { e.preventDefault(); if (!chat.hidden && bk.closest('.chat')) closeChat(); openBooking({ service: bk.dataset.pick, branch: bk.dataset.branch }); return; }
    if (e.target.closest('[data-chat]')) { e.preventDefault(); openChat(); return; }
    if (e.target.closest('[data-close]')) { closeModal(e.target.closest('.modal')); return; }
    if (e.target.classList.contains('modal')) closeModal(e.target);
  });

  /* ================= assistant ================= */
  const chat = $('#chat'), log = $('#chatLog'), chips = $('#chatChips'), fab = $('.chat-fab');
  const BOOK = (svc, t = 'Book now') => ({ t, book: svc || '' });
  const find = q => { const out = []; order.forEach(k => MENU[k].groups.forEach(([gn, , rows]) => rows.forEach(([n, p]) => { if ((gn + ' ' + n).toLowerCase().includes(q)) out.push(`${gn.includes(n) ? n : gn + ' · ' + n}: <b>${esc(priceTxt(p))}</b>`); }))); return out; };
  const K = [
    { k: ['hi', 'hello', 'hey', 'kumusta', 'good morning', 'good afternoon', 'good evening'], a: () => ["Hi! ✦ Welcome to <b>BeautyProject Mandaluyong</b>. Ask me about IV drips, facials, lasers, slimming, HIFU, promos, prices or booking."] },
    { k: ['promo', 'promos', 'sale', 'discount', '11.11', 'friday', 'year-end', 'yearend', 'voucher', 'gift'], w: 1.5, a: () => [(saleOn ? '<b>11.11 Mega Glow Sale</b> (all November): up to 20% off rollback rates, <b>11% off all services every Friday</b>, and <b>5% off whitening & skin care</b> all month.<br><br>' : '') + '<b>Beauty Year-End Sale</b>: 25% off Mesolipo, IV boosters, acne injections and Slimpen packages (while supplies last). We also have <b>₱1,000 gift vouchers</b>, and up to 25% off on ClassPass.', [{ t: 'See promos', go: '#promos' }, BOOK('', 'Book now')]] },
    { k: ['iv', 'drip', 'drips', 'gluta', 'glutathione', 'whitening drip', 'push', 'topaz', 'sapphire', 'ruby', 'jade', 'diamond', 'emerald', 'pearl', 'opal', 'royal', 'cinderella', 'snow white', 'celebrity', 'celestial'], a: () => ['Our IV drips & push (per session):<ul>' + GEMS.map(g => `<li>${g.name}: <b>${peso(g.price)}</b></li>`).join('') + '<li>Vitamin C Push: <b>₱549</b> · Vitamin B-Complex: <b>₱599</b></li></ul>Royal Drips: Snow White ₱1,299, Cinderella ₱1,799, Celestial ₱2,099, Celebrity ₱2,899. Packages: <b>5+1</b> and <b>10+3 free</b>.', [{ t: 'Find your gem', go: '#drips' }, BOOK('', 'Book a drip')]] },
    { k: ['price', 'prices', 'magkano', 'how much', 'cost', 'presyo', 'rate', 'rates', 'menu', 'list'], w: .8, a: q => { const hits = q ? find(q) : []; return [hits.length && hits.length < 12 ? 'Here’s what I found:<ul>' + hits.map(h => `<li>${h}</li>`).join('') + '</ul>' : 'All our 2025 rollback rates are in the <b>Glow Menu</b>. IV drips start at ₱989, facials at ₱439, diode underarm at ₱829, and body slimming machines at ₱799 per area.', [{ t: 'Open Glow Menu', go: '#menu' }, BOOK('', 'Book now')]]; } },
    { k: ['facial', 'facials', 'acne', 'pimple', 'tigyawat', 'diamond peel', 'bb glow', 'prp', 'vampire', 'pdt'], a: () => ['Facials start at <b>₱439</b> (Facial Massage, PDT Face Mask, Diamond Peel). Popular: Premium Whitening ₱769, Luxe Acne-Clear ₱1,099, Signature BeautyProject Facial ₱1,759, Swiss PRP Vampire Facial ₱3,849, Korean BB Glow ₱3,000. The <b>Acne Treatment Project</b> is ₱7,699.', [{ t: 'See facials', go: '#menu' }, BOOK('Facial Skin Care · Signature BeautyProject Facial', 'Book a facial')]] },
    { k: ['laser', 'diode', 'hair removal', 'underarm', 'kili', 'kilikili', 'ipl', 'pico', 'carbon', 'black doll', 'tattoo', 'co2', 'birth mark'], a: () => ['Lasers at BeautyProject:<ul><li>Diode underarm: <b>₱829</b> (female) / ₱1,099 (male)</li><li>IPL underarm: <b>₱660</b></li><li>Pico & Carbon laser: ₱1,650–₱2,750</li><li>Black Doll Face: ₱2,199 · Tattoo removal: ₱2,199</li><li>CO2 Fractional: ₱2,199</li></ul>', [{ t: 'Laser prices', go: '#menu' }, BOOK('Diode Hair Removal & Diode Whitening · Underarm', 'Book laser')]] },
    { k: ['slim', 'slimming', 'fat', 'taba', 'tummy', 'tiyan', 'cryo', 'cavit', 'rf', 'emsculpt', 'emslim', 'vacuum', 'exilis', 'exiprolift', 'weight', 'pumayat', 'slimpen'], a: () => ['For slimming: body machines (Fat Melting Vacuum, Lipo Cavit, RF, LipoLASER) at <b>₱799 per area</b>, Cryo Lipo from ₱1,099, EM ProSculpt / EMSlim NOVA ₱1,650 per area, ExiProLift from ₱1,099. The <b>Slimpen Weight Loss Project</b> starts at ₱19,990 with free doctor monitoring.', [{ t: 'Slimming prices', go: '#menu' }, BOOK('Slimpen Weight Loss Project', 'Book a consult')]] },
    { k: ['lemonbottle', 'lemon bottle', 'double chin', 'buccal', 'vline', 'v-line', 'mesolipo', 'barbie'], w: 1.5, a: () => ['<b>LemonBottle</b> (with free RF): Double Chin ₱1,798, Buccal Fat & V-line ₱3,958, Arms/Braline/Love Handle/Thighs ₱5,398, Abdomen ₱7,198. Bundles: Barbie Face 1.0 ₱5,278, 2.0 ₱11,878, 3.0 ₱18,478.', [{ t: 'See projects', go: '#projects' }, BOOK('LemonBottle · LemonBottle Double Chin', 'Book LemonBottle')]] },
    { k: ['hifu', 'ulthera', 'lift', 'sagging', 'tightening', 'vmax', 'jawline'], a: () => ['Lift & tightening:<ul><li>7D HIFU: from <b>₱2,750</b> (face + neck ₱3,959)</li><li>Classic HIFU: from <b>₱1,649</b> (VMax face ₱2,199)</li><li>Ulthera: face lift ₱7,699 · Ulthera Lift promo 2+1 for ₱15,399</li><li>HIFU VLift 3+1: ₱10,999</li></ul>Promos: 2+1 and 5+3 free.', [{ t: 'Lift prices', go: '#menu' }, BOOK('7D HIFU · Face + Neck', 'Book HIFU')]] },
    { k: ['botox', 'wrinkle', 'wrinkles', 'jawtox', 'sweatox', 'frown', 'crow'], a: () => ['Botox (with a free facial): Alartox ₱5,278, Frown Lines ₱6,335, Crow’s Feet ₱7,125, Jawtox ₱7,918, Forehead ₱9,498, Full Face (max. 3 parts) ₱22,438, Sweatox ₱15,838.', [BOOK('Medical Aesthetics · Botox · Forehead', 'Book Botox')]] },
    { k: ['unlimited', 'subscription', 'vvip', 'membership'], a: () => ['<b>Project Unlimited</b>: 1.0 ₱99,998 (1 year), 2.0 ₱197,998 (2 years, 2 people). <b>VVIP Unlimited</b>: 1.0 ₱129,998, 2.0 ₱259,998. Some inclusions depend on branch availability.', [{ t: 'See Unlimited', go: '#unlimited' }, BOOK('Project Unlimited 1.0', 'Inquire')]] },
    { k: ['where', 'saan', 'address', 'location', 'map', 'shaw', 'babyland', 'facilities', 'mandaluyong', 'directions'], a: () => [`We're at <b>GF The Facilities Center, Shaw Blvd., Mandaluyong</b> (landmark: Babyland). ${status(home).text}.`, [{ t: 'Open map', go: '#branches' }, BOOK('', 'Book here')]] },
    { k: ['branch', 'branches', 'makati', 'timog', 'qc', 'quezon', 'libis', 'eastwood', 'commonwealth', 'pasig', 'san juan', 'manila', 'alabang', 'laguna', 'sta rosa', 'lipa', 'batangas', 'baguio', 'pampanga', 'bacolor', 'sto tomas'], a: q => { const hit = BR.filter(b => q && (b.name + ' ' + b.city).toLowerCase().split(/[\s,.]+/).some(w => w.length > 2 && q.includes(w))); return [hit.length && hit.length < 4 ? hit.map(b => `<b>${b.name}</b>: ${esc(b.addr)}. ${days(b)} ${fmtH(b.open)}–${fmtH(b.close)} · ${b.phones.join(' / ')}`).join('<br><br>') : 'BeautyProject has <b>14 branches</b>: Mandaluyong, Makati, GMA Timog, Libis, Commonwealth, Pasig, San Juan, Manila, Alabang, Sta. Rosa, Lipa, Sto. Tomas, Baguio and Bacolor.', [{ t: 'All branches', go: '#branches' }]]; } },
    { k: ['open', 'hours', 'oras', 'bukas', 'sarado', 'closed', 'monday', 'lunes', 'sunday', 'today'], a: () => [`Mandaluyong is open <b>Tuesday to Sunday, 10am–8pm</b> (closed Mondays). Right now: <i>${status(home).text}</i>.`, [BOOK('', 'Book now')]] },
    { k: ['book', 'booking', 'appointment', 'reserve', 'pa book', 'pabook', 'schedule', 'slot', 'walk in'], a: () => ['Sure! Pick your treatment, date and time, and I’ll prepare your request for Messenger, text or email.', [BOOK('', 'Start booking')]] },
    { k: ['contact', 'phone', 'number', 'call', 'email', 'messenger', 'text', 'instagram', 'tiktok'], a: () => ['Mandaluyong: <b>0991 546 4100</b> / 0961 028 1874<br>Email: beautyprojectmandaluyong@gmail.com<br>Instagram: @beautyproject.aesthetics · TikTok: @beautyprojectaesthetics', [{ t: 'Messenger', href: MSGR }, { t: 'Call', href: 'tel:09915464100' }]] },
    { k: ['pay', 'payment', 'gcash', 'card', 'credit', 'installment', 'hulugan', 'cash'], a: () => ['We accept <b>GCash, Visa, Mastercard, JCB and Amex</b>. Packages can be paid in <b>installments</b>. Card payments have a 3% service charge.'] },
    { k: ['doctor', 'doc', 'surgeon', 'surgery', 'rhinoplasty', 'blepharoplasty', 'liposuction', 'geobert'], a: () => ['Our Consultant Doctor & Cosmetic Surgeon is <b>Dr. Geobert Uyquiengco</b>. Surgical procedures are done in hospitals, and the price is set after a doctor’s consultation (₱1,500).', [BOOK('Consultation (not sure yet)', 'Book a consultation')]] },
    { k: ['owner', 'ceo', 'founder', 'aubrey', 'angelie', 'about', 'who'], a: () => ['BeautyProject is led by Owner & CEO <b>Angelie Aubrey Asuncion-Gonzales</b>, Miss Philippines Earth Runner-Up and Binibining Pilipinas finalist. BeautyProject turned 3 this year and is the official partner of Reina Filipinas 2026.', [{ t: 'Read more', go: '#about' }]] },
    { k: ['dandyglow', 'dandelion', 'coffee', 'kape'], a: () => ['<b>DandyGlow</b> is the 1st dandelion coffee in the Philippines, for digestion, detox and glow. Sachet ₱60 · box of 7 ₱350 · mother box ₱11,250.'] },
    { k: ['safe', 'ligtas', 'masakit', 'pain', 'downtime', 'side effect', 'shopee', 'fake'], a: () => ['Treatments are done by trained professionals in BeautyProject branches only. Many treatments are non-invasive with no downtime. Note: BeautyProject has <b>no official Shopee store</b> and doesn’t sell LemonBottle ampoules online.'] },
    { k: ['my booking', 'my appointment', 'booked'], a: () => { let l = []; try { l = JSON.parse(localStorage.getItem('bp-bookings') || '[]'); } catch {} return l.length ? ['Requests from this device:<ul>' + l.map(x => `<li>${esc(x.s)} · ${esc(x.b)} · ${esc(x.w)}</li>`).join('') + '</ul>'] : ["I don't see any requests from this device yet.", [BOOK('', 'Book now')]]; } },
    { k: ['thanks', 'thank you', 'salamat', 'ty', 'ok', 'okay', 'sige'], a: () => ['You’re welcome! ✦ Your Beauty, Our Project.'] }
  ];
  const norm = s => ' ' + s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9+.\s-]/g, ' ').replace(/\s+/g, ' ') + ' ';
  function reply(q) {
    const t = norm(q); let best = null, score = 0;
    for (const it of K) { let s = 0; for (const k of it.k) if (t.includes(' ' + k + ' ') || (k.length > 4 && t.includes(k))) s += (k.includes(' ') ? 2 : 1) * (it.w || 1); if (s > score) { score = s; best = it; } }
    const words = t.trim().split(' ').filter(w => w.length > 3 && !['magkano', 'price', 'prices', 'much', 'presyo', 'yung', 'ba', 'po', 'how'].includes(w));
    if (best && best.k.includes('magkano') && words.length) { const hits = find(words.join(' ')); if (hits.length) return best.a(words.join(' ')); const one = words.map(find).find(h => h.length); if (one) return best.a(words.find(w => find(w).length)); }
    if (!best) { const one = words.map(w => [w, find(w)]).find(([, h]) => h.length && h.length < 12); if (one) return ['Here’s what I found:<ul>' + one[1].map(h => `<li>${h}</li>`).join('') + '</ul>', [BOOK('', 'Book now')]]; return ["I'm not sure about that yet. Try <b>IV drip, facial, laser, slimming, HIFU, promos, branches</b> or <b>booking</b>, or message the team.", [{ t: 'Messenger', href: MSGR }, BOOK('', 'Book now')]]; }
    return best.a(t.trim());
  }
  function add(html, who = 'bot', acts) {
    const d = document.createElement('div'); d.className = 'msg ' + who; d.innerHTML = html;
    if (acts && acts.length) { const a = document.createElement('div'); a.className = 'acts'; acts.forEach(x => { if (x.href) a.insertAdjacentHTML('beforeend', `<a href="${x.href}" ${x.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${x.t}</a>`); else if (x.go) { const b = document.createElement('button'); b.textContent = x.t; b.onclick = () => { closeChat(); $(x.go).scrollIntoView({ behavior: 'smooth' }); }; a.append(b); } else a.insertAdjacentHTML('beforeend', `<button data-book data-pick="${esc(x.book)}">${x.t}</button>`); }); d.append(a); }
    log.append(d); log.scrollTop = log.scrollHeight;
  }
  function ask(q) {
    if (!q.trim()) return; add(esc(q), 'me');
    const ty = document.createElement('div'); ty.className = 'msg bot typing'; ty.innerHTML = '<i></i><i></i><i></i>'; log.append(ty); log.scrollTop = log.scrollHeight;
    setTimeout(() => { ty.remove(); const [h, a] = reply(q); add(h, 'bot', a); }, 550 + Math.random() * 450);
  }
  const CHIPS = ['Promos', 'IV drip prices', 'Facials', 'Underarm laser', 'LemonBottle', 'HIFU', 'Slimming', 'Location & hours', 'Payment'];
  chips.innerHTML = CHIPS.map(c => `<button type="button">${c}</button>`).join('');
  chips.addEventListener('click', e => { const b = e.target.closest('button'); if (b) ask(b.textContent); });
  $('#chatForm').addEventListener('submit', e => { e.preventDefault(); const i = $('#chatIn'); ask(i.value); i.value = ''; });
  let greeted = false;
  function openChat() { chat.hidden = false; fab.style.display = 'none'; if (!greeted) { greeted = true; add(`Hi! ✦ I'm the <b>BeautyProject Mandaluyong</b> assistant. Ask me about prices, promos, treatments or booking.<br><small style="color:#5d6b61">${status(home).text}</small>`); } setTimeout(() => $('#chatIn').focus(), 100); }
  function closeChat() { chat.hidden = true; fab.style.display = ''; }
  $('[data-chat-close]').onclick = closeChat;
})();
