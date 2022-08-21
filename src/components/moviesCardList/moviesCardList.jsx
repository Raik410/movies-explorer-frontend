import React, {useState} from 'react';
import './moviesCardList.css';
import Preloader from "../Preloader/Preloader";
const MoviesCardList = ({ children }) => {

    const [loading, setLoading] = useState(false);

    return (
        <main className='movies-card-list'>
            {loading ? <Preloader /> : children}
        </main>
    );
};

export default MoviesCardList;