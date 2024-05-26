// Hooks
import { useEffect, useState } from "react";

// Api
import { getHabitMetrics } from "../../services/habitsService";

// Components
import * as Select from "@radix-ui/react-select";
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
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [isStartDateInitialized, setIsStartDateInitialized] = useState(false);

  const created = dayjs(details?.habit.createdAt).format("DD/MM/YYYY");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await getHabitMetrics(id, startDate, endDate);
        setDetails(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, startDate, endDate]);

  useEffect(() => {
    if (details && !isStartDateInitialized) {
      setStartDate(dayjs(details.habit.createdAt).format("YYYY-MM-DD"));
      setIsStartDateInitialized(true);
    }
  }, [details, isStartDateInitialized]);

  useEffect(() => {
    const updateDateRange = () => {
      switch (selectedPeriod) {
        case "thisYear":
          setStartDate(dayjs().startOf("year").format("YYYY-MM-DD"));
          setEndDate(dayjs().format("YYYY-MM-DD"));
          break;
        case "thisMonth":
          setStartDate(dayjs().startOf("month").format("YYYY-MM-DD"));
          setEndDate(dayjs().format("YYYY-MM-DD"));
          break;
        case "thisWeek":
          setStartDate(dayjs().startOf("week").format("YYYY-MM-DD"));
          setEndDate(dayjs().format("YYYY-MM-DD"));
          break;
        case "all":
        default:
          setStartDate(dayjs(user.createdAt).format("YYYY-MM-DD"));
          setEndDate(dayjs().format("YYYY-MM-DD"));
          break;
      }
    };

    updateDateRange();
  }, [selectedPeriod, user.createdAt]);

  return (
    <main className="w-full ml-1">
      {details ? (
        <>
          <div>
            <h1 className="text-3xl flex items-center justify-center font-bold h-12 border-b border-violet-600 ">
              Detalhes
            </h1>
          </div>
          <section className="flex items-center justify-between">
            <h4 className="text-sm font-semibold flex gap-2 p-2">
              <FaCalendar size={20} />
              Criado em {created}
            </h4>

            <section className="flex items-center justify-end">
              {details.habit.weekDays.map((day: any) => (
                <p
                  className="text-sm font-semibold bg-violet-600 rounded-sm mr-2 p-1"
                  key={day}
                >
                  {availableWeekDaysAbv[day].toUpperCase()}
                </p>
              ))}
            </section>
          </section>
          <h2 className="text-center text-xl font-bold mt-3">
            {details.habit.title}
          </h2>
          <section className="flex justify-center items-center gap-2">
            <div className="flex flex-col justify-center items-center">
              <article className="text-center">
                <h3>Dias</h3>
                <h3>Disponíveis</h3>
              </article>
              <span className="text-4xl font-bold">{details.available}</span>
            </div>

            <div>
              <CircularProgressbar
                completed={details.completed}
                available={details.available}
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <article className="text-center">
                <h3>Dias</h3>
                <h3>Completados</h3>
              </article>
              <span className="text-4xl font-bold">{details.completed}</span>
            </div>
          </section>

          <div className="flex justify-center items-center mt-2">
            <Select.Root
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
            >
              <Select.Trigger className="font-bold bg-violet-600 rounded-md p-2 cursor-pointer focus:outline-none">
                <Select.Value placeholder="Todo o período" />
              </Select.Trigger>
              <Select.Content className="font-bold bg-violet-600 rounded-md p-2 cursor-pointer animate-fadeIn">
                <Select.Viewport>
                  <Select.Group>
                    <Select.Item
                      value="all"
                      className="focus:outline-none hover:opacity-75"
                    >
                      <Select.ItemText>Todo o período</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="thisYear"
                      className="focus:outline-none hover:opacity-75"
                    >
                      <Select.ItemText>Este ano</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="thisMonth"
                      className="focus:outline-none hover:opacity-75"
                    >
                      <Select.ItemText>Este mês</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="thisWeek"
                      className="focus:outline-none hover:opacity-75"
                    >
                      <Select.ItemText>Esta semana</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center mt-16">
          <PiCursorClick size={70} />
          <p className="text-2xl font-bold">
            Selecione um hábito para ver os detalhes
          </p>
        </div>
      )}
    </main>
  );
};

export default HabitMetrics;
