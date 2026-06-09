document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.method-tab');
  const panels = document.querySelectorAll('.contact-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target === 'mail' ? 'panelMail' : 'panelPhone').classList.add('active');
    });
  });

  // Form validation & Google Form redirect
  const form = document.getElementById('contactForm');
  if (!form) return;

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform';

  const FIELD_MAP = {
    company:  'entry.COMPANY_ID',
    name:     'entry.NAME_ID',
    phone:    'entry.PHONE_ID',
    email:    'entry.EMAIL_ID',
    message:  'entry.MESSAGE_ID'
  };

  function showError(field) {
    const input = document.getElementById(field);
    const error = document.getElementById('error' + field.charAt(0).toUpperCase() + field.slice(1));
    if (input) input.classList.add('error');
    if (error) error.classList.add('visible');
  }

  function clearError(field) {
    const input = document.getElementById(field);
    const error = document.getElementById('error' + field.charAt(0).toUpperCase() + field.slice(1));
    if (input) input.classList.remove('error');
    if (error) error.classList.remove('visible');
  }

  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => clearError(input.id));
  });
  const privacyCheckbox = document.getElementById('privacy');
  if (privacyCheckbox) {
    privacyCheckbox.addEventListener('change', () => clearError('privacy'));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    ['company', 'name', 'phone', 'email'].forEach(field => {
      clearError(field);
      const val = document.getElementById(field).value.trim();
      if (!val) { showError(field); valid = false; }
    });

    const emailVal = document.getElementById('email').value.trim();
    if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      showError('email');
      valid = false;
    }

    clearError('privacy');
    if (!document.getElementById('privacy').checked) {
      showError('privacy');
      valid = false;
    }

    if (!valid) return;

    const params = new URLSearchParams();
    Object.keys(FIELD_MAP).forEach(field => {
      const el = document.getElementById(field);
      if (el && el.value.trim()) {
        params.set(FIELD_MAP[field], el.value.trim());
      }
    });

    window.location.href = GOOGLE_FORM_URL + '?' + params.toString();
  });
});
