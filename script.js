const list = document.getElementById("project-list");

async function loadProjects(){
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
}

function formatTitle(name){
    return name
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

loadProjects();