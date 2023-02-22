const generateActivityText = (activity) => {
  let pronoun = "their";

  switch (activity) {
    case "profile picture":
      return `updated ${pronoun} profile picture`;
    case "dob":
      return `updated ${pronoun} date of birth`;
    default:
      return "";
  }
};

export default generateActivityText;
