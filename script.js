// script.js - Student Portal Logic (with password visibility toggle)

let currentUser = null;
let users = JSON.parse(localStorage.getItem("users") || '{}');

// Add password toggle event listener
window.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Show";
  toggleBtn.type = "button";
  toggleBtn.style.marginTop = "10px";
  toggleBtn.onclick = () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleBtn.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      toggleBtn.textContent = "Show";
    }
  };
  passwordInput.parentNode.insertBefore(toggleBtn, passwordInput.nextSibling);
});

function loginUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  
  if (users[username] && users[username].password === password) {
    currentUser = username;
    document.getElementById("login-page").classList.remove("active");
    document.getElementById("portal-page").classList.add("active");
    document.getElementById("user-greeting").textContent = `Welcome, ${username}`;

    if (username === "admin") {
      document.getElementById("admin-panel").style.display = "block";
      showStudentCredentials();
    } else {
      document.getElementById("admin-panel").style.display = "none";
    }

    loadSchoolLink();
    loadStaff();
    loadProgress();
    loadResources();
    loadFiles();
    loadAssignments();
    loadAnnouncements();
    loadLeaderboard();
    loadMotivation();
    loadNotes();
  } else {
    alert("Invalid login credentials.");
  }
}

function logoutUser() {
  currentUser = null;
  document.getElementById("portal-page").classList.remove("active");
  document.getElementById("login-page").classList.add("active");
}

function bulkRegister() {
  const studentData = document.getElementById("bulk-students").value.trim().split("\n");
  const list = document.getElementById("student-credentials");
  list.innerHTML = "";
  studentData.forEach(name => {
    const password = Math.random().toString(36).substring(2, 8);
    users[name] = { password, files: [], notes: "" };
    const li = document.createElement("li");
    li.textContent = `${name} - ${password}`;
    list.appendChild(li);
  });
  localStorage.setItem("users", JSON.stringify(users));
}

function showStudentCredentials() {
  const list = document.getElementById("student-credentials");
  list.innerHTML = "";
  for (let name in users) {
    if (name !== "admin") {
      const li = document.createElement("li");
      li.textContent = `${name} - ${users[name].password}`;
      list.appendChild(li);
    }
  }
}

function changeThemeColor(color) {
  document.body.style.backgroundColor = color;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function uploadProfilePic(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("profile-preview").src = reader.result;
    users[currentUser].profilePic = reader.result;
    localStorage.setItem("users", JSON.stringify(users));
  };
  reader.readAsDataURL(file);
}

function uploadFiles() {
  const files = document.getElementById("file-upload").files;
  if (!users[currentUser].files) users[currentUser].files = [];
  for (let file of files) {
    users[currentUser].files.push(file.name);
  }
  localStorage.setItem("users", JSON.stringify(users));
  loadFiles();
}

function loadFiles() {
  const list = document.getElementById("file-list");
  list.innerHTML = "";
  (users[currentUser].files || []).forEach(file => {
    const li = document.createElement("li");
    li.textContent = file;
    list.appendChild(li);
  });
}

function saveNotes() {
  users[currentUser].notes = document.getElementById("notepad").value;
  localStorage.setItem("users", JSON.stringify(users));
}

function loadNotes() {
  document.getElementById("notepad").value = users[currentUser].notes || "";
}

function calculate(expression) {
  try {
    document.getElementById("calc-result").textContent = eval(expression);
  } catch {
    document.getElementById("calc-result").textContent = "Error";
  }
}

function loadMotivation() {
  const quotes = [
    "Believe in yourself!",
    "You can do hard things.",
    "One step at a time.",
    "Push yourself, no one else will.",
    "The first step is always the hardest"
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("motivational-quote").textContent = quote;
}

function loadSchoolLink() {
  const link = localStorage.getItem("schoolLink") || "https://www.schoolandcollegelistings.com/ZW/Mvuma/351982298852572/Africa-Centre-For-Business-Studies---ACEBS-College";
  document.getElementById("schoolLink").href = link;
  document.getElementById("schoolLink").textContent = link;
}

function loadStaff() {
  const staffData = JSON.parse(localStorage.getItem("staffList") || '[]');
  const container = document.getElementById("staff-section");
  container.innerHTML = "<h4>Our Staff</h4>";
  staffData.forEach(staff => {
    const div = document.createElement("div");
    div.textContent = `${staff.name} - ${staff.role}`;
    container.appendChild(div);
  });
}

function loadResources() {
  const resources = [
    "https://papacambridge.com/",
    "https://www.savemyexams.com/",
    "https://znotes.org/"
  ];
  const list = document.getElementById("resources-list");
  list.innerHTML = "";
  resources.forEach(url => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = url;
    a.textContent = url;
    a.target = "_blank";
    li.appendChild(a);
    list.appendChild(li);
  });
}

function loadAssignments() {
  const assignments = ["Math Homework due Friday", "Read Chapter 3 in Science"];
  const list = document.getElementById("assignment-list");
  list.innerHTML = "";
  assignments.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    list.appendChild(li);
  });
}

function loadAnnouncements() {
  const announcements = ["Sports Day next week!", "Parent meeting this Thursday"];
  const list = document.getElementById("announcement-list");
  list.innerHTML = "";
  announcements.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    list.appendChild(li);
  });
}

function loadProgress() {
  const container = document.getElementById("progress-bars");
  container.innerHTML = "";
  const subjects = ["Math", "English", "Science"];
  subjects.forEach(subject => {
    const bar = document.createElement("div");
    bar.style.background = "#eee";
    bar.style.margin = "5px 0";
    const inner = document.createElement("div");
    const width = Math.floor(Math.random() * 100);
    inner.style.width = width + "%";
    inner.style.background = "#007bff";
    inner.style.color = "white";
    inner.textContent = `${subject}: ${width}%`;
    inner.style.padding = "5px";
    bar.appendChild(inner);
    container.appendChild(bar);
  });
}

function loadLeaderboard() {
  const board = ["Alice - 95", "Bob - 90", "Charlie - 85"];
  const list = document.getElementById("leaderboard-list");
  list.innerHTML = "";
  board.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    list.appendChild(li);
  });
}

function submitFeedback() {
  const text = document.getElementById("feedback-text").value;
  if (text) {
    alert("Thank you for your feedback!");
    document.getElementById("feedback-text").value = "";
  }
}
// Ensure admin exists with a default password
if (!users["admin"]) {
  users["admin"] = { password: "admin123", files: [], notes: "" };
  localStorage.setItem("users", JSON.stringify(users));
}
