export class ScheduledNotificationCreationData {
    static dayOfWeek = [
        { id: 1, name: 'Chủ nhật', messageCode: 'common-sunday' },
        { id: 2, name: 'Thứ 2', messageCode: 'common-monday' },
        { id: 3, name: 'Thứ 3', messageCode: 'common-tuesday' },
        { id: 4, name: 'Thứ 4', messageCode: 'common-wednesday' },
        { id: 5, name: 'Thứ 5', messageCode: 'common-thursday' },
        { id: 6, name: 'Thứ 6', messageCode: 'common-friday' },
        { id: 7, name: 'Thứ 7', messageCode: 'common-saturday' }
    ];
    static dayOfMonth = [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
        { id: 4, name: '4' },
        { id: 5, name: '5' },
        { id: 6, name: '6' },
        { id: 7, name: '7' },
        { id: 8, name: '8' },
        { id: 9, name: '9' },
        { id: 10, name: '10' },
        { id: 11, name: '11' },
        { id: 12, name: '12' },
        { id: 13, name: '13' },
        { id: 14, name: '14' },
        { id: 15, name: '15' },
        { id: 16, name: '16' },
        { id: 17, name: '17' },
        { id: 18, name: '18' },
        { id: 19, name: '19' },
        { id: 20, name: '20' },
        { id: 21, name: '21' },
        { id: 22, name: '22' },
        { id: 23, name: '23' },
        { id: 24, name: '24' },
        { id: 25, name: '25' },
        { id: 26, name: '26' },
        { id: 27, name: '27' },
        { id: 28, name: '28' },
        { id: 29, name: '29' },
        { id: 30, name: '30' },
        { id: 31, name: '31' }
    ];
    static timeToPushNotification = [
        { id: 0, name: '00h', friendlyName: '0:00 AM' },
        { id: 1, name: '01h', friendlyName: '1:00 AM' },
        { id: 2, name: '02h', friendlyName: '2:00 AM' },
        { id: 3, name: '03h', friendlyName: '3:00 AM' },
        { id: 4, name: '04h', friendlyName: '4:00 AM' },
        { id: 5, name: '05h', friendlyName: '5:00 AM' },
        { id: 6, name: '06h', friendlyName: '6:00 AM' },
        { id: 7, name: '07h', friendlyName: '7:00 AM' },
        { id: 8, name: '08h', friendlyName: '8:00 AM' },
        { id: 9, name: '09h', friendlyName: '9:00 AM' },
        { id: 10, name: '10h', friendlyName: '10:00 AM' },
        { id: 11, name: '11h', friendlyName: '11:00 AM' },
        { id: 12, name: '12h', friendlyName: '12:00 AM' },
        { id: 13, name: '13h', friendlyName: '1:00 PM' },
        { id: 14, name: '14h', friendlyName: '2:00 PM' },
        { id: 15, name: '15h', friendlyName: '3:00 PM' },
        { id: 16, name: '16h', friendlyName: '4:00 PM' },
        { id: 17, name: '17h', friendlyName: '5:00 PM' },
        { id: 18, name: '18h', friendlyName: '6:00 PM' },
        { id: 19, name: '19h', friendlyName: '7:00 PM' },
        { id: 20, name: '20h', friendlyName: '8:00 PM' },
        { id: 21, name: '21h', friendlyName: '9:00 PM' },
        { id: 22, name: '22h', friendlyName: '10:00 PM' },
        { id: 23, name: '23h', friendlyName: '11:00 PM' }
    ];
}

export interface IOption {
    id: any;
    name: string;
}
