const list = document.getElementById("project-list");

async function loadProjects() {
    try{
        const response = await fetch(`https://api.github.com/users/ivan-grozni-2/repos`);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
          }

        const repos = await response.json();

        const projectRepos = repos.filter(repo => !repo.fork && repo.name!="skills-introduction-to-github");

        const grid = document.getElementById("projects-grid");

        grid.innerHTML = "";

        projectRepos.forEach(repo => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("reveal");


            card.innerHTML = `
            <h3> ${repo.name} </h3>
            <p>${repo.description?.trim()  || "no description avaliable"} </p>
            <a href = "${repo.homepage || repo.html_url}" target = "_blank" class = "btn"> View Project </a>
            <a href = "${repo.html_url}" target = "_blank" class = "btn-outline"> Source Code </a>
            `;

            grid.appendChild(card);
        });
    } catch(error){
        console.error("Error loading projects:", error);
        document.getElementById("projects-grid").innerHTML =
          `<p style="color:red;">⚠️ Could not load projects. (${error.message})</p>`;
    }
    
}

document.addEventListener("DOMContentLoaded", loadProjects);

function formatTitle(name){
    return name
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

loadProjects();

function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
  
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });

  }

  window.addEventListener("scroll", revealOnScroll);



  const darkToggle = document.getElementById("toogle-dark");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    darkToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    darkToggle.textContent = "🌙";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    darkToggle.textContent = "☀️";
  }
});