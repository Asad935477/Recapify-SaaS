type CoinsType = {
  coins: number;
};

type addUrlErrorType = {
  url?: string;
  user_id?: string;
};

type SummaryType = {
  url: string;
  user_id: number;
  title: string;
  id: string;
  created_at: Date;
  response?: string | null;
};
