// using the Fetch API call from server.js
document.addEventListener("DOMContentLoaded", async () => {
    try{
        const response = await fetch("http://localhost:3000/api/attractions");
        const attractions = await response.json();

        const container = document.querySelector(".cards-grid"); 
        console.log("container found:", container);

        container.innerHTML = "";

        attractions.forEach(attraction => {
            const card = document.createElement("div");
            card.classList.add("attraction-card");

            
            card.innerHTML = `
            <div>
            <img src="${attraction.ImagePath}" alt ="${attraction.Name}"/>
            <h3>${attraction.Name}</h3>
            <p>${attraction.Description}</p>
            <p><strong>Location: </strong> ${attraction.Location}</p>
            <p><strong>Price: </strong> ${attraction.Price}</p>
            </div>
            `;

            container.appendChild(card);
        });
    } catch(error){
        console.error("Error loading attractions:", error);
    }
});