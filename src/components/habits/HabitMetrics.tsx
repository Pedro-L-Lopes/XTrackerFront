import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import CircularProgressbar from "../others/CircularProgressbar";
import { IHMetrics } from "../../interfaces/habits/IHMetrics";

type Props = {
  id: string;
};

const HabitMetrics = ({ id }: Props) => {
  const [details, setDetails] = useState<IHMetrics | null>(null);

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
      <div>
        <h1 className="text-3xl text-center font-bold border-b border-violet-600">
          Detalhes
        </h1>
      </div>

      <h4 className="text-sm font-bold">Criado em: 02/02/2024</h4>

      <h2 className="text-center text-xl font-bold mt-5">Beber água</h2>

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
    </main>
  );
};

export default HabitMetrics;
