import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch (`${process.env.REACT_APP_API_URL}&s=${title}`, {
            mode: 'cors'
        });
        const data = await response.json();
        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('Rapunzel');
    },[])

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }}
                />
                <img
                    src={SearchIcon}
                    alt='Search'
                    onClick={() => {
                        searchMovies(searchTerm)
                    }}
                />
            </div>

           {
            movies?.length > 0
            ? (
                <div className='container'>
                    {movies.map((movie)=> {
                        return <MovieCard movie={movie}/>
                    })}
                </div>
            ) : (
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>
            )
           }
        </div>
    );
}

export default App;
