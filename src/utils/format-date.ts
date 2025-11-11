export const showFormatRangeDate = (
  startDate: Date | string,
  endDate: Date | string
) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
  };

  const startDateObj =
    typeof startDate === "string" ? new Date(startDate) : startDate;

  if (isNaN(startDateObj.getTime())) {
    return "Data inválida";
  }

  const endDateObj = typeof endDate === "string" ? new Date(endDate) : endDate;

  if (isNaN(endDateObj.getTime())) {
    return startDateObj.toLocaleDateString("pt-BR", options);
  }

  if (startDateObj.getDay() === endDateObj.getDay()) {
    return `${endDateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
    })}`;
  }

  return `${startDateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
  })} a ${endDateObj.toLocaleDateString("pt-BR", options)}`;
};
