import React, { useContext } from 'react';
import SearchForm from '../common/SearchForm/SearchForm';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

// import { moviesCardsData } from '../../../utils/constants';

function SavedMovies() {
  const currentUser = useContext(CurrentUserContext);
  const showLikedMovies = (moviescards) =>
    moviescards.filter((moviescard) =>
      moviescard.like.includes(currentUser._id),
    );

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        // moviescards={moviesCardsData}
        filterFunction={showLikedMovies}
        isSavedMovies={true}
      />
    </main>
  );
}

export default SavedMovies;
