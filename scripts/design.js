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
});

// footer ?깆옣
window.addEventListener('scroll', () => {
  const designSection = document.querySelector('.design-section');
  const footer = document.querySelector('.footer-include');

  if (!designSection || !footer) {
    return;
  }

  const sectionBottom = designSection.getBoundingClientRect().bottom;

  if (sectionBottom <= window.innerHeight) {
    footer.classList.add('visible');
  } else {
    footer.classList.remove('visible');
  }
});
