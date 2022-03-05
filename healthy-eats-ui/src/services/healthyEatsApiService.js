import HttpService from "./httpService";

class _HealthyEatsApiService {
//
  async getSavedRecipes(userId) {

    const savedRecipes = await HttpService.get(`/api/savedRecipes/userId/${userId}`, null);

    return savedRecipes;
  }

  async createSavedRecipes(userId, recipeId, foodTitle, foodImage, calories) {

    const res = await HttpService.post('/api/savedRecipes', null,
      {
        'userId': userId,
        'recipeId': recipeId,
        'foodTitle': foodTitle,
        'foodImage': foodImage,
        'calories': calories
      });

    return res;
  }

  async deleteSavedRecipes(userId, recipeId) {

    const res = HttpService.delete('/api/savedRecipes', { 'userId': userId, 'recipeId': recipeId })

    return res;
  }
  async addNewRecipe(userId, newRecipe) {

    const res = HttpService.put('/api/savedRecipes/new', { 'userId': userId, 'newRecipe': newRecipe })

    return res;
  }
  
  async getNewRecipes(userId){
    console.log("user id is", userId)
    const res = await HttpService.get(`/api/savedRecipes/createdRecipes/userId/${userId}`,)
    
    return res;
  }

  

  async getLikedRecipes(userId) {

    const recipeIds = await HttpService.get(`/api/likedRecipes/userId/${userId}`, null);

    return recipeIds;
  }

  async createLikedRecipes(userId, recipeId) {

    const res = HttpService.post('/api/likedRecipes', null, { 'userId': userId, 'recipeId': recipeId })

    return res;
  }

  async deleteLikedRecipes(userId, recipeId) {

    const res = HttpService.delete('/api/likedRecipes', { 'userId': userId, 'recipeId': recipeId })

    return res;
  }

  async createShoppingList(ingredients) {

    const res = await HttpService.post('/api/shoppingLists', ingredients);

    return res;
  }

  async deleteShoppingListItem(ingredientId) {

    const res = await HttpService.delete(`/api/shoppingLists/${ingredientId}`);

    return res;
  }

  async updateShoppingListItem(ingredient) {

    const res = await HttpService.put('/api/shoppingLists', ingredient);

    return res;
  }

  async getShoppingList(userId) {

    const recipeIds = await HttpService.get(`/api/shoppingLists/userId/${userId}`, null);

    return recipeIds;
  }


}

const HealthyEatsApiService = new _HealthyEatsApiService();
export default HealthyEatsApiService;