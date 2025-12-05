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
    toggleIcon.classList.add('expanded');
  } else {
    hiddenContainer.style.maxHeight = 0;
    hiddenContainer.classList.remove('expanded');
    iconGrid.classList.remove('expanded');
    toggleIcon.classList.remove('expanded');
  }

/*   toggleIcon.src = expandedSocial
    ? 'assets/up-arrow.svg'
    : 'assets/down-arrow.svg'; */

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
      // toggleIcon.src = 'assets/down-arrow.svg';
      toggleIcon.classList.remove('expanded');
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

// Function to fetch and display latest RSS post
const fetchLatestPost = (rssUrl, targetHref) => {
  // Use rss2json to convert RSS to JSON and bypass CORS
  const apiKey = 'https://api.rss2json.com/v1/api.json?rss_url=';
  
  fetch(apiKey + encodeURIComponent(rssUrl))
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok' && data.items.length > 0) {
        const latestItem = data.items[0];
        
        // Find the specific link in your HTML
        const linkElement = document.querySelector(`a[href="${targetHref}"]`);
        
        if (linkElement) {
          // Create the container for the new text
          const latestPostDiv = document.createElement('p');
          latestPostDiv.className = 'latest-post';
          latestPostDiv.innerHTML = `↳ Latest: <em>${latestItem.title}</em>`;
          
          // Insert it right after the blog link
          linkElement.insertAdjacentElement('afterend', latestPostDiv);
        }
      }
    })
    .catch(error => console.log('Error fetching RSS:', error));
};

// Execute for your three blogs
document.addEventListener('DOMContentLoaded', () => {
  fetchLatestPost(
    'https://oldschoolcadwizard.blogspot.com/feeds/posts/default?alt=rss', 
    'https://oldschoolcadwizard.blogspot.com/'
  );

  fetchLatestPost(
    'https://extrudednoise.blogspot.com/feeds/posts/default?alt=rss', 
    'https://extrudednoise.blogspot.com' // Note: Your HTML is missing the trailing slash on this one
  );

  fetchLatestPost(
    'https://dragonmistrpg.blogspot.com/feeds/posts/default?alt=rss', 
    'https://dragonmistrpg.blogspot.com/'
  );
});