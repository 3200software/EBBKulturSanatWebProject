/**
 * Modern JavaScript for EBB Kültür Sanat Website
 * Enhanced with ES6+ features, performance optimizations, and accessibility
 */

// Utility Functions
const utils = {
  // Debounce function for performance optimization
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  },

  // Smooth scroll to element
  scrollTo(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  },

  // Format date for Turkish locale
  formatDate(dateString) {
    if (!dateString) return "Tarih belirtilmemiş";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.warn("Date formatting error:", error);
      return dateString;
    }
  },

  // Generate unique ID
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  },

  // Safe DOM query
  $(selector, context = document) {
    return context.querySelector(selector);
  },

  // Safe DOM query all
  $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  },
};

// Performance Monitor
const performanceMonitor = {
  marks: new Map(),

  start(name) {
    this.marks.set(name, performance.now());
  },

  end(name) {
    const startTime = this.marks.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
      this.marks.delete(name);
      return duration;
    }
  },
};

// Enhanced Mobile Menu Handler
class MobileMenu {
  constructor() {
    this.menuBtn = utils.$("#mobileMenuBtn");
    this.navMenu = utils.$("#navMenu");
    this.navLinks = utils.$$(".nav-link");
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.menuBtn || !this.navMenu) return;

    this.menuBtn.addEventListener("click", this.toggle.bind(this));

    // Close menu when clicking nav links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", this.close.bind(this));
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.isOpen &&
        !this.navMenu.contains(e.target) &&
        !this.menuBtn.contains(e.target)
      ) {
        this.close();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Handle resize
    window.addEventListener(
      "resize",
      utils.debounce(() => {
        if (window.innerWidth > 768 && this.isOpen) {
          this.close();
        }
      }, 250)
    );
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.navMenu.classList.add("active");
    this.updateIcon("fa-times");
    this.menuBtn.setAttribute("aria-expanded", "true");

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Focus first menu item
    const firstLink = utils.$(".nav-link", this.navMenu);
    if (firstLink) firstLink.focus();
  }

  close() {
    this.isOpen = false;
    this.navMenu.classList.remove("active");
    this.updateIcon("fa-bars");
    this.menuBtn.setAttribute("aria-expanded", "false");

    // Restore body scroll
    document.body.style.overflow = "";
  }

  updateIcon(iconClass) {
    const icon = utils.$("i", this.menuBtn);
    if (icon) {
      icon.className = `fas ${iconClass}`;
    }
  }
}

// Enhanced Header Scroll Handler
class HeaderScroll {
  constructor() {
    this.header = utils.$(".header");
    this.lastScrollY = window.scrollY;
    this.ticking = false;

    this.init();
  }

  init() {
    if (!this.header) return;

    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(this.updateHeader.bind(this));
      this.ticking = true;
    }
  }

  updateHeader() {
    const currentScrollY = window.scrollY;

    // Update header background
    if (currentScrollY > 100) {
      this.header.style.background = "rgba(255, 255, 255, 0.98)";
      this.header.style.backdropFilter = "blur(20px)";
    } else {
      this.header.style.background = "rgba(255, 255, 255, 0.95)";
      this.header.style.backdropFilter = "blur(10px)";
    }

    // Hide/show header on scroll
    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      this.header.style.transform = "translateY(-100%)";
    } else {
      this.header.style.transform = "translateY(0)";
    }

    this.lastScrollY = currentScrollY;
    this.ticking = false;
  }
}

// Enhanced Navigation Active State
class NavigationActive {
  constructor() {
    this.sections = utils.$$("section[id]");
    this.navLinks = utils.$$(".nav-link");
    this.currentActive = null;

    this.init();
  }

  init() {
    if (!this.sections.length || !this.navLinks.length) return;

    window.addEventListener(
      "scroll",
      utils.throttle(this.updateActive.bind(this), 100)
    );
    this.updateActive(); // Initial check
  }

  updateActive() {
    const scrollPosition = window.scrollY + 200;

    let current = "";
    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    if (current !== this.currentActive) {
      this.navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
      this.currentActive = current;
    }
  }
}

// Enhanced Smooth Scroll Handler
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Handle all anchor links
    utils.$$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", this.handleClick.bind(this));
    });
  }

  handleClick(e) {
    const href = e.currentTarget.getAttribute("href");
    if (href === "#") return;

    const target = utils.$(href);
    if (!target) return;

    e.preventDefault();

    const performScroll = () => {
      this.scrollToTarget(target, href);
    };

    const mobileMenuComponent = window.ebbApp?.getComponent("mobileMenu");
    if (mobileMenuComponent && mobileMenuComponent.isOpen) {
      mobileMenuComponent.close();
      requestAnimationFrame(() => requestAnimationFrame(performScroll));
    } else {
      performScroll();
    }
  }

  scrollToTarget(target, href) {
    const headerHeight = utils.$(".header")?.offsetHeight || 0;
    const targetPosition = target.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Update URL without triggering scroll
    if (history.pushState) {
      history.pushState(null, null, href);
    }
  }
}

// Enhanced Counter Animation
class CounterAnimation {
  constructor() {
    this.counters = utils.$$(".stat-number");
    this.hasAnimated = false;

    this.init();
  }

  init() {
    if (!this.counters.length) return;

    // Use Intersection Observer for better performance
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { threshold: 0.5, rootMargin: "0px 0px -50px 0px" }
    );

    this.counters.forEach((counter) => {
      this.observer.observe(counter);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !this.hasAnimated) {
        this.hasAnimated = true;
        this.animateCounters();
      }
    });
  }

  animateCounters() {
    performanceMonitor.start("counter-animation");

    this.counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      const startValue = 0;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(
          startValue + (target - startValue) * easeOut
        );

        counter.textContent = currentValue.toLocaleString("tr-TR");

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target.toLocaleString("tr-TR");
        }
      };

      requestAnimationFrame(animate);
    });

    performanceMonitor.end("counter-animation");
  }
}

// Enhanced Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.elements = utils.$$("[data-animate]");
    this.init();
  }

  init() {
    if (!this.elements.length) return;

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    this.elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      this.observer.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.getAttribute("data-animate");

        element.style.opacity = "1";

        switch (animationType) {
          case "fade-up":
            element.style.transform = "translateY(0)";
            break;
          case "fade-left":
            element.style.transform = "translateX(0)";
            break;
          case "fade-right":
            element.style.transform = "translateX(0)";
            break;
          case "scale":
            element.style.transform = "scale(1)";
            break;
          default:
            element.style.transform = "translateY(0)";
        }

        this.observer.unobserve(element);
      }
    });
  }
}

// Enhanced Image Lazy Loading
class LazyImageLoader {
  constructor() {
    this.images = utils.$$('img[loading="lazy"]');
    this.init();
  }

  init() {
    if (!this.images.length) return;

    // Check for native lazy loading support
    if ("loading" in HTMLImageElement.prototype) {
      this.images.forEach((img) => {
        img.addEventListener("load", this.handleImageLoad.bind(this));
        img.addEventListener("error", this.handleImageError.bind(this));
      });
    } else {
      // Fallback for browsers without native lazy loading
      this.setupIntersectionObserver();
    }
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { rootMargin: "50px" }
    );

    this.images.forEach((img) => {
      this.observer.observe(img);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        this.loadImage(img);
        this.observer.unobserve(img);
      }
    });
  }

  loadImage(img) {
    const src = img.getAttribute("data-src") || img.src;
    if (src) {
      img.src = src;
      img.addEventListener("load", this.handleImageLoad.bind(this));
      img.addEventListener("error", this.handleImageError.bind(this));
    }
  }

  handleImageLoad(e) {
    const img = e.target;
    img.classList.add("loaded");
    img.style.opacity = "1";
  }

  handleImageError(e) {
    const img = e.target;
    console.warn("Image failed to load:", img.src);

    // Set fallback image
    img.src = "assets/placeholder.jpg";
    img.alt = "Resim yüklenemedi";
  }
}

// Enhanced Form Handler
class FormHandler {
  constructor() {
    this.forms = utils.$$("form");
    this.init();
  }

  init() {
    this.forms.forEach((form) => {
      form.addEventListener("submit", this.handleSubmit.bind(this));

      // Add real-time validation
      const inputs = utils.$$("input, textarea, select", form);
      inputs.forEach((input) => {
        input.addEventListener("blur", this.validateField.bind(this));
        input.addEventListener(
          "input",
          utils.debounce(this.validateField.bind(this), 300)
        );
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (this.validateForm(form)) {
      this.submitForm(form);
    }
  }

  validateForm(form) {
    const inputs = utils.$$(
      "input[required], textarea[required], select[required]",
      form
    );
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField({ target: input })) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = "";

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      isValid = false;
      message = "Bu alan zorunludur";
    }

    // Email validation
    else if (type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = "Geçerli bir e-posta adresi girin";
      }
    }

    // Phone validation
    else if (type === "tel" && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        message = "Geçerli bir telefon numarası girin";
      }
    }

    this.updateFieldState(field, isValid, message);
    return isValid;
  }

  updateFieldState(field, isValid, message) {
    const errorElement =
      utils.$(`#${field.id}-error`) || this.createErrorElement(field);

    field.classList.toggle("error", !isValid);
    field.classList.toggle("success", isValid && field.value.trim());

    errorElement.textContent = message;
    errorElement.style.display = message ? "block" : "none";
  }

  createErrorElement(field) {
    const errorElement = document.createElement("div");
    errorElement.id = `${field.id}-error`;
    errorElement.className = "field-error";
    errorElement.style.color = "#dc3545";
    errorElement.style.fontSize = "0.875rem";
    errorElement.style.marginTop = "0.25rem";

    field.parentNode.insertBefore(errorElement, field.nextSibling);
    return errorElement;
  }

  async submitForm(form) {
    const submitBtn = utils.$('button[type="submit"]', form);
    const originalText = submitBtn?.textContent;

    try {
      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Gönderiliyor...";
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Here you would typically send the data to your server
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.showSuccess("Form başarıyla gönderildi!");
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      this.showError(
        "Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      // Restore button state
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  }

  showSuccess(message) {
    this.showNotification(message, "success");
  }

  showError(message) {
    this.showNotification(message, "error");
  }

  showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${
              type === "success"
                ? "background: #28a745;"
                : "background: #dc3545;"
            }
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }
}

// Enhanced Error Handler
class ErrorHandler {
  constructor() {
    this.init();
  }

  init() {
    // Global error handling
    window.addEventListener("error", this.handleError.bind(this));
    window.addEventListener(
      "unhandledrejection",
      this.handlePromiseRejection.bind(this)
    );
  }

  handleError(e) {
    console.error("JavaScript Error:", {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      error: e.error,
    });

    // Don't show error to users in production
    if (process.env.NODE_ENV === "development") {
      this.showErrorMessage(
        "Bir JavaScript hatası oluştu. Konsolu kontrol edin."
      );
    }
  }

  handlePromiseRejection(e) {
    console.error("Unhandled Promise Rejection:", e.reason);

    if (process.env.NODE_ENV === "development") {
      this.showErrorMessage("Bir Promise hatası oluştu. Konsolu kontrol edin.");
    }
  }

  showErrorMessage(message) {
    const errorDiv = document.createElement("div");
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: #dc3545;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
        `;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
      document.body.removeChild(errorDiv);
    }, 5000);
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Preload critical resources
    this.preloadCriticalResources();

    // Optimize images
    this.optimizeImages();

    // Monitor performance
    this.monitorPerformance();
  }

  preloadCriticalResources() {
    const criticalResources = ["css/global.css", "assets/Asset 1.png"];

    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource;
      link.as = resource.endsWith(".css") ? "style" : "image";
      document.head.appendChild(link);
    });
  }

  optimizeImages() {
    // Add loading="lazy" to images below the fold
    const images = utils.$$("img:not([loading])");
    images.forEach((img, index) => {
      if (index > 2) {
        // Skip first 3 images (likely above the fold)
        img.loading = "lazy";
      }
    });
  }

  monitorPerformance() {
    // Monitor Core Web Vitals
    if ("PerformanceObserver" in window) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log("LCP:", lastEntry.startTime);
      }).observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          console.log("FID:", entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift
      new PerformanceObserver((entryList) => {
        let clsValue = 0;
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log("CLS:", clsValue);
      }).observe({ entryTypes: ["layout-shift"] });
    }
  }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.enhanceKeyboardNavigation();
    this.addAriaLabels();
    this.handleReducedMotion();
    this.improveFocusManagement();
  }

  enhanceKeyboardNavigation() {
    // Add keyboard support for custom elements
    utils.$$('[role="button"]:not(button)').forEach((element) => {
      element.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          element.click();
        }
      });
    });
  }

  addAriaLabels() {
    // Add missing aria-labels
    utils.$$("button:not([aria-label])").forEach((button) => {
      const text = button.textContent.trim();
      if (!text) {
        const icon = utils.$("i", button);
        if (icon) {
          button.setAttribute("aria-label", this.getIconLabel(icon.className));
        }
      }
    });
  }

  getIconLabel(className) {
    const iconMap = {
      "fa-bars": "Menüyü aç",
      "fa-times": "Menüyü kapat",
      "fa-chevron-left": "Önceki",
      "fa-chevron-right": "Sonraki",
      "fa-play": "Oynat",
      "fa-pause": "Duraklat",
      "fa-search": "Ara",
    };

    for (const [iconClass, label] of Object.entries(iconMap)) {
      if (className.includes(iconClass)) {
        return label;
      }
    }

    return "Buton";
  }

  handleReducedMotion() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Disable animations for users who prefer reduced motion
      const style = document.createElement("style");
      style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `;
      document.head.appendChild(style);
    }
  }

  improveFocusManagement() {
    // Improve focus visibility
    const style = document.createElement("style");
    style.textContent = `
            .js-focus-visible :focus:not(.focus-visible) {
                outline: none;
            }
            
            .focus-visible {
                outline: 2px solid var(--accent-color);
                outline-offset: 2px;
            }
        `;
    document.head.appendChild(style);

    // Add focus-visible polyfill class
    document.documentElement.classList.add("js-focus-visible");
  }
}

// Main Application Class
class EBBKulturSanatApp {
  constructor() {
    this.components = new Map();
    this.init();
  }

  init() {
    performanceMonitor.start("app-initialization");

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener(
        "DOMContentLoaded",
        this.initializeComponents.bind(this)
      );
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize core components
      this.components.set("mobileMenu", new MobileMenu());
      this.components.set("headerScroll", new HeaderScroll());
      this.components.set("navigationActive", new NavigationActive());
      this.components.set("smoothScroll", new SmoothScroll());
      this.components.set("counterAnimation", new CounterAnimation());
      this.components.set("animationObserver", new AnimationObserver());
      this.components.set("lazyImageLoader", new LazyImageLoader());
      this.components.set("formHandler", new FormHandler());
      this.components.set("errorHandler", new ErrorHandler());
      this.components.set("performanceOptimizer", new PerformanceOptimizer());
      this.components.set("accessibilityEnhancer", new AccessibilityEnhancer());

      performanceMonitor.end("app-initialization");
      console.log("EBB Kültür Sanat App initialized successfully");
    } catch (error) {
      console.error("Error initializing app:", error);
    }
  }

  getComponent(name) {
    return this.components.get(name);
  }

  // Public API for external scripts
  static getInstance() {
    if (!window.ebbApp) {
      window.ebbApp = new EBBKulturSanatApp();
    }
    return window.ebbApp;
  }
}

// Initialize the application
const app = EBBKulturSanatApp.getInstance();

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = { EBBKulturSanatApp, utils, performanceMonitor };
}

// Service Worker Registration (if available)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
