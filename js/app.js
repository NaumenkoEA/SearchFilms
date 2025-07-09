const searchInput = document.getElementById("input1");
const searchBtn = document.getElementById("searchBtn");
const moviesContainer = document.getElementById("moviesContainer");

const apiKey = '4cbb7df2';

searchBtn.onclick = async function () {
    const movieTitle = searchInput.value.trim();

    if (!movieTitle) {
        moviesContainer.innerHTML = "<p>Please enter movie title</p>";
        return;
    }

    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieTitle)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Заменяем throw на прямое обращение
            console.error(`HTTP error: ${response.status}`);
            moviesContainer.innerHTML = `<p>Server error: ${response.status}</p>`;
            return;
        }

        const data = await response.json();

        if (data.Response === "False") {
            moviesContainer.innerHTML = "<p>No movies found</p>";
        } else {
            moviesContainer.innerHTML = "";

            data.Search.forEach(movie => {
                const card = document.createElement("div");
                card.classList.add("card");

                const img = document.createElement('img');
                img.classList.add("img-fluid");
                img.src = movie.Poster !== 'N/A' ? movie.Poster : 'заглушка.jpg';
                img.alt = movie.Title;

                const desc = document.createElement("div");
                desc.classList.add("desc");

                const title = document.createElement("h3");
                title.textContent = movie.Title;

                const year = document.createElement("p");
                year.textContent = `Year: ${movie.Year}`;

                card.appendChild(img);
                card.appendChild(desc);
                desc.append(title, year);
                moviesContainer.append(card);
            });
        }
    } catch (err) {
        console.error('Network error:', err);
        moviesContainer.innerHTML = '<p>Network error. Check your connection.</p>';
    }
}