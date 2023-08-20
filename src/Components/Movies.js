import React, { Component } from "react";
import { movies } from "./getMovies";
import axios from 'axios';


export default class Movies extends Component {
    constructor()
    {
        super();
        this.state = {
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }
    async componentDidMount(){
        // side effect.
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a8f7a72e9784da4f55207b5176e84f9d&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        this.setState({
            movies:[...data.results]
        })
    }
    changeMovies = async()=>{
        let cPage = this.state.currPage;
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a8f7a72e9784da4f55207b5176e84f9d&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        this.setState({
            movies:[...data.results]
        })
    }
    handleRight= async()=>{
        let tempArr = [];
        for(let i = 1;i<=this.state.parr.length+1;i++){
            tempArr.push(i)
        }
        this.setState({
            parr:[...tempArr],
            currPage:this.state.currPage+1
        }, this.changeMovies)
        this.changeMovies();
    }
    handleLeft = async()=>{
        if(this.state.currPage != 1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
    }
    handleClick = (value)=>{
        if(value != this.state.currPage){
            console.log("I am called")
            this.setState({
                currPage:value
            }, this.changeMovies)
        }
    }
    handleFavourite=(movie)=>{
        let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m) => m.id != movie.id)
        }
        else{
            oldData.push(movie);
        }
        localStorage.setItem("movies-app", JSON.stringify(oldData))
        console.log(oldData)
        this.handleFavouriteState();
    }
    handleFavouriteState = ()=>{
        let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]")
        let temp  = oldData.map((movie) => movie.id);
        this.setState({
            favourites:[...temp]
        })
    }
  render() {
    // let movie = movies.results;
    return (
      <>
        {
            this.state.movies.length == 0 ?
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            :
            <div>
                <h3 className="text-center"><strong>Trending</strong></h3>
                <div className="movies-list">
                {
                    this.state.movies.map((movieObj) => (
                        <div className="card movies-card" onMouseEnter={()=>{
                            this.setState({
                                hover:movieObj.id
                            })
                        }}
                        onMouseLeave={()=>{
                            this.setState({
                                hover: ''
                            })
                        }}
                        >
                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}  alt={movieObj.title} className="card-img-top movies-img"/>
                            <h5 class="card-title movies-tittle">{movieObj.title}</h5>
                            <div className="button-wrapper" style={{display:'flex', width: '100%', justifyContent:'center'}}>
                                {
                                    this.state.hover == movieObj.id && 
                                    <a href="#" className = "btn btn-primary movies-button" onClick={()=>this.handleFavourite(movieObj)}>
                                    {this.state.favourites.includes(movieObj.id) ?"Remove from Favourites": "Add to Favourites"}
                                    </a>
                                }
                                
                            </div>
                        </div>
                    )) 
                }
                </div>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                        <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                        {
                            this.state.parr.map((value)=>(
                                <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                            ))
                        }
                        <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        }
      </>
    );
  }
}
/*
https://api.themoviedb.org/3/movie/popular?api_key=a8f7a72e9784da4f55207b5176e84f9d

*/