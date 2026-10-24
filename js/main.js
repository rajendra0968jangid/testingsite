/**
 * AiCodeCenter Technologies - Main Application Script
 */

// 1. Immediate Theme Application (Prevents Flash of Light Mode)
(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  // 2. Dark / Light Mode Theme Toggle Functionality
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

  function updateThemeUI(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      btn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  // Ensure initial theme is synced
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeUI(currentTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      updateThemeUI(activeTheme);
    });
  });

  // 3. Sticky Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 4. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 5. Application Modal Management
  const modalOverlay = document.getElementById('applicationModal');
  const openModalBtns = document.querySelectorAll('.open-apply-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const domainSelect = document.getElementById('modalDomainSelect');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselect = btn.getAttribute('data-domain');
      if (preselect && domainSelect) {
        domainSelect.value = preselect;
      }
      if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // 6. Application Form Submission & Toast
  const applyForm = document.getElementById('applyForm');
  const toast = document.getElementById('toastNotification');

  function showToast(message) {
    if (toast) {
      toast.querySelector('.toast-text').textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('applicantName').value;
      closeModal();
      applyForm.reset();
      showToast(`Thank you, ${name}! Your application has been submitted successfully.`);
    });
  }

  // 7. Animated Statistics Counters
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function runCounterAnimation() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      if (isNaN(target)) return;

      let count = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.textContent = target + suffix;
          clearInterval(interval);
        } else {
          stat.textContent = count + suffix;
        }
      }, 30);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounterAnimation();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // 8. Internship Domain Category Filtering (internships.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const internshipCards = document.querySelectorAll('.internship-card');

  if (filterBtns.length > 0 && internshipCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        internshipCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // 9. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close siblings if desired or allow multi-open
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open', !isOpen);
      });
    }
  });

  // 10. Contact Page Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const contactName = document.getElementById('contactName')?.value || 'there';
      contactForm.reset();
      showToast(`Thank you, ${contactName}! We have received your inquiry and will contact you shortly.`);
    });
  }

  // 11. Practice Lab - Interactive Terminal Simulation
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');

  if (terminalInput && terminalBody) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        // Create user echo
        const echoLine = document.createElement('div');
        echoLine.innerHTML = `<span class="terminal-prompt">student@aicodecenter-lab:~$</span> ${escapeHTML(cmd)}`;
        terminalBody.insertBefore(echoLine, terminalInput.parentElement);

        let responseHTML = '';
        switch (cmd) {
          case 'help':
            responseHTML = `<div style="color: #94A3B8; margin-bottom: 8px;">
Available commands:<br>
&nbsp;&nbsp;<strong style="color:#38BDF8">help</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show this help manual<br>
&nbsp;&nbsp;<strong style="color:#38BDF8">ls</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- List directory contents<br>
&nbsp;&nbsp;<strong style="color:#38BDF8">cat notes.txt</strong>- Read operating system notes<br>
&nbsp;&nbsp;<strong style="color:#38BDF8">status</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Check connected practice machines<br>
&nbsp;&nbsp;<strong style="color:#38BDF8">whoami</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Current active student session<br>
&nbsp;&nbsp;<strong style="color:#38BDF8">clear</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear the terminal screen<br>
&nbsp;&nbsp;<strong style="color:#38BDF8">python3</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Check Python environment
</div>`;
            break;
          case 'ls':
          case 'dir':
            responseHTML = `<div style="color: #6EE7B7; margin-bottom: 8px;">
drwxr-xr-x &nbsp;ost_notes/<br>
drwxr-xr-x &nbsp;cloud_aws/<br>
drwxr-xr-x &nbsp;cyber_security/<br>
-rw-r--r-- &nbsp;notes.txt<br>
-rwxr-xr-x &nbsp;app.py
</div>`;
            break;
          case 'cat notes.txt':
            responseHTML = `<div style="color: #FDE047; margin-bottom: 8px;">
[OST Notes - AiCodeCenter Lab]<br>
Linux Fundamentals: Kernel, Shell, Process Scheduling, Permissions (chmod/chown), Systemd services.<br>
Tip: Hands-on experience with live servers builds top-tier DevOps & Cloud readiness!
</div>`;
            break;
          case 'status':
            responseHTML = `<div style="color: #34D399; margin-bottom: 8px;">
[Practice Machines Status]<br>
● Machine 01 (OST & Linux): <span style="color:#10B981">ONLINE (ACTIVE)</span><br>
○ Machine 02 (AWS & Cloud): <span style="color:#FBBF24">SCHEDULED MAINTENANCE</span><br>
○ Machine 03 (Cyber Security): <span style="color:#94A3B8">STANDBY</span>
</div>`;
            break;
          case 'whoami':
            responseHTML = `<div style="color: #A78BFA; margin-bottom: 8px;">student@intern-lab-pod-42</div>`;
            break;
          case 'python3':
          case 'python':
            responseHTML = `<div style="color: #60A5FA; margin-bottom: 8px;">Python 3.12.2 (AiCodeCenter Lab Shell). Type "print('Hello')" in the Playground below!</div>`;
            break;
          case 'clear':
            // Remove previous lines except the input row
            const children = Array.from(terminalBody.children);
            children.forEach(child => {
              if (!child.contains(terminalInput)) {
                child.remove();
              }
            });
            return;
          case '':
            responseHTML = '';
            break;
          default:
            responseHTML = `<div style="color: #F87171; margin-bottom: 8px;">bash: command not found: ${escapeHTML(cmd)}. Type <strong style="color:#38BDF8">help</strong> for available commands.</div>`;
        }

        if (responseHTML) {
          const respDiv = document.createElement('div');
          respDiv.innerHTML = responseHTML;
          terminalBody.insertBefore(respDiv, terminalInput.parentElement);
        }

        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // 12. Practice Lab - Live Code Runner Playground
  const runCodeBtn = document.getElementById('runCodeBtn');
  const codeEditor = document.getElementById('codeEditor');
  const codePreview = document.getElementById('codePreview');

  if (runCodeBtn && codeEditor && codePreview) {
    runCodeBtn.addEventListener('click', () => {
      const code = codeEditor.value;
      const previewDoc = codePreview.contentDocument || codePreview.contentWindow.document;
      previewDoc.open();
      previewDoc.write(code);
      previewDoc.close();
      showToast('Code executed in live preview!');
    });

    // Initial run on load
    try {
      const previewDoc = codePreview.contentDocument || codePreview.contentWindow.document;
      previewDoc.open();
      previewDoc.write(codeEditor.value);
      previewDoc.close();
    } catch(err) {
      // ignore
    }
  }

  // 13. Practice Lab - Machine Status Filtering
  const labFilterBtns = document.querySelectorAll('.lab-filter-btn');
  const machineCards = document.querySelectorAll('.machine-card');

  if (labFilterBtns.length > 0 && machineCards.length > 0) {
    labFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        labFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        machineCards.forEach(card => {
          const category = card.getAttribute('data-category');
          const status = card.getAttribute('data-status');
          
          let match = false;
          if (filter === 'all') match = true;
          else if (filter === 'active' && status === 'active') match = true;
          else if (category === filter) match = true;

          if (match) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }
});

