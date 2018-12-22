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

class ScheduledNotification {
    type: ScheduleType;
    timeToPush: string;
    name: string;
    title: string;
    content: string;
    memberFilter: any;
    memberFilterRaw: any;
    days: number;
}
export {
    ScheduleType,
    ScheduledNotification,
    getScheduleTypeName
};
