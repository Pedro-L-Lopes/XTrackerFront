// Hooks
import { useEffect, useState } from "react";

// Api
import { getHabitMetrics } from "../../services/habitsService";

// Components
import CircularProgressbar from "../utils/progress/CircularProgressbar";

// Interfaces
import { IHMetrics } from "../../interfaces/habits/IHMetrics";

// Icons
import { FaCalendar } from "react-icons/fa";
import { PiCursorClick } from "react-icons/pi";

// Utils
import dayjs from "dayjs";
import { availableWeekDaysAbv } from "../../utils/week-days";

// Redux
import { useSelector } from "react-redux";

type Props = {
  id: string;
};

const HabitMetrics = ({ id }: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  const [details, setDetails] = useState<IHMetrics | null>(null);
  const [startDate, setStartDate] = useState(
    dayjs(user.createdAt).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));

  const created = dayjs(details?.habit.createdAt).format("DD/MM/YYYY");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await getHabitMetrics(id, startDate!, endDate!);
        setDetails(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, startDate, endDate]);

  return (
    <main className="w-full ml-1">
      {details ? (
        <>
          <div className="">
            <h1 className="text-3xl flex items-center justify-center font-bold h-12 border-b border-violet-600 ">
              Detalhes
            </h1>
          </div>
          <section className="flex items-center justify-between">
            <h4 className="text-sm font-semibold flex gap-2 p-2">
              <FaCalendar size={20} />
              Criado em {created}
            </h4>

            {details && (
              <div className="flex items-center">
                {details?.habit.weekDays.map((day: any) => (
                  <p
                    className="text-sm font-semibold bg-violet-600 rounded-sm mr-2 p-1"
                    key={day}
                  >
                    {availableWeekDaysAbv[day].toUpperCase()}
                  </p>
                ))}
              </div>
            )}
          </section>
          <h2 className="text-center text-xl font-bold">
            {details?.habit.title}
          </h2>
          <section className="flex justify-center items-center">
            <div>
              <CircularProgressbar
                completed={details?.completed}
                available={details?.available}
              />
            </div>

            <section className="flex justify-center items-center gap-10 ml-5">
              <div className="flex flex-col justify-center items-center">
                <article className="text-center">
                  <h3>Dias</h3>
                  <h3>Disponíveis</h3>
                </article>
                <span className="text-4xl font-bold">{details?.available}</span>
              </div>

              <div className="flex flex-col justify-center items-center">
                <article className="text-center">
                  <h3>Dias</h3>
                  <h3>Completados</h3>
                </article>
                <span className="text-4xl font-bold">{details?.completed}</span>
              </div>
            </section>
          </section>

          <section className="font-bold flex items-center justify-center gap-2 mt-2">
            <div className="w-40 flex justify-between items-center bg-violet-600 p-1 rounded-sm">
              <input
                type="date"
                className="text-center bg-transparent"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
            </div>
            a
            <div className="w-40 flex justify-between items-center bg-violet-600 p-1 rounded-sm">
              <input
                type="date"
                className="text-center bg-transparent"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
            </div>
          </section>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center mt-16">
          <PiCursorClick size={70} className="" />
          <p className="text-2xl font-bold">
            Selecione um hábito para ver os detalhes
          </p>
        </div>
      )}
    </main>
  );
};

export default HabitMetrics;
