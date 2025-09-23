    $(document).ready(function(){  
      $('.faq-list strong').click(function(){  
        $(this).next('p').slideToggle(200);  
      });  
      $(window).scroll(function() {  
        if ($(this).scrollTop() > 80) {  
          $('#header').addClass('scrolled');  
        } else {  
          $('#header').removeClass('scrolled');  
        }  
      });  
    });  
    function copySectionLink(sectionId) {  
      const url = window.location.origin + window.location.pathname + '#' + sectionId;  
      navigator.clipboard.writeText(url);
      window.history.pushState(null, null, '#' + sectionId);  
    }  
    document.querySelectorAll('.resource-section h3').forEach(title => {  
      title.addEventListener('click', function(e) {  
        if (!e.target.classList.contains('copy-link')) {  
          const sectionId = this.parentElement.id;  
          window.history.pushState(null, null, '#' + sectionId);  
        }  
      });  
    });
    
  // Scroll to hash section on page load
  $(document).ready(function() {
    const hash = window.location.hash;
    if (hash) {
      const target = $(hash);
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 80 // Adjust 80 if header height is different
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