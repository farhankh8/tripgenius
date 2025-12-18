/* ================= LOGIN FUNCTION ================= */
function loginUser() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  localStorage.setItem("userEmail", email);
  document.getElementById("loginCard").style.display = "none";
  document.getElementById("plannerCard").style.display = "block";
}

/* ================= DYNAMIC DAYS BASED ON BUDGET ================= */
function updateDays() {
  const daysSelect = document.getElementById("days");
  daysSelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.textContent = "Select trip duration";
  placeholder.disabled = true;
  placeholder.selected = true;
  daysSelect.appendChild(placeholder);

  for (let i = 1; i <= 15; i++) {
    const option = document.createElement("option");
    option.value = `${i} Day${i > 1 ? "s" : ""}`;
    option.textContent = `${i} Day${i > 1 ? "s" : ""}`;
    daysSelect.appendChild(option);
  }

  daysSelect.disabled = false;
}

/* ================= GENERATE PLAN ================= */
function generatePlan() {
  const destination = document.getElementById("destination").value.trim();
  const budget = parseInt(document.getElementById("budget").value);
  const daysStr = document.getElementById("days").value;

  const checkboxes = document.querySelectorAll("#preferences-container input[type='checkbox']:checked");
  const selectedPrefs = [...checkboxes].map(cb => cb.value);

  if (!destination || !budget || !daysStr || selectedPrefs.length !== 5) {
    alert("Please fill all fields and select exactly 5 travel preferences.");
    return;
  }

  const days = parseInt(daysStr.split(" ")[0]);

  const preferenceFocus = {
    "Beaches & Islands": "Beaches, coastal cafes, sunsets, and relaxed activities",
    "Mountains & Nature": "Nature spots, scenic views, waterfalls, and peaceful locations",
    "City Exploration": "City attractions, shopping areas, street food, and nightlife",
    "Culture & Heritage": "Heritage sites, museums, temples, and cultural landmarks",
    "Adventure Activities": "Adventure sports, trekking, and outdoor activities",
    "Food & Nightlife": "Local cuisine, restaurants, and vibrant nightlife",
    "Wildlife & Safaris": "National parks, safaris, and wildlife experiences",
    "Spiritual & Wellness": "Temples, ashrams, and wellness retreats",
    "Road Trips & Drives": "Scenic drives, road trips, and adventure routes",
    "Luxury & Premium Stays": "Luxury hotels, resorts, and premium experiences"
  };

  let budgetType = "";
  if (budget < 10000) {
    budgetType = "Low Budget – Budget stays & public transport.";
  } else if (budget <= 20000) {
    budgetType = "Medium Budget – Balanced comfort & experiences.";
  } else {
    budgetType = "High Budget – Comfortable stays with premium experiences.";
  }

  let timeAdvice = "";
  if (days <= 2) {
    timeAdvice = "Short trip – prioritize nearby attractions.";
  } else if (days <= 4) {
    timeAdvice = "Moderate trip – balance sightseeing & rest.";
  } else {
    timeAdvice = "Long trip – explore multiple regions at a relaxed pace.";
  }

  const planHTML = `
    <h2>Optimized Travel Plan</h2>
    <p><b>Destination:</b> ${destination}</p>
    <p><b>Total Budget:</b> ₹${budget}</p>
    <p><b>Duration:</b> ${daysStr}</p>
    <p><b>Travel Preferences:</b> ${selectedPrefs.join(", ")}</p>
    <hr>
    <p><b>Planning Focus:</b></p>
    <ul>
      ${selectedPrefs.map(p => `<li>${preferenceFocus[p]}</li>`).join("")}
    </ul>
    <p><b>Budget Strategy:</b> ${budgetType}</p>
    <p><b>Time Optimization:</b> ${timeAdvice}</p>
    <hr>
    <button class="primary-btn" onclick="clearPlan()">Start Over</button>
  `;

  document.getElementById("result").innerHTML = planHTML;
}

/* ================= CLEAR PLAN ================= */
function clearPlan() {
  document.getElementById("destination").value = "";
  document.getElementById("budget").value = "";
  document.getElementById("days").innerHTML = '<option disabled selected>Select budget first</option>';
  document.getElementById("days").disabled = true;
  document.getElementById("result").innerHTML = "";

  document.querySelectorAll("#preferences-container input[type='checkbox']").forEach(cb => (cb.checked = false));

  document.getElementById("loginCard").style.display = "block";
  document.getElementById("plannerCard").style.display = "none";
}
