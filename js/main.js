// Debugging line- checking if the connection was made correctly *delete later*
// console.log("main.js is loaded");

/**
 * ----------------------------
 * 1. CAROUSEL AUTO SCORLL 
 * ---------------------------
 */
document.addEventListener("DOMContentLoaded", function(){
    const carousels = document.querySelectorAll(".carousel .cards");

    carousels.forEach(cards =>{
        let scrollSpeed = 0.7;  // pixels per frame
        let isPaused = false; 
        // console.log(cards);

        function scroll() {
            if(!isPaused){
                cards.scrollLeft += scrollSpeed;
                if(cards.scrollLeft >= cards.scrollWidth - cards.clientWidth){
                    cards.scrollLeft = 0; // loop back
                }
            }
            requestAnimationFrame(scroll);
        }
        // Pause when hovered over 
        cards.addEventListener("mouseenter", () => isPaused = true);
        cards.addEventListener("mouseleave", () => isPaused = false);
        
        // Start scrolling 
        //requestAnimationFrame(scroll);
        scroll();
    });
});

/**
 * -----------------------------
 * 2. HAMBURGER MENU TOGGLE
 * -----------------------------
 */
document.addEventListener("DOMContentLoaded", function(){
    const hamburger = document.querySelectorAll(".hamburger");
    const mobileNav = document.querySelectorAll(".mobile-nav");

    hamburger.addEventListener("click", function(){
        mobileNav.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
});

/**
 * ---------------------------
 * 3. SMOOTH SCROLLING 
 * ---------------------------
 */

document.querySelectorAll('a[href^="#"]').forEach(anchor =>{
    anchor.addEventListener('click', function(e){
        e.preventDefault(); // Stops the default jump behaviour

        // get the target section e.g "#hotels" -> section id="hotels"
        const target = document.querySelector(this.getAttribute('href'));
        
        // If the target exists, scroll to it smoothly
        if(target){
            target.scrollIntoView({
                behavior: 'smooth',  // makes it glide
                block: 'start'      // alighs to top of viewport
            });
        }
    });
});

