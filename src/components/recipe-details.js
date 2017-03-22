import React, { Component } from 'react';
import $ from 'jquery';
import '../details.css';
import { Link } from 'react-router';

class Recipe extends Component {

  constructor() {
    super();

    this.state = {
      recipeDetails: {
        ingredients: []
      }
    }
  }

  componentWillMount() {
    console.log("recipe")
    // $(event.target).data('recipe_id)
    $.post(`http://localhost:3001/recipe`, { recipeDetails: this.props.params.id })
      .then(res => {
        let recipeDetails = JSON.parse(res);
        this.setState({
          recipeDetails: recipeDetails.recipe,
        })
        console.log(recipeDetails);
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    let ingredients = this.state.recipeDetails.ingredients;
    console.log(ingredients.length);
  let ingredientsList = ingredients.map(ingredient =>{
      return (
        <li>{ingredient} </li>
      )

    })
    return (
      <div>
        <nav className= "nav-styles"> Jacquis Fave Veg Recipes! </nav>
        <div className="row">

          <div className="col s12 m6" id="box-move">
            <div className="card">
              <span className="card-title" id="title-style">{this.state.recipeDetails.title}
              </span>
              <div className="card-image">
                <img className="resize-details-img" src={this.state.recipeDetails.image_url} />
                <div className="card-stacked">
                  <div className="card-action">
                   <Link to = {'/'}> Back to Main </Link>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>

              
                    <div className="col s12 m6">
                      <div className="card" id = "box2">
                        <span className="card-title" id="title-style">Ingredients
                        </span>
                       
                        <div>

                          <p>
                            The publisher for this particular favourite recipe is {this.state.recipeDetails.publisher}  </p>
                            <ol>
                              {ingredientsList}
                              </ol>
                              <div className = "recipe-steps">
                               <a href={this.state.recipeDetails.source_url} target="_blank" >Recipe Steps</a>
                            </div>
                        </div>
                      </div>
                    </div>
               

        </div>
      </div>


    );
  }
}

export default Recipe;