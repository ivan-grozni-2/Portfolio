const list = document.getElementById("project-list");

/*async function loadProjects(){
    try{
        const GitJSON = await fetch('https://api.github.com/users/ivan-grozni-2/repos')
        const transJSON = await GitJSON.json();

        const portfolios = transJSON
            .filter(repo => !["skills-introduction-to-github"].includes(repo.name))
            .sort((a, b) => new Date(b.update_at) - new Date(a.update_at));

        //portfolios = transJSON;



        portfolios.forEach(element => {
            const card = document.createElement('div');
            card.classList.add('project-card');
            
            const description = element.description?.trim() || 'No description provided yet.';
            const homepage = element.homepage || `https://${element.owner.login}.github.io/${element.name}/`;

            card.innerHTML = `
                <h3>${formatTitle(element.name)}</h3>
                <p>${description}</p>
                <p><strong>Language:</strong> ${element.language || 'N/A'}</p>
                <a href="${homepage}" target="_blank">Live Demo</a>
                <a href="${element.html_url}" target="_blank">GitHub</a>
            `;
      
            list.appendChild(card);
            
        });

    }
    catch(error) {
        list.innerHTML = `<p> error ${error.message}</p>`

    }
}*/

const GITUSER = "ivan-grozni-2";

async function loadProjects() {
    try{
        const response = await fetch(`https://api.github.com/users/${GITUSER}/repos`);
        const repos = await response.json();

        const projectRepos = repos.filter(repo => !repo.fork && repo.name!="skills-introduction-to-github");

        const grid = document.getElementById("projects-grid");

        grid.innerHTML = "";

        projectRepos.forEach(repo => {
            const link = document.createElement("a");
            link.setAttribute("href", `${repo.homepage || repo.html_url}` )
            link.classList.add("noline");
            
            
            const card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("reveal");


            link.innerHTML = `
            <h3> ${repo.name} </h3>
            <p>${repo.description?.trim()  || "no description avaliable"} </p>
            <a href = "${repo.homepage || repo.html_url}" target = "_blank" class = "btn"> View Project </a>
            <a href = "${repo.html_url}" target = "_blank" class = "btn-outline"> Source Code </a>
            `;

            
            grid.appendChild(card);
            card.append(link);
        });
    } catch(error){
        console.error("Error loading projects:", error);
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