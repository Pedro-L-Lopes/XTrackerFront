import dayjs from "dayjs";

// Função para gerar datas a partir do início do ano
export function generateDatesFromYearBeginning(year: string) {
  const currentYear = dayjs().year();
  const specifiedYear = parseInt(year);

  const firstDayOfTheYear = dayjs(`${year}-01-01`);
  let firstSundayOfTheYear = firstDayOfTheYear.startOf("week");

  // Se o primeiro dia do ano não for domingo, ajustar para o domingo anterior mais próximo
  if (firstDayOfTheYear.day() !== 0) {
    const daysToSubtract = firstDayOfTheYear.day();
    firstSundayOfTheYear = firstDayOfTheYear.subtract(daysToSubtract, "day");
  }

  const today = dayjs(); // Obter a data atual

  const dates = [];
  let compareDate = firstSundayOfTheYear;

  while (compareDate.isBefore(today) || compareDate.isSame(today, "day")) {
    // Se é o ano atual ou um ano passado, limitar até a data atual ou até o último dia do ano
    if (specifiedYear === currentYear || specifiedYear < currentYear) {
      const lastDayOfYear = dayjs(`${specifiedYear}-12-31`);
      if (compareDate.isAfter(lastDayOfYear)) {
        break; // Sair do loop ao chegar ao último dia do ano especificado
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
