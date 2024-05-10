export const generateYearForUser = () => {
  // Retrieve user data from localStorage
  const userDataString = localStorage.getItem("user");

  if (!userDataString) {
    // Handle the case where user data does not exist in localStorage
    return [];
  }

  const userData = JSON.parse(userDataString);

  // Extract the account creation year and the current year
  const createdAtYear = new Date(userData.createdAt).getFullYear();
  const currentYear = new Date().getFullYear();

  // Create an array of years from the account creation year to the current year
  const years = [];
  for (let year = createdAtYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
};
