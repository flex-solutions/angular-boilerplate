import * as io from 'socket.io-client';
import { INotificationChannel, INotificationPublisher, INotificationSubscriber } from '../common';
import { PubSubMessageBase } from '../model';
import { IPubSubMessageParser } from './../parser';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

export class DefaultNotificationChannel<T extends PubSubMessageBase>
    implements INotificationChannel<T>, INotificationPublisher<T>, INotificationSubscriber<T> {

    publisher: INotificationPublisher<T> = this;
    subscriber: INotificationSubscriber<T> = this;

    constructor(protected channel: string, protected parser: IPubSubMessageParser,
        protected socketGetter: () => any ) {
    }

    publish(data: T, ...args): Promise<void> {
        return new Promise<void>(() => {
            let message = this.parser.parse(data, args);
            message = Object.assign(message, {
                timestamp: Date.now(),
                channel: this.channel
            });
            this.socketGetter().emit(this.channel, message);
        }).catch(this.handleException);
    }

    subscribe(callback: (data: T) => any) {
        this.socketGetter().on(this.channel, callback);
    }

    handleException(error: any): any {
        console.log('Publish message occured error.');
        console.log(error);
    }
}
