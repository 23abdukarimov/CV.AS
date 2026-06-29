document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ==========================================================================
     LANGUAGE SWITCHER (UZ / EN)
     ========================================================================== */
  const langSwitchBtn = document.getElementById('lang-switch');
  const htmlElement = document.documentElement;

  // Read saved language or default to 'uz'
  let currentLang = 'uz';
  try {
    currentLang = localStorage.getItem('portfolio-lang') || 'uz';
  } catch (e) {
    console.warn('LocalStorage is not accessible:', e);
  }
  htmlElement.setAttribute('lang', currentLang);

  // Toggle language function
  const toggleLanguage = () => {
    currentLang = currentLang === 'uz' ? 'en' : 'uz';
    htmlElement.setAttribute('lang', currentLang);
    try {
      localStorage.setItem('portfolio-lang', currentLang);
    } catch (e) {
      console.warn('LocalStorage cannot be written:', e);
    }
  };

  langSwitchBtn.addEventListener('click', toggleLanguage);


  /* ==========================================================================
     CUSTOM NEON CURSOR TRAIL
     ========================================================================== */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  let mouseX = 0;
  let mouseY = 0;

  let outlineX = 0;
  let outlineY = 0;

  // Speed factor of cursor outline lag (lerp factor)
  const speed = 0.15;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instantly move the small inner dot
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Lerp loop for outline
  const animateOutline = () => {
    const distX = mouseX - outlineX;
    const distY = mouseY - outlineY;

    outlineX += distX * speed;
    outlineY += distY * speed;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateOutline);
  };
  animateOutline();

  // Hover effect states
  const hoverElements = document.querySelectorAll('a, button, .filter-btn, .project-card, input, textarea');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });


  /* ==========================================================================
     MOBILE NAVIGATION OVERLAY
     ========================================================================== */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMobileNav = () => {
    mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  const closeMobileNav = () => {
    mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Unlock background scrolling
  };

  mobileNavToggle.addEventListener('click', openMobileNav);
  mobileNavClose.addEventListener('click', closeMobileNav);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });


  /* ==========================================================================
     SCROLL EFFECTS & ACTIVE LINK HIGHLIGHTING
     ========================================================================== */
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link update based on scroll position
    let currentActiveSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // Offset for header height
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActiveSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
        link.classList.add('active');
      }
    });
  });


  /* ==========================================================================
     SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // Animating only once
      }
    });
  }, {
    threshold: 0.15
  });

  scrollRevealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* ==========================================================================
     PORTFOLIO GRID FILTER
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons and add to clicked
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Subtle animation trigger
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  /* ==========================================================================
     PORTFOLIO PROJECT DETAILS DATA
     ========================================================================== */
  const projectsData = {
    'everest-kids': {
      title: 'Everest Kids',
      category: {
        uz: 'UX/UI Dizayn • Mobil Ilova',
        en: 'UX/UI Design • Mobile App'
      },
      client: 'Everest LC',
      year: '2024',
      image: 'assets/everest_kids.png',
      tech: ['Figma', 'UI/UX Design', 'User Flow', 'Interactive Prototypes', 'Children Gamification'],
      desc: {
        uz: 'Everest Kids — bolalar ta’lim faoliyatini kuzatib borish va qiziqarli shaklda vazifalarni bajarish uchun yaratilgan mobil ilova interfeysi. Loyiha menejeri va dizayner sifatida men foydalanuvchilar tajribasini (UX) bolalar psixologiyasi va ranglar uyg’unligini inobatga olgan holda loyihalashtirdim. Ilovada ota-onalar nazorati paneli, o’qituvchi boshqaruvi va o’quvchi uchun maxsus interaktiv kundalik mavjud. Everest LC jamoasi loyihani juda yaxshi qabul qildi.',
        en: 'Everest Kids is a comprehensive educational companion app interface tailored for children and school management. Acting as both the UX/UI Designer and Project Manager, I directed the user research, laid out wireframes, and conducted usability tests. The interface features gamified task tracking, an elegant parent control dashboard, and progress milestones.'
      }
    },
    'robovolt': {
      title: 'Robovolt Identity',
      category: {
        uz: 'Brending • Grafik Dizayn',
        en: 'Branding • Graphic Design'
      },
      client: 'Yoshlar ishlari agentligi',
      year: '2021',
      image: 'assets/robovolt_design.png',
      tech: ['Adobe Illustrator', 'Branding Identity', 'Vector Art', 'Logo Concepts', 'Color Guidelines'],
      desc: {
        uz: 'Robovolt robototexnika to’garagi uchun to’liq brending va vizual uslubni yaratdim. Logotip ramzi elektron mikrosxemalar va robot konturini ifodalovchi minimalist geometrik shakllardan tashkil topgan. Neon moviy va qora ranglarning uyg’unligi orqali texnologiya, kelajak va yoshlik energiyasini aks ettirishga erishildi. Mentor sifatida ushbu brending ostida ko’plab dizayn darslarini ham olib bordim.',
        en: 'Designed a complete visual branding and corporate identity suite for the Robovolt Robotics Club. The logo consists of sharp, geometric layouts illustrating electrical circuits and high-tech structures. A striking color scheme of neon cyan on a solid dark base communicates innovation and youth energy. Used these guidelines for collateral marketing and robotics event banners.'
      }
    },
    'tasvir': {
      title: 'Tasvir Luxury Box',
      category: {
        uz: 'Qadoqlash Dizayni • Branding',
        en: 'Packaging Design • Branding'
      },
      client: 'Tasvir dizayn',
      year: '2020',
      image: 'assets/packaging_design.png',
      tech: ['Adobe Illustrator', 'Packaging CAD', 'Visual Art', 'Brand Presentation', 'Print Operations'],
      desc: {
        uz: 'Tasvir loyihasi doirasida maxsus yuqori toifadagi kosmetika mahsulotlari uchun qadoqlash (packaging) dizaynini ishlab chiqdim. Dizaynda minimalist qora teksturaga yorqin neon chiziqlar va nafis grafikalar kiritilib, premium va kosmik effekt berilgan. Matbaa talablariga muvofiq, logotipni oltin va neon zarhal qilish, karton qalinligini belgilash kabi texnik matbaa chizmalari ham mukammal tayyorlandi.',
        en: 'Crafted cosmetic box packaging designs for Tasvir’s premium product line. The visual identity implements soft-glowing cybernetic vector patterns over matte black packaging to symbolize exclusivity. Delivered high-precision industrial box die-lines and print blueprints ready for foil embossing and spot UV varnish finishing.'
      }
    },
    'abutech': {
      title: 'Abutech Dashboard',
      category: {
        uz: 'UX/UI Dizayn • Veb Boshqaruv Paneli',
        en: 'UX/UI Design • Web Dashboard'
      },
      client: 'Abutech IT',
      year: '2019',
      image: 'assets/abutech_landing.png',
      tech: ['Figma', 'UX Research', 'Dashboard Design', 'Data Visualization', 'UI Design Systems'],
      desc: {
        uz: 'Abutech kompaniyasi uchun tarmoq monitoringi va server yuklamasini kuzatuvchi murakkab analytics dashboard (boshqaruv paneli) dizaynini tayyorladim. Dizaynda asosiy e’tibor ma’lumotlarni chalkashliklarsiz o’qiy olish (data readability) va tungi rejimda ko’rish qulayligiga qaratilgan. Grafik elementlar va diagrammalar neon ranglar yordamida yorqinroq ko’rsatilgan, bu esa muhim ogohlantirishlarni darhol payqash imkonini beradi.',
        en: 'Conceptualized and designed a system dashboard layout for Abutech, a network systems integration firm. Structured information architecture, color-coded status gauges, and data visualization grids. Used neon highlights against pitch dark components to ensure network administrators quickly catch server warnings and spikes.'
      }
    }
  };


  /* ==========================================================================
     PORTFOLIO PROJECT DETAIL MODAL LOGIC
     ========================================================================== */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalDynamicContent = document.getElementById('modal-dynamic-content');

  const openModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    // Get content according to current language
    const currentLangVal = htmlElement.getAttribute('lang') || 'uz';
    const category = currentLangVal === 'uz' ? data.category.uz : data.category.en;
    const desc = currentLangVal === 'uz' ? data.desc.uz : data.desc.en;

    const clientLabel = currentLangVal === 'uz' ? 'Buyurtmachi' : 'Client';
    const yearLabel = currentLangVal === 'uz' ? 'Yil' : 'Year';
    const techLabel = currentLangVal === 'uz' ? 'Texnologiyalar' : 'Technologies';
    const projectDetailLabel = currentLangVal === 'uz' ? 'Loyiha Haqida' : 'Project Overview';

    // Build Technologies List
    const techHtml = data.tech.map(t => `<span class="tag-skill">${t}</span>`).join('');

    const modalContent = `
      <img src="${data.image}" alt="${data.title}" class="modal-project-img">
      <span class="modal-project-cat">${category}</span>
      <h3 class="modal-project-title">${data.title}</h3>
      
      <div class="modal-project-grid">
        <div class="modal-project-left">
          <h4>${projectDetailLabel}</h4>
          <p>${desc}</p>
        </div>
        
        <div class="modal-project-right">
          <div class="modal-meta-list">
            <div class="modal-meta-item">
              <span class="modal-meta-label">${clientLabel}</span>
              <span class="modal-meta-val">${data.client}</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">${yearLabel}</span>
              <span class="modal-meta-val">${data.year}</span>
            </div>
            <div class="modal-meta-item">
              <span class="modal-meta-label">${techLabel}</span>
              <div class="tag-skills-container" style="margin-top: 10px;">
                ${techHtml}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    modalDynamicContent.innerHTML = modalContent;
    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
    
    // Add hover states to dynamic elements inside modal
    const dynamicHoverElements = modalDynamicContent.querySelectorAll('.tag-skill');
    dynamicHoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  };

  const closeModal = () => {
    projectModal.classList.remove('open');
    document.body.style.overflow = ''; // Unlock background scrolling
    setTimeout(() => {
      modalDynamicContent.innerHTML = '';
    }, 500);
  };

  // Add click events to project cards
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Close modal with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeModal();
    }
  });


  /* ==========================================================================
     CONTACT FORM SUBMISSION SIMULATION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = contactForm.querySelector('.submit-btn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const currentLangVal = htmlElement.getAttribute('lang') || 'uz';
    const nameInput = document.getElementById('form-name').value;

    // Button loading state
    const originalBtnHtml = submitBtn.innerHTML;
    const loadingText = currentLangVal === 'uz' ? 'Yuborilmoqda...' : 'Sending...';
    submitBtn.innerHTML = `${loadingText} <i data-lucide="loader" class="animate-spin"></i>`;
    submitBtn.disabled = true;
    lucide.createIcons();

    // Mock API Request (1.5 seconds delay)
    setTimeout(() => {
      // Re-enable button
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.disabled = false;
      lucide.createIcons();

      // Feedback message selection
      const successMsg = currentLangVal === 'uz' 
        ? `Tashakkur, ${nameInput}! Xabaringiz muvaffaqiyatli yuborildi.` 
        : `Thank you, ${nameInput}! Your message has been sent successfully.`;

      // Set feedback message
      formFeedback.textContent = successMsg;
      formFeedback.className = 'form-feedback-msg success';

      // Clear input fields
      contactForm.reset();

      // Clear success feedback after 5 seconds
      setTimeout(() => {
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback-msg';
      }, 5000);

    }, 1500);
  });
});
