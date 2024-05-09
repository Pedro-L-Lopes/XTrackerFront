import dayjs from "dayjs";

// FIX: Last day of the year not loading - Fix in the future
export function generateDatesFromYearBeginning(year: string) {
  const currentYear = dayjs().year();
  const specifiedYear = parseInt(year);

  const firstDayOfTheYear = dayjs(`${year}-01-01`);
  const firstSundayOfTheYear = firstDayOfTheYear.startOf("week");

  // If the first day of the year is not a Sunday, adjust to the previous Sunday
  if (firstSundayOfTheYear.date() !== 1) {
    firstSundayOfTheYear.subtract(7, "day");
  }

  const today = dayjs(); // Get the current date

  const dates = [];
  let compareDate = firstSundayOfTheYear;

  while (compareDate.isBefore(today) || compareDate.isSame(today, "day")) {
    // If it's the current year, i.e., a future year, limit to the current date
    // If it's a past year, continue until the last day of the specified year
    if (specifiedYear === currentYear || specifiedYear < currentYear) {
      const lastDayOfYear = dayjs(`${specifiedYear}-12-31`);
      if (compareDate.isSame(lastDayOfYear, "day")) {
        break; // Exit the loop when reaching the last day of the specified year
      }
    }
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}

// import dayjs from "dayjs";

// export function generateDatesFromYearBeginning() {
//   const firstDayOfTheYear = dayjs().startOf("year").subtract(1, "day");
//   const today = new Date();

//   const dates = [];
//   let compareDate = firstDayOfTheYear;

//   while (compareDate.isBefore(today)) {
//     dates.push(compareDate.toDate());
//     compareDate = compareDate.add(1, "day");
//   }

//   return dates;
// }

// export function generateDatesFromYearBeginning() {
//   // Defina a data para o primeiro dia de 2023
//   const firstDayOfTheYear = dayjs("2023-01-01");

//   // Obtenha a data de hoje
//   const today = dayjs();

//   const dates = [];
//   let compareDate = firstDayOfTheYear;

//   while (compareDate.isBefore(today)) {
//     dates.push(compareDate.toDate());
//     compareDate = compareDate.add(1, "day");
//   }

//   return dates;
// }

// export function generateDatesFromYearBeginning(
//   startYear: number,
//   endYear: number
// ) {
//   const today = dayjs();
//   const currentYear = today.year();

//   // Verifique se o ano inicial está dentro do intervalo permitido
//   startYear = Math.max(startYear, currentYear - 1);

//   const dates: Date[] = [];

//   // Para cada ano a partir do ano inicial até o ano final
//   for (let year = startYear; year <= endYear; year++) {
//     // Defina a data para o primeiro dia do ano
//     const firstDayOfYear = dayjs(`${year}-01-01`);

//     // Defina a data para o último dia do ano
//     const lastDayOfYear = dayjs(`${year}-12-31`);

//     // Adicione datas até o final do ano
//     let currentDate = firstDayOfYear;
//     while (
//       currentDate.isBefore(lastDayOfYear) ||
//       currentDate.isSame(lastDayOfYear, "day")
//     ) {
//       dates.push(currentDate.toDate());
//       currentDate = currentDate.add(1, "day");
//     }
//   }

//   return dates;
// }
