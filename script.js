/* ========================================
   LOCOMOTIVE SCROLL INITIALIZATION
   ======================================== */

function locomotiveAnimation() {
    // Register ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll with smooth scrolling
    // Reference: https://github.com/locomotivemtl/locomotive-scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),  // Target element for smooth scroll
        smooth: true                           // Enable smooth scrolling effect
    });

    // ---- SYNC LOCOMOTIVE WITH SCROLL TRIGGER ----
    // Update ScrollTrigger whenever Locomotive Scroll updates
    locoScroll.on("scroll", ScrollTrigger.update);

    // ---- PROXY SETTINGS FOR LOCOMOTIVE SCROLL ----
    // Tell ScrollTrigger to use Locomotive's scroll methods
    ScrollTrigger.scrollerProxy(".main", {
        // Get current scroll position from Locomotive
        scrollTop(value) {
            return arguments.length 
                ? locoScroll.scrollTo(value, 0, 0) 
                : locoScroll.scroll.instance.scroll.y;
        },
        
        // Return viewport boundaries
        getBoundingClientRect() {
            return {
                top: 0, 
                left: 0, 
                width: window.innerWidth, 
                height: window.innerHeight
            };
        },
        
        // Pin type depends on whether transform is applied
        pinType: document.querySelector(".main").style.transform 
            ? "transform" 
            : "fixed"
    });

    // ---- REFRESH ON WINDOW UPDATE ----
    // Refresh ScrollTrigger when window changes
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // Initial refresh to ensure everything is synced
    ScrollTrigger.refresh();
}

// Execute Locomotive animation on page load
locomotiveAnimation();

/* ========================================
   NAVIGATION BAR ANIMATION
   ======================================== */

function NavbarAnimation() {
    // ---- LOGO ANIMATION: Slide up on scroll ----
    // Animates the .nav-part1 svg element upward
    gsap.to(".nav-part1 svg", {
        transform: "translateY(-100%)",  // Move logo up by 100%
        scrollTrigger: {
            trigger: ".page1",           // Start animation at page1
            scroller: ".main",           // Use Locomotive scroller
            start: "top 0",              // Start when page1 top hits viewport top
            end: "top -5%",              // End after scrolling 5% past page1 top
            scrub: true                  // Smooth scrubbing with scroll
        }
    });

    // ---- NAVIGATION LINKS ANIMATION: Fade out on scroll ----
    // Animates nav links to fade out and move up as user scrolls
    gsap.to(".nav-bar .links", {
        transform: "translateY(-100%)",  // Move links up
        opacity: 0,                      // Fade out links
        scrollTrigger: {
            trigger: ".page1",
            scroller: ".main",
            start: "top 0",
            end: "top -5%",
            scrub: true
        }
    });
}

// Execute navigation animation
NavbarAnimation();

/* ========================================
   INITIAL PAGE LOADING ANIMATION
   ======================================== */

function loadingAnimation() {
    // ---- H1 HEADING FADE IN: Staggered entrance ----
    // Each h1 element animates in with a stagger delay
    gsap.from(".page1 h1", {
        y: 80,              // Start 80px down
        opacity: 0,         // Start invisible
        delay: 0.5,         // Wait 0.5s before starting
        duration: 0.9,      // Animation takes 0.9s
        stagger: 0.3        // Each h1 delays 0.3s more than previous
    });

    // ---- PAGE 1 IMAGE FADE IN ----
    // Hero image fades in with upward movement
    gsap.from(".page1 img", {
        opacity: 0,         // Start invisible
        delay: 1.3,         // Start after headings finish (0.5 + 0.9)
        duration: 0.5,      // Quick fade-in
        y: -100             // Start 100px above
    });
}

// Execute loading animation on page load
loadingAnimation();

/* ========================================
   CUSTOM CURSOR ANIMATION
   ======================================== */

function cursorAnimation() {
    // ---- CURSOR FOLLOWING MOUSE ----
    // Makes the cursor element follow the mouse pointer
    document.addEventListener("mousemove", function(dets) {
        gsap.to(".cursor", {
            left: dets.x,   // Move cursor to mouse X position
            top: dets.y     // Move cursor to mouse Y position
        });
    });

    // ---- CURSOR EXPAND ON HOVER ----
    // Select all product children elements
    let a = document.querySelectorAll(".child");
    
    // For each child element, add hover effects
    a.forEach(function(elem) {
        // When mouse enters child element
        elem.addEventListener("mouseenter", function() {
            gsap.to(".cursor", {
                transform: 'translate(-50%, -50%) scale(1)'  // Expand cursor
            });
        });

        // When mouse leaves child element
        elem.addEventListener("mouseleave", function() {
            gsap.to(".cursor", {
                transform: 'translate(-50%, -50%) scale(0)'  // Shrink cursor
            });
        });
    });
}

// Execute cursor animation
cursorAnimation();

/* ========================================
   PAGE 1 IMAGE SCROLL ANIMATION
   ======================================== */

// Fade in and scale effect for main hero image as user scrolls
gsap.from(".page1 .image img", {
    opacity: 0,                    // Start invisible
    duration: 1,
    delay: 1,
    scrollTrigger: {
        trigger: ".page1 .image img",
        scroll: ".main",
        scale: 1,                  // End at normal scale
        start: "top 60%",          // Start when image is 60% down viewport
        scrub: 2                   // Smooth scrub linked to scroll
    }
});

/* ========================================
   PRODUCT CARD EXPANSION ANIMATION
   ======================================== */

// Select all product shop cards
const cards = document.querySelectorAll(".shop-card");

// For each card, set up hover expansion animation
cards.forEach(card => {
    // Find the card body (hidden product list)
    const products = card.querySelector(".card-body");

    // Create a GSAP timeline paused by default
    const tl = gsap.timeline({ paused: true });

    // Define animation: expand card body on hover
    tl.to(products, {
        height: 220,           // Expand to 220px height
        opacity: 1,            // Fade in
        duration: 0.4,         // Quick animation
        ease: "power2.out"     // Smooth easing
    });

    // ---- HOVER ENTER: Play expansion ----
    card.addEventListener("mouseenter", () => {
        tl.play();
    });

    // ---- HOVER LEAVE: Reverse animation ----
    card.addEventListener("mouseleave", () => {
        tl.reverse();
    });
});

/* ========================================
   CONTENT SECTION 2 ANIMATIONS
   ======================================== */

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Note: 'scroll' variable used here - likely refers to Locomotive instance
// Sync Locomotive Scroll with ScrollTrigger on scroll event
scroll.on("scroll", ScrollTrigger.update);

// Setup ScrollTrigger proxy for Locomotive Scroll
ScrollTrigger.scrollerProxy(".main", {
    // Get scroll position from Locomotive
    scrollTop(value) {
        return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
    },
    
    // Return viewport boundaries
    getBoundingClientRect() {
        return { 
            top: 0, 
            left: 0, 
            width: window.innerWidth, 
            height: window.innerHeight 
        };
    }
});

// Refresh ScrollTrigger on window update
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

/* ========================================
   BELIEF SECTION HEADING ANIMATION
   ======================================== */

// ---- FADE IN MAIN HEADING ----
// Main heading in belief section animates in from bottom
gsap.from(".heading", {
    y: 100,              // Start 100px below
    opacity: 0,          // Start invisible
    duration: 1.2,       // Smooth 1.2s animation
    scrollTrigger: {
        trigger: ".belief-section",      // Start at belief section
        scroller: ".main",               // Use Locomotive scroller
        start: "top 70%"                 // Start when section is 70% down viewport
    }
});

/* ========================================
   BELIEF SECTION PARAGRAPH ANIMATION
   ======================================== */

// ---- STAGGERED PARAGRAPH FADE IN ----
// Each paragraph in right column fades in with stagger
gsap.from(".right p", {
    y: 50,               // Start 50px below
    opacity: 0,          // Start invisible
    duration: 1,         // 1s per paragraph
    stagger: 0.2,        // Each paragraph delayed 0.2s
    scrollTrigger: {
        trigger: ".belief-section",
        scroller: ".main",
        start: "top 70%"
    }
});