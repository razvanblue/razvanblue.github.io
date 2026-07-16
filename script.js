// ================= DATA STORE =================
const experiences = [
  {
    company: "Telenav",
    role: "Software Engineer",
    duration: "Nov 2019 - Jul 2025",
    description: "Responsible for improving the routing component in embedded navigation software and the map generation pipeline."
  }
];

const projects = [
  {
    title: "Desert Blade",
    tags: ["Unreal Engine 5", "C++", "Blender", "Photoshop"],
    description: "A 3D RPG learnig project with a fully functional combat system and enemy behavior built from scratch using C++.",
    bgImage: "images/projects/DesertBlade.jpg", 
    url: "https://github.com/razvanblue/DesertBlade"
  },
  {
    title: "Sly",
    tags: ["Unreal Engine 5", "Blueprints", "Blender", "Photopea"],
    description: "3rd place winner at Echo School Game Jam, built in 72 hours, Sly is a 3D survival game, about a fox outsmarting hunters in the woods in search of food for her starving cubs.",
    bgImage: "images/projects/slyFull.png", 
    url: "https://steven-rayker.itch.io/sly"
  }
];

// ================= DYNAMIC INJECTION ENGINE =================
const ABOUT_EXP_LIMIT = 1;  // Crop amount on About page
const ABOUT_PRJ_LIMIT = 1;  // Crop amount on About page

function renderHTML() {
  // 1. Render Experiences
  const expSummaryContainer = document.getElementById("experience-summary-list");
  const expFullContainer = document.getElementById("experience-full-list");

  expSummaryContainer.innerHTML = generateExpHTML(experiences.slice(0, ABOUT_EXP_LIMIT));
  expFullContainer.innerHTML = generateExpHTML(experiences);

  // 2. Render Projects
  const prjSummaryContainer = document.getElementById("projects-summary-list");
  const prjFullContainer = document.getElementById("projects-full-list");

  prjSummaryContainer.innerHTML = generatePrjHTML(projects.slice(0, ABOUT_PRJ_LIMIT));
  prjFullContainer.innerHTML = generatePrjHTML(projects);
}

function generateExpHTML(items) {
  return items.map(item => `
    <div class="experience-item">
      <div class="exp-company">${item.company}</div>
      <div class="exp-role">${item.role}</div>
      <div class="exp-duration">${item.duration}</div>
      <div class="exp-desc">${item.description}</div>
    </div>
  `).join("");
}

function generatePrjHTML(items) {
  return items.map(item => `
    <a href="${item.url}" class="project-card" style="background-image: url('${item.bgImage}');">
      <div class="project-content">
        <h3 class="project-title">${item.title}</h3>
        <div class="project-tags">
          ${item.tags.map(tag => `<span class="project-tag">${tag}</span>`).join("")}
        </div>
        <div class="project-desc">${item.description}</div>
        <div class="learn-more-btn">
          Learn More <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </div>
      </div>
    </a>
  `).join("");
}

// ================= SINGLE PAGE APPLICATION (SPA) ROUTER =================
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page-section");

navItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const targetPage = item.getAttribute("data-target");
    navigateTo(targetPage);
  });
});

function navigateTo(targetPageId) {
  // Update nav menu highlighted button
  navItems.forEach(nav => {
    if (nav.getAttribute("data-target") === targetPageId) {
      nav.classList.add("active");
    } else {
      nav.classList.remove("active");
    }
  });

  // Toggle visible section
  pages.forEach(page => {
    if (page.id === `${targetPageId}-page`) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });

  // Automatically scroll back to top on page change
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================= LIVE LOCAL TIME DISPLAY =================
function updateTime() {
  const now = new Date();
  const timeElement = document.getElementById("local-time");
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  const currentTimeString = now.toLocaleTimeString('en-US', options);
  timeElement.innerText = `Local Time: ${currentTimeString}`;
}

function scheduleTimeUpdate() {
  const now = new Date();
  const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds()) + 1;
  setTimeout(() => {
    updateTime(); // Run once at the top of the minute
    setInterval(updateTime, 60000); // Repeat every minute
  }, msUntilNextMinute);
}

// Initializations
document.addEventListener("DOMContentLoaded", () => {
  renderHTML();
  updateTime();
  scheduleTimeUpdate();
});