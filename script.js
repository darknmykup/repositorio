document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
      });
    });
  }


  // TEMA CLARO / ESCURO

  const themeToggleBtn = document.getElementById('theme-toggle');

  // Verifica se o usuário já salvou um tema, se não, usa o escuro por padrão
  const currentTheme = localStorage.getItem('theme') || 'dark-theme';
  document.body.classList.add(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (document.body.classList.contains('dark-theme')) {
        document.body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
      } else {
        if (document.body.classList.contains('light-theme')) {
          document.body.classList.replace('light-theme', 'dark-theme');
        } else {
          document.body.classList.add('dark-theme');
        }
        localStorage.setItem('theme', 'dark-theme');
      }
    });
  }

  // SISTEMA DE IDIOMAS (PT / EN)

  const translations = {
    pt: {
      'nav-home': 'Início',
      'nav-about': 'Sobre Mim',
      'nav-contact': 'Contatos',
      'hero-title': 'Criando qualquer coisa apenas por diversão com código.',
      'form-name-placeholder': 'Bota teu apelido ai bro',
      'form-email-placeholder': 'Boa, agora bota teu email aqui blz?',
      'form-msg-placeholder': 'E aqui tu bota uma mensagem',
      'form-btn': 'Enviar Mensagem',
      'form-success': 'Mensagem enviada com sucesso broski, Em breve falo com você (ou não kkkkkkkkk).',
      'form-error': 'Por favor, preencha todos os campos.',
      'typewriter-words': ['Desenvolvedor Web', 'Rookie Front-end', '+10000 de aura']
    },
    en: {
      'nav-home': 'Home',
      'nav-about': 'About Me',
      'nav-contact': 'Contact',
      'hero-title': 'Creating anything just for fun with code.',
      'form-name-placeholder': 'Put your nickname here bro',
      'form-email-placeholder': 'Cool, now drop your email alright?',
      'form-msg-placeholder': 'And here you drop a message',
      'form-btn': 'Send Message',
      'form-success': 'Message sent broski, now you need to wait for your answear.(or maybe nah).',
      'form-error': 'Please fill in all fields.',
      'typewriter-words': ['Web Developer', 'Front-end Rookie', 'Solution Creator']
    }
  };

  const langToggleBtn = document.getElementById('lang-toggle');
  let currentLang = localStorage.getItem('language') || 'pt';


  let typewriterWords = translations[currentLang]['typewriter-words'];

  function applyLanguage(lang) {

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');

      if (translations[lang] && translations[lang][key]) {

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translations[lang][key];
        } else {

          el.textContent = translations[lang][key];
        }
      }
    });


    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    localStorage.setItem('language', lang);


    typewriterWords = translations[lang]['typewriter-words'];
  }


  applyLanguage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'pt' ? 'en' : 'pt';
      applyLanguage(currentLang);
    });
  }


  const typewriterElement = document.querySelector('.typewriter');
  if (typewriterElement) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {

      if (wordIndex >= typewriterWords.length) wordIndex = 0;

      const currentWord = typewriterWords[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      typewriterElement.textContent = currentChar;

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typewriterWords.length;
        typeSpeed = 500;
      }

      charIndex += isDeleting ? -1 : 1;
      setTimeout(typeEffect, typeSpeed);
    };

    typeEffect();
  }

  const observerOptions = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      const formStatus = document.getElementById('form-status');

      if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
        if (formStatus) {
          // Usa a mensagem de erro traduzida
          formStatus.textContent = translations[currentLang]['form-error'];
          formStatus.style.color = '#e74c3c';
        }
        return;
      }

      if (formStatus) {
        // Usa a mensagem de sucesso traduzida
        formStatus.textContent = translations[currentLang]['form-success'];
        formStatus.style.color = '#2ecc71';
      }

      contactForm.reset();
    });
  }

});