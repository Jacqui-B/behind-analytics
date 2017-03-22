import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from 'jquery';
import './App.css';

//link to database in postgres and mongo so a user can add their own comments


//make a request for the recipe id that happens when the image is clicked on
//console log recipe id to the server to get hte server request
//know when the image is clicked that is only grabs the id and makes a get request
//using the recipe id and display it on recipe-details page

class App extends Component {
    constructor() {
        super();
        this.state = {
            count: -1,
            searchIndex: [],
            searchResults: [],
            recipeDetails: [],
        }
        this.findRecipes = this.findRecipes.bind(this);
        this.getRecipes = this.getRecipes.bind(this);
    }

    componentDidMount() {
        $.post(`http://localhost:3001/main`)
            .then(res => {
                let searchResults = JSON.parse(res);
                this.setState({
                    searchResults: searchResults.recipes,
                    count: searchResults.count

                })

            })

            .catch(error => {
                console.log(error);
            })
    }




    findRecipes(event) {
        this.setState({
            searchIndex: event.target.value,
        })
    }



    getRecipes(event) {
        event.preventDefault()
        $.post(`http://localhost:3001/`, { searchIndex: this.state.searchIndex })
            .then(res => {
                let searchResults = JSON.parse(res);
                console.log(searchResults);
                this.setState({
                    searchResults: searchResults.recipes,
                    count: searchResults.count

                })
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {

        let recipeResults
        if (this.state.count > 1) {
            recipeResults = this.state.searchResults.map((recipe, index) => {
                return (
                    <div key={index}>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <div className="card">
                                <div className="card-image">
                                    <div className="card-action">
                                        <Link to={"/recipe-details/" + recipe.recipe_id}>
                                            <span className="recipe-title"> {recipe.title}</span>
                                        </Link>
                                    </div>
                                    <Link to={"/recipe-details/" + recipe.recipe_id}>
                                        <img className="resized-photo" src={recipe.image_url} data-recipe_id={recipe.recipe_id} />

                                    </Link>
                                    <div className="card-action">
                                        <Link to={"/recipe-details/" + recipe.recipe_id} > Recipe Details
                                      </Link>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>




                );
            });
        }
        else if (this.state.count === 1) {
            recipeResults = <h3> No Recipes Found </h3>
        }

        return (
            <div className = "App">
                <form onSubmit={this.getRecipes}>
                    <input type="text" id="searchbar" placeholder="Search..." onChange={this.findRecipes} />
                </form>

                <div>
                </div>
                <div className = "boxes">
                    {recipeResults}
                </div>
            </div>


        );


    }

}

export default App;
