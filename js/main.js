/**
 * Lógica principal del sitio (Vanilla JS)
 * Contiene: Menú Hamburguesa, Scroll Suave, Sticky Header,
 * Animación de Scroll (Reveal), Contadores Animados, Filtro de Productos y Validación de Formulario.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ==============================================
     1. MENÚ HAMBURGUESA Y STICKY HEADER
     ============================================== */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle Menú
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Sticky Header al scrollear
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* ==============================================
     2. BOTÓN "VOLVER ARRIBA"
     ============================================== */
  const btnTop = document.getElementById("btn-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnTop.classList.add("show");
    } else {
      btnTop.classList.remove("show");
    }
  });

  btnTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* ==============================================
     3. ANIMACIÓN AL HACER SCROLL (REVEAL)
     ============================================== */
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Ejecutar al cargar por si hay elementos visibles

  /* ==============================================
     4. ANIMACIÓN DE CONTADORES (Intersection Observer)
     ============================================== */
  const counters = document.querySelectorAll(".stat-number");
  let hasCounted = false;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // 2 segundos
      const increment = target / (duration / 16); // asumiendo 60fps (~16ms)

      let currentCount = 0;

      const updateCounter = () => {
        currentCount += increment;
        if (currentCount < target) {
          counter.innerText = Math.ceil(currentCount);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  };

  const statsSection = document.getElementById("stats");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
          animateCounters();
          hasCounted = true;
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(statsSection);
  }

  /* ==============================================
     5. FILTRO SIMULADO DE PRODUCTOS
     ============================================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productItems = document.querySelectorAll(".product-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remover clase active de todos los botones
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Añadir clase active al botón clickeado
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      productItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          // Pequeña animación
          item.style.animation = "fadeIn 0.5s ease";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  /* ==============================================
     6. VALIDACIÓN DE FORMULARIO DE CONTACTO
     ============================================== */
  const form = document.getElementById("contact-form");
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const mensaje = document.getElementById("mensaje");
  const formSuccess = document.getElementById("form-success");

  const showError = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.add("error");
  };

  const removeError = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove("error");
  };

  const checkEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.trim());
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Validar Nombre (Mínimo 3 caracteres)
    if (nombre.value.trim().length < 3) {
      showError(nombre);
      isValid = false;
    } else {
      removeError(nombre);
    }

    // Validar Correo
    if (!checkEmail(correo.value)) {
      showError(correo);
      isValid = false;
    } else {
      removeError(correo);
    }

    // Validar Mensaje (Mínimo 10 caracteres)
    if (mensaje.value.trim().length < 10) {
      showError(mensaje);
      isValid = false;
    } else {
      removeError(mensaje);
    }

    // Si es válido, simular envío
    if (isValid) {
      formSuccess.style.display = "block";
      form.reset();

      // Ocultar mensaje de éxito después de 4 segundos
      setTimeout(() => {
        formSuccess.style.display = "none";
      }, 4000);
    }
  });
});
