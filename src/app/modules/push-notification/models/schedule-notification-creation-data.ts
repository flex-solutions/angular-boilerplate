export class ScheduledNotificationCreationData {
    static dayOfWeek = [
        { id: '1', name: 'Chủ nhật', messageCode: 'common-sunday' },
        { id: '2', name: 'Thứ 2', messageCode: 'common-monday' },
        { id: '3', name: 'Thứ 3', messageCode: 'common-tuesday' },
        { id: '4', name: 'Thứ 4', messageCode: 'common-wednesday' },
        { id: '5', name: 'Thứ 5', messageCode: 'common-thursday' },
        { id: '6', name: 'Thứ 6', messageCode: 'common-friday' },
        { id: '7', name: 'Thứ 7', messageCode: 'common-saturday' }
    ];
    static dayOfMonth = [
        { id: '1', name: '1' },
        { id: '2', name: '2' },
        { id: '3', name: '3' },
        { id: '4', name: '4' },
        { id: '5', name: '5' },
        { id: '6', name: '6' },
        { id: '7', name: '7' },
        { id: '8', name: '8' },
        { id: '9', name: '9' },
        { id: '10', name: '10' },
        { id: '11', name: '11' },
        { id: '12', name: '12' },
        { id: '13', name: '13' },
        { id: '14', name: '14' },
        { id: '15', name: '15' },
        { id: '16', name: '16' },
        { id: '17', name: '17' },
        { id: '18', name: '18' },
        { id: '19', name: '19' },
        { id: '20', name: '20' },
        { id: '21', name: '21' },
        { id: '22', name: '22' },
        { id: '23', name: '23' },
        { id: '24', name: '24' },
        { id: '25', name: '25' },
        { id: '26', name: '26' },
        { id: '27', name: '27' },
        { id: '28', name: '28' },
        { id: '29', name: '29' },
        { id: '30', name: '30' },
        { id: '31', name: '31' }
    ];
    static timeToPushNotification = [
        { id: '0', name: '00h' },
        { id: '1', name: '01h' },
        { id: '2', name: '02h' },
        { id: '3', name: '03h' },
        { id: '4', name: '04h' },
        { id: '5', name: '05h' },
        { id: '6', name: '06h' },
        { id: '7', name: '07h' },
        { id: '8', name: '08h' },
        { id: '9', name: '09h' },
        { id: '10', name: '10h' },
        { id: '11', name: '11h' },
        { id: '12', name: '12h' },
        { id: '13', name: '13h' },
        { id: '14', name: '14h' },
        { id: '15', name: '15h' },
        { id: '16', name: '16h' },
        { id: '17', name: '17h' },
        { id: '18', name: '18h' },
        { id: '19', name: '19h' },
        { id: '20', name: '20h' },
        { id: '21', name: '21h' },
        { id: '22', name: '22h' },
        { id: '23', name: '23h' }
    ];
}

export interface IOption {
    id: any;
    name: string;
}
