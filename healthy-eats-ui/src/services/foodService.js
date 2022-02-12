import appConfig from "../appConfig";
import { getParsableDate } from "./calendarService";
import HttpService from "./httpService";

const foodApiUrl = appConfig.foodApi.url;
const recipesBulkApiUrl = appConfig.foodApi.recipesBulkApiUrl;
const foodApiToken = appConfig.foodApi.key;

class _FoodService {
  async getRecipes(searchClause) {
    const count = 25;
    const res = await HttpService.get(foodApiUrl, {
      number: count,
      minCalories: 0,
      apiKey: foodApiToken,
      query: searchClause,
    });
    const product = res?.results;

    if (product instanceof Array) {
      return product.map((prd) => {
        const cal = prd.nutrition.nutrients.find(
          (it) => it.name === "Calories"
        );
        return {
          foodId: prd.id,
          foodTitle: prd.title,
          foodImage: prd.image,
          calories: cal?.amount ?? 0,
        };
      });
    }
    return [];
  }

  async saveDayOrder(payload) {
    HttpService.post("/api/orders", payload);
  }

  async getOrderedItemsMap(startDate, endDate) {
    const userId = sessionStorage.sessionUserId;
    const res = await HttpService.get("/api/orders", {
      userId,
      startDate,
      endDate,
    });

    const map = (res ?? []).reduce((acc, item) => {
      var jsItem = {
        id: item.id,
        orderDate: new Date(item.order_date),
        userId: item.user_id,
        detail: item.detail.map((it) => ({
          id: it.id,
          calories: it.calories,
          foodId: it.food_id,
          foodImage: it.food_image,
          foodTitle: it.food_title,
          meal: it.meal,
        })),
      };

      const pDate = getParsableDate(jsItem.orderDate);

      acc[pDate] = jsItem;

      return acc;
    }, {});

    return map;
  }

  async getRecipesBulk(recipeIds) {

    const recipes = [];

    const recipesBulk = await HttpService.get(recipesBulkApiUrl, {
      apiKey: foodApiToken,
      ids: recipeIds
    });

    if (recipesBulk) {
      recipesBulk.forEach(recipe => {
        recipes.push({
          foodId: recipe.id,
          foodTitle: recipe.title,
          foodImage: recipe.image
        })
      });
    }

    return recipes;
  }
}

const FoodService = new _FoodService();
export default FoodService;
