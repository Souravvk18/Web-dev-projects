const APIURL = 'https://api.github.com/users/';
const main = document.querySelector('#main');
const searchBox = document.querySelector('#search')


const getUser = async(username) => {
    const response = await fetch(APIURL + username)
    const data = await response.json()
    console.log(data);
    const card = `
    <div class="card"> 
            <div>
                <img src="${data.avatar_url}" alt="florin pop" class="avatar">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2> <br>
                <p>${data.bio}</p> <br>
                <ul class="info">
                    <li> ${data.followers}<strong> Followers </strong></li>
                    <li> ${data.following}<strong> Following  </strong></li>
                    <li> ${data.public_repos}  <strong> Repos </strong></li>
                </ul> <br>
                <div id="repos">
                    
                </div>
            </div>
        </div>
     `
     main.innerHTML = card;
     getRepos(username)
}

// init call
// getUser('souravvk18');
getUser('Anuj-Kumar-Sharma');

const getRepos = async(username) => {
    const repos = document.querySelector('#repos')
    const response = await fetch(APIURL + username + '/repos')
    const data = await response.json();
    data.forEach(
        (item) => {
            const elem = document.createElement('a')
            elem.classList.add('repo')
            elem.href =item.html_url 
            elem.innerText = item.name
            elem.target = '_blank'
            repos.appendChild(elem)
        }
    )
    console.log(data);
}

const formSubmit = () =>{
    if(searchBox.value != '') {
        getUser(searchBox.value);
        searchBox.value = ''
    }
    return false;
}

searchBox.addEventListener( 'focusout',
    function () {
        formSubmit();
    })

/** <a href="#" class="repo" target="_blank"> Repo 1</a>
                    <a href="#" class="repo" target="_blank"> Repo 2</a>
                    <a href="#" class="repo" target="_blank"> Repo 3</a> */