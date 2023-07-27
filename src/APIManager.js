export const getTheCategories = async () => {
  const response = await fetch(`http://localhost:8088/categories`);
  const categories = await response.json();

  return categories;
};
