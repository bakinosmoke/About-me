var words = ['BAKi', 'Reverse Engineer', 'Ethical Hacker', 'Web Designer', 'Software Developer'];
var wi = 0, ci = 0, deleting = false;

function type() {
  var el = document.getElementById('typingTarget');
  if (!el) return;
  var word = words[wi];
  el.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
  deleting ? ci-- : ci++;
  var delay = deleting ? 80 : 120;
  if (!deleting && ci === word.length) { delay = 1800; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 400; }
  setTimeout(type, delay);
}

function startParticles() {
  if (typeof particlesJS === 'undefined') return;
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#3498db' },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#3498db', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 4, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
}

window.addEventListener('load', function() {
  var loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s';
    setTimeout(function() { loader.style.display = 'none'; }, 500);
  }

  startParticles();
  type();

  var tilt = document.getElementById('tiltImg');
  if (tilt && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(tilt, { max: 25, speed: 400, glare: true, 'max-glare': 0.5 });
  }
});

var header = document.getElementById('header');
window.addEventListener('scroll', function() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  var btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('visible', window.scrollY > 300);
});

var navToggle = document.getElementById('navToggle');
var nav = document.getElementById('primary-navigation');
if (navToggle && nav) {
  navToggle.addEventListener('click', function() {
    var open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
}

var backBtn = document.getElementById('backToTop');
if (backBtn) {
  backBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

var music = document.getElementById('bgMusic');
var soundBtn = document.getElementById('soundToggle');
var muted = true;

if (soundBtn && music) {
  soundBtn.addEventListener('click', function() {
    if (muted) {
      music.play().catch(function() {});
      soundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      muted = false;
    } else {
      music.pause();
      soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      muted = true;
    }
  });
}

document.addEventListener('visibilitychange', function() {
  if (!music) return;
  if (document.hidden) {
    music.pause();
  } else {
    if (!muted) music.play().catch(function() {});
  }
});
