function copyCode(button) {
  const codeBlock = button.previousElementSibling;
  const codeText = codeBlock.textContent;
  
  navigator.clipboard.writeText(codeText).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
    alert('Failed to copy code. Please try again.');
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // Add anchor link icons to headings
  document.querySelectorAll("h1[id], h2[id], h3[id], h4[id]").forEach(heading => {
    const sectionId = heading.id;
    const icon = document.createElement("i");
    icon.className = "fas fa-link anchor-link";
    icon.title = "Copy link";

    // Copy on click
    icon.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent heading click event
      const url = window.location.origin + window.location.pathname + "#" + sectionId;
      navigator.clipboard.writeText(url).then(() => {
        icon.style.color = "green"; // success feedback
        setTimeout(() => { icon.style.color = "#0088cc"; }, 1500);
      }).catch(err => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy link. Try again.");
      });
    });

    heading.appendChild(icon);
  });


  // Header scroll effect
  $(window).scroll(function () {
    if ($(this).scrollTop() > 80) {
      $("#header").addClass("scrolled");
    } else {
      $("#header").removeClass("scrolled");
    }
  });

  // Clicking heading updates URL hash (without copy)
  document.querySelectorAll("h1[id], h2[id], h3[id], h4[id]").forEach(title => {
    title.addEventListener("click", function (e) {
      if (!e.target.classList.contains("anchor-link")) {
        const sectionId = this.id;
        window.history.pushState(null, null, "#" + sectionId);
      }
    });
  });

  // Smooth scroll to hash on page load
  const hash = window.location.hash;
  if (hash) {
    const target = $(hash);
    if (target.length) {
      $("html, body").animate({
        scrollTop: target.offset().top - 80 // adjust header height
      }, 500);
    }
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          newWorker.onstatechange = () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('New content available.');
              } else {
                console.log('Content cached for offline use.');
              }
            }
          };
        };
      })
      .catch(error => console.error('Service Worker registration failed:', error));
  });
}