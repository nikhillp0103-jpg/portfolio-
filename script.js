const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const projectModal = document.getElementById('projectModal');
const projectFrame = document.getElementById('projectFrame');
const contactForm = document.getElementById('contactForm');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});

function openProject(url) {
  if (!projectModal || !projectFrame) return;
  projectFrame.src = url;
  projectModal.classList.add('active');
}

function closeProject() {
  if (!projectModal || !projectFrame) return;
  projectModal.classList.remove('active');
  projectFrame.src = '';
}

function openImage(src, caption) {
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  if (!imageModal || !modalImage || !modalCaption) return;
  modalImage.src = src;
  modalImage.alt = caption;
  modalCaption.textContent = caption;
  imageModal.classList.add('active');
}

function closeImage() {
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  if (!imageModal || !modalImage) return;
  imageModal.classList.remove('active');
  modalImage.src = '';
}

// Keyboard accessibility for modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProject();
    closeImage();
  }
});

window.addEventListener('click', event => {
  if (event.target === projectModal) {
    closeProject();
  }
  if (event.target === document.getElementById('imageModal')) {
    closeImage();
  }
});

// Form Validation and Error Handling
if (contactForm) {
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const formStatus = document.getElementById('formStatus');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function validateEmail(emailValue) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  }

  function validateForm() {
    let isValid = true;

    if (!fullName.value.trim()) {
      nameError.textContent = 'Full name is required.';
      nameError.classList.add('show');
      isValid = false;
    } else if (fullName.value.trim().length < 2) {
      nameError.textContent = 'Name must be at least 2 characters.';
      nameError.classList.add('show');
      isValid = false;
    } else {
      nameError.textContent = '';
      nameError.classList.remove('show');
    }

    if (!email.value.trim()) {
      emailError.textContent = 'Email address is required.';
      emailError.classList.add('show');
      isValid = false;
    } else if (!validateEmail(email.value)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailError.classList.add('show');
      isValid = false;
    } else {
      emailError.textContent = '';
      emailError.classList.remove('show');
    }

    if (!message.value.trim()) {
      messageError.textContent = 'Message is required.';
      messageError.classList.add('show');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      messageError.textContent = 'Message must be at least 10 characters.';
      messageError.classList.add('show');
      isValid = false;
    } else {
      messageError.textContent = '';
      messageError.classList.remove('show');
    }

    return isValid;
  }

  fullName?.addEventListener('blur', validateForm);
  email?.addEventListener('blur', validateForm);
  message?.addEventListener('blur', validateForm);

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) {
      formStatus.textContent = 'Please fix the errors above and try again.';
      formStatus.classList.add('error');
      formStatus.classList.remove('success');
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }
    formStatus.textContent = 'Thank you! Your message was sent successfully. I\'ll get back to you soon.';
    formStatus.classList.add('success');
    formStatus.classList.remove('error');
    contactForm.reset();
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    messageError.classList.remove('show');
    setTimeout(() => {
      formStatus.classList.remove('success');
    }, 5000);
  });
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (!backToTop) return;
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reveal on Scroll Animation
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);