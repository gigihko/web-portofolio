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
  updateNavbarTheme();
}

function setHeroHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setHeroHeight);
window.addEventListener('orientationchange', setHeroHeight);
setHeroHeight();


document.addEventListener("DOMContentLoaded", async () => {
  // 1. Load komponen
  await loadHTMLComponent("components/navbar.html", "navbar-placeholder");
  await loadHTMLComponent("components/hero.html", "hero-placeholder");
  await loadHTMLComponent("components/about.html", "about-placeholder");
  await loadHTMLComponent("components/experience.html", "experience-placeholder");
  await loadHTMLComponent("components/education.html", "education-placeholder");
  await loadHTMLComponent("components/skills.html", "skills-placeholder");
  await loadHTMLComponent("components/certifications.html", "certifications-placeholder");
  await loadHTMLComponent("components/projects.html", "projects-placeholder");
  await loadHTMLComponent("components/contact.html", "contact-placeholder");
  await loadHTMLComponent("components/footer.html", "footer-placeholder");

  // 2. Baru jalankan script yang butuh DOM (navbar & icon sudah ada)
  if (localStorage.getItem('prefersLight') === 'true') {
    document.body.classList.add('light-mode');
  }

  syncThemeIcon();
  updateNavbarTheme();
});

