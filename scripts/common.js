(function () {
  const HOVER_SELECTOR = "span, button, h1, h2, h3, h4, h5, h6, p, img";

  function getActiveNavHref() {
    const path = window.location.pathname.split("/").pop() || "index.html";

    if (path === "main.html") return "main.html";
    if (path === "about.html") return "about.html";
    if (path === "project.html") return "project.html";
    if (path === "design.html") return "design.html";
    if (path.startsWith("detailPage")) return "project.html";

    return sessionStorage.getItem("activeNav") || "main.html";
  }

  async function fetchPartial(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`${path} load failed: ${response.status}`);
    }
    return response.text();
  }

  function ensureCursor() {
    let cursor = document.querySelector(".cursor");
    if (!cursor) {
      cursor = document.createElement("div");
      cursor.className = "cursor";
      document.body.appendChild(cursor);
    }
    return cursor;
  }

  function initCursor() {
    const cursor = ensureCursor();
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isMouseMoved = false;

    cursor.style.opacity = "0";

    document.addEventListener("mousemove", (event) => {
      if (!isMouseMoved) {
        cursorX = event.clientX;
        cursorY = event.clientY;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        isMouseMoved = true;
      }

      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.style.opacity = "1";

      const hoverTarget = event.target.closest(HOVER_SELECTOR);
      const footerTarget = event.target.closest(".footer-include, footer");

      cursor.classList.toggle("cursor-hover", Boolean(hoverTarget));
      cursor.classList.toggle("cursor-footer", Boolean(footerTarget));
    });

    document.addEventListener("mouseout", (event) => {
      if (!event.relatedTarget) {
        cursor.classList.remove("cursor-hover", "cursor-footer");
      }
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  function syncHeaderState(root, activeHref) {
    const navItems = root.querySelectorAll(".nav-item");
    const navLeft2 = root.querySelector("#nav-left2");
    const navRight = root.querySelector("#nav-right");
    const activeItem = root.querySelector(`.nav-item[href='${activeHref}']`) || root.querySelector(".nav-item.active");

    if (activeItem) {
      navItems.forEach((item) => item.classList.remove("active"));
      activeItem.classList.add("active");
      if (navLeft2) navLeft2.textContent = activeItem.dataset.left || "";
      if (navRight) navRight.textContent = activeItem.dataset.right || "";
      sessionStorage.setItem("activeNav", activeItem.getAttribute("href"));
    }

    navItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        const href = item.getAttribute("href");
        sessionStorage.setItem("activeNav", href);

        navItems.forEach((nav) => nav.classList.remove("active"));
        item.classList.add("active");

        if (navLeft2) navLeft2.textContent = item.dataset.left || "";
        if (navRight) navRight.textContent = item.dataset.right || "";

        if (href === "#none" || href === "#") {
          event.preventDefault();
          return;
        }

        window.location.href = href;
      });
    });
  }

  function initContactFooterInteraction() {
    const contactButton = document.querySelector(".contact");
    const holoContainer = document.querySelector(".holo-container");
    const holoClose = document.querySelector(".holo-close");
    const footerInclude = document.querySelector(".footer-include");

    if (!contactButton || !holoContainer) {
      return;
    }

    contactButton.addEventListener("click", () => {
      holoContainer.classList.toggle("active");
    });

    if (holoClose) {
      holoClose.addEventListener("click", () => {
        holoContainer.classList.remove("active");
      });
    }

    if (!footerInclude) {
      return;
    }

    footerInclude.addEventListener("mouseenter", () => {
      footerInclude.classList.add("footer-hover");
      contactButton.classList.add("footer-hover");
      holoContainer.classList.add("footer-hover");
    });

    footerInclude.addEventListener("mouseleave", () => {
      footerInclude.classList.remove("footer-hover");
      contactButton.classList.remove("footer-hover");
      holoContainer.classList.remove("footer-hover");

      if (!holoContainer.classList.contains("active")) {
        holoContainer.classList.remove("active");
      }
    });

    contactButton.addEventListener("mouseenter", () => {
      footerInclude.classList.add("footer-hover");
      holoContainer.classList.add("footer-hover");
    });

    contactButton.addEventListener("mouseleave", () => {
      footerInclude.classList.add("footer-hover");
      holoContainer.classList.add("footer-hover");
    });
  }

  function ensureToast() {
    let toast = document.querySelector(".global-toast");
    if (toast) return toast;

    toast = document.createElement("div");
    toast.className = "global-toast";
    document.body.appendChild(toast);
    return toast;
  }

  function showToast(message) {
    const toast = ensureToast();
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  }

  function ensureToastStyles() {
    if (document.getElementById("global-toast-styles")) return;

    const style = document.createElement("style");
    style.id = "global-toast-styles";
    style.textContent = `
      .global-toast {
        position: fixed;
        left: 50%;
        bottom: 90px;
        transform: translateX(-50%) translateY(12px);
        padding: 10px 16px;
        border-radius: 999px;
        background: rgba(1, 0, 0, 0.88);
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.01em;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease, transform 0.25s ease;
        z-index: 1000;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
      }
      .global-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  async function copyToClipboard(targetId) {
    const target = document.getElementById(targetId);
    if (!target) {
      console.warn(`copyToClipboard: target not found for id "${targetId}"`);
      return;
    }

    const text = (target.textContent || "").trim();
    if (!text) {
      console.warn(`copyToClipboard: target "${targetId}" has no text`);
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      showToast("복사되었습니다");
    } catch (error) {
      console.error("copyToClipboard failed:", error);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }

  async function initSharedUI() {
    initCursor();
    ensureToastStyles();

    const activeHref = getActiveNavHref();
    const tasks = [];

    const headerTargets = document.querySelectorAll(".header-include");
    if (headerTargets.length > 0) {
      tasks.push(
        fetchPartial("header.html")
          .then((html) => {
            headerTargets.forEach((target) => {
              target.innerHTML = html;
              syncHeaderState(target, activeHref);
            });
          })
          .catch((error) => console.log("Header load error:", error))
      );
    }

    const contactTargets = document.querySelectorAll(".contact-include");
    if (contactTargets.length > 0) {
      tasks.push(
        fetchPartial("contact.html")
          .then((html) => {
            contactTargets.forEach((target) => {
              target.innerHTML = html;
            });
          })
          .catch((error) => console.log("Contact load error:", error))
      );
    }

    const footerTargets = document.querySelectorAll(".footer-include");
    if (footerTargets.length > 0) {
      tasks.push(
        fetchPartial("footer.html")
          .then((html) => {
            footerTargets.forEach((target) => {
              target.innerHTML = html;
            });
          })
          .catch((error) => console.log("Footer load error:", error))
      );
    }

    await Promise.all(tasks);
    initContactFooterInteraction();
  }

  window.copyToClipboard = copyToClipboard;
  window.scrollToTop = scrollToTop;
  window.SharedUI = { init: initSharedUI };

  document.addEventListener("DOMContentLoaded", initSharedUI);
})();
