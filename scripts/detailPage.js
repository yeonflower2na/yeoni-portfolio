// header-include
fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelectorAll(".header-include").forEach((a) => {
      a.innerHTML = data;
      
      const navItems = document.querySelectorAll('.nav-item');
      const navLeft2 = document.getElementById('nav-left2');
      const navRight = document.getElementById('nav-right');

      // project 탭 active 설정
      const projectNav = document.querySelector('.nav-item[href="project.html"]');
      if (projectNav) {
        navItems.forEach(nav => nav.classList.remove('active'));
        projectNav.classList.add('active');

        navLeft2.textContent = projectNav.dataset.left;
        navRight.textContent = projectNav.dataset.right;

        sessionStorage.setItem('activeNav', projectNav.getAttribute('href'));
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

// contact-include
fetch("contact.html")
  .then((res) => res.text())
  .then((contactData) => {
    document.querySelectorAll(".contact-include").forEach((contactInclude) => {
      contactInclude.innerHTML = contactData;

      const contactButton = contactInclude.querySelector('.contact');
      const holoContainer = contactInclude.querySelector('.holo-container');
      const holoClose = contactInclude.querySelector('.holo-close');

      contactButton.addEventListener('click', () => {
        holoContainer.classList.toggle('active');
      });

      holoClose.addEventListener('click', () => {
        holoContainer.classList.remove('active');
      });
    });
  })
  .catch((err) => console.log("Contact load error:", err));
