enum ScheduleType {
    Daily,

    Weekly,

    Monthly,

    DaysAreNotReturned
}

const getScheduleTypeName = (type: ScheduleType) => {
    switch (type) {
        case ScheduleType.Daily:
            return 'create-schedule-notification-schedule-daily';
        case ScheduleType.Weekly:
            return 'create-schedule-notification-schedule-weekly';
        case ScheduleType.Monthly:
            return 'create-schedule-notification-schedule-monthly';
        case ScheduleType.DaysAreNotReturned:
            return 'create-schedule-notification-schedule-days-are-not-returned';
    }
    return '';
};

class ScheduledNotificationBase {
    type: ScheduleType;
    timeToPush: string;
    title: string;
    content: string;
    member_filter: any;
}

class DailyScheduledNotification extends ScheduledNotificationBase {}

class WeeklyScheduledNotification extends ScheduledNotificationBase {
    dayOfWeek: string;
}

class MonthlyScheduledNotification extends ScheduledNotificationBase {
    dayOfMonth: string;
}

class CustomerAreNotReturnedXDaysScheduledNotification extends ScheduledNotificationBase {
    days: number;
}

export {
    ScheduleType,
    DailyScheduledNotification,
    WeeklyScheduledNotification,
    MonthlyScheduledNotification,
    CustomerAreNotReturnedXDaysScheduledNotification,
    getScheduleTypeName
};
