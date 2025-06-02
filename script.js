const list = document.getElementById("project-list");

async function loadProjects(){
    try{
        const GitJSON = await fetch('https://api.github.com/users/ivan-grozni-2/repos')
        const transJSON = await GitJSON.json();

        const portfolios = transJSON.filter(repo =>
        !["skills-introduction-to-github"].includes(repo.name)
        );

        //portfolios = transJSON;

        portfolios.forEach(element => {
            const card = document.createElement('div');
            card.classList.add('project-card');
            
            const description = element.description || 'No description provided.';
            const homepage = element.homepage || `https://${element.owner.login}.github.io/${element.name}/`;

            card.innerHTML = `
                <h3>${element.name.replace(/-/g, ' ')}</h3>
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
}

loadProjects();