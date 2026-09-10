(() => {
  const root = document.documentElement;
  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); return true; } catch { return false; }
    }
  };
  const savedTheme = storage.get('unduality-theme');
  if (savedTheme === 'dark') root.dataset.theme = 'dark';

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const dark = root.dataset.theme !== 'dark';
      root.dataset.theme = dark ? 'dark' : '';
      storage.set('unduality-theme', dark ? 'dark' : 'light');
    });
  });

  const field = document.querySelector('[data-observation-field]');
  if (field) {
    let x = 50;
    let y = 50;
    let box;
    let frame;
    const measure = () => { box = field.getBoundingClientRect(); };
    const update = () => {
      frame = undefined;
      if (!box) measure();
      field.style.setProperty('--dx', `${((x - 50) / 100) * box.width}px`);
      field.style.setProperty('--dy', `${((y - 50) / 100) * box.height}px`);
      const readout = field.querySelector('.field-readout');
      if (readout) readout.textContent = `position ${Math.round(x)} / ${Math.round(y)}`;
    };
    const scheduleUpdate = () => { frame ??= requestAnimationFrame(update); };
    field.addEventListener('pointerenter', measure);
    field.addEventListener('pointermove', (event) => {
      if (!box) measure();
      x = Math.max(2, Math.min(98, ((event.clientX - box.left) / box.width) * 100));
      y = Math.max(2, Math.min(98, ((event.clientY - box.top) / box.height) * 100));
      scheduleUpdate();
    });
    field.addEventListener('keydown', (event) => {
      const moves = { ArrowLeft: [-4, 0], ArrowRight: [4, 0], ArrowUp: [0, -4], ArrowDown: [0, 4] };
      if (!moves[event.key]) return;
      event.preventDefault();
      x = Math.max(2, Math.min(98, x + moves[event.key][0]));
      y = Math.max(2, Math.min(98, y + moves[event.key][1]));
      scheduleUpdate();
    });
    window.addEventListener('resize', () => { measure(); scheduleUpdate(); }, { passive: true });
  }

  const practice = document.querySelector('[data-practice]');
  if (practice) {
    const steps = [...practice.querySelectorAll('[data-step]')];
    const label = practice.querySelector('[data-step-label]');
    const dots = [...practice.querySelectorAll('.step-dots i')];
    const next = practice.querySelector('[data-practice-next]');
    let index = 0;
    const show = (nextIndex) => {
      index = nextIndex;
      steps.forEach((step, i) => {
        const active = i === index;
        step.hidden = !active;
        step.classList.toggle('is-active', active);
      });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      label.textContent = `Step ${index + 1} of ${steps.length}`;
      next.textContent = index === steps.length - 1 ? 'Run it again' : 'Continue';
    };
    next.addEventListener('click', () => show(index === steps.length - 1 ? 0 : index + 1));
    practice.querySelector('[data-practice-reset]').addEventListener('click', () => show(0));
  }

  const fullStart = document.querySelector('[data-full-start]');
  const fullPractice = document.querySelector('[data-full-practice]');
  const log = document.querySelector('[data-observation-log]');
  if (fullStart && fullPractice && log) {
    document.body.append(fullPractice);
    const steps = [...fullPractice.querySelectorAll('[data-full-step]')];
    const count = fullPractice.querySelector('[data-full-count]');
    const next = fullPractice.querySelector('[data-full-next]');
    let returnFocus;
    let index = 0;
    const show = (nextIndex) => {
      index = nextIndex;
      steps.forEach((step, i) => {
        step.hidden = i !== index;
        step.classList.toggle('is-active', i === index);
      });
      count.textContent = `${index + 1} / ${steps.length}`;
      next.textContent = index === steps.length - 1 ? 'Record what I noticed' : 'Continue';
    };
    const backgroundElements = () => [...document.body.children].filter((element) => element !== fullPractice);
    const setBackgroundInert = (inert) => {
      backgroundElements().forEach((element) => { element.inert = inert; });
    };
    const exit = (restoreFocus = true) => {
      fullPractice.hidden = true;
      document.body.classList.remove('practice-open');
      setBackgroundInert(false);
      if (restoreFocus) (returnFocus || fullStart).focus();
    };
    fullStart.addEventListener('click', () => {
      returnFocus = document.activeElement;
      show(0);
      fullPractice.hidden = false;
      document.body.classList.add('practice-open');
      setBackgroundInert(true);
      next.focus();
    });
    fullPractice.querySelectorAll('[data-full-exit]').forEach((button) => button.addEventListener('click', exit));
    fullPractice.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        exit();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...fullPractice.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.hidden && element.getClientRects().length);
      if (!focusable.length) {
        event.preventDefault();
        fullPractice.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    next.addEventListener('click', () => {
      if (index < steps.length - 1) return show(index + 1);
      exit(false);
      log.hidden = false;
      log.scrollIntoView();
      log.querySelector('input')?.focus();
    });
  }

  const observationForm = document.querySelector('[data-observation-form]');
  if (observationForm) {
    observationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(observationForm));
      const saved = storage.set('unduality-observation-01', JSON.stringify({ ...data, savedAt: new Date().toISOString() }));
      observationForm.querySelector('[data-save-status]').textContent = saved
        ? 'Observation saved on this device. Nothing was uploaded.'
        : 'Your browser did not allow local saving. Nothing was uploaded.';
    });
  }

  const emailForm = document.querySelector('[data-email-form]');
  if (emailForm) {
    emailForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = new FormData(emailForm).get('email');
      const note = emailForm.querySelector('[data-form-note]');
      note.textContent = 'Opening your email app. Send the prepared message to follow the inquiry.';
      window.location.href = `mailto:hello@unduality.com?subject=${encodeURIComponent('Follow Unduality')}&body=${encodeURIComponent(`Please add ${email} to Unduality project updates.`)}`;
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
})();
