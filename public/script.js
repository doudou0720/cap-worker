(function() {
  try {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (prefersDark ? 'dark' : 'light');
    document.body.setAttribute('data-theme', theme);
  } catch (_) {}
})();

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    const SUN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
    const MOON_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    
    const setIcon = () => {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      toggle.innerHTML = isDark ? MOON_ICON : SUN_ICON;
      toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    };
    
    setIcon();
    
    toggle.addEventListener('click', () => {
      const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (_) {}
      setIcon();
    });
  }

  const widget = document.querySelector("#cap");
  const resetButton = document.getElementById("resetCaptcha");
  
  if (widget) {
    widget.addEventListener("solve", async function (e) {
      const token = e.detail.token;
      console.log('CAPTCHA solved, token:', token);

      try {
        const result = await fetch('api/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: token,
            keepToken: false
          })
        });
        const validation = await result.json();
        console.log('Validation result:', validation);

        if (validation.success) {
          document.getElementById('demoStatus').innerHTML = '<div class="status-message status-success">✅ CAPTCHA verified successfully!</div>';
        } else {
          document.getElementById('demoStatus').innerHTML = '<div class="status-message status-error">❌ CAPTCHA verification failed.</div>';
        }
      } catch (error) {
        console.error('Validation error:', error);
        document.getElementById('demoStatus').innerHTML = '<div class="status-message status-error">❌ Validation error occurred.</div>';
      }
    });

    widget.addEventListener("error", function (e) {
      console.error('CAPTCHA error:', e.detail);
      document.getElementById('demoStatus').innerHTML = '<div class="status-message status-error">❌ CAPTCHA loading error.</div>';
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      const widget = document.querySelector("#cap");
      if (widget) {
        widget.reset();
        document.getElementById('demoStatus').innerHTML = '<div class="status-message">Complete the CAPTCHA above to see it in action</div>';
      }
    });
  }

  const floatingWidget = document.querySelector("#floating");
  
  if (floatingWidget) {
    floatingWidget.addEventListener("solve", async function (e) {
      const token = e.detail.token;
      console.log('Floating CAPTCHA solved, token:', token);

      try {
        const result = await fetch('api/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: token,
            keepToken: false
          })
        });
        const validation = await result.json();
        console.log('Floating validation result:', validation);

        if (validation.success) {
          document.getElementById('floatingStatus').innerHTML = '<div class="status-message status-success">✅ Floating CAPTCHA verified successfully!</div>';
        } else {
          document.getElementById('floatingStatus').innerHTML = '<div class="status-message status-error">❌ Floating CAPTCHA verification failed.</div>';
        }
      } catch (error) {
        console.error('Floating validation error:', error);
        document.getElementById('floatingStatus').innerHTML = '<div class="status-message status-error">❌ Floating validation error occurred.</div>';
      }
    });

    floatingWidget.addEventListener("error", function (e) {
      console.error('Floating CAPTCHA error:', e.detail);
      document.getElementById('floatingStatus').innerHTML = '<div class="status-message status-error">❌ Floating CAPTCHA loading error.</div>';
    });
  }

  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      const parentTabs = button.closest('.code-tabs');
      
      parentTabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      parentTabs.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      button.classList.add('active');
      parentTabs.querySelector(`.tab-content[data-tab="${targetTab}"]`).classList.add('active');
    });
  });
});
