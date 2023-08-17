function handleGenreDisplayAndSearch(url) {
    const searchField = document.querySelector('.search__field')
        

    // const search = document.querySelector('#search')
    // search.addEventListener('keydown', function(e) {
    //     if(e.key == 'Enter') {
            
    //     }
    // })
    search.addEventListener('input', function() {
        if(!this.value)  return
        while (searchField.firstChild) {
            searchField.firstChild.remove()
        }
        const query = this.value
        const encodedQuery = encodeURIComponent(query)
        const queryUrl = `/api/movies/?search=${encodedQuery}`
        fetch(queryUrl)
                  .then(resp => {
                    if(!resp.ok) {
                        throw new Error(`Error status: ${resp.status}`)
                    }
                    return resp.json()
                  })
                  .then(movies => {
                    if(!movies.length){
                        const p = document.createElement('p')
                        p.textContent = 'Нет подходящих результатов'
                        p.classList.add('no-results')
                        searchField.append(p)
                        return
                    }
                    movies.forEach(movie => {
                        const searchFieldItem = document.createElement('li')
                        searchFieldItem.classList.add('search__field-item')
                        const searchLink1 = document.createElement('a')
                        searchLink1.href = `/movie/${movie._id}`
                        searchLink1.classList.add('search__link')
                        const searchLink2 = document.createElement('a')
                        searchLink2.href = `/movie/${movie._id}`
                        searchLink2.classList.add('search__link')
                        const searchImgWrap = document.createElement('div')
                        searchImgWrap.classList.add('search__img-wrap')
                        const img = document.createElement('img')
                        img.src = `${url}${movie.poster_url}`
                        img.alt = `${movie.title} image`
                        searchLink1.append(img)
                        searchImgWrap.append(searchLink1)
                        const searchInfo = document.createElement('div')
                        searchInfo.classList.add('search__info')
                        const searchTitle = document.createElement('h3')
                        searchTitle.classList.add('search__title')
                        searchTitle.textContent = movie.title
                        searchLink2.append(searchTitle)
                        const searchRating = document.createElement('dl')
                        searchRating.classList.add('search__rating')
                        const searchRatingdt = document.createElement('dt')
                        searchRatingdt.textContent = 'Рейтинг'
                        const searchRatingdd = document.createElement('dd')
                        searchRatingdd.textContent = movie.rating
                        searchRating.append(searchRatingdt, searchRatingdd)
                        const searchGenres= document.createElement('ul')
                        searchGenres.classList.add('search__genres')
                        movie.genres.forEach(genre => {
                            const searchGenresItem = document.createElement('li')
                            searchGenresItem.classList.add('search__genres-item')
                            const searchGenresLink = document.createElement('a')
                            searchGenresLink.classList.add('search__genres-link')
                            searchGenresLink.href = `/movies/${genre}`
                            searchGenresLink.textContent = genre
                            searchGenresItem.append(searchGenresLink)
                            searchGenres.append(searchGenresItem)
                        })
                        searchInfo.append(searchLink2, searchRating, searchGenres)
                        searchFieldItem.append(searchImgWrap, searchInfo)
                        searchField.append(searchFieldItem)
                    })
                  })
                  .catch(err => console.log(err))
    })


    search.addEventListener('focus', () => {
        searchField.classList.remove('hidden')
      });
      
    search.addEventListener('blur', () => {
        setTimeout(() => {
            searchField.classList.add('hidden')
        }, 200);
      });

    const menuGenresWrap = document.querySelector('.menu__genres-wrap')
    const menuGenresList = menuGenresWrap.querySelector('.menu__genres-list')
    const menuGenres = menuGenresWrap.querySelector('.menu__genres')
    menuGenres.addEventListener('click', e => e.preventDefault())

    if(window.innerWidth > 700) {
        menuGenresWrap.addEventListener('mouseleave', function() {
            menuGenresList.classList.add('hidden')
        })
        menuGenresWrap.addEventListener('mouseenter', function() {
            menuGenresList.classList.remove('hidden')
        })
    } 
    else {
        let isMenuGenresClicked = false
        menuGenres.addEventListener('click', function() {
            if(isMenuGenresClicked)
            {
                isMenuGenresClicked = false
                menuGenresList.classList.add('hidden')
                return
            } 
            menuGenresList.classList.remove('hidden')
            isMenuGenresClicked = true
        })
    }
}