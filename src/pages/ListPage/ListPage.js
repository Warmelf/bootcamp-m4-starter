import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        title: '',
        movies: []
    }

    componentDidMount() {
        const apiKey = '50212ff9';
        const id = this.props.match.params.id;
            fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
                .then(res => res.json())
                .then(data => {
                    this.setState({ 
                        title: data.title
                    })          
                    data.movies.forEach(element => {
                        fetch(`http://www.omdbapi.com/?i=${element}&apikey=${apiKey}`) 
                        .then(res => res.json()) 
                        .then(data => {
                            this.setState({
                                movies: [...this.state.movies, data]
                            })
                        })        
                    });
                           
            })
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={"https://www.imdb.com/title/"+item.imdbID} target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}

                </ul>
            </div>
        );
    }
}
 
export default ListPage;