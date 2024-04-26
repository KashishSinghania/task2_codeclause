document.getElementById('searchButton').addEventListener('click', searchRepositories);

function searchRepositories() {
    const searchInput = document.getElementById('searchInput').value;

    fetch(`https://api.github.com/search/repositories?q=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            displayRepositories(data.items);
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
        });
}

function displayRepositories(repositories) {
    const repositoriesSection = document.getElementById('repositories');
    repositoriesSection.innerHTML = '';

    repositories.forEach(repository => {
        const repositoryElement = document.createElement('div');
        repositoryElement.classList.add('repository');
        repositoryElement.innerHTML = `
            <h3>${repository.full_name}</h3>
            <p>${repository.description}</p>
            <p>Stars: ${repository.stargazers_count}</p>
            <p>Language: ${repository.language}</p>
        `;
        repositoryElement.addEventListener('click', () => {
            displayRepositoryDetails(repository);
        });
        repositoriesSection.appendChild(repositoryElement);
    });
}

function displayRepositoryDetails(repository) {
    const userProfileSection = document.getElementById('userProfile');
    userProfileSection.innerHTML = '';

    fetch(repository.owner.url)
        .then(response => response.json())
        .then(user => {
            const userProfile = document.createElement('div');
            userProfile.classList.add('user-profile');
            userProfile.innerHTML = `
                <img src="${user.avatar_url}" alt="Avatar" class="avatar">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <p>Followers: ${user.followers}</p>
                <p>Following: ${user.following}</p>
            `;
            userProfileSection.appendChild(userProfile);
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
}
