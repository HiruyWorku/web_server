/* Main JavaScript file for portfolio website */

// Typed.js configuration and initialization
document.addEventListener("DOMContentLoaded", function (event) {
    type();
    movingBackgroundImage();
});

// Typed.js function
function type() {
    new Typed("#typed", {
        stringsElement: "#typed-strings",
        typeSpeed: 100,
        backSpeed: 20,
        loop: true,
        loopCount: Infinity
    });
}

// Moving background image function
function movingBackgroundImage() {
    // Implementation for moving background effect
    // This would contain the logic for any background animations
}

// Navigation active state management
$(document).ready(function() {
    $('nav li a[href=".' + location.pathname + '"]').addClass("active");
    if (location.pathname == "/") {
        $('nav li a[href="./index.html"]').addClass("active");
    }
});

// Bootstrap and jQuery functionality
// Note: This is a simplified version. The full file would contain all Bootstrap components

// Carousel functionality
$('.carousel').carousel({
    interval: 5000
});

// Smooth scrolling for navigation links
$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

// Form submission handling
$('form').on('submit', function(e) {
    e.preventDefault();
    
    var formData = {
        email: $('#email').val(),
        subject: $('#subject').val(),
        message: $('#message').val()
    };
    
    $.ajax({
        type: 'POST',
        url: '/submit_form',
        data: formData,
        success: function(response) {
            // Handle successful form submission
            console.log('Form submitted successfully');
        },
        error: function(xhr, status, error) {
            // Handle form submission error
            console.error('Form submission failed:', error);
        }
    });
});

// Mobile navigation toggle
$('.navbar-toggle').on('click', function() {
    $('.navbar-collapse').toggleClass('in');
});

// Close mobile menu when clicking on a link
$('.navbar-nav a').on('click', function() {
    if ($('.navbar-collapse').hasClass('in')) {
        $('.navbar-collapse').removeClass('in');
    }
});

// Image hover effects
$('.black-image-project-hover').hover(
    function() {
        $(this).find('img').css('filter', 'none');
    },
    function() {
        $(this).find('img').css('filter', 'contrast(200%) grayscale(100%)');
    }
);

// Smooth transitions for buttons
$('.btn').on('mouseenter mouseleave', function(e) {
    $(this).toggleClass('hover', e.type === 'mouseenter');
});

// Parallax effect for background images
$(window).scroll(function() {
    var scrolled = $(this).scrollTop();
    $('.background-image-container').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
});

// Lazy loading for images
$(document).ready(function() {
    $('img[data-src]').each(function() {
        var img = $(this);
        img.attr('src', img.data('src'));
        img.removeAttr('data-src');
    });
});

// Animate elements on scroll
$(window).scroll(function() {
    $('.animate-on-scroll').each(function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
            $(this).addClass('animated');
        }
    });
});

// Contact form validation
function validateForm() {
    var email = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();
    
    if (!email || !subject || !message) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Portfolio filter functionality
$('.portfolio-filter a').on('click', function(e) {
    e.preventDefault();
    
    var filter = $(this).data('filter');
    
    $('.portfolio-filter a').removeClass('active');
    $(this).addClass('active');
    
    if (filter === 'all') {
        $('.portfolio-item').show();
    } else {
        $('.portfolio-item').hide();
        $('.portfolio-item[data-category="' + filter + '"]').show();
    }
});

// Modal functionality for portfolio items
$('.portfolio-item').on('click', function() {
    var title = $(this).find('.portfolio-title').text();
    var description = $(this).find('.portfolio-description').text();
    var image = $(this).find('img').attr('src');
    
    $('#portfolioModal .modal-title').text(title);
    $('#portfolioModal .modal-body').html('<img src="' + image + '" class="img-responsive">' + '<p>' + description + '</p>');
    $('#portfolioModal').modal('show');
});

// Smooth reveal animations
function revealOnScroll() {
    var scrolled = $(window).scrollTop();
    var win_height_padded = $(window).height() * 0.8;
    
    $(".reveal:not(.animated)").each(function() {
        var $this = $(this),
            top = $this.offset().top;
        
        if (scrolled + win_height_padded > top) {
            if ($this.data('timeout')) {
                window.setTimeout(function() {
                    $this.addClass('animated ' + $this.data('animation'));
                }, parseInt($this.data('timeout'), 10));
            } else {
                $this.addClass('animated ' + $this.data('animation'));
            }
        }
    });
}

$(window).scroll(revealOnScroll);

// Initialize tooltips
$('[data-toggle="tooltip"]').tooltip();

// Initialize popovers
$('[data-toggle="popover"]').popover();

// Back to top button functionality
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn();
    } else {
        $('.back-to-top').fadeOut();
    }
});

$('.back-to-top').on('click', function() {
    $('html, body').animate({
        scrollTop: 0
    }, 800);
    return false;
});

// Preloader functionality
$(window).on('load', function() {
    $('.preloader').fadeOut('slow');
});

// Cookie consent functionality
if (!localStorage.getItem('cookieConsent')) {
    $('.cookie-banner').show();
}

$('.accept-cookies').on('click', function() {
    localStorage.setItem('cookieConsent', 'true');
    $('.cookie-banner').fadeOut();
});

// Search functionality
$('.search-toggle').on('click', function() {
    $('.search-form').toggleClass('active');
    $('.search-input').focus();
});

// Newsletter subscription
$('.newsletter-form').on('submit', function(e) {
    e.preventDefault();
    
    var email = $('.newsletter-email').val();
    
    if (isValidEmail(email)) {
        // Handle newsletter subscription
        $('.newsletter-success').show();
        $('.newsletter-email').val('');
    } else {
        $('.newsletter-error').show();
    }
});

// Social media share functionality
$('.share-button').on('click', function(e) {
    e.preventDefault();
    
    var platform = $(this).data('platform');
    var url = encodeURIComponent(window.location.href);
    var title = encodeURIComponent(document.title);
    
    var shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
            break;
        case 'twitter':
            shareUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
            break;
        case 'linkedin':
            shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
});

// Theme switcher functionality
$('.theme-switcher').on('click', function() {
    $('body').toggleClass('dark-theme');
    
    var currentTheme = $('body').hasClass('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// Load saved theme
var savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    $('body').addClass('dark-theme');
}

// Accessibility improvements
$('a, button, input, textarea, select').on('focus', function() {
    $(this).addClass('focus-visible');
}).on('blur', function() {
    $(this).removeClass('focus-visible');
});

// Keyboard navigation
$(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
        $('.modal').modal('hide');
        $('.dropdown-menu').removeClass('show');
    }
});

// Performance optimizations
$(window).on('resize', function() {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(function() {
        // Handle resize events
        revealOnScroll();
    }, 250);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Analytics tracking (if needed)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Initialize all components when DOM is ready
$(document).ready(function() {
    // Initialize all plugins and components
    revealOnScroll();
    
    // Track page views
    trackEvent('engagement', 'page_view', window.location.pathname);
    
    console.log('Portfolio website initialized successfully');
}); 