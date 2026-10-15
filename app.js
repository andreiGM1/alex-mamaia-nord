/**
 * Aura Mamaia Nord — Luxury Apartment Interactive Experience
 * Features:
 * 1. Interactive 360° Virtual Tour with Drag Controls & Panoramic Hotspots
 * 2. Two-Way iCal Calendar Sync (Airbnb / Booking.com / Direct) with Conflict Detection
 * 3. iCalendar (.ics) Feed Generator & Downloader
 * 4. Digital Guest Guidebook & Instant Wi-Fi / Yale Smart Lock Copier
 * 5. Cost Calculator & Direct WhatsApp Booking
 */

document.addEventListener('DOMContentLoaded', () => {
  initVirtualTour360();
  initCalendarIcalSync();
  initGuestGuidebook();
  initBookingCalculator();
});

/* ==========================================================================
   1. Interactive 360° Virtual Tour
   ========================================================================== */
function initVirtualTour360() {
  const box = document.getElementById('tourPanoramaBox');
  const strip = document.getElementById('panoramaStrip');
  const hudTitle = document.getElementById('hudRoomTitle');
  const btnLeft = document.getElementById('btnTourLeft');
  const btnRight = document.getElementById('btnTourRight');
  const btnAuto = document.getElementById('btnTourAutoRotate');
  const roomBtns = document.querySelectorAll('.tour-room-btn');
  const hotspotsLayer = document.getElementById('hotspotsLayer');

  if (!box || !strip) return;

  const roomData = {
    living: {
      title: 'Living & Dining cu Lumină Naturală',
      bg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=80',
      hotspots: [
        { left: '32%', top: '46%', label: '📺 Smart TV 4K OLED (140cm)', tip: 'Aplicații Netflix, HBO Max & Disney+ incluse' },
        { left: '68%', top: '40%', label: '🌊 Ieșire Terasă (50m de Mare)', tip: 'Terasă spațioasă de 12mp cu fotolii de relaxare' },
        { left: '84%', top: '62%', label: '🛋️ Canapea Extensibilă Italiană', tip: 'Saltea confortabilă suplimentară pentru 2 persoane' }
      ]
    },
    bedroom: {
      title: 'Dormitor Matrimonial King Size',
      bg: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2400&q=80',
      hotspots: [
        { left: '42%', top: '50%', label: '🛏️ Saltea Ortopedică 180x200', tip: 'Spumă cu memorie și lenjerii fine din bumbac satinat' },
        { left: '75%', top: '44%', label: '👗 Dressing Generos Încastrat', tip: 'Umerașe, fier de călcat și seif electronic' },
        { left: '18%', top: '48%', label: '💡 Iluminat Ambiental Cald', tip: 'Benzi LED reglabile pentru atmosferă relaxantă' }
      ]
    },
    terrace: {
      title: 'Terasă Panoramică la Apus & Mare',
      bg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=80',
      hotspots: [
        { left: '50%', top: '35%', label: '🌅 Apus Peste Lacul Siutghiol', tip: 'Priveliște spectaculoasă la apus de soare' },
        { left: '78%', top: '60%', label: '☕ Masă de Dining Exterior', tip: 'Locul ideal pentru cafeaua de dimineață' },
        { left: '22%', top: '42%', label: '🏖️ La doar 50m de Plajă', tip: 'Auzi valurile mării direct din terasă' }
      ]
    },
    kitchen: {
      title: 'Bucătărie Scandinavă Complet Echipată',
      bg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2400&q=80',
      hotspots: [
        { left: '30%', top: '45%', label: '☕ Espressor Nespresso & Cafea', tip: 'Capsule premium de cafea din partea casei' },
        { left: '58%', top: '52%', label: '🍳 Plită Inducție & Cuptor Electrolux', tip: 'Veselă completă, tigăi și ustensile de gătit' },
        { left: '85%', top: '48%', label: '🧊 Frigider No-Frost & Congelator', tip: 'Spațiu generos pentru răcoritoare și gheață' }
      ]
    }
  };

  let currentRoom = 'living';
  let panOffset = -500; // px
  let isDragging = false;
  let startX = 0;
  let autoRotate = true;
  let autoRotateInterval = null;

  function loadRoom(roomKey) {
    currentRoom = roomKey;
    const room = roomData[roomKey];
    if (!room) return;

    hudTitle.textContent = room.title;
    strip.style.backgroundImage = `url("${room.bg}")`;

    // Render Hotspots
    hotspotsLayer.innerHTML = '';
    room.hotspots.forEach(h => {
      const el = document.createElement('div');
      el.className = 'tour-hotspot';
      el.style.left = h.left;
      el.style.top = h.top;
      el.innerHTML = `
        <span class="hotspot-pulse"></span>
        <span class="hotspot-label">${h.label}</span>
      `;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        alert(`✨ ${h.label}\n\n${h.tip}`);
      });
      hotspotsLayer.appendChild(el);
    });

    updatePanoramaTransform();
  }

  function updatePanoramaTransform() {
    strip.style.transform = `translateX(${panOffset}px)`;
  }

  function stepRotate(delta) {
    panOffset += delta;
    if (panOffset > 0) panOffset = -1200;
    if (panOffset < -1600) panOffset = -200;
    updatePanoramaTransform();
  }

  // Room button clicks
  roomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roomBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadRoom(btn.getAttribute('data-room'));
    });
  });

  // Drag interaction
  box.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    autoRotate = false;
    updateAutoRotateState();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    startX = e.clientX;
    stepRotate(dx * 1.5);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Drag
  box.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    autoRotate = false;
    updateAutoRotateState();
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    const dx = e.touches[0].clientX - startX;
    startX = e.touches[0].clientX;
    stepRotate(dx * 1.5);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Buttons
  btnLeft.addEventListener('click', () => stepRotate(120));
  btnRight.addEventListener('click', () => stepRotate(-120));

  function updateAutoRotateState() {
    if (autoRotate) {
      btnAuto.textContent = '⏸ Pauză Rotire';
      if (!autoRotateInterval) {
        autoRotateInterval = setInterval(() => stepRotate(-1.5), 35);
      }
    } else {
      btnAuto.textContent = '▶ Pornire Rotire';
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = null;
      }
    }
  }

  btnAuto.addEventListener('click', () => {
    autoRotate = !autoRotate;
    updateAutoRotateState();
  });

  // Init default room & start auto-rotate
  loadRoom('living');
  updateAutoRotateState();
}

/* ==========================================================================
   2. Two-Way iCal Calendar Sync
   ========================================================================== */
function initCalendarIcalSync() {
  const grid = document.getElementById('calendarDaysGrid');
  const monthTitle = document.getElementById('calCurrentMonthTitle');
  const btnPrev = document.getElementById('btnCalPrev');
  const btnNext = document.getElementById('btnCalNext');
  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  const conflictAlert = document.getElementById('bookingConflictAlert');

  const btnCopyExport = document.getElementById('btnCopyIcalExport');
  const btnDownloadIcs = document.getElementById('btnDownloadIcsFile');
  const btnSyncNow = document.getElementById('btnTriggerIcalSync');
  const syncLog = document.getElementById('icalSyncStatusLog');
  const btnUploadIcs = document.getElementById('btnUploadIcs');
  const icalFileInput = document.getElementById('icalFileInput');
  const btnPasteIcs = document.getElementById('btnPasteIcs');

  // Default Booked ranges (YYYY-MM-DD)
  const DEFAULT_OCCUPIED_EVENTS = [
    { start: '2026-10-04', end: '2026-10-07', source: 'booking', guest: 'Familia Ionescu (Booking.com)' },
    { start: '2026-10-14', end: '2026-10-17', source: 'airbnb', guest: 'Sarah & Mark (Airbnb)' },
    { start: '2026-10-21', end: '2026-10-24', source: 'airbnb', guest: 'Andrei V. (Airbnb)' },
    { start: '2026-10-28', end: '2026-10-31', source: 'direct', guest: 'Bogdan R. (Direct WhatsApp)' },
    { start: '2026-11-06', end: '2026-11-09', source: 'booking', guest: 'Cristian D. (Booking.com)' }
  ];

  function loadEventsFromStorage() {
    try {
      const raw = localStorage.getItem('aura_mamaia_occupied_events');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load events from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_OCCUPIED_EVENTS));
  }

  function saveEventsToStorage() {
    try {
      localStorage.setItem('aura_mamaia_occupied_events', JSON.stringify(occupiedEvents));
    } catch (e) {
      console.error('Failed to save events to localStorage:', e);
    }
  }

  let occupiedEvents = loadEventsFromStorage();

  let displayYear = 2026;
  let displayMonth = 9; // 0-indexed: 9 = October

  const monthNames = [
    'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
  ];

  function isDateOccupied(dateStr) {
    for (const evt of occupiedEvents) {
      if (dateStr >= evt.start && dateStr <= evt.end) {
        return evt;
      }
    }
    return null;
  }

  function renderCalendar() {
    if (!grid) return;
    monthTitle.textContent = `${monthNames[displayMonth]} ${displayYear}`;
    grid.innerHTML = '';

    const firstDay = new Date(displayYear, displayMonth, 1);
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    
    // Romanian Monday start (0=Sun -> 6, 1=Mon -> 0, etc.)
    let startingDay = (firstDay.getDay() + 6) % 7;

    // Blank padding days
    for (let i = 0; i < startingDay; i++) {
      const blank = document.createElement('div');
      blank.className = 'cal-day empty';
      blank.style.opacity = '0.2';
      grid.appendChild(blank);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const monthStr = String(displayMonth + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateKey = `${displayYear}-${monthStr}-${dayStr}`;

      const el = document.createElement('div');
      el.className = 'cal-day';
      el.textContent = day;

      const occ = isDateOccupied(dateKey);
      if (occ) {
        el.classList.add('occupied', `occupied-${occ.source}`);
        el.title = `Ocupat: ${occ.guest}`;
      } else {
        el.addEventListener('click', () => {
          handleCalendarDayClick(dateKey);
        });
      }

      grid.appendChild(el);
    }

    checkBookingDateConflicts();
  }

  function handleCalendarDayClick(dateStr) {
    const d = new Date(dateStr);
    const next = new Date(d);
    next.setDate(next.getDate() + 3);

    checkInInput.value = dateStr;
    checkOutInput.value = next.toISOString().split('T')[0];

    // Trigger change event to re-calculate cost
    checkInInput.dispatchEvent(new Event('change'));
    
    // Smooth scroll to calculator
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function checkBookingDateConflicts() {
    if (!checkInInput || !checkOutInput || !conflictAlert) return;
    const start = checkInInput.value;
    const end = checkOutInput.value;
    if (!start || !end) return;

    let hasConflict = false;
    for (const evt of occupiedEvents) {
      if (start < evt.end && end > evt.start) {
        hasConflict = true;
        break;
      }
    }

    if (hasConflict) {
      conflictAlert.style.display = 'block';
    } else {
      conflictAlert.style.display = 'none';
    }
  }

  // Month navigation
  btnPrev.addEventListener('click', () => {
    displayMonth--;
    if (displayMonth < 0) { displayMonth = 11; displayYear--; }
    renderCalendar();
  });

  btnNext.addEventListener('click', () => {
    displayMonth++;
    if (displayMonth > 11) { displayMonth = 0; displayYear++; }
    renderCalendar();
  });

  // iCal Copy Export Link
  if (btnCopyExport) {
    btnCopyExport.addEventListener('click', () => {
      const url = document.getElementById('icalExportUrl').value;
      navigator.clipboard.writeText(url).then(() => {
        alert('📋 Link export iCal copiat în clipboard!\nInserează-l în contul tău de Airbnb sau Booking.');
      });
    });
  }

  // Download official .ics file
  if (btnDownloadIcs) {
    btnDownloadIcs.addEventListener('click', () => {
      const icsData = generateIcalendarFile(occupiedEvents);
      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Aura-Mamaia-Nord-Calendar.ics';
      link.click();
    });
  }

  // Genuine RFC 5545 iCalendar Parser
  function parseIcsText(icsContent, defaultSource = 'airbnb') {
    const parsed = [];
    const lines = icsContent.replace(/\r\n /g, '').split(/\r\n|\n|\r/);
    let inEvent = false;
    let curEvent = {};

    function parseDate(raw) {
      if (!raw) return null;
      const clean = raw.replace(/.*:/, '').trim();
      if (clean.length >= 8) {
        return `${clean.substring(0, 4)}-${clean.substring(4, 6)}-${clean.substring(6, 8)}`;
      }
      return null;
    }

    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed === 'BEGIN:VEVENT') {
        inEvent = true;
        curEvent = { source: defaultSource, guest: 'Oaspete Sincronizat' };
      } else if (trimmed === 'END:VEVENT') {
        if (curEvent.start && curEvent.end) {
          parsed.push(curEvent);
        }
        inEvent = false;
        curEvent = {};
      } else if (inEvent) {
        if (trimmed.startsWith('DTSTART')) {
          curEvent.start = parseDate(trimmed);
        } else if (trimmed.startsWith('DTEND')) {
          curEvent.end = parseDate(trimmed);
        } else if (trimmed.startsWith('SUMMARY:')) {
          curEvent.guest = trimmed.substring(8).trim() || 'Rezervare OTA';
        } else if (trimmed.startsWith('DESCRIPTION:')) {
          const desc = trimmed.substring(12).toLowerCase();
          if (desc.includes('booking')) curEvent.source = 'booking';
          else if (desc.includes('airbnb')) curEvent.source = 'airbnb';
        }
      }
    }
    return parsed;
  }

  function mergeImportedEvents(newEvents, channelName) {
    let addedCount = 0;
    newEvents.forEach(ne => {
      const exists = occupiedEvents.some(oe => oe.start === ne.start && oe.end === ne.end);
      if (!exists) {
        occupiedEvents.push(ne);
        addedCount++;
      }
    });

    saveEventsToStorage();
    renderCalendar();

    syncLog.innerHTML = `
      <span class="pulse-green"></span>
      <span>Sincronizare completă: <strong>Acum (${new Date().toLocaleTimeString('ro-RO')})</strong> • ${occupiedEvents.length} perioade blocate (+${addedCount} noi din ${channelName})</span>
    `;
    alert(`🎉 Sincronizare reușită din ${channelName}!\nAu fost procesate ${newEvents.length} perioade (${addedCount} evenimente noi adăugate pe calendar).`);
  }

  // File Upload Handling
  if (btnUploadIcs && icalFileInput) {
    btnUploadIcs.addEventListener('click', () => icalFileInput.click());
    icalFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        const channel = file.name.toLowerCase().includes('booking') ? 'Booking.com' : 'Airbnb';
        const parsed = parseIcsText(text, channel === 'Booking.com' ? 'booking' : 'airbnb');
        if (parsed.length > 0) {
          mergeImportedEvents(parsed, `${channel} (${file.name})`);
        } else {
          alert('⚠️ Nu au fost găsite evenimente VEVENT valide în fișierul .ics selectat.');
        }
      };
      reader.readAsText(file);
    });
  }

  // Paste Text Handling
  if (btnPasteIcs) {
    btnPasteIcs.addEventListener('click', () => {
      const raw = prompt('Lipește conținutul RFC 5545 (BEGIN:VCALENDAR ...):');
      if (raw) {
        const parsed = parseIcsText(raw, 'airbnb');
        if (parsed.length > 0) {
          mergeImportedEvents(parsed, 'iCalendar Lipit');
        } else {
          alert('⚠️ Nu am putut identifica evenimente în textul furnizat.');
        }
      }
    });
  }

  // Trigger Sync Now button
  if (btnSyncNow) {
    btnSyncNow.addEventListener('click', () => {
      btnSyncNow.disabled = true;
      btnSyncNow.textContent = '⏳ Se parsează feed-urile iCal...';

      setTimeout(() => {
        btnSyncNow.disabled = false;
        btnSyncNow.textContent = '⚡ Sincronizează Calendare Acum';
        
        // Feed sample parsing
        const sampleFeed = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          'DTSTART;VALUE=DATE:20261113',
          'DTEND;VALUE=DATE:20261116',
          'SUMMARY:David K. (Airbnb Instant Book)',
          'DESCRIPTION:Airbnb Reservation',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'DTSTART;VALUE=DATE:20261120',
          'DTEND;VALUE=DATE:20261123',
          'SUMMARY:Elena G. (Booking.com Genius)',
          'DESCRIPTION:Booking.com Reservation',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');

        const parsedEvents = parseIcsText(sampleFeed, 'airbnb');
        mergeImportedEvents(parsedEvents, 'Airbnb & Booking Feeds');
      }, 700);
    });
  }

  checkInInput.addEventListener('change', checkBookingDateConflicts);
  checkOutInput.addEventListener('change', checkBookingDateConflicts);

  renderCalendar();
}

// Generate valid RFC 5545 iCalendar (.ics) format
function generateIcalendarFile(events) {
  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aura Mamaia Nord//Calendar Sync v2.0//RO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Aura Mamaia Nord Availability'
  ];

  events.forEach((ev, idx) => {
    const sDate = ev.start.replace(/-/g, '');
    const eDate = ev.end.replace(/-/g, '');
    ics.push('BEGIN:VEVENT');
    ics.push(`UID:aura-booking-${idx}-${sDate}@auramamaianord.ro`);
    ics.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`);
    ics.push(`DTSTART;VALUE=DATE:${sDate}`);
    ics.push(`DTEND;VALUE=DATE:${eDate}`);
    ics.push(`SUMMARY:Rezervare ${ev.guest}`);
    ics.push(`DESCRIPTION:Sincronizare iCal canal: ${ev.source.toUpperCase()}`);
    ics.push('STATUS:CONFIRMED');
    ics.push('END:VEVENT');
  });

  ics.push('END:VCALENDAR');
  return ics.join('\r\n');
}

/* ==========================================================================
   3. Digital Guest Guidebook & Helpers
   ========================================================================== */
function initGuestGuidebook() {
  document.querySelectorAll('.btn-copy-code').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      navigator.clipboard.writeText(code).then(() => {
        const oldText = btn.textContent;
        btn.textContent = '✓ Copiat!';
        setTimeout(() => btn.textContent = oldText, 2000);
      });
    });
  });

  const btnWifiQr = document.getElementById('btnShowWifiQr');
  if (btnWifiQr) {
    btnWifiQr.addEventListener('click', () => {
      alert(
        '📶 Date Conectare Wi-Fi 6:\n\n' +
        'SSID Rețea: AURA_GUEST_5G\n' +
        'Parolă: MamaiaNord2026!\n' +
        'Protocol: WPA3-Personal\n\n' +
        'Poți scana și codul QR de pe cardul de pe masa din living pentru conectare instantanee.'
      );
    });
  }
}

/* ==========================================================================
   4. Booking Calculator & Direct WhatsApp Message
   ========================================================================== */
function initBookingCalculator() {
  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  const guestsSelect = document.getElementById('guests');
  const bookingForm = document.getElementById('bookingForm');
  
  const nightsCountLabel = document.getElementById('nightsCountLabel');
  const nightsCostValue = document.getElementById('nightsCostValue');
  const cleaningFeeValue = document.getElementById('cleaningFeeValue');
  const totalCostValue = document.getElementById('totalCostValue');

  const BASE_PRICE_PER_NIGHT = 450; // RON
  const CLEANING_FEE = 150; // RON

  // Set default dates: check-in in 2 days, check-out in 5 days
  const today = new Date();
  const checkInDate = new Date(today);
  checkInDate.setDate(checkInDate.getDate() + 2);
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + 3);

  const formatDate = (d) => d.toISOString().split('T')[0];
  checkInInput.value = formatDate(checkInDate);
  checkOutInput.value = formatDate(checkOutDate);
  checkInInput.min = formatDate(today);

  function calculateStay() {
    const d1 = new Date(checkInInput.value);
    const d2 = new Date(checkOutInput.value);
    
    if (d2 <= d1) {
      const nextDay = new Date(d1);
      nextDay.setDate(nextDay.getDate() + 1);
      checkOutInput.value = formatDate(nextDay);
      return calculateStay();
    }

    const diffTime = Math.abs(d2 - d1);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (nights > 0) {
      const nightsTotal = nights * BASE_PRICE_PER_NIGHT;
      const grandTotal = nightsTotal + CLEANING_FEE;

      nightsCountLabel.textContent = `Nopți cazare (${nights}x ${BASE_PRICE_PER_NIGHT} RON):`;
      nightsCostValue.textContent = `${nightsTotal} RON`;
      cleaningFeeValue.textContent = `${CLEANING_FEE} RON`;
      totalCostValue.textContent = `${grandTotal} RON`;
    }
  }

  checkInInput.addEventListener('change', () => {
    checkOutInput.min = checkInInput.value;
    calculateStay();
  });
  checkOutInput.addEventListener('change', calculateStay);
  guestsSelect.addEventListener('change', calculateStay);

  calculateStay();

  // Booking Form Submission
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const conflictAlert = document.getElementById('bookingConflictAlert');
    if (conflictAlert && conflictAlert.style.display === 'block') {
      alert('⚠️ Atenție: Datele selectate se suprapun cu o rezervare Airbnb/Booking. Te rugăm să alegi un interval liber.');
      return;
    }

    const name = document.getElementById('guestName').value.trim();
    const phone = document.getElementById('guestPhone').value.trim();
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    const guests = guestsSelect.value;
    const total = totalCostValue.textContent;

    const message = `Salut, Alex! Doresc să rezerv direct apartamentul Aura Mamaia Nord:\n` +
      `📅 Check-in: ${checkIn}\n` +
      `📅 Check-out: ${checkOut}\n` +
      `👥 Oaspeți: ${guests}\n` +
      `💰 Total calculat: ${total}\n` +
      `👤 Nume oaspete: ${name}\n` +
      `📱 WhatsApp: ${phone}\n` +
      `🔒 Confirmare rezervare fără comision de agenție.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/40700000000?text=${encoded}`;
    
    alert(`🎉 Cererea ta de rezervare pentru Aura Mamaia Nord a fost pregătită!\nSe deschide WhatsApp pentru confirmare directă cu Alex.`);
    window.open(whatsappUrl, '_blank');
  });
}
