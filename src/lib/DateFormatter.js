// function to format date
export const formatDate = (inputDate) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};
