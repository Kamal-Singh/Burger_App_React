import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      const newIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredients = updateObject(state.ingredients, newIngredient);
      const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
      return updateObject(state, updateState);
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: Math.max(
            0,
            state.ingredients[action.ingredientName] - 1
          ),
          totalPrice:
            state.totalPrice -
            Math.max(0, INGREDIENT_PRICES[action.ingredientName]),
          building: true,
        },
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
