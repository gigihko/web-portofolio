// Fungsi load komponen HTML dari file dan sisipkan ke elemen target
async function loadHTMLComponent(filePath, elementId) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

function syncThemeIcon() {
  const icon = document.getElementById("theme-icon");
  const isLightMode = document.body.classList.contains("light-mode");

  if (isLightMode) {
    icon.classList.remove("bi-sun");
    icon.classList.add("bi-moon");
  } else {
    icon.classList.remove("bi-moon");
    icon.classList.add("bi-sun");
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  localStorage.setItem('prefersLight', document.body.classList.contains('light-mode'));
  syncThemeIcon();
  updateNavbarBackground();
}

function setHeroHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setTimeout(() => {
  initializeFadeInSections();
}, 300);

function initializeFadeInSections() {
  const fadeSections = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeSections.forEach(section => observer.observe(section));
}

function updateNavbarBackground() {
  const nav = document.getElementById('main-navbar');
  const isLightMode = document.body.classList.contains('light-mode');

  if (isLightMode) {
    nav.classList.add('nav-light');
    nav.classList.remove('nav-dark');
  } else {
    nav.classList.add('nav-dark');
    nav.classList.remove('nav-light');
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  const components = [
    ["components/navbar.html", "navbar-placeholder"],
    ["components/hero.html", "hero-placeholder"],
    ["components/about.html", "about-placeholder"],
    ["components/experience.html", "experience-placeholder"],
    ["components/education.html", "education-placeholder"],
    ["components/skills.html", "skills-placeholder"],
    ["components/certifications.html", "certifications-placeholder"],
    ["components/projects.html", "projects-placeholder"],
    ["components/contact.html", "contact-placeholder"],
    ["components/footer.html", "footer-placeholder"],
  ];

  for (const [path, target] of components) {
    await loadHTMLComponent(path, target);
  }

  if (localStorage.getItem('prefersLight') === 'true') {
    document.body.classList.add('light-mode');
  }

  syncThemeIcon();
  setHeroHeight();
  updateNavbarBackground();
  window.addEventListener('resize', setHeroHeight);
  window.addEventListener('orientationchange', setHeroHeight);
  window.addEventListener('scroll', updateNavbarBackground);

  initializeFadeInSections();
});
