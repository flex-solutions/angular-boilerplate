export interface ScheduledNotificationView {
  id: string;
  name: string;
  title: string;
  content: string;
  schedule: string;
  lastRunDate: string;
  type: number;
  days: number;
  timeToPush: string;
}
