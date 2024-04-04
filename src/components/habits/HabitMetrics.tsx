// Hooks
import { useEffect, useState } from "react";

// Api
import { api } from "../../lib/api";

// Components
import CircularProgressbar from "../progress/CircularProgressbar";

// Interfaces
import { IHMetrics } from "../../interfaces/habits/IHMetrics";

// Icons
import { FaCalendar } from "react-icons/fa";
import { PiCursorClick } from "react-icons/pi";

// Utils
import dayjs from "dayjs";

type Props = {
  id: string;
};

const HabitMetrics = ({ id }: Props) => {
  const [details, setDetails] = useState<IHMetrics | null>(null);

  const created = dayjs(details?.habit.createdAt).format("DD/MM/YYYY");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await api.get(`/${id}/habitmetrics`);
        setDetails(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <main className="w-full ml-1">
      {details ? (
        <>
          <div>
            <h1 className="text-3xl text-center font-bold border-b border-violet-600">
              Detalhes
            </h1>
          </div>

          <h4 className="text-sm font-semibold flex gap-2 p-2">
            <FaCalendar size={20} />
            Criado em {created}
          </h4>

          <h2 className="text-center text-xl font-bold">
            {details?.habit.title}
          </h2>

          <div className="">
            <CircularProgressbar
              completed={details?.completed}
              available={details?.available}
            />
          </div>
          <section className="flex justify-center items-center gap-24">
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
