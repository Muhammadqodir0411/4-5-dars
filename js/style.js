"use strict";
movies.splice(100);


// --- NORMALIZE ALL MOVIES ---//

const AllMovies = movies.map((movies) => {
    return {
        title: movies.title,
        year: movies.year,
        language: movies.language,
        categories: movies.categories,
        id: movies.imdbId,
        time: `${Math.floor(movies.runtime / 60)} soat ${movies.runtime % 60} daqiqa`,
        summary: movies.summary,
        link: `https://www.youtube.com/embed/${movies.youtubeId}`,
        maxImg: movies.bigThumbnail,
        minImg: movies.smallThumbnail,
        reating: movies.imdbRating,
    }
});

// --- RENDER ALL MOVIES FUNCTION --- //

function renderAllMovies() {
    AllMovies.forEach((el) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `  
        
        <img src="${el.minImg}" alt="img" class="card-img">
        <div class="card-body">
            <h2>${el.title}</h2>
            <ul class="list-unstyled">
                <li><strong>${el.year}</strong></li>
                <li><strong>${el.language}</strong></li>
                <li><strong>${el.reating}</strong></li>
                <li><strong>${el.categories}</strong></li>
                <li><strong>${el.time}</strong></li>
            </ul>
            <div class="social d-flex">
                <a href="${el.link}" target ="_blank" class="btn btn-danger">Trailers</a>
                <button class="btn btn-primary mx-1" data-read="${el.id}">Read more</button>
                <button class="btn btn-warning" data-add="${el.id}">Add bookmark</button>
            </div>
        </div>
              
        `;

        $('.wrapper').appendChild(card);
    })
}

renderAllMovies()


// --- FIND FILM FUNCTION --- //

const findFilm = (regexp) => {
    console.log(regexp);
    return AllMovies.filter((film) => {
        return film.title.match(regexp);
    });

}

console.log(findFilm())


$('#submitForm').addEventListener('submit', () => {
    $('.wrapper').innerHTML = `<span class="loader"></span>`;

    const searchValue = $('#filmName').value;

    const regexp = new RegExp(searchValue, "gi");
    const searchResult = findFilm(regexp);

    setTimeout(() => {
        if (searchResult.length > 0) {
            searchResultsRender(searchResult);
            $('.card-res').classList.remove('d-none');
            $('#res').innerHTML = `<strong>${searchResult.length}</strong> ta malumot topildi`;

            if (searchValue.length === 0) {
                $('.card-res').classList.add('d-none');
            }

        } else {
            $('.wrapper').innerHTML = `<h1 class = "text-danger">Malumot topilmadi</h1>`;
        }
    }, 1000)


});

function searchResultsRender(data = []) {

    $('.wrapper').innerHTML = "";

    data.forEach((el) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `  
        
        <img src="${el.minImg}" alt="img" class="card-img">
        <div class="card-body">
            <h2>${el.title}</h2>
            <ul class="list-unstyled">
                <li><strong>${el.year}</strong></li>
                <li><strong>${el.language}</strong></li>
                <li><strong>${el.reating}</strong></li>
                <li><strong>${el.categories}</strong></li>
                <li><strong>${el.time}</strong></li>
            </ul>
            <div class="social d-flex">
                <a href="${el.link}" target ="_blank" class="btn btn-danger">Trailers</a>
                <button class="btn btn-primary mx-1" data-read="${el.id}" >Read more</button>
                <button class="btn btn-warning" data-add="${el.id}">Add bookmark</button>
            </div>
        </div>
              
        `;

        $('.wrapper').appendChild(card);
    })
}



// --- moddal --- //

$(".wrapper").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-primary")) {
        const idMovie = e.target.getAttribute("data-read");
        showModal(idMovie);
        $('.modal-window').classList.remove('modal-hide');
    }
});

function showModal(ID) {

    const filmItem = AllMovies.filter((e) => {
        return e.id == ID;
    });


    filmItem.forEach((e) => {

        const row = createElement('div', 'row', `
    
       <div class="col-md-4">
                    <img src="${e.minImg}" alt="cover" class="img-fluid">
                 </div>
                 <div class="col-md-6">
                    <h4 class="text-primary">${e.title}</h4>
                    <ul class="list-group">
                       <li class="list-group-item">Rating : ${e.reating} </li>
                       <li class="list-group-item">Year: ${e.year}</li>
                       <li class="list-group-item">Runtime: ${e.time} </li>
                       <li class="list-group-item">Category: ${e.categories}  </li>
                    </ul>
                 </div>
                 <div class="col-md-12 mt-4">
                    <h4 class="text-danger">
                      ${e.title}
                    </h4>
                    <p>
                    ${e.summary}
                    </p>
                  
       </div>
 `);

        $('.modal-content').appendChild(row);

    })

}


$('#close').addEventListener('click', () => {
    console.log("ok");
    $('.modal-window').classList.add('modal-hide');
    $('.modal-content').innerHTML = "";
    console.log("ok");
})

window.addEventListener('click', (e) => {

    if (e.target.classList.contains('modal-window')) {
        $('#close').classList.toggle('animate')
        console.log("ok");
    }

})


$(".wrapper").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-warning")) {
        const idMovie = e.target.getAttribute("data-add");
        addBookmark(idMovie)
    }
});


function addBookmark(ID) {

    const bookmark = JSON.parse(localStorage.getItem("bookmark"));

    const filmItem = AllMovies.filter((e) => {
        return e.id == ID;
    });


    if (!bookmark.includes(filmItem[0])) {
        bookmark.push(filmItem[0])
    } else {
        alert('oldin qo\'shilgan')
    }

    localStorage.setItem('bookmark', JSON.stringify(bookmark));
    renderBookmark(bookmark);
}


// --- BOOKMARK RENDER --- //

function renderBookmark(bookmarks) {
    $(".bookmark").innerHTML = null
    bookmarks.forEach(e => {
        let div = createElement("div", "p-3 border bg-success mb-2", `
        <img with="160" height="160" class="" src="${e.minImg}" alt="img">
        <h4 class="mt-2">${e.title}</h4>
        <p><strong>${e.reating}</strong></p>
        <p><strong>${e.year}</strong></p>
        <p><strong>${e.time}</strong></p>  
        <button type="submit" id="${e.id}" class="delete w-100">delete</button>                       
        `
        );

        $(".bookmark").appendChild(div);
    })
}

$(".bookmark").addEventListener("click", e=> {
    let bookmarks = JSON.parse(localStorage.getItem("bookmark"));
    bookmarks = bookmarks.filter(el => el.id  !=e.target.id);
    localStorage.setItem('bookmark', JSON.stringify(bookmarks));
    renderBookmark(bookmarks);
})

let bookmarks = JSON.parse(localStorage.getItem("bookmark"));

renderBookmark(bookmarks);
