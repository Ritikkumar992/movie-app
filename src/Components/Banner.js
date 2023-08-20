import { movies } from "./getMovies";

import React, {Component} from 'react'

export default class Banner extends Component{
    render(){
        let movie = movies.results[0]
        // let movie = ''
        // console.log(movie[0])
        return(
            
            movie == ''? 
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            :
            <div className="card banner-card">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}   alt={movie.title} classNameName="card-img-top banner-img"/>
                <h1 class="card-title banner-tittle">{movie.title}</h1>
                <p class="card-text banner-text">{movie.overview}</p>
            </div>
        )
    }
}