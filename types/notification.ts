export type TNotificationContextType = {
  notify: (notify: TNotify) => void;
};

export type TNotificationPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type TNotificationMode = "info" | "error" | "success";

export type TNotificationType = {
  id: number;
  title: string;
  description: string;
  position?: TNotificationPosition;
  mode?: TNotificationMode;
  timeout?: number;
};

export type TNotify = {
  title: string;
  desc: string;
  position?: TNotificationPosition;
  mode?: TNotificationMode;
  timeout?: number;
};
