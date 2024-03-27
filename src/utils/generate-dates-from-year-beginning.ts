import dayjs from "dayjs";

export function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf("year").subtract(1, "day");
  const today = new Date();

  const dates = [];
  let compareDate = firstDayOfTheYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}

// import dayjs from "dayjs";

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

// import dayjs from "dayjs";

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
