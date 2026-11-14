/*!
 * Boldex Technologies — site scripts (plain JavaScript, no libraries)
 *
 *  0. Light & dark mode
 *  1. Header: background on scroll + mobile menu
 *  2. Homepage banner carousel
 *  3. Scroll-reveal animations
 *  4. Contact form → Gmail inbox (delivered by FormSubmit)
 *  5. Footer year
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Settings — change contact details here.
     ------------------------------------------------------------------ */
  var CONFIG = {
    // Every contact-form submission is emailed to this Gmail inbox by FormSubmit (https://formsubmit.co).
    // The very first submission triggers an "Activate Form" email to this address — click it once.
    // After activation FormSubmit can give you a random alias (e.g. /ajax/a1b2c3...) to hide the address.
    formEndpoint: "https://formsubmit.co/ajax/boldextechnologies@gmail.com",
    company: "Boldex Technologies",
    email: "boldextechnologies@gmail.com",
    phoneDisplay: "+234 812 837 2359",
    phoneE164: "+2348128372359",
    whatsappNumber: "2348128372359",
    whatsappMessage: "Hello Boldex Technologies, I would like to discuss a technology project.",
  };

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  var ICONS = {
    menu: '<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>',
    x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
    play: '<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>',
    pause: '<rect x="14" y="3" width="5" height="18" rx="1"></rect><rect x="5" y="3" width="5" height="18" rx="1"></rect>',
    loader: '<path d="M21 12a9 9 0 1 1-6.219-8.56"></path>',
    circleCheck: '<circle cx="12" cy="12" r="10"></circle><path d="m16 9-5.5 5.5L8 12"></path>',
    circleAlert: '<circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line>',
    wifiOff:
      '<path d="M12 20h.01"></path><path d="M8.5 16.429a5 5 0 0 1 7 0"></path><path d="M5 12.859a10 10 0 0 1 5.17-2.69"></path><path d="M19 12.859a10 10 0 0 0-2.007-1.523"></path><path d="M2 8.82a15 15 0 0 1 4.177-2.643"></path><path d="M22 8.82a15 15 0 0 0-11.288-3.764"></path><path d="m2 2 20 20"></path>',
    phone:
      '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>',
    mail: '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect>',
  };
  var WHATSAPP_PATH =
    "M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.6-8.4z";

  function icon(name, className) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide ' +
      className +
      '" aria-hidden="true">' +
      ICONS[name] +
      "</svg>"
    );
  }

  function whatsappIcon(className) {
    return '<svg viewBox="0 0 24 24" fill="currentColor" class="' + className + '" aria-hidden="true" focusable="false"><path d="' + WHATSAPP_PATH + '"></path></svg>';
  }

  function whatsappLink(message) {
    return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message || CONFIG.whatsappMessage);
  }

  /** WhatsApp link pre-filled with the service the visitor is interested in. */
  function whatsappServiceLink(service) {
    return whatsappLink(service ? "Hello Boldex Technologies, I would like to discuss a " + service + " project." : CONFIG.whatsappMessage);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function swapClasses(el, remove, add) {
    el.classList.remove.apply(el.classList, remove);
    el.classList.add.apply(el.classList, add);
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function run(name, fn) {
    try {
      fn();
    } catch (error) {
      console.error("[boldex] " + name + " failed", error);
    }
  }

  /* ------------------------------------------------------------------
     0. Light & dark mode
     The <head> script already applied the saved/device theme before the
     page painted; this wires up the header button and keeps it in sync.
     ------------------------------------------------------------------ */
  var THEME_KEY = "boldex-theme";

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function savedTheme() {
    try {
      var value = localStorage.getItem(THEME_KEY);
      return value === "dark" || value === "light" ? value : null;
    } catch (error) {
      return null;
    }
  }

  function syncThemeButtons() {
    var dark = getTheme() === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(dark));
      button.title = dark ? "Switch to light mode" : "Switch to dark mode";
    });
  }

  function setTheme(theme, remember) {
    var root = document.documentElement;
    if (remember) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (error) {
        /* storage unavailable — theme still applies to this page */
      }
    }
    if (theme !== getTheme()) {
      // Swap colours in one go instead of letting every element animate.
      root.classList.add("theme-switching");
      root.setAttribute("data-theme", theme);
      void root.offsetWidth; // apply the new colours now, while transitions are off
      window.setTimeout(function () {
        root.classList.remove("theme-switching");
      }, 0);
    }
    syncThemeButtons();
    document.dispatchEvent(new CustomEvent("boldex:themechange", { detail: { theme: theme } }));
  }

  function initTheme() {
    syncThemeButtons();
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        setTheme(getTheme() === "dark" ? "light" : "dark", true);
      });
    });

    // No saved choice yet: follow the device when it switches between light and dark.
    var deviceDark = window.matchMedia("(prefers-color-scheme: dark)");
    deviceDark.addEventListener("change", function (query) {
      if (!savedTheme()) setTheme(query.matches ? "dark" : "light", false);
    });

    // Keep other open tabs of the site in step.
    window.addEventListener("storage", function (event) {
      if (event.key === THEME_KEY && (event.newValue === "dark" || event.newValue === "light")) setTheme(event.newValue, false);
    });
  }

  /* ------------------------------------------------------------------
     1. Header
     ------------------------------------------------------------------ */
  function initHeader() {
    var header = document.querySelector("header.sticky");
    if (!header) return;

    var SOLID = ["border-line", "bg-white/90", "shadow-[0_6px_24px_-16px_rgb(13_21_70/0.35)]", "backdrop-blur-xl"];
    var CLEAR = ["border-transparent", "bg-white"];
    var toggle = header.querySelector('button[aria-controls="mobile-menu"]');
    var panel = document.getElementById("mobile-menu");
    var scrolled = false;
    var open = false;
    var previousOverflow = "";

    function paint() {
      var solid = scrolled || open;
      swapClasses(header, solid ? CLEAR : SOLID, solid ? SOLID : CLEAR);
    }

    function onScroll() {
      var next = window.scrollY > 8;
      if (next !== scrolled) {
        scrolled = next;
        paint();
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!toggle || !panel) return;

    function setOpen(value, returnFocus) {
      if (value === open) return;
      open = value;
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.innerHTML = open ? icon("x", "lucide-x h-5 w-5") : icon("menu", "lucide-menu h-5 w-5");
      if (open) {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        var firstLink = panel.querySelector("a");
        if (firstLink) firstLink.focus();
      } else {
        document.body.style.overflow = previousOverflow;
        if (returnFocus) toggle.focus();
      }
      paint();
    }

    toggle.addEventListener("click", function () {
      setOpen(!open);
    });

    // Close after choosing a link (matters for same-page #links).
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    // Escape closes; Tab stays inside the open menu.
    document.addEventListener("keydown", function (event) {
      if (!open) return;
      if (event.key === "Escape") {
        setOpen(false, true);
        return;
      }
      if (event.key !== "Tab") return;
      var focusable = [toggle].concat(Array.prototype.slice.call(panel.querySelectorAll("a, button")));
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // The mobile menu doesn't exist on desktop widths.
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (query) {
      if (query.matches) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------
     2. Carousel (WAI-ARIA carousel pattern)
     ------------------------------------------------------------------ */
  function initCarousels() {
    var INTERVAL = 7000;
    var SLIDE_ON = ["z-10", "opacity-100"];
    var SLIDE_OFF = ["pointer-events-none", "z-0", "opacity-0"];
    var CONTROL = {
      light: ["bg-white/80", "text-navy", "ring-line-strong", "hover:bg-white"],
      dark: ["bg-white/10", "text-white", "ring-white/25", "hover:bg-white/20"],
    };
    var DOT_ALL = ["w-8", "w-3", "group-hover/dot:w-5", "bg-brand", "bg-navy/25", "bg-white", "bg-white/40"];
    var DOT_COLOUR = { light: { on: "bg-brand", off: "bg-navy/25" }, dark: { on: "bg-white", off: "bg-white/40" } };

    document.querySelectorAll('[aria-roledescription="carousel"]').forEach(function (root) {
      var slides = Array.prototype.slice.call(root.querySelectorAll('[aria-roledescription="slide"]'));
      if (slides.length < 2) return;

      var track = slides[0].parentElement;
      var controls = root.querySelector(".pointer-events-auto");
      var buttons = controls.querySelectorAll(":scope > button");
      var playButton = buttons[0];
      var prevButton = buttons[1];
      var nextButton = buttons[2];
      var dots = Array.prototype.slice.call(controls.querySelectorAll(":scope > div > button"));
      var themes = slides.map(function (slide) {
        return slide.firstElementChild && slide.firstElementChild.classList.contains("dark-section") ? "dark" : "light";
      });
      var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      var active = 0;
      var playing = true;
      var interacting = false;
      var timer = null;
      var touchStartX = null;

      function autoplay() {
        return playing && !interacting && !reducedMotion.matches;
      }

      function schedule() {
        window.clearInterval(timer);
        timer = null;
        track.setAttribute("aria-live", autoplay() ? "off" : "polite");
        if (autoplay()) {
          timer = window.setInterval(function () {
            if (document.visibilityState === "visible") goTo(active + 1);
          }, INTERVAL);
        }
      }

      function render() {
        // In dark mode every slide has a dark background, so the controls use their light-on-dark style.
        var theme = getTheme() === "dark" ? "dark" : themes[active];
        slides.forEach(function (slide, index) {
          var isActive = index === active;
          swapClasses(slide, isActive ? SLIDE_OFF : SLIDE_ON, isActive ? SLIDE_ON : SLIDE_OFF);
          slide.setAttribute("aria-hidden", String(!isActive));
          slide.inert = !isActive;
        });
        [playButton, prevButton, nextButton].forEach(function (button) {
          swapClasses(button, CONTROL[theme === "dark" ? "light" : "dark"], CONTROL[theme]);
        });
        dots.forEach(function (dot, index) {
          var isActive = index === active;
          var bar = dot.firstElementChild;
          bar.classList.remove.apply(bar.classList, DOT_ALL);
          bar.classList.add.apply(bar.classList, (isActive ? ["w-8"] : ["w-3", "group-hover/dot:w-5"]).concat(DOT_COLOUR[theme][isActive ? "on" : "off"]));
          if (isActive) dot.setAttribute("aria-current", "true");
          else dot.removeAttribute("aria-current");
        });
        playButton.setAttribute("aria-label", playing ? "Pause slideshow" : "Play slideshow");
        playButton.innerHTML = playing ? icon("pause", "lucide-pause h-4 w-4") : icon("play", "lucide-play h-4 w-4");
        schedule();
      }

      function goTo(index) {
        active = ((index % slides.length) + slides.length) % slides.length;
        render();
      }

      playButton.addEventListener("click", function () {
        playing = !playing;
        render();
      });
      prevButton.addEventListener("click", function () {
        goTo(active - 1);
      });
      nextButton.addEventListener("click", function () {
        goTo(active + 1);
      });
      dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
          goTo(index);
        });
      });

      // Pause while the visitor hovers or uses the keyboard inside the carousel.
      root.addEventListener("mouseenter", function () {
        interacting = true;
        schedule();
      });
      root.addEventListener("mouseleave", function () {
        interacting = false;
        schedule();
      });
      root.addEventListener("focusin", function () {
        interacting = true;
        schedule();
      });
      root.addEventListener("focusout", function (event) {
        if (!root.contains(event.relatedTarget)) {
          interacting = false;
          schedule();
        }
      });

      // Swipe on touch screens.
      root.addEventListener(
        "touchstart",
        function (event) {
          touchStartX = event.touches[0] ? event.touches[0].clientX : null;
        },
        { passive: true },
      );
      root.addEventListener("touchend", function (event) {
        if (touchStartX === null) return;
        var endX = event.changedTouches[0] ? event.changedTouches[0].clientX : touchStartX;
        var deltaX = endX - touchStartX;
        if (Math.abs(deltaX) > 50) goTo(active + (deltaX < 0 ? 1 : -1));
        touchStartX = null;
      });

      reducedMotion.addEventListener("change", schedule);
      document.addEventListener("boldex:themechange", render);
      render();
    });
  }

  /* ------------------------------------------------------------------
     3. Scroll reveal
     ------------------------------------------------------------------ */
  function revealAll() {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.classList.add("is-revealed");
    });
  }

  /** Staggers items that sit in the same grid row, like the original design. */
  function staggerDelay(el) {
    var parent = el.parentElement;
    var siblings = Array.prototype.filter.call(parent.children, function (child) {
      return child.hasAttribute("data-reveal");
    });
    var columns = window.getComputedStyle(parent).gridTemplateColumns;
    var count = columns && columns !== "none" ? columns.split(" ").length : 1;
    return (siblings.indexOf(el) % count) * 60;
  }

  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window) || !Element.prototype.animate) {
      revealAll();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          observer.unobserve(el);
          // Suspend the element's own hover transitions so they don't fight the entrance animation.
          el.style.transition = "none";
          el.classList.add("is-revealed");
          var animation = el.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 550, delay: staggerDelay(el), easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
          );
          var restore = function () {
            el.style.transition = "";
          };
          animation.onfinish = restore;
          animation.oncancel = restore;
        });
      },
      { rootMargin: "0px 0px -60px 0px" },
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     4. Contact form
     ------------------------------------------------------------------ */
  var SERVICE_SLUGS = {
    "web-development": "Web Development",
    "mobile-app-development": "Mobile App Development",
    "ecommerce-development": "E-Commerce Development",
    "software-development": "Software Development",
    "erp-development-integration": "ERP System Development & Integration",
    "social-media-management": "Social Media Management",
    "content-creation": "Content Creation",
    "data-analytics-business-intelligence": "Data Analytics & Business Intelligence",
  };

  var LIMITS = { name: 100, company: 120, email: 160, phone: 25, descriptionMin: 20, description: 3000 };
  var MAX_LENGTH = {
    fullName: LIMITS.name,
    companyName: LIMITS.company,
    email: LIMITS.email,
    phone: LIMITS.phone,
    service: 120,
    budget: 60,
    projectDescription: LIMITS.description,
  };
  var FIELDS = [
    { key: "fullName", id: "ct-fullName" },
    { key: "companyName", id: "ct-company" },
    { key: "email", id: "ct-email" },
    { key: "phone", id: "ct-phone" },
    { key: "service", id: "ct-service" },
    { key: "budget", id: "ct-budget" },
    { key: "projectDescription", id: "ct-description" },
  ];
  var CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  /** International and Nigerian local formats: +234 812 837 2359, 08128372359, (0812) 837-2359 */
  var PHONE_PATTERN = /^\+?[0-9\s\-().]{7,25}$/;
  var MIN_FILL_TIME_MS = 2500;
  var RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000, key: "boldex-contact-submissions" };

  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var card = form.parentElement;
    var submitButton = form.querySelector('button[type="submit"]');
    var submitLabel = submitButton.innerHTML;
    var statusArea = submitButton.closest(".space-y-4");
    var startedAt = Date.now();
    var submitted = false;
    var pending = false;
    var touched = {};

    function control(key) {
      for (var i = 0; i < FIELDS.length; i++) if (FIELDS[i].key === key) return document.getElementById(FIELDS[i].id);
      return null;
    }

    function options(key) {
      return Array.prototype.filter
        .call(control(key).options, function (option) {
          return !option.disabled;
        })
        .map(function (option) {
          return option.value;
        });
    }
    var SERVICE_OPTIONS = options("service");
    var BUDGET_OPTIONS = options("budget");

    function clean(value) {
      return typeof value === "string" ? value.replace(CONTROL_CHARS, "").trim() : "";
    }

    function readValues() {
      var values = {};
      FIELDS.forEach(function (field) {
        values[field.key] = clean(control(field.key).value);
      });
      values.email = values.email.toLowerCase();
      return values;
    }

    /** Same rules the original server used. */
    function validate(values) {
      var errors = {};
      FIELDS.forEach(function (field) {
        if (values[field.key].length > MAX_LENGTH[field.key]) errors[field.key] = "Please keep this under " + MAX_LENGTH[field.key] + " characters.";
      });

      if (values.fullName.length < 2) errors.fullName = "Please enter your full name.";

      if (!values.email) errors.email = "Please enter your email address.";
      else if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";

      var digits = values.phone.replace(/\D/g, "").length;
      if (!values.phone) errors.phone = "Please enter your phone number.";
      else if (!PHONE_PATTERN.test(values.phone) || digits < 7 || digits > 15) errors.phone = "Please enter a valid phone number, e.g. +234 812 837 2359.";

      if (SERVICE_OPTIONS.indexOf(values.service) === -1) errors.service = "Please select the service you need.";
      if (BUDGET_OPTIONS.indexOf(values.budget) === -1) errors.budget = "Please select a budget range.";

      if (values.projectDescription.length < LIMITS.descriptionMin && !errors.projectDescription) {
        errors.projectDescription = "Please tell us a little more about your project (at least " + LIMITS.descriptionMin + " characters).";
      }
      return errors;
    }

    function setFieldError(key, message) {
      var el = control(key);
      var wrapper = form.querySelector('label[for="' + el.id + '"]').parentElement;
      var errorId = el.id + "-error";
      var errorEl = document.getElementById(errorId);
      var hint = document.getElementById(el.id + "-hint");

      if (message) {
        if (!errorEl) {
          errorEl = document.createElement("p");
          errorEl.id = errorId;
          errorEl.className = "mt-1.5 text-sm font-medium text-signal";
          wrapper.appendChild(errorEl);
        }
        errorEl.textContent = message;
      } else if (errorEl) {
        errorEl.remove();
      }
      if (hint) hint.hidden = Boolean(message);
      el.setAttribute("aria-invalid", message ? "true" : "false");

      var describedBy = [message ? errorId : null, hint && !message ? hint.id : null].filter(Boolean).join(" ");
      if (describedBy) el.setAttribute("aria-describedby", describedBy);
      else el.removeAttribute("aria-describedby");
    }

    function validateField(key) {
      setFieldError(key, validate(readValues())[key]);
    }

    function clearAlert() {
      var alert = statusArea.querySelector("[data-form-alert]");
      if (alert) alert.remove();
    }

    function showAlert(kind, message) {
      clearAlert();
      var contactLine =
        kind === "invalid"
          ? ""
          : '<p class="mt-1 text-fg-muted">You can also reach us directly on <a href="tel:' +
            CONFIG.phoneE164 +
            '" class="font-semibold text-brand underline-offset-2 hover:underline">' +
            CONFIG.phoneDisplay +
            '</a> or <a href="' +
            whatsappServiceLink() +
            '" target="_blank" rel="noopener noreferrer" class="font-semibold text-brand underline-offset-2 hover:underline">WhatsApp</a>.</p>';
      statusArea.insertAdjacentHTML(
        "afterbegin",
        '<div role="alert" data-form-alert class="flex gap-3 rounded-xl border border-signal/25 bg-signal/[0.06] p-4 text-sm text-ink">' +
          icon(kind === "network" ? "wifiOff" : "circleAlert", "mt-0.5 h-5 w-5 shrink-0 text-signal") +
          '<div><p class="font-semibold">' +
          escapeHtml(message) +
          "</p>" +
          contactLine +
          "</div></div>",
      );
    }

    function setPending(value) {
      pending = value;
      submitButton.disabled = value;
      submitButton.setAttribute("aria-disabled", String(value));
      submitButton.innerHTML = value ? icon("loader", "lucide-loader-circle h-5 w-5 motion-safe:animate-spin") + "<span>Sending…</span>" : submitLabel;
    }

    function resetForm() {
      form.reset();
      touched = {};
      submitted = false;
      FIELDS.forEach(function (field) {
        setFieldError(field.key, "");
      });
      clearAlert();
    }

    function showSuccess(service) {
      resetForm();
      form.hidden = true;
      card.insertAdjacentHTML(
        "beforeend",
        '<div class="py-4 text-center sm:py-8" aria-live="polite" data-form-success>' +
          '<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60 motion-safe:animate-[pop-in_0.4s_ease-out]">' +
          icon("circleCheck", "lucide-circle-check h-8 w-8") +
          "</span>" +
          '<h3 tabindex="-1" class="mt-6 text-2xl font-bold text-ink focus:outline-none">Thank you — your request has been received.</h3>' +
          '<p class="mx-auto mt-3 max-w-md leading-relaxed text-fg-muted">A member of the Boldex Technologies team will review your project details and get back to you shortly. For a faster response, you can also reach us on WhatsApp.</p>' +
          '<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">' +
          '<a href="' +
          escapeHtml(whatsappServiceLink(service)) +
          '" target="_blank" rel="noopener noreferrer" class="inline-flex h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-[0.9375rem] font-semibold text-white transition hover:brightness-110">' +
          whatsappIcon("h-5 w-5") +
          "Continue on WhatsApp</a>" +
          '<button type="button" data-send-another class="inline-flex h-11 items-center rounded-full px-5 text-[0.9375rem] font-semibold text-ink ring-1 ring-line-strong transition hover:text-brand hover:ring-brand">Send another request</button>' +
          "</div>" +
          '<p class="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-fg-subtle">' +
          '<a href="tel:' +
          CONFIG.phoneE164 +
          '" class="inline-flex items-center gap-1.5 hover:text-brand">' +
          icon("phone", "lucide-phone h-4 w-4") +
          " " +
          CONFIG.phoneDisplay +
          "</a>" +
          '<a href="mailto:' +
          CONFIG.email +
          '" class="inline-flex items-center gap-1.5 hover:text-brand">' +
          icon("mail", "lucide-mail h-4 w-4") +
          " " +
          CONFIG.email +
          "</a></p></div>",
      );

      var success = card.querySelector("[data-form-success]");
      success.querySelector("h3").focus();
      success.querySelector("[data-send-another]").addEventListener("click", function () {
        success.remove();
        form.hidden = false;
        startedAt = Date.now();
        control("fullName").focus();
      });
    }

    // Browser-side limit mirroring the original server rule (5 requests per 10 minutes).
    function recentSubmissions() {
      try {
        var now = Date.now();
        return JSON.parse(localStorage.getItem(RATE_LIMIT.key) || "[]").filter(function (time) {
          return now - time < RATE_LIMIT.windowMs;
        });
      } catch (error) {
        return [];
      }
    }

    function recordSubmission() {
      try {
        localStorage.setItem(RATE_LIMIT.key, JSON.stringify(recentSubmissions().concat(Date.now())));
      } catch (error) {
        /* storage unavailable — ignore */
      }
    }

    function send(values) {
      var firstName = values.fullName.split(/\s+/)[0];
      var payload = {
        _subject: "New Website Enquiry — " + values.service + " — " + CONFIG.company,
        _template: "table",
        _captcha: "false",
        _replyto: values.email,
        _autoresponse:
          "Hi " +
          firstName +
          ", thank you for contacting " +
          CONFIG.company +
          ". Your project request has been received and our team will get back to you shortly. " +
          "Service required: " +
          values.service +
          ". Budget range: " +
          values.budget +
          ". Need to reach us sooner? Phone: " +
          CONFIG.phoneDisplay +
          " · Email: " +
          CONFIG.email +
          " · WhatsApp: " +
          whatsappLink() +
          " — The " +
          CONFIG.company +
          " team",
        "Client name": values.fullName,
        Company: values.companyName || "—",
        email: values.email,
        Phone: values.phone,
        "Service required": values.service,
        "Budget range": values.budget,
        "Project description": values.projectDescription,
        "Sent from page": window.location.href,
      };

      return fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      }).then(
        function (response) {
          return response
            .json()
            .catch(function () {
              return null;
            })
            .then(function (data) {
              if (response.ok && data && (data.success === true || data.success === "true")) return { status: "success" };
              var message = data && typeof data.message === "string" ? data.message : "";
              if (/activat/i.test(message)) return { status: "error", message: message };
              return { status: "error", message: "We couldn't submit your request right now. Please try again, or contact us by phone or WhatsApp." };
            });
        },
        function () {
          return { status: "network", message: "We couldn't reach our server. Please check your internet connection and try again." };
        },
      );
    }

    // Validate a field once it has been visited, then live as the visitor types.
    FIELDS.forEach(function (field) {
      var el = control(field.key);
      el.addEventListener("blur", function () {
        touched[field.key] = true;
        validateField(field.key);
      });
      el.addEventListener(el.tagName === "SELECT" ? "change" : "input", function () {
        if (touched[field.key] || submitted) validateField(field.key);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (pending) return;
      submitted = true;
      clearAlert();

      var values = readValues();
      var errors = validate(values);
      var firstInvalid = null;
      FIELDS.forEach(function (field) {
        setFieldError(field.key, errors[field.key]);
        if (errors[field.key] && !firstInvalid) firstInvalid = control(field.key);
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // Bots: the hidden honeypot is filled in, or the form is submitted faster than a person could type.
      // They get a normal-looking success so they don't adapt; nothing is sent.
      var honeypot = form.querySelector('[name="_honey"]');
      if ((honeypot && honeypot.value) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
        showSuccess(values.service);
        return;
      }

      if (recentSubmissions().length >= RATE_LIMIT.max) {
        showAlert("error", "Too many requests. Please wait a few minutes, or reach us by phone or WhatsApp.");
        return;
      }

      setPending(true);
      send(values).then(function (result) {
        setPending(false);
        if (result.status === "success") {
          recordSubmission();
          showSuccess(values.service);
        } else {
          showAlert(result.status, result.message);
        }
      });
    });

    // Preselect the service when arriving from a service page (?service=web-development).
    var params = new URLSearchParams(window.location.search);
    var preset = SERVICE_SLUGS[params.get("service")];
    if (preset) control("service").value = preset;

    // Non-JavaScript fallback: FormSubmit redirects back here with ?sent=1.
    if (params.get("sent") === "1") showSuccess("");
  }

  /* ------------------------------------------------------------------
     5. Footer year
     ------------------------------------------------------------------ */
  function initYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ------------------------------------------------------------------ */
  run("theme", initTheme);
  run("header", initHeader);
  run("carousel", initCarousels);
  run("contact form", initContactForm);
  run("year", initYear);
  try {
    initReveal();
  } catch (error) {
    revealAll();
    console.error("[boldex] reveal failed", error);
  }
})();
