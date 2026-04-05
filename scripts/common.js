(function () {
  function ensureToast() {
    let toast = document.querySelector(".global-toast");
    if (toast) {
      return toast;
    }

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
    if (document.getElementById("global-toast-styles")) {
      return;
    }

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
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    return true;
  }

  window.copyToClipboard = copyToClipboard;
  window.scrollToTop = scrollToTop;

  ensureToastStyles();
})();
