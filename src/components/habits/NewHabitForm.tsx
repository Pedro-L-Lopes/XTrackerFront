// Hooks
import { FormEvent, useState } from "react";

// Components
import * as Checkbox from "@radix-ui/react-checkbox";
import Message from "../utils/message/Message";

// Icons
import { FaCheck } from "react-icons/fa6";

// Api
import { postHabit } from "../../services/habitsService";

// Utils
import { availableWeekDays } from "../../utils/week-days";

const NewHabitForm = () => {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  async function createNewHabit(e: FormEvent) {
    e.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    const habit = {
      title: title,
      weekDays: weekDays,
    };

    try {
      await postHabit(habit);
      setTitle("");
      setWeekDays([]);
      setMessage({ text: "Hábito criado com sucesso!", type: "success" });
    } catch (error) {
      setMessage({ text: "Erro ao criar hábito.", type: "error" });
    }
    setTitle("");
    setWeekDays([]);
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedOne);
    }
  }

  return (
    <div>
      {message && <Message text={message.text} type={message.type} />}
      <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
        <label htmlFor="title" className="font-semibold leading-tight">
          Qual seu comprometimento?
        </label>

        <input
          type="text"
          id="title"
          placeholder="ex.: Exercícios, dormir bem, etc..."
          className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
          autoFocus
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="" className="font-semibold leading-tight mt-4">
          Qual a recorrência?
        </label>

        <div className="flex flex-col gap-2 mt-3">
          {availableWeekDays.map((weekDay, index) => (
            <Checkbox.Root
              key={weekDay}
              className="flex items-center gap-3 group focus:outline-none"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-teal-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <FaCheck size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{weekDay}</span>
            </Checkbox.Root>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          <FaCheck size={20} />
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default NewHabitForm;
