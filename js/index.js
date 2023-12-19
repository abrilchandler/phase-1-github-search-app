document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    form.addEventListener("submit", (event) => searchUsers(event))
})

function searchUsers(event) {
    // get value in search bar
    const searchValue = document.getElementById("search").value
    // prevent default
    event.preventDefault()

    fetch(`https://api.github.com/search/users?q=octocat`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
    },  
})
  .then(resp => resp.json())
  .then(json => {

    const userList = document.getElementById("user-list")
      userList.innerHTML = ""
      displayUsers(json.items)
      const form = document.getElementById("github-form");
      form.reset()
    })
  }

  function displayUsers(users) {
    // display users
    const userList = document.getElementById("user-list")
    users.forEach((user) => {
      const li = document.createElement("li")
      li.innerHTML = `<a href="${user.html_url}">${user.login}</a>`
      userList.appendChild(li)
    })
  }


function searchRepo(searchString) {
    fetch(`https://api.github.com/users/${searchString}/repos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
}


function postRepo(searchString) {
    fetch(`https://api.github.com/users/${searchString}/repos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
      },
      body: JSON.stringify({
        searchString: "users"
      })
    })
      .then(resp => resp.json())
      .then(json => console.log(json))
  }
  