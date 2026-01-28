$(document).ready(function() {
    const $window = $(window);
    const $header = $('#header');
    
    $window.on('scroll', function() {
        $header.toggleClass('scrolled', $window.scrollTop() > 80);
    });
});
    // More reliable - watches for DOM changes
const observeAds = () => {
    const ads = document.querySelectorAll('.adsbygoogle');
    
    ads.forEach(ad => {
        const observer = new MutationObserver(() => {
            // Check if ad is filled
            if (ad.getAttribute('data-ad-status') === 'filled') {
                ad.closest('.ad-container').classList.add('loaded');
                observer.disconnect();
            }
        });
        
        observer.observe(ad, {
            attributes: true,
            attributeFilter: ['data-ad-status']
        });
        
        // Timeout fallback
        setTimeout(() => {
            if (ad.childNodes.length > 0) {
                ad.closest('.ad-container').classList.add('loaded');
            }
            observer.disconnect();
        }, 3000);
    });
};

// Run after AdSense script loads
window.addEventListener('load', observeAds);