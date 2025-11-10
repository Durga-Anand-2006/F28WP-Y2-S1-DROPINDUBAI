document.addEventListener("DOMContentLoaded", initProfilePage);

async function initProfilePage() {
  console.log("Profile page initializing...");
  const user = getCurrentUser();
  console.log("Current user:", user);
  
  if (!user) return redirectToLogin();

  await loadUserProfile(user.id);
  await loadUserBookings(user.id);
  setupNavigation();
  setupLogout();
  setupModal();
}

/* -----------------------------
    USER MANAGEMENT
------------------------------ */

function getCurrentUser() {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;
  return JSON.parse(storedUser);
}

function redirectToLogin() {
  alert("Please log in first.");
  window.location.href = "login.html";
}

/* -----------------------------
    LOAD USER PROFILE
------------------------------ */

async function loadUserProfile(userId) {
  try {
    const res = await fetch(`http://localhost:3000/api/user/${userId}`);
    const data = await res.json();

    if (!data.success) throw new Error(data.message || "Failed to load user");

    const user = data.user;
    updateProfileUI(user);

  } catch (err) {
    console.error("Error loading user profile:", err);
    alert("Error loading your profile details.");
  }
}

function updateProfileUI(user) {
  document.getElementById("profile-username").textContent = user.FullName;
  document.getElementById("profile-email").textContent = user.Email;
  document.querySelector(".avatar").src = user.ProfilePicture || "images/profile.jpg";

  const firstName = user.FullName.split(" ")[0];
  document.getElementById("welcome-message").textContent = `Welcome back, ${firstName}!`;

  // Fill settings form
  document.getElementById("name").value = user.FullName;
  document.getElementById("email").value = user.Email;
}

/* -----------------------------
    LOAD USER BOOKINGS
------------------------------ */

async function loadUserBookings(userId) {
  console.log("Loading bookings for user:", userId);
  try {
    const res = await fetch(`http://localhost:3000/api/bookings/${userId}`);
    const data = await res.json();

    console.log("Bookings response:", data);

    if (!data.success) throw new Error("Failed to fetch bookings");

    // Render bookings in both dashboard and bookings section
    renderDashboardBookings(data.bookings);
    renderBookings(data.bookings);
  } catch (err) {
    console.error("Error loading bookings:", err);
  }
}

/* -----------------------------
    RENDER DASHBOARD BOOKINGS (upcoming only)
------------------------------ */

function renderDashboardBookings(bookings) {
  console.log("Rendering dashboard bookings:", bookings);
  
  const container = document.querySelector("#dashboard .dashboard-bookings");
  console.log("Dashboard container found:", container);
  
  if (!container) {
    console.error("ERROR: Dashboard container not found!");
    return;
  }

  container.innerHTML = "";

  // Filter for upcoming bookings only
  const today = new Date();
  const upcomingBookings = bookings.filter(b => {
    if (b.CheckIn) {
      return new Date(b.CheckIn) >= today;
    }
    return true; // Include bookings without dates
  }).slice(0, 3); // Show only first 3

  if (upcomingBookings.length === 0) {
    container.innerHTML = `<p>No upcoming bookings. Start exploring!</p>`;
    return;
  }

  upcomingBookings.forEach(b => {
    const card = createBookingCard(b);
    container.appendChild(card);
  });
}

/* -----------------------------
    RENDER ALL BOOKINGS
------------------------------ */

function renderBookings(bookings) {
  console.log("Rendering all bookings:", bookings);
  
  const container = document.querySelector("#bookings .booking-container");
  console.log("Bookings container found:", container);
  
  if (!container) {
    console.error("ERROR: Booking container not found!");
    return;
  }

  container.innerHTML = "";

  if (!bookings || bookings.length === 0) {
    container.innerHTML = `<p>No bookings yet. Start exploring and book your first experience!</p>`;
    return;
  }

  bookings.forEach(b => {
    const card = createBookingCard(b);
    container.appendChild(card);
  });

  console.log("Bookings rendered successfully!");
}

/* -----------------------------
    CREATE BOOKING CARD
------------------------------ */

function createBookingCard(b) {
  const card = document.createElement("div");
  card.classList.add("card");
  
  card.innerHTML = `
    <img src="${b.ImagePath || 'images/default.jpg'}" alt="${b.ItemName}">
    <div class="card-content">
      <h3>${b.ItemName}</h3>
      <p class="card-category">${capitalize(b.ItemType)}</p>
      <p class="card-location"> ${b.Location || 'N/A'}</p>
      <p class="card-date"> ${b.CheckIn ? formatDate(b.CheckIn) : formatDate(b.CreatedAt)}</p>
      ${b.Guests ? `<p class="card-guests"> ${b.Guests} guest${b.Guests > 1 ? 's' : ''}</p>` : ''}
      <p class="card-status status-${b.Status}">
        <span class="status-badge">${capitalize(b.Status)}</span>
      </p>
      <button class="view-btn" 
        data-id="${b.ID}" 
        data-image="${b.ImagePath || 'images/default.jpg'}" 
        data-name="${b.ItemName}" 
        data-location="${b.Location || 'N/A'}" 
        data-status="${b.Status}"
        data-type="${b.ItemType}"
        data-checkin="${b.CheckIn || ''}"
        data-checkout="${b.CheckOut || ''}"
        data-guests="${b.Guests || ''}">
        View Details
      </button>
    </div>
  `;
  
  return card;
}

/* -----------------------------
    NAVIGATION
------------------------------ */

function setupNavigation() {
  const navItems = document.querySelectorAll(".profile-nav li");
  const sections = document.querySelectorAll(".section");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const target = item.getAttribute("data-target");
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove("active"));
      item.classList.add("active");

      // Show target section
      sections.forEach(section => {
        section.classList.remove("section-active");
        if (section.id === target) {
          section.classList.add("section-active");
        }
      });
    });
  });
}

/* -----------------------------
    LOGOUT + SETTINGS
------------------------------ */

function setupLogout() {
  const logoutBtn = document.querySelector(".logout-btn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    alert("You've been logged out.");
    window.location.href = "login.html";
  });
}

/* -----------------------------
    MODAL HANDLING
------------------------------ */

function setupModal() {
  const modal = document.getElementById("bookingModal");
  const closeBtn = modal.querySelector(".close");

  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("view-btn")) {
      const data = e.target.dataset;
      openModal(data);
    }
  });

  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
}

function openModal(data) {
  const modal = document.getElementById("bookingModal");
  document.getElementById("modal-image").src = data.image || "images/default.jpg";
  document.getElementById("modal-title").textContent = data.name;
  document.getElementById("modal-status").textContent = `Status: ${capitalize(data.status)}`;
  document.getElementById("modal-location").textContent = `Location: ${data.location}`;
  
  // Add date info
  let dateInfo = "";
  if (data.checkin) {
    dateInfo = `${formatDate(data.checkin)}`;
    if (data.checkout) {
      dateInfo += ` - ${formatDate(data.checkout)}`;
    }
  }
  document.getElementById("modal-date").textContent = `Date: ${dateInfo}`;
  
  // Add description based on type
  const description = `This is a ${data.type || 'booking'} reservation. ${data.guests ? `Reserved for ${data.guests} guest(s).` : ''}`;
  document.getElementById("modal-description").textContent = description;
  
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("bookingModal").style.display = "none";
}

/* -----------------------------
    UTILS
------------------------------ */

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}