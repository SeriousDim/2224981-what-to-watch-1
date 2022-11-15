import {Link, useNavigate} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';
import FilmInfo from '../../types/film-info';
import {useAppSelector} from '../../hooks/store-hooks';
import AuthStatus from '../../const/auth-status';
import {MyListButton} from '../my-list-button/my-list-button';
import {useEffect, useState} from 'react';

type FilmHeaderProps = {
  film: FilmInfo,
  favorites: FilmInfo[]
}

function FilmHeader({film, favorites}: FilmHeaderProps) {
  const auth = useAppSelector((state) => state.userSlice.auth);
  const navigate = useNavigate();

  const [favoritesState, setFavoritesState] = useState(favorites);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setFavoritesState(favorites);
    }

    return () => {
      mounted = false;
    };
  }, [favorites]);

  return (
    <div className="film-card__desc">
      <h2 className="film-card__title">{film?.name}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{film?.genre}</span>
        <span className="film-card__year">{film?.released}</span>
      </p>

      <div className="film-card__buttons">
        <button className="btn btn--play film-card__button" type="button"
          onClick={() => {navigate(`/${AppRoutes.PlayerRoot}${film.id}`);}}
        >
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </button>
        <MyListButton favoriteNumber={favoritesState.length} film={film}/>
        {auth === AuthStatus.Auth && <Link to={AppRoutes.FilmsReview} className="btn film-card__button">Add review</Link>}
      </div>
    </div>
  );
}

export default FilmHeader;
