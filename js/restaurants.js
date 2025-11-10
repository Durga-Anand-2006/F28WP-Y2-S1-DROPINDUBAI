// using the Fetch API all from server.js 
document.addEventListener("DOMContentLoaded", async () => {
    try{
        const response = await fetch("http://localhost:3000/api/restaurants");
        const restaurants = await response.json();

        const container = document.querySelector(".cards-grid");
        console.log("container found:", container);

        container.innerHTML = "";

        restaurants.forEach(restaurant => {
            const card = document.createElement("div");
            card.classList.add("restaurant-card");
            
            card.innerHTML = `
            <div>
            <img src="${restaurant.ImagePath}" alt ="${restaurant.Name}"/>
            <h3>${restaurant.Name}</h3>
            <p>${restaurant.Description}</p>
            <p><strong>Rating: </strong> ${restaurant.Rating}</p>
            <p><strong>Cuisine: </strong> ${restaurant.Cuisine}</p>
            <p><strong>Location: </strong> ${restaurant.Location}</p>
            <p><strong>Price: </strong> ${restaurant.Price_Range}</p>
            </div>
            `;


            container.appendChild(card);

        });
    } catch (error){
        console.error("Error loading restaurants:", error);
    }
});