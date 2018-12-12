enum ScheduleType {
    Daily,

    Weekly,

    Monthly,

    AfterXDays
}

class ScheduledNotificationBase {
    type: ScheduleType;
    timeToPush: string;
    title: string;
    content: string;
}

class DailyScheduledNotification extends ScheduledNotificationBase {}

class WeeklyScheduledNotification extends ScheduledNotificationBase {
    dayOfWeek: string;
}

class MonthlyScheduledNotification extends ScheduledNotificationBase {
    dayOfMonth: string;
}

class AfterXDaysScheduledNotification extends ScheduledNotificationBase {
    days: number;
}

export {
    ScheduleType,
    DailyScheduledNotification,
    WeeklyScheduledNotification,
    MonthlyScheduledNotification,
    AfterXDaysScheduledNotification
};
