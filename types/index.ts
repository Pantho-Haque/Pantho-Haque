export * from "./notification";
export * from "./services";
export * from "./resume";

export type TApiResponse<T> = {
  data?: T;
  message: string;
  ok: boolean;
  status: number;
};