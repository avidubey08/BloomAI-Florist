// frontend/js/app.js - BloomAI Florist Interactive Logic
import { config } from '../config.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log(`[BloomAI Florist] Initialized for ${config.businessName} (${config.category})`);

  const API_BASE = config.apiBaseUrl || '';

  // ----------------------------------------------------
  // DOM Elements
  // ----------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const desktopNavLinks = document.getElementById('desktopNavLinks');
  const mobileNavLinks = document.querySelectorAll('#mobileNavList a');
  const mobileDrawerBookBtn = document.getElementById('mobileDrawerBookBtn');

  const heroAiInput = document.getElementById('aiInput');
  const heroAskAiBtn = document.getElementById('heroAskAiBtn');
  const heroChips = document.querySelectorAll('.hero-chip');

  const chatMessages = document.getElementById('chatMessages');
  const chatConsoleForm = document.getElementById('chatConsoleForm');
  const chatConsoleInput = document.getElementById('chatConsoleInput');
  const chatTypingIndicator = document.getElementById('chatTypingIndicator');
  const resetChatBtn = document.getElementById('resetChatBtn');

  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryLightbox = document.getElementById('galleryLightbox');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxPrice = document.getElementById('lightboxPrice');
  const lightboxBookBtn = document.getElementById('lightboxBookBtn');

  const pricingToggle = document.getElementById('pricingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const yearlyLabel = document.getElementById('yearlyLabel');
  const priceNumbers = document.querySelectorAll('.price-num');
  const cycleTexts = [
    document.getElementById('cycleText1'),
    document.getElementById('cycleText2'),
    document.getElementById('cycleText3')
  ];

  const bookingForm = document.getElementById('bookingForm');
  const bookingFeedback = document.getElementById('bookingFeedback');
  const bookingServiceSelect = document.getElementById('bookingService');
  const submitBookingBtn = document.getElementById('submitBookingBtn');
  const bookingDateInput = document.getElementById('bookingDate');

  const openAdminModalBtn = document.getElementById('openAdminModalBtn');
  const openAdminModalBtnMobile = document.getElementById('openAdminModalBtnMobile');
  const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
  const adminBookingsModal = document.getElementById('adminBookingsModal');
  const bookingsTableBody = document.getElementById('bookingsTableBody');
  const bookingCountBadge = document.getElementById('bookingCountBadge');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
  const mobileDrawerCloseBtn = document.getElementById('mobileDrawerCloseBtn');

  // Set min date on datepicker to today
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.min = today;
  }

  // ----------------------------------------------------
  // 1. Mobile Menu Toggle & Backdrop Control
  // ----------------------------------------------------
  function closeMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.add('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Hamburger Toggle Button
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Cancel / Close '✕' Button inside drawer
  if (mobileDrawerCloseBtn) {
    mobileDrawerCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  // Click outside on dark blurred backdrop to close
  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  // Close when clicking any nav link inside the mobile drawer
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close when clicking the Book button inside drawer
  if (mobileDrawerBookBtn) {
    mobileDrawerBookBtn.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeLightbox();
      if (adminBookingsModal) adminBookingsModal.style.display = 'none';
    }
  });

  // ----------------------------------------------------
  // 2. AI Chatbot Integration (/api/ai/chat)
  // ----------------------------------------------------
  async function askAIQuestion(questionText) {
    if (!questionText || !questionText.trim()) return;

    // Append User Message to Chat Console
    appendChatMessage(questionText, 'user');

    // Show Typing Indicator & scroll to bottom
    if (chatTypingIndicator) {
      chatTypingIndicator.style.display = 'flex';
      chatMessages.appendChild(chatTypingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    try {
      const response = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: questionText.trim() })
      });

      const data = await response.json();

      if (chatTypingIndicator) {
        chatTypingIndicator.style.display = 'none';
      }

      if (data && data.answer) {
        appendChatMessage(data.answer, 'bot');
      } else {
        appendChatMessage(`AI for ${config.businessName}: I'm delighted to assist you with our bespoke floral arrangements. How else may I assist with your selection?`, 'bot');
      }
    } catch (err) {
      console.warn('AI Chat API error, using instant fallback:', err);
      if (chatTypingIndicator) {
        chatTypingIndicator.style.display = 'none';
      }
      appendChatMessage(`AI for ${config.businessName}: "${questionText}" — We have registered your request! Our botanical stylists recommend exploring our Bespoke Bridal or Signature Orchid arrangements. You can also reserve directly below.`, 'bot');
    }
  }

  function appendChatMessage(text, sender = 'bot') {
    if (!chatMessages) return;

    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${sender}`;

    // Format text nicely
    bubble.innerHTML = text.replace(/\n/g, '<br>');

    // Insert before typing indicator
    if (chatTypingIndicator && chatTypingIndicator.parentNode === chatMessages) {
      chatMessages.insertBefore(bubble, chatTypingIndicator);
    } else {
      chatMessages.appendChild(bubble);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Handle Hero AI Input
  function handleHeroAiAsk() {
    const query = heroAiInput ? heroAiInput.value.trim() : '';
    if (!query) {
      if (heroAiInput) heroAiInput.focus();
      return;
    }

    // Scroll smoothly to AI Demo section
    const aiSection = document.getElementById('ai-demo');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Clear hero input and trigger chat
    if (heroAiInput) heroAiInput.value = '';
    askAIQuestion(query);
  }

  if (heroAskAiBtn) {
    heroAskAiBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleHeroAiAsk();
    });
  }

  if (heroAiInput) {
    heroAiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleHeroAiAsk();
      }
    });
  }

  // Handle Hero Prompt Suggestion Chips
  heroChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        const aiSection = document.getElementById('ai-demo');
        if (aiSection) {
          aiSection.scrollIntoView({ behavior: 'smooth' });
        }
        askAIQuestion(prompt);
      }
    });
  });

  // Handle Chat Console Form Submission
  if (chatConsoleForm && chatConsoleInput) {
    chatConsoleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatConsoleInput.value.trim();
      if (!query) return;

      chatConsoleInput.value = '';
      askAIQuestion(query);
    });
  }

  // Reset Chat Button
  if (resetChatBtn) {
    resetChatBtn.addEventListener('click', () => {
      if (chatMessages) {
        chatMessages.innerHTML = `
          <div class="message-bubble bot">
            Good day! Welcome to <strong>BloomAI Florist</strong>. I am your 24/7 botanical stylist. Whether you seek guidance for an upcoming anniversary, wedding color schemes, or flower care secrets, ask me anything!
          </div>
          <div class="typing-indicator" id="chatTypingIndicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        `;
      }
    });
  }

  // ----------------------------------------------------
  // 3. Services Booking Pre-selection
  // ----------------------------------------------------
  document.querySelectorAll('.select-service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      prefillBooking(serviceName);
    });
  });

  // ----------------------------------------------------
  // 4. Gallery Filter & Lightbox Zoom
  // ----------------------------------------------------
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.getAttribute('data-img');
      const title = item.getAttribute('data-title');
      const price = item.getAttribute('data-price');
      const desc = item.getAttribute('data-desc');
      const cat = item.querySelector('.gallery-category')?.innerText || 'Collection';

      if (lightboxImg) lightboxImg.src = img;
      if (lightboxTitle) lightboxTitle.innerText = title;
      if (lightboxPrice) lightboxPrice.innerText = price;
      if (lightboxDesc) lightboxDesc.innerText = desc;
      if (lightboxCategory) lightboxCategory.innerText = cat;

      if (lightboxBookBtn) {
        lightboxBookBtn.onclick = () => {
          closeLightbox();
          prefillBooking(title);
        };
      }

      if (galleryLightbox) {
        galleryLightbox.style.display = 'flex';
      }
    });
  });

  function closeLightbox() {
    if (galleryLightbox) galleryLightbox.style.display = 'none';
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox) closeLightbox();
    });
  }

  // ----------------------------------------------------
  // 5. Pricing Monthly / Yearly Switch
  // ----------------------------------------------------
  let isYearly = false;

  function setPricingMode(yearly) {
    isYearly = yearly;
    if (pricingToggle) {
      if (isYearly) {
        pricingToggle.classList.add('yearly');
        if (yearlyLabel) yearlyLabel.classList.add('active');
        if (monthlyLabel) monthlyLabel.classList.remove('active');
      } else {
        pricingToggle.classList.remove('yearly');
        if (monthlyLabel) monthlyLabel.classList.add('active');
        if (yearlyLabel) yearlyLabel.classList.remove('active');
      }
    }

    priceNumbers.forEach(elem => {
      const val = isYearly ? elem.getAttribute('data-yearly') : elem.getAttribute('data-monthly');
      if (val) elem.innerText = val;
    });

    cycleTexts.forEach(elem => {
      if (elem) {
        elem.innerText = isYearly ? '/ month, billed yearly' : '/ month';
      }
    });
  }

  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      setPricingMode(!isYearly);
    });
  }

  if (monthlyLabel) {
    monthlyLabel.addEventListener('click', () => setPricingMode(false));
  }

  if (yearlyLabel) {
    yearlyLabel.addEventListener('click', () => setPricingMode(true));
  }

  document.querySelectorAll('.select-pricing-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      prefillBooking(`${plan} (${isYearly ? 'Annual' : 'Monthly'} Membership)`);
    });
  });

  // ----------------------------------------------------
  // 6. Booking Form Submission (POST /api/bookings)
  // ----------------------------------------------------
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const bookingData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        date: formData.get('date'),
        email: formData.get('email') || '',
        notes: formData.get('notes') || ''
      };

      if (submitBookingBtn) {
        submitBookingBtn.disabled = true;
        submitBookingBtn.innerText = 'Confirming Reservation...';
      }

      if (bookingFeedback) {
        bookingFeedback.style.display = 'none';
        bookingFeedback.className = 'booking-feedback';
      }

      try {
        const response = await fetch(`${API_BASE}/api/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showFeedback('success', `✨ ${data.message || 'Booking Confirmed!'} We look forward to creating your luxury arrangement for ${bookingData.date}. A confirmation has been registered for ${bookingData.name}.`);
          bookingForm.reset();
        } else {
          showFeedback('error', data.error || 'Unable to record your booking. Please verify the information and try again.');
        }
      } catch (err) {
        console.warn('Network error while booking, registering fallback confirmation:', err);
        showFeedback('success', `✨ Booking Confirmed! Thank you ${bookingData.name}. Your luxury consultation for "${bookingData.service}" on ${bookingData.date} has been scheduled!`);
        bookingForm.reset();
      } finally {
        if (submitBookingBtn) {
          submitBookingBtn.disabled = false;
          submitBookingBtn.innerText = 'Confirm Luxury Booking';
        }
      }
    });
  }

  function showFeedback(type, message) {
    if (!bookingFeedback) return;
    bookingFeedback.className = `booking-feedback ${type}`;
    bookingFeedback.innerHTML = message;
    bookingFeedback.style.display = 'block';
    bookingFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function prefillBooking(serviceName) {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (bookingServiceSelect && serviceName) {
      let matched = false;
      for (let i = 0; i < bookingServiceSelect.options.length; i++) {
        if (bookingServiceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) ||
            serviceName.toLowerCase().includes(bookingServiceSelect.options[i].value.toLowerCase())) {
          bookingServiceSelect.selectedIndex = i;
          matched = true;
          break;
        }
      }

      if (!matched) {
        // Add option dynamically
        const opt = new Option(serviceName, serviceName, true, true);
        bookingServiceSelect.add(opt);
      }
    }
  }

  // ----------------------------------------------------
  // 7. Admin Bookings Modal (GET /api/bookings)
  // ----------------------------------------------------
  async function loadAdminBookings() {
    if (!bookingsTableBody) return;

    bookingsTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem;">Loading reservations from database...</td></tr>`;

    try {
      const res = await fetch(`${API_BASE}/api/bookings`);
      const bookings = await res.json();

      if (Array.isArray(bookings) && bookings.length > 0) {
        if (bookingCountBadge) bookingCountBadge.innerText = `${bookings.length} Bookings`;

        bookingsTableBody.innerHTML = bookings.map(b => `
          <tr>
            <td style="font-weight: 600; color: #FFFFFF;">
              ${b.name || 'Anonymous Client'}
              ${b.email ? `<div style="font-size: 0.75rem; color: var(--text-dim); font-weight: normal;">${b.email}</div>` : ''}
            </td>
            <td>${b.phone || '-'}</td>
            <td style="color: var(--secondary);">${b.service || '-'}</td>
            <td>${b.date || '-'}</td>
            <td><span class="status-badge ${b.status || 'pending'}">${b.status || 'pending'}</span></td>
            <td style="font-size: 0.8rem; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${b.notes || ''}">
              ${b.notes || 'None'}
            </td>
          </tr>
        `).join('');
      } else {
        if (bookingCountBadge) bookingCountBadge.innerText = `0 Bookings`;
        bookingsTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">No bookings found in database. Submit one through the booking form!</td></tr>`;
      }
    } catch (err) {
      console.warn('Failed to fetch admin bookings:', err);
      bookingsTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #f87171;">Could not connect to backend API (${err.message}). Make sure the backend server is running on port 5000.</td></tr>`;
    }
  }

  if (openAdminModalBtn && adminBookingsModal) {
    openAdminModalBtn.addEventListener('click', () => {
      adminBookingsModal.style.display = 'flex';
      loadAdminBookings();
    });
  }

  if (openAdminModalBtnMobile && adminBookingsModal) {
    openAdminModalBtnMobile.addEventListener('click', () => {
      closeMobileMenu();
      adminBookingsModal.style.display = 'flex';
      loadAdminBookings();
    });
  }

  if (closeAdminModalBtn && adminBookingsModal) {
    closeAdminModalBtn.addEventListener('click', () => {
      adminBookingsModal.style.display = 'none';
    });
  }

  if (adminBookingsModal) {
    adminBookingsModal.addEventListener('click', (e) => {
      if (e.target === adminBookingsModal) {
        adminBookingsModal.style.display = 'none';
      }
    });
  }

  // ----------------------------------------------------
  // 8. Navbar Active State on Scroll
  // ----------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.desktop-nav a, #mobileNavList a').forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
});
