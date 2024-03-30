// import { api, requestConfig } from "../lib/config";

// const postHabit = async (data: any) => {
//   const config = requestConfig("POST", data);

//   try {
//     const res = await fetch(api + "/", config)
//       .then((res) => res.json())
//       .catch((err) => err);

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getSummary = async () => {
//   const config = requestConfig("GET", null);

//   try {
//     const res = await fetch(api + "/summary", config)
//       .then((res) => res.json())
//       .catch((err) => err);

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getHabitDay = async (date: string) => {
//   const config = requestConfig("GET", null);

//   try {
//     const url = new URL(api + "/day");
//     url.searchParams.append("date", date);

//     const res = await fetch(url.toString(), config);
//     const data = await res.json();

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const pacthToggleHabit = async (habitId: string, date: string) => {
//   const config = requestConfig("PATCH", null);

//   try {
//     const res = await fetch(api + `/${habitId}/toggle?date=${date}`, config)
//       .then((res) => res.json())
//       .catch((err) => err);

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const habitService = {
//   postHabit,
//   getSummary,
//   getHabitDay,
//   pacthToggleHabit,
// };

// export default habitService;
