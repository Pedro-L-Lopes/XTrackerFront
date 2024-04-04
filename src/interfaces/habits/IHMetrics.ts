export interface IHMetrics {
  habit: {
    id: string;
    title: string;
    createdAt: string;
    weekDays: string[];
  };
  available?: string;
  completed?: string;
}

export interface IHMetricsPorgress {
  available?: string;
  completed?: string;
}
