const validateUserData = (userData, fileData) => {
  const errors = {};

  // Validate name
  if (
    !userData.name ||
    typeof userData.name !== "string" ||
    userData.name == "undefined"
  ) {
    errors.name = "Invalid or missing name";
  }

  // Validate age
  if (
    !userData.age ||
    isNaN(parseInt(userData.age, 10)) ||
    userData.age == "undefined"
  ) {
    errors.age = "Invalid or missing age";
  }

  // Validate gender
  const allowedGenders = ["Male", "Female", "Other"];
  if (
    !userData.gender ||
    !allowedGenders.includes(userData.gender) ||
    userData.gender == "undefined"
  ) {
    errors.gender = "Invalid or missing gender";
  }

  // Validate country
  if (
    !userData.country ||
    typeof userData.country !== "string" ||
    userData.country == "undefined"
  ) {
    errors.country = "Invalid or missing country";
  }

  // Validate profileImg
  if (userData.profileImg == "undefined") {
    errors.profileImg = "Please upload profile image";
  }

  return errors;
};

module.exports = {
  validateUserData,
};
