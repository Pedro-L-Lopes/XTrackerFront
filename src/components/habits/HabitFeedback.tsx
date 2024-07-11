import { useEffect, useState } from "react";
import { getHabitsForDay } from "../../services/habitsService";

const HabitFeedback = () => {
  const [completed, setCompleted] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  useEffect(() => {
    const today = new Date();

    const fetchData = async () => {
      try {
        const habitsData = await getHabitsForDay(today);
        setCompleted(habitsData.completedHabits.length);
        setAmount(habitsData.possibleHabits.length);
      } catch (error) {
        console.error("Erro ao buscar hábitos para o dia:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const completedPercentage =
      amount > 0 ? Math.round((completed / amount) * 100) : 0;

    const getHabitFeedback = (completedPercentage: number) => {
      if (completedPercentage === 0) {
        return "Você não completou nenhum hábito hoje, que tal começar agora? 😊";
      } else if (completedPercentage > 0 && completedPercentage <= 25) {
        return "Você completou poucos hábitos hoje. Vamos tentar melhorar amanhã! 💪";
      } else if (completedPercentage > 25 && completedPercentage <= 50) {
        return "Você completou alguns hábitos hoje. Bom começo, mas ainda há espaço para melhorar! 👍";
      } else if (completedPercentage > 50 && completedPercentage <= 70) {
        return "Parabéns, você progrediu muito hoje! Continue assim e você vai ainda mais longe! 🌟";
      } else if (completedPercentage > 70 && completedPercentage <= 99) {
        return "Excelente trabalho! Você completou a maioria dos seus hábitos hoje! 🏆";
      } else if (completedPercentage === 100) {
        return "Incrível! Você completou todos os seus hábitos hoje! 🎉";
      } else {
        return "Percentual inválido.";
      }
    };

    setFeedback(getHabitFeedback(completedPercentage));
  }, [completed, amount]);
  return <div className="max-w-96 text-center">{feedback}</div>;
};

export default HabitFeedback;
