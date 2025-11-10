// using the Fetch API call from server.js 
document.addEventListener("DOMContentLoaded", async () => {
    try{
        const response = await fetch("http://localhost:3000/api/events");
        const events = await response.json();

        const container = document.querySelector(".cards-grid");
        console.log("container found", container);
        
        container.innerHTML = "";

        events.forEach(event => {
            const card = document.createElement("div");
            card.classList.add("event-card");
            // fallback image 
            const imageSrc = event.ImagePath ? event.imagePath : "images/default-event.jpg";

            card.innerHTML = `
            <div>
            <img src="${event.ImagePath}" alt ="${event.Name}"/>
            <h3>${event.Name}</h3>
            <p>${event.Description}</p>
            <p><strong>Location: </strong> ${event.Location}</p>
            <p><strong>Start Date: </strong> ${new Date (event.Start_Date).toLocaleDateString()}</p>                   
            <p><strong>End Date: </strong> ${new Date (event.End_Date).toLocaleDateString()}</p>
            <p><strong>Price: </strong> ${event.Price}</p>
            </div>
            `;

            container.appendChild(card);
        });
    } catch(error){
        console.error("Error loading events:", error);
    }
});