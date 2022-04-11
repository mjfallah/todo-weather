// ⬇ returns converted stored scheduled date to intended format like : Friday, April 1, 2022
export const changeDate = (date) => {
    return new Intl.DateTimeFormat("EN", {
      year: "numeric",
      month: "long",
      weekday: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  // ⬇ valid date of "today" is exported here
  const dateGenerator = new Intl.DateTimeFormat("EN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts();
  export const today = `${dateGenerator[4].value}-${dateGenerator[0].value}-${dateGenerator[2].value}`;

  // ⬇ used in adding todo and editing todo Modal componenets
  export const scrollHandler = () => {
    window.scrollTo(0, 0);
  };
  export const validationHandler = (event , setterFunction) => {
    if (event.target.value.trim().length) {
        setterFunction(true);
    } else {
        setterFunction(false);
    }
  };

// ⬇ returns the HEX color of a specefic label passed to it as a parameter
export const labelColorFinder = (toDoData , labelName) => {
  const desiredLabel = toDoData.labels.find((item) => item.name === labelName);
  if (desiredLabel) {
    return desiredLabel.color;
  } else {
    return "transparent";
  }
};

// ⬇ returns the HEX color of a specefic priority flag passed to it as a parameter
export const priorityColorFinder = (priorityName) => {
  switch (priorityName) {
    case "Priority 1":
      return "#ff0019";
    case "Priority 2":
      return "#dea437";
    case "Priority 3":
      return "#fffb00";
    case "Priority 4":
      return "#0995e6";
    case "Priority 5":
      return "#49d149";
    default:
      return "transparent";
  }
};
