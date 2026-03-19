// Funcția pentru verificarea vârstei
function verifyAge(isOfAge) {
  if (isOfAge) {
    // Ascunde overlay-ul cu un efect de fade
    const overlay = document.getElementById('age-verify-overlay');
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
    
    // Salvează în sesiune că utilizatorul a confirmat
    sessionStorage.setItem('isAdult', 'true');
  } else {
    // Redirecționează către legislația RM
    window.location.href = "https://www.legis.md/cautare/getResults?doc_id=153186&lang=ro#";
  }
}

// Verifică la încărcare dacă a fost deja verificat
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('isAdult') === 'true') {
    const overlay = document.getElementById('age-verify-overlay');
    if (overlay) overlay.style.display = 'none';
  }
  updateStatus();
  initSmoke();
});

// Status bar & Schedule
function updateStatus() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon ... 6=Sat
  const h = now.getHours();
  const dot = document.getElementById('statusDot');
  const txt = document.getElementById('statusText');
  
  if (!dot || !txt) return;

  let open = false;
  if (day >= 1 && day <= 5) open = h >= 9 && h < 21;
  else if (day === 6) open = h >= 10 && h < 20;

  if (open) {
    dot.classList.add('open');
    txt.textContent = 'Deschis';
  } else {
    dot.classList.remove('open');
    txt.textContent = 'Închis';
  }

  // Ziua curentă în program
  const days = ['Duminică','Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă'];
  const rows = document.querySelectorAll('.schedule-row');
  rows.forEach(r => {
    const daySpan = r.querySelector('.day');
    if (daySpan && daySpan.textContent.startsWith(days[day])) {
      r.classList.add('today');
      if (!daySpan.textContent.includes('← Azi')) {
        daySpan.textContent = days[day] + ' ← Azi';
      }
    } else {
      r.classList.remove('today');
    }
  });
}

// Smoke particles animation
function initSmoke() {
  const smokeBg = document.getElementById('smokeBg');
  if (!smokeBg) return;

  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'smoke-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.height = (60 + Math.random() * 80) + 'px';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    p.style.animationDelay = (Math.random() * 5) + 's';
    p.style.opacity = 0.3 + Math.random() * 0.4;
    smokeBg.appendChild(p);
  }
}
