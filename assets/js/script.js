// Load Projects
function loadProjects() {
  const container = document.getElementById('projectsContainer');
  const viewMoreBtn = document.getElementById('projectsViewMore');
  const viewLessBtn = document.getElementById('projectsViewLess');

  // Sort projects by id descending
  const sortedProjects = [...projectsData].sort((a, b) => b.id - a.id);
  const displayData = showAllProjects ? sortedProjects : sortedProjects.slice(0, INITIAL_ITEMS_COUNT);

  container.innerHTML = displayData.map(project => `
        <div class="project-card bg-white rounded-2xl overflow-hidden shadow-subtle border border-gray-100 card-hover fade-in flex flex-col h-full group">
          <!-- Image Section -->
          <div class="aspect-[16/10] w-full overflow-hidden bg-gray-50 relative border-b border-gray-100">
            <img src="${project.images[0]}" alt="Project screenshot" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div style="display:none;" class="w-full h-full flex items-center justify-center text-gray-400 text-center bg-gray-100 absolute top-0 left-0">
              <div>
                <i class="fas fa-image text-3xl mb-2 opacity-40"></i>
              </div>
            </div>
            <div class="absolute bottom-3 left-3">
               <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 rounded-full text-xs font-semibold shadow-sm border border-white/50">
                  ${project.category}
               </span>
            </div>
          </div>
          
          <!-- Content Section -->
          <div class="p-6 flex flex-col flex-1">
            <h3 class="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
              ${currentLang === 'en' ? project.title : project.titleId}
            </h3>
            
            <p class="text-gray-600 mb-4 text-sm line-clamp-3 flex-1">
              ${currentLang === 'en' ? project.description : project.descriptionId}
            </p>
            
            <!-- Tools Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
               ${project.tools.slice(0, 3).map(tool => `<span class="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium border border-gray-200">${tool}</span>`).join('')}
               ${project.tools.length > 3 ? `<span class="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium border border-gray-200">+${project.tools.length - 3}</span>` : ''}
            </div>

            <!-- Action Button -->
            <button onclick="openProjectModal(${project.id})" class="w-full py-3 bg-blue-600 hover:bg-blue-700 !text-white rounded-xl font-semibold transition-all shadow-subtle flex items-center justify-center gap-2 group-hover:shadow-elevated" style="color: #ffffff;">
              <span class="text-white">${currentLang === 'en' ? 'View Details' : 'Lihat Detail'}</span>
              <i class="fas fa-expand-alt text-sm text-white"></i>
            </button>
          </div>
        </div>
      `).join('');

  // Show/hide view more button
  if (projectsData.length > INITIAL_ITEMS_COUNT) {
    if (showAllProjects) {
      viewMoreBtn.classList.add('hidden');
      viewLessBtn.classList.remove('hidden');
    } else {
      viewMoreBtn.classList.remove('hidden');
      viewLessBtn.classList.add('hidden');
    }
  } else {
    viewMoreBtn.classList.add('hidden');
    viewLessBtn.classList.add('hidden');
  }
}

console.log('script.js loaded');

let currentLang = 'en';
let currentCarouselIndex = 0;
let isLanguageTransitioning = false;
let showAllProjects = false;
let showAllExperience = false;
let showAllCertificates = false;
const INITIAL_ITEMS_COUNT = 3;

// Global data holders

// Fetch all data JSON in parallel before rendering
// Call load functions on page load (data already loaded from data.js)
document.addEventListener('DOMContentLoaded', function () {
  loadProjects();
  loadExperience();
  loadCertificates();
});

// Initial load

window.addEventListener('DOMContentLoaded', async () => {
  function toggleProjectsView() {
    showAllProjects = !showAllProjects;
    if (typeof window.loadProjects === 'function') {
      window.loadProjects();
    }
  }
});

document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'id' : 'en';
  document.getElementById('langToggle').textContent = currentLang.toUpperCase();
  updateLanguage();
});

// Update Language
function updateLanguage() {
  // Update static elements with data-en/data-id
  document.querySelectorAll('[data-en][data-id]').forEach(el => {
    el.classList.add('fade-transition');
    el.style.opacity = '0';

    setTimeout(() => {
      el.textContent = currentLang === 'en' ? el.dataset.en : el.dataset.id;
      el.style.opacity = '1';
    }, 200);
  });

  // Re-render dynamic content
  setTimeout(() => {
    loadProjects();
    loadExperience();
    loadCertificates();
  }, 200);
}

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = document.querySelector('#darkModeToggle i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Mobile Menu
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#' || href === '#certificate-verify' || href === '#report-pdf' || href === '#presentation-ppt' || href === '#dashboard-demo' || href === '#medium-article') {
      return;
    }
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('mobileMenu').classList.add('hidden');
    }
  });
});

// Parallax Effect
function initParallax() {
  const parallaxSection = document.querySelector('.parallax-container');
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  if (window.innerWidth <= 768) return;

  parallaxSection.addEventListener('mousemove', (e) => {
    const rect = parallaxSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = (x - centerX) / centerX;
    const moveY = (y - centerY) / centerY;

    parallaxLayers.forEach((layer, index) => {
      const depth = (index + 1) * 8;
      const translateX = moveX * depth;
      const translateY = moveY * depth;
      layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  });

  parallaxSection.addEventListener('mouseleave', () => {
    parallaxLayers.forEach(layer => {
      layer.style.transform = 'translate(0, 0)';
    });
  });
}

// Toggle Projects View
function toggleProjectsView() {
  showAllProjects = !showAllProjects;
  loadProjects();
}

// Open Project Modal
function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');

  currentCarouselIndex = 0;

  modalContent.innerHTML = `
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <div>
              <div class="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-3 border border-blue-100">
                ${project.category}
              </div>
              <h2 class="text-2xl font-bold text-gray-900">
                ${currentLang === 'en' ? project.title : project.titleId}
              </h2>
            </div>
            <button onclick="closeProjectModal()" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all">
              <i class="fas fa-times text-gray-700"></i>
            </button>
          </div>
          
          <div class="carousel mb-6">
            ${project.images.map((img, index) => `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" alt="Project screenshot ${index + 1}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" class="w-full h-full object-cover">
                <div style="display:none;" class="w-full h-full flex items-center justify-center text-white text-center bg-gray-800">
                    <div>
                    <i class="fas fa-image text-7xl mb-4 opacity-40"></i>
                    <p class="text-lg font-semibold">${currentLang === 'en' ? 'Project Screenshot' : 'Screenshot Proyek'} ${index + 1}</p>
                    </div>
                </div>
                </div>
            `).join('')}
            <button onclick="changeCarousel(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all shadow-md">
                <i class="fas fa-chevron-left text-gray-800"></i>
            </button>
            <button onclick="changeCarousel(1)" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all shadow-md">
                <i class="fas fa-chevron-right text-gray-800"></i>
            </button>
            </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-3">
              ${currentLang === 'en' ? 'Description' : 'Deskripsi'}
            </h3>
            <p class="text-gray-700 leading-relaxed text-sm">
              ${currentLang === 'en' ? project.description : project.descriptionId}
            </p>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-3">
              ${currentLang === 'en' ? 'Key Insights' : 'Insight Utama'}
            </h3>
            <ul class="space-y-2">
              ${(currentLang === 'en' ? project.insights : project.insightsId).map(insight => `
                <li class="flex items-start gap-3">
                  <i class="fas fa-check-circle text-green-500 mt-0.5 text-sm"></i>
                  <span class="text-gray-700 text-sm">${insight}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-3">
              ${currentLang === 'en' ? 'Tools & Technologies' : 'Tools & Teknologi'}
            </h3>
            <div class="flex flex-wrap gap-2">
              ${project.tools.map(tool => `
                <span class="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium text-sm border border-blue-100">${tool}</span>
              `).join('')}
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3">
            ${project.links.github ? `
              <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all text-sm shadow-subtle">
                <i class="fab fa-github mr-2"></i>GitHub
              </a>
            ` : ''}
            ${project.links.dashboard ? `
              <a href="${project.links.dashboard}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all text-sm shadow-subtle">
                <i class="fas fa-external-link-alt mr-2"></i>Dashboard
              </a>
            ` : ''}
            ${project.links.presentation ? `
              <a href="${project.links.presentation}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all text-sm shadow-subtle">
                <i class="fas fa-presentation mr-2"></i>PPT
              </a>
            ` : ''}
            ${project.links.demo ? `
              <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all text-sm shadow-subtle">
                <i class="fas fa-play-circle mr-2"></i>Demo
              </a>
            ` : ''}
            ${project.links.article ? `
              <a href="${project.links.article}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all text-sm shadow-subtle">
                <i class="fab fa-medium mr-2"></i>Article
              </a>
            ` : ''}
          </div>
        </div>
      `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function changeCarousel(direction) {
  const items = document.querySelectorAll('.carousel-item');
  items[currentCarouselIndex].classList.remove('active');

  currentCarouselIndex = (currentCarouselIndex + direction + items.length) % items.length;
  items[currentCarouselIndex].classList.add('active');
}

document.getElementById('projectModal').addEventListener('click', (e) => {
  if (e.target.id === 'projectModal') {
    closeProjectModal();
  }
});

// Toggle Experience View
function toggleExperienceView() {
  showAllExperience = !showAllExperience;
  loadExperience();

  if (!showAllExperience) {
    document.getElementById('experience').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Load Experience
function loadExperience() {
  const container = document.getElementById('experienceContainer');
  const viewMoreBtn = document.getElementById('experienceViewMore');
  const viewLessBtn = document.getElementById('experienceViewLess');

  const displayData = showAllExperience ? experienceData : experienceData.slice(0, INITIAL_ITEMS_COUNT);

  container.innerHTML = displayData.map(exp => `
        <div class="timeline-item fade-in">
          <div class="bg-white rounded-2xl p-6 shadow-subtle border border-gray-100 hover:shadow-medium transition-all">
            <div class="flex justify-between items-start mb-3 flex-wrap gap-2">
              <h3 class="text-lg font-bold text-gray-900">
                ${currentLang === 'en' ? exp.title : exp.titleId}
              </h3>
              <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                ${exp.period}
              </span>
            </div>
            <ul class="space-y-2">
              ${(currentLang === 'en' ? exp.items : exp.itemsId).map(item => `
                <li class="flex items-start gap-3">
                  <i class="fas fa-chevron-right text-blue-500 mt-1 text-xs"></i>
                  <span class="text-gray-700 text-sm">${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `).join('');

  // Show/hide view more button
  if (experienceData.length > INITIAL_ITEMS_COUNT) {
    if (showAllExperience) {
      viewMoreBtn.classList.add('hidden');
      viewLessBtn.classList.remove('hidden');
    } else {
      viewMoreBtn.classList.remove('hidden');
      viewLessBtn.classList.add('hidden');
    }
  } else {
    viewMoreBtn.classList.add('hidden');
    viewLessBtn.classList.add('hidden');
  }
}

// Toggle Certificates View
function toggleCertificatesView() {
  showAllCertificates = !showAllCertificates;
  loadCertificates();

  if (!showAllCertificates) {
    document.getElementById('certificates').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Load Certificates
function loadCertificates() {
  const container = document.getElementById('certificatesContainer');
  const viewMoreBtn = document.getElementById('certificatesViewMore');
  const viewLessBtn = document.getElementById('certificatesViewLess');

  const displayData = showAllCertificates ? certificatesData : certificatesData.slice(0, INITIAL_ITEMS_COUNT);

  container.innerHTML = displayData.map(cert => `
        <div class="bg-white rounded-2xl p-6 shadow-subtle border border-gray-100 card-hover fade-in">
          <div class="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-subtle">
            <i class="fas fa-certificate text-2xl text-white"></i>
          </div>
          <h3 class="text-base font-bold text-gray-900 mb-2 leading-snug">
            ${currentLang === 'en' ? cert.title : cert.titleId}
          </h3>
          <p class="text-gray-600 mb-1 font-medium text-sm">${cert.organization}</p>
          <p class="text-sm text-gray-500 mb-4">${cert.year}</p>
          <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all text-sm">
            <i class="fas fa-external-link-alt text-xs"></i>
            ${currentLang === 'en' ? 'Verify Certificate' : 'Verifikasi Sertifikat'}
          </a>
        </div>
      `).join('');

  // Show/hide view more button
  if (certificatesData.length > INITIAL_ITEMS_COUNT) {
    if (showAllCertificates) {
      viewMoreBtn.classList.add('hidden');
      viewLessBtn.classList.remove('hidden');
    } else {
      viewMoreBtn.classList.remove('hidden');
      viewLessBtn.classList.add('hidden');
    }
  } else {
    viewMoreBtn.classList.add('hidden');
    viewLessBtn.classList.add('hidden');
  }
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  showToast(currentLang === 'en'
    ? 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!'
    : 'Terima kasih! Pesan Anda berhasil dikirim. Saya akan segera merespons!',
    'success'
  );

  document.getElementById('contactForm').reset();
});

// Toast Notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// Element SDK Integration
async function onConfigChange(config) {
  const customFont = config.font_family || defaultConfig.font_family;
  const baseSize = config.font_size || defaultConfig.font_size;
  const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

  document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;
  document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
  document.body.style.fontSize = `${baseSize}px`;

  document.documentElement.style.setProperty('--cream-bg', config.background_color || defaultConfig.background_color);
  document.documentElement.style.setProperty('--cream-light', config.surface_color || defaultConfig.surface_color);
  document.documentElement.style.setProperty('--text-dark', config.text_color || defaultConfig.text_color);
  document.documentElement.style.setProperty('--blue-primary', config.primary_color || defaultConfig.primary_color);
  document.documentElement.style.setProperty('--blue-dark', config.secondary_color || defaultConfig.secondary_color);

  document.getElementById('heroName').textContent = config.hero_name || defaultConfig.hero_name;
  document.getElementById('heroTagline').textContent = config.hero_tagline || defaultConfig.hero_tagline;

  const heroRole = document.getElementById('heroRole');
  heroRole.textContent = currentLang === 'en' ? (config.hero_role || defaultConfig.hero_role) : heroRole.getAttribute('data-id');

  const heroValueStatement = document.getElementById('heroValueStatement');
  heroValueStatement.textContent = currentLang === 'en' ? (config.hero_value_statement || defaultConfig.hero_value_statement) : heroValueStatement.getAttribute('data-id');

  const aboutTitle = document.getElementById('aboutTitle');
  aboutTitle.textContent = currentLang === 'en' ? (config.about_title || defaultConfig.about_title) : aboutTitle.getAttribute('data-id');

  const contactTitle = document.getElementById('contactTitle');
  contactTitle.textContent = currentLang === 'en' ? (config.contact_title || defaultConfig.contact_title) : contactTitle.getAttribute('data-id');

  const contactSubtitle = document.getElementById('contactSubtitle');
  contactSubtitle.textContent = currentLang === 'en' ? (config.contact_subtitle || defaultConfig.contact_subtitle) : contactSubtitle.getAttribute('data-id');

  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach(heading => {
    const tagLevel = parseInt(heading.tagName.substring(1));
    heading.style.fontSize = `${baseSize * (3.5 - tagLevel * 0.5)}px`;
    heading.style.fontFamily = `${customFont}, ${baseFontStack}`;
  });
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (value) => {
            config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          }
        },
        {
          get: () => config.surface_color || defaultConfig.surface_color,
          set: (value) => {
            config.surface_color = value;
            window.elementSdk.setConfig({ surface_color: value });
          }
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (value) => {
            config.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
          }
        },
        {
          get: () => config.primary_color || defaultConfig.primary_color,
          set: (value) => {
            config.primary_color = value;
            window.elementSdk.setConfig({ primary_color: value });
          }
        },
        {
          get: () => config.secondary_color || defaultConfig.secondary_color,
          set: (value) => {
            config.secondary_color = value;
            window.elementSdk.setConfig({ secondary_color: value });
          }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (value) => {
          config.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        }
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (value) => {
          config.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        }
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ["hero_name", config.hero_name || defaultConfig.hero_name],
      ["hero_tagline", config.hero_tagline || defaultConfig.hero_tagline],
      ["hero_role", config.hero_role || defaultConfig.hero_role],
      ["hero_value_statement", config.hero_value_statement || defaultConfig.hero_value_statement],
      ["about_title", config.about_title || defaultConfig.about_title],
      ["contact_title", config.contact_title || defaultConfig.contact_title],
      ["contact_subtitle", config.contact_subtitle || defaultConfig.contact_subtitle]
    ])
  });
}

// Initialize
loadProjects();
loadExperience();
loadCertificates();
initParallax();
