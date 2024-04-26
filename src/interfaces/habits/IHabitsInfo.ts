export interface HabitsInfo {
  possibleHabits: {
    id: string;
    userId: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}
