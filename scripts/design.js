// design
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const itemsContainer = document.querySelector('.items-container');
  const hoverImage = document.getElementById('hover-image');
  const imgTag = hoverImage.querySelector('img');
  let allRows = [];

  // designData.json
  fetch('scripts/designData.json')
    .then(response => response.json())
    .then(data => {
      allRows = data;
      renderItems(allRows);
    })
    .catch(error => console.error('JSON Load Error:', error));

    // tab
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabButtons.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');

      const category = e.currentTarget.dataset.cat;
      if (category === 'all') {
        renderItems(allRows);
      } else {
        const filtered = allRows.filter(item => item.category.toLowerCase() === category);
        renderItems(filtered);
      }
    });
  });

  function renderItems(items) {
    itemsContainer.innerHTML = '';

    // 내림파순 정렬
    items.sort((a, b) => {
      const dateA = parseYear(a.year);
      const dateB = parseYear(b.year);
      return dateB - dateA;
    });

    items.forEach((item, index) => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.setAttribute('data-cat', item.category.toLowerCase());
      row.setAttribute('data-year', item.year);
      row.setAttribute('data-image', item.image);

      row.innerHTML = `
        <div class="num">${index + 1 < 10 ? '0' + (index + 1) : index + 1}</div>
        <div class="category">${item.category}</div>
        <div class="title">${item.title}</div>
        <div class="year">${item.year}</div>
      `;

      itemsContainer.appendChild(row);
    });

    initHoverEvents(document.querySelectorAll('.row'));
  }

  // year -> 날짜로 변환
  function parseYear(year) {
    const match = year.match(/\d{4}\.\d{2}|\d{4}/);  // "YYYY.MM." 또는 "YYYY" 추출
    if (match) {
      const parts = match[0].split('.');
      const fullYear = parts[0];
      const month = parts[1] ? parts[1] : '01';  // 월이 없으면 1월로 설정
      return new Date(`${fullYear}-${month}-01`).getTime();
    }
    return 0;
  }

  // hoverEvent 초기화
  function initHoverEvents(rows) {
    rows.forEach(row => {
      row.addEventListener('mouseenter', (e) => {
        const imgSrc = e.currentTarget.dataset.image;
        if (imgSrc) {
          imgTag.src = imgSrc;
          hoverImage.classList.add('visible');
          imgTag.onload = () => {
            imgTag.classList.remove('landscape', 'portrait');
            if (imgTag.naturalWidth > imgTag.naturalHeight) {
              imgTag.classList.add('landscape');
            } else {
              imgTag.classList.add('portrait');
            }
          };
        }
      });

      row.addEventListener('mouseleave', () => {
        hoverImage.classList.remove('visible');
        imgTag.src = '';
      });

      row.addEventListener('mousemove', (e) => {
        hoverImage.style.top = `${e.pageY + 20}px`;
        hoverImage.style.left = `${e.pageX + 20}px`;
      });
    });
  }

  // header
  fetch("header.html")
    .then((res) => res.text())
    .then((data) => {
      document.querySelectorAll(".header-include").forEach((a) => {
        a.innerHTML = data;

        const navItems = document.querySelectorAll('.nav-item');
        const navLeft2 = document.getElementById('nav-left2');
        const navRight = document.getElementById('nav-right');

        const designNav = document.querySelector('.nav-item[href="design.html"]');
        if (designNav) {
          navItems.forEach(nav => nav.classList.remove('active'));
          designNav.classList.add('active');

          navLeft2.textContent = designNav.dataset.left;
          navRight.textContent = designNav.dataset.right;

          sessionStorage.setItem('activeNav', designNav.getAttribute('href'));
        }

        navItems.forEach(item => {
          item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            sessionStorage.setItem('activeNav', href);

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            navLeft2.textContent = item.dataset.left;
            navRight.textContent = item.dataset.right;

            if (href === '#none' || href === '#') {
              e.preventDefault();
            } else {
              window.location.href = href;
            }
          });
        });
      });
    })
    .catch((err) => console.log("Header load error:", err));

  // footer
  fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.querySelectorAll(".footer-include").forEach((a) => {
        a.innerHTML = data;
      });
    })
    .catch((err) => console.log("Footer load error:", err));

// contact-include
fetch("contact.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelectorAll(".contact-include").forEach((a) => {
      a.innerHTML = data;

      const contactButton = a.querySelector('.contact');
      const holoContainer = a.querySelector('.holo-container');
      const holoClose = a.querySelector('.holo-close');

      contactButton.addEventListener('click', () => {
        holoContainer.classList.toggle('active');
      });

      holoClose.addEventListener('click', () => {
        holoContainer.classList.remove('active');
      });

      const footer = document.querySelector('.footer-include');
      if (footer) {
        footer.addEventListener('mouseenter', () => {
          contactButton.classList.add('footer-hover');
          holoContainer.classList.add('footer-hover');
        });

        footer.addEventListener('mouseleave', () => {
          contactButton.classList.remove('footer-hover');
          holoContainer.classList.remove('footer-hover');
        });
      }
    });
  })
  .catch((err) => console.log("Contact load error:", err));

  // cursor
  let cursor = document.querySelector('.cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
  }

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
});

// footer 등장
window.addEventListener('scroll', () => {
  const designSection = document.querySelector('.design-section');
  const footer = document.querySelector('.footer-include');

  const sectionBottom = designSection.getBoundingClientRect().bottom;

  if (sectionBottom <= window.innerHeight) {
    footer.classList.add('visible');
  } else {
    footer.classList.remove('visible');
  }
});
