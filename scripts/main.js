const toggleIcon      = document.getElementById('toggle-icon');
const iconGrid        = document.querySelector('.icon-grid');
const hiddenContainer = document.querySelector('.hidden-container');
const toggleButtons   = document.querySelectorAll('.toggle-btn');
const expandableAreas = document.querySelectorAll('.expandable');

let expandedSocial = false;

toggleIcon.addEventListener('click', () => {
  expandedSocial = !expandedSocial;

  if (expandedSocial) {
    hiddenContainer.style.maxHeight = hiddenContainer.scrollHeight + 'px';
    hiddenContainer.classList.add('expanded');
    iconGrid.classList.add('expanded');
  } else {
    hiddenContainer.style.maxHeight = 0;
    hiddenContainer.classList.remove('expanded');
    iconGrid.classList.remove('expanded');
  }

  toggleIcon.src = expandedSocial
    ? 'assets/up-arrow.svg'
    : 'assets/down-arrow.svg';
  toggleIcon.alt = expandedSocial
    ? 'Show less'
    : 'Show more';

  // Collapse all expandable sections
  expandableAreas.forEach(area => {
    area.classList.remove('show');
    area.style.maxHeight = 0;
  });
  toggleButtons.forEach(btn => btn.classList.remove('expanded'));
});

toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const target = document.getElementById(targetId);
    const isOpen = target.classList.contains('show');

    // Close all sections
    expandableAreas.forEach(area => {
      area.classList.remove('show');
      area.style.maxHeight = null;
    });
    toggleButtons.forEach(btn => btn.classList.remove('expanded'));

    // Close social icons if open
    if (expandedSocial) {
      hiddenContainer.style.maxHeight = 0;
      hiddenContainer.classList.remove('expanded');
      iconGrid.classList.remove('expanded');
      toggleIcon.src = 'assets/down-arrow.svg';
      toggleIcon.alt = 'Show more';
      expandedSocial = false;
    }

    // Open the clicked section if it was closed
    if (!isOpen) {
      target.classList.add('show');
      target.style.maxHeight = target.scrollHeight + 'px';
      button.classList.add('expanded');
    }
  });
});
