document.addEventListener('DOMContentLoaded', () => {
  const projectBtn = document.querySelector('.detail-button');
  if (projectBtn) {
    projectBtn.addEventListener('click', () => {
      window.location.href = 'project.html';
    });
  }
});
