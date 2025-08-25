const list = document.getElementById("project-list");

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

const typingText = document.getElementById("typing-text");
const roles = [
  {name:"Frontend Developer", erasure : 0}, 
  {name:"React Entuz", erasure : 6, waiterase : 3000},  
  {name:"Entusia", erasure : 6},  
  {name:"Enthus", erasure : 0, typedelay : 250},  
  {name:"I like React", erasure : 0}, 
  {name:"MySQL User", erasure : 0}, 
  {name:"JavaScript Learner", erasure : 0}
];

let roleIndex = 0;
let charIndex = 0;

function typeeffect(){
  if (charIndex < roles[roleIndex].name.length){
    typingText.textContent += roles[roleIndex].name.charAt(charIndex);
    charIndex++;
    setTimeout(typeeffect, roles[roleIndex].typedelay ||100);
  }else{
    charIndex = typingText.textContent.length;
    setTimeout(eraseEffect, roles[roleIndex].waiterase || 2000);
  }
}

function eraseEffect(){
  if (charIndex > roles[roleIndex].erasure){
    typingText.textContent = typingText.textContent.substring(0, charIndex-1);
    charIndex--;
    setTimeout(eraseEffect, 50);

  }else{
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
    setTimeout(typeeffect,500)
  }
}

typeeffect();

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});