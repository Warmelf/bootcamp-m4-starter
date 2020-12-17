import React, { Component } from 'react';
import store from '../../redux/store';
import FavoriteItem from './FavoriteItem';
import './Favorites.css';

class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [],
        isInputActive: true,
        isLinkActive: false,
        textLink: '#'
    }

    handleTitle = (event) => this.setState({ title: event.target.value });

    handleSaveList = () => {
        this.setState({ 
            isInputActive: false,
            isLinkActive: true
        });
        this.doPost();
    };

    doPost = () => {
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "title": this.state.title,
                "movies": this.state.movies.map(el => el.imdbID)
            })  
        })
            .then(res => res.json())
            .then(data => { 
                this.setState({ 
                    textLink: data.id
                });
            })  
    }

    componentDidMount() {
        store.subscribe(() => {
            const state = store.getState();
            this.setState({ 
                movies: [ ...state.filmList ] 
            });
        });
    }

    render() { 
        return (
            <div className="favorites">
                <input value={this.state.title}
                onChange={this.handleTitle} className="favorites__name" 
                disabled={this.state.isInputActive ? null : 'disabled'} />
                <ul className="favorites__list">
                    {this.state.movies.map((item) => (
                        <li key={item.imdbID}>
                            <FavoriteItem {...item} />
                        </li>
                    ))}
                </ul>
                <button type="button" 
                className={`favorites__save ${this.state.isLinkActive ? "favorites__none" : null}`}
                onClick={() => this.handleSaveList()}>Сохранить список</button>
                <a href={`http://localhost:3000/list/${this.state.textLink}`}
                className={`favorites__none ${this.state.isLinkActive ? "favorites__appear" : null}`}
                target="_blank">
                    Поделиться с друзьями :)
                </a>
            </div>
        );
    }
}
 
export default Favorites;