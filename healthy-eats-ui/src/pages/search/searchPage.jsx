import { useState } from "react";
import { RecipeCard } from "../../pages/recipes/recipeCard";
import HttpService from "../../services/httpService";
import './searchPage.scss'

export function SearchPage() {

  const [searchTerm, setsearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = function (params) {
    HttpService.get('https://www.themealdb.com/api/json/v1/1/search.php', { s: searchTerm })
      .then(res => {
        setRecipes(res?.meals ?? []);
      });
  };

  return (
    <div className="search-page">
      <div className="search-page-search">
        <input
          type="text"
          placeholder="Type meal name here..."
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)} />
        <button onClick={fetchRecipes} >Search</button>
      </div>
      <div className="search-page-grid">

        {recipes.map((recipe, index) => <RecipeCard key={`recipe-${recipe.idMeal}`}
          recipe={recipe}
        />
        )}


        {!recipes.length && <h2>No meals found! Try another word...</h2>}

      </div>
    </div>
  );
};