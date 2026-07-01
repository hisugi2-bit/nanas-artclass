import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Sticky Navigation Header Header Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Navigation
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMobileMenu = () => {
    mobileMenu.classList.add('active');
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('active');
  };

  if (menuToggle && mobileMenu && mobileMenuClose) {
    menuToggle.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once revealed to optimize performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // 4. Interactive Gallery Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active class from all buttons and add to the clicked one
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          // Trigger slight fade-in transition
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300); // match CSS transitions
        }
      });
    });
  });

  // 5. Fullscreen Lightbox Modal
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title').textContent;
      const desc = item.querySelector('.gallery-item-desc').textContent;

      if (lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.innerHTML = `<strong>${title}</strong> - ${desc}`;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Lock body scroll
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scroll
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 6. Testimonial Slider / Carousel
  const track = document.getElementById('testimonial-track');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  const updateSlider = (slideIndex) => {
    if (!track) return;
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
    currentSlide = slideIndex;
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      updateSlider(index);
    });
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    if (!track) return;
    let nextSlide = (currentSlide + 1) % dots.length;
    updateSlider(nextSlide);
  }, 6000);

  // 7. Inquiry Form Submission & Mock Success Popup
  const inquiryForm = document.getElementById('inquiry-form');
  const successModal = document.getElementById('success-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (inquiryForm && successModal && modalCloseBtn) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page reload

      // Simulate API submit latency
      const submitBtn = inquiryForm.querySelector('.submit-btn');
      const submitBtnText = submitBtn.querySelector('span');
      const originalText = submitBtnText.textContent;
      
      submitBtn.disabled = true;
      submitBtnText.textContent = '문의 전송 중...';

      setTimeout(() => {
        // Show success modal
        successModal.classList.add('active');
        
        // Reset form and button
        inquiryForm.reset();
        submitBtn.disabled = false;
        submitBtnText.textContent = originalText;
      }, 1200);
    });

    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    // Close success modal when clicking backdrop
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // 8. Floating Action Button (FAB) Interaction
  const fab = document.getElementById('fab');
  if (fab) {
    const mainBtn = fab.querySelector('.fab-main-btn');
    mainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fab.classList.toggle('active');
      mainBtn.classList.toggle('active');
    });

    // Close FAB when clicking anywhere else
    document.addEventListener('click', () => {
      fab.classList.remove('active');
      mainBtn.classList.remove('active');
    });
  }

  // 9. Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 10. Background Music BGM Player Logic
  const bgmAudio = document.getElementById('bgm-audio');
  const bgmToggleBtn = document.getElementById('audio-toggle-btn');
  const bgmTrackInfo = document.getElementById('audio-track-info');

  if (bgmAudio && bgmToggleBtn && bgmTrackInfo) {
    bgmToggleBtn.addEventListener('click', () => {
      toggleBGM();
    });

    function toggleBGM() {
      if (bgmAudio.paused) {
        bgmAudio.play()
          .then(() => {
            bgmToggleBtn.classList.add('playing');
            bgmTrackInfo.classList.add('show');
            // Hide the BGM title banner automatically after 4 seconds
            setTimeout(() => {
              bgmTrackInfo.classList.remove('show');
            }, 4000);
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            alert("음원 재생에 실패했습니다. 브라우저의 오디오 설정을 확인해 주세요.");
          });
      } else {
        bgmAudio.pause();
        bgmToggleBtn.classList.remove('playing');
        bgmTrackInfo.classList.remove('show');
      }
    }

    // Autoplay BGM on first scroll / touch interaction for mobile
    const playOnFirstInteraction = () => {
      // Check if it's mobile screen (<= 768px) and music is not already playing
      if (window.innerWidth <= 768 && bgmAudio.paused) {
        bgmAudio.play()
          .then(() => {
            bgmToggleBtn.classList.add('playing');
            bgmTrackInfo.classList.add('show');
            // Hide the BGM title banner automatically after 4 seconds
            setTimeout(() => {
              bgmTrackInfo.classList.remove('show');
            }, 4000);
            
            // Successfully played, remove event listeners so they don't trigger again
            removeAutoplayListeners();
          })
          .catch(err => {
            console.log("Autoplay blocked by browser policy:", err);
          });
      }
    };

    function removeAutoplayListeners() {
      window.removeEventListener('scroll', playOnFirstInteraction);
      window.removeEventListener('touchstart', playOnFirstInteraction);
    }

    // Add scroll and touchstart listeners for autoplay behavior
    window.addEventListener('scroll', playOnFirstInteraction, { passive: true });
    window.addEventListener('touchstart', playOnFirstInteraction, { passive: true });
  }

});
