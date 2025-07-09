const searchInput = document.getElementById("input1");
const searchBtn = document.getElementById("searchBtn");
const moviesContainer = document.getElementById("moviesContainer");

const apiKey = '4cbb7df2';
searchBtn.onclick = function () {
    const movieTitle = searchInput.value;
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === 'False') {
                moviesContainer.innerHTML = '<p>Not found</p>';
            } else {
                moviesContainer.innerHTML = "";
                data.Search.forEach(movie => {

                    const card = document.createElement("div");
                    card.classList.add("card");

                    const img = document.createElement('img');
                    img.classList.add("img-fluid");
                    img.src = movie.Poster !== 'N/A' ? movie.Poster : 'заглушка.jpg';

                    const desc = document.createElement("div");
                    desc.classList.add("desc");

                    const runTime = document.createElement("p");
                    runTime.textContent = `Runtime : ${movie.R}`;

                    const title = document.createElement("h3");
                    title.textContent = movie.Title;

                    const year = document.createElement("p");
                    year.textContent = `Year: ${movie.Year}`;


                    card.appendChild(img);
                    card.appendChild(desc);
                    desc.append(title);
                    desc.append(year);
                    desc.append(runTime);

                    moviesContainer.append(card);
                })
            }
        })
        .catch(error => console.log('Error', error));
}