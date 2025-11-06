// using the Fetch API call from server.js

document.addEventListener("DOMContentLoaded", async () => {
    try{
        const response = await fetch("http://localhost:3000/api/hotels");
        const hotels = await response.json();

        const container = document.querySelector(".cards-grid"); // adjust selector to match the one in the HTML code 
        container.innerHTML = "";

        hotels.forEach(hotel => {
            const card = document.createElement("div");
            card.classList.add("hotel-card");

            card.innerHTML = `
            <div>
                <img src="${hotel.ImagePath}" alt="${hotel.Name}"/>
                <h3>${hotel.Name}</h3>
                <p>${hotel.Description}</p>
                <p><strong>Location: </strong> ${hotel.Location}</p>
                <p><strong>Price:</strong> AED ${hotel.Price_Per_Night}</p>
            </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading hotels:", error);
    }
});