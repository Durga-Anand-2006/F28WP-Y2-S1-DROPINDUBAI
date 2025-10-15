// Debugging line- checking if the connection was made correctly 
// console.log("main.js is loaded");

/**
 * ----------------------------
 * 1. CAROUSEL AUTO SCORLL 
 * ---------------------------
 */
/** It loops through each carousel, moves it a tiny bit every frame , 
 * and resets it to the start when it reaches the end. Jovering the 
 * mouse over any of the carousels pauses it using a boolean flag.
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
        scroll();
    });
});

/**
 * -----------------------------
 * 2. HAMBURGER MENU TOGGLE
 * -----------------------------
 */
/** When the hamburger icon is clicked on, it toggles the class active on 
 * both the icon and the mobile navigation menu, which will either show or 
 * hide the dropdwon menu on mobile.
 */
document.addEventListener("DOMContentLoaded", function(){
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");

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
/** This allows in-page links to scroll smoothly to a section instead of jumping instantly. */

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

