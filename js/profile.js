
document.addEventListener("DOMContentLoaded", initProfilePage);

async function initProfilePage() {
  const user = getCurrentUser();
  if (!user) return redirectToLogin();

  await loadUserProfile(user.id);
  await loadUserBookings(user.id);
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

    // Update UI
    updateProfileUI(user);

  } catch (err) {
    console.error(" Error loading user profile:", err);
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
  try {
    const res = await fetch(`http://localhost:3000/api/bookings/${userId}`);
    const data = await res.json();

    if (!data.success) throw new Error("Failed to fetch bookings");

    renderBookings(data.bookings);
  } catch (err) {
    console.error(" Error loading bookings:", err);
  }
}

function renderBookings(bookings) {
  const container = document.querySelector("#bookings .booking-contaier");
  container.innerHTML = `<h3>Your Bookings</h3`;

  if (!bookings.length) {
    container.innerHTML += `<p>No bookings yet.</p>`;
    return;
  }

  bookings.forEach(b => {
    const card = document.createElement("div");
    card.classList.add("booking-card");
    card.innerHTML = `
      <div class="booking-info">
        <p class="booking-title">${capitalize(b.ItemType)}: ${b.ItemName}</p>
        <p>Date: ${b.CheckIn ? `${b.CheckIn} - ${b.CheckOut}` : b.CreatedAt.split('T')[0]}</p>
        <p>Status: <span class="status ${b.Status}">${b.Status}</span></p>
      </div>
      <button class="view-btn" 
        data-id="${b.ID}" 
        data-image="${b.ImagePath}" 
        data-name="${b.ItemName}" 
        data-location="${b.Location}" 
        data-status="${b.Status}">
        View Details
      </button>
    `;
    container.appendChild(card);
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
    alert("You’ve been logged out.");
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
      const { image, name, location, status } = e.target.dataset;
      openModal({ image, name, location, status });
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
  document.getElementById("modal-status").textContent = `Status: ${data.status}`;
  document.getElementById("modal-location").textContent = `Location: ${data.location}`;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("bookingModal").style.display = "none";
}

/* -----------------------------
 UTILS
------------------------------ */

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
