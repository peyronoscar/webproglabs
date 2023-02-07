import { safeFetchJson } from "./safeFetchJson";

const endpoints = [
  "http://localhost:8080/foundations/",
  "http://localhost:8080/proteins/",
  "http://localhost:8080/extras/",
  "http://localhost:8080/dressings/",
];

const fetchCategory = async (endpoint, controller) => {
  const categoryIngredients = await safeFetchJson(endpoint, {
    signal: controller.signal,
  });

  return Promise.all(
    categoryIngredients.map(async (ingredient) => {
      const ingredientRes = await safeFetchJson(`${endpoint}${ingredient}`, {
        signal: controller.signal,
      });

      return { [ingredient]: ingredientRes };
    })
  );
};

export const fetchInventory = async (controller) => {
  const categories = await Promise.all(
    endpoints.map((endpoint) => fetchCategory(endpoint, controller))
  );

  const ingredients = categories.reduce((accCategory, currCategory) => {
    const transformedIngredients = currCategory.reduce(
      (accIngredient, currIngredient) => {
        return { ...accIngredient, ...currIngredient };
      },
      {}
    );

    return { ...accCategory, ...transformedIngredients };
  }, {});

  return ingredients;
};
