const button = document.getElementById('toggle-btn');
const hiddenIcons = document.querySelectorAll('.icon.hidden');
let expanded = false;

button.addEventListener('click', () => {
  expanded = !expanded;
  hiddenIcons.forEach(icon => {
    icon.style.display = expanded ? 'block' : 'none';
  });
  button.textContent = expanded ? '⬆ Show Less' : '⬇ Show More';
});
