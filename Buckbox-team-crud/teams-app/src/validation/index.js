export const validation = (name, value) => {
  let arr = [];
  const integerRegex = /^\d+$/;

  switch (name) {
    case "name":
      if (!value?.trim()) {
        arr.push("Please enter team member name");
      }
      return arr;

    case "age":
      if (!value?.trim()) {
        arr.push("Please enter age");
      } else if (!integerRegex.test(value)) {
        arr.push("Please enter valid age");
      }
      return arr;

    case "gender":
      if (!value?.trim()) {
        arr.push("Please enter gender");
      }
      return arr;

    case "country":
      if (!value?.trim()) {
        arr.push("Please enter country");
      }
      return arr;

    case "profileImg":
      if (!value) {
        arr.push("Please upload profile image");
      }
      return arr;

    default:
      return arr;
  }
};
