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
        let scrollSpeed = 0.7; // pixels per frame
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

/**
 * ---------------------------
 * 3. SMOOTH SCROLLING 
 * ---------------------------
 */

