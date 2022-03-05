import axios from 'axios'
import { useState, useEffect } from 'react'
import HealthyEatsApiService from '../../services/healthyEatsApiService';
import foodService from '../../services/foodService';
import styles from '../newRecipe/newRecipe.scss'
import { Grid, Container, Button } from "@mui/material";




export function NewRecipe(props) {

    const [recipeTitle, setRecipeTitle] = useState("Tomato Salad")
    const [recipeDescription, setRecipeDescription] = useState("Our cookbook, Love Real Food, is here! We have a surplus of tomatoes this summer, and it’s glorious.")
    const [recipeInstructions, setRecipeInstructions] = useState(" ½ cup chopped red onion (about ½ small red onion) 1 pint (12 ounces or 2 cups) cherry tomatoes, halved 1 pound additional tomatoes (about 1 large, 2 medium or 3 small), cut into bite-sized wedges")

    const [recipeImageUrls, setRecipeImageUrls] = useState("https://cookieandkate.com/images/2020/08/tomato-cucumber-salad-recipe-3-768x1154.jpg")
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [ingredient, setIngredient] = useState("")
    const [ingredientServings, setIngredientServings] = useState("1")
    const [ingredientUnit, setIngredientUnit] = useState()

    const [ingredientSelection, setIngredientSelection] = useState([])


    const setIsNewRecipeActive = props.handleClick;



    const [recipeServings, setRecipeServings] = useState("")

    const addRecipe=(e)=>{
        setIsNewRecipeActive(false);
        e.preventDefault()
       const newRecipe = {
           recipeTitle,
           recipeDescription,
           recipeInstructions,
           recipeImageUrls,
           recipeIngredients           
       }

       HealthyEatsApiService.addNewRecipe(sessionStorage.sessionUserId, newRecipe) 
        };
    
    const addIngredients=(e)=>{
        e.preventDefault()
        setRecipeIngredients([
            ...recipeIngredients,
            {
                "ingredient": ingredient,
                "ingredientServings" : ingredientServings,
                "ingredientUnit": ingredientUnit

            }
        ])
        setIngredient("")
        setIngredientServings("1")
        setIngredientUnit("Cups")


    }

    const deleteIngredient=(e)=>{
        e.preventDefault();
        setRecipeIngredients(
            recipeIngredients.filter(recipeIngredient=>recipeIngredient.ingredient !== e.target.value)
        )
    }
    
    const onIngredientChange=(e)=>{
        setIngredient(e.target.value)

        foodService.getIngredientsList(e.target.value)
        .then((results)=>{
            setIngredientSelection(results);

        })
        
    }


    return(
        <div className="overlay" >
            <div className="modal">
                <div className="exit-button">
                 <button onClick={props.handleClick}>Close</button> 
                </div>
                    <div className="header">
                        <h2> Add a new recipe!</h2>

                    </div>
                <form> 
                    <label>Recipe Title</label>
                    <input  
                    type="text"
                    value={recipeTitle}
                    onChange={(e) => setRecipeTitle(e.target.value)}
                    />
                    <label>Description</label>
                    <textarea
                    className="input-description" 
                    type="text"
                    value={recipeDescription}
                    onChange={(e) => setRecipeDescription(e.target.value)}
                    />
                    <label>Instructions</label>
                    <textarea  
                    type="text"
                    value={recipeInstructions}
                    onChange={(e) => setRecipeInstructions(e.target.value)}
                    />
                    <label>Add Picture</label>
                    <input  
                    type="url"
                    value={recipeImageUrls}
                    onChange={(e) => setRecipeImageUrls(e.target.value)}/>
                    <div className="form-ingredients">

                        <label>Add Ingredient</label>
                        <input  
                        type="text"
                        value={ingredient}
                        onChange={onIngredientChange}
                        list="ingredient-choices"
                        />
                        {ingredientSelection.length > 0 ?   <datalist id="ingredient-choices" >
                            <option>{ingredientSelection[0].name}</option>
                            <option>{ingredientSelection[1].name}</option>
                            <option>{ingredientSelection[2].name}</option>
                            <option>{ingredientSelection[3].name}</option>
                            <option>{ingredientSelection[4].name}</option>

                        </datalist> : null}
                      
                        <label>Ingredient Servings</label>
                        <input 
                        className = "servings-num" 
                        type="number" 
                        value={ingredientServings}
                        onChange={(e) => setIngredientServings(e.target.value)}
                        />
                            <select 
                            id="unit" 
                            name="unit" 
                            value={ingredientUnit} 
                            onChange={(e)=>setIngredientUnit}
                            >
                                <option value="Cups">Cups</option>
                                <option value="Tbsp">Tbsp</option>
                                <option value="Tsp">Tsp</option>
                                <option value="g">g</option>
                                <option value="Kg">Kg</option>
                                <option value="mL">mL</option>
                                <option value="L">L</option>
                            </select>
                    <button className= "add-ingredient-button"onClick={addIngredients}>+</button>
                    </div>

                    <div className = "ingredients-list">
                        {recipeIngredients.map((ingredient) => {
                            return (
                                <div className="ingredient" >
                                    
                                    <p>{ingredient.ingredient}</p>
                                    <p>{ingredient.ingredientServings}</p>
                                    <p>{ingredient.ingredientUnit}</p>
                                    <button className = "delete-button" value={ingredient.ingredient} onClick={(e)=>deleteIngredient(e)}>X</button>
                                </div>
                            );
                        })}
                    </div>

                    <label>How many servings does this meal serve?</label>
                    <input  
                    type="number"
                    value={recipeServings}
                    onChange={(e) => setRecipeServings(e.target.value)}
                    />
                    
                   <Button style={{backgroundColor: "#21b6ae"}}  sx={{ m: 4 }} variant="contained" className="add-recipe-button" onClick={addRecipe}>Add Recipe</Button>
                </form>
                
            </div>
        </div>
    )
}