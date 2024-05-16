// Hooks
import { useState } from "react";
// Components
import AllHabits from "./AllHabits";
import HabitMetrics from "./HabitMetrics";

const HabitsAndMetrics = () => {
  const [id, setId] = useState<string>("");

  const onChangeId = (id: string) => {
    setId(id);
  };

  return (
    <main className="bg-zinc-900 p-2 flex rounded-md mt-14">
      <AllHabits onChangeId={onChangeId} />
      <HabitMetrics id={id} />
    </main>
  );
};

export default HabitsAndMetrics;
