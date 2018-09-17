import { add, find, propEq, filter, forEach, isEmpty } from 'ramda';
import { map } from 'rxjs/operators';
import { INotificationChannel, INotificationChannelFactory, notificationToken } from '../common';
import { PubSubParsingService } from '../parser';
import { PubSubConfigService } from './../config';
import { PubSubMessageBase } from './../model';
import { DefaultNotificationChannel } from './notification';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { log } from 'util';

interface IChannel {
    channel: string;
    notification: INotificationChannel<any>;
    isConnected: boolean;
}

@Injectable()
export class NotificationChannelFactory implements INotificationChannelFactory {
    channels: IChannel[] = [];
    socket: any;
    constructor(private configService: PubSubConfigService, private parsingService: PubSubParsingService) {
    }

    public host() {
        this.socket = io(this.configService.config.host);
        this.socket.on('connect', () => {
        });
        this.socket.on('disconnect', () => {
        });
    }
    get<T extends PubSubMessageBase>(channel: string): INotificationChannel<T> {
        const channelNotification = find(propEq('channel', channel))(this.channels);
        if (channelNotification) {
            return channelNotification.notification;
        } else {
            const newNotification = new DefaultNotificationChannel<T>(channel, this.parsingService.parser, () => this.socket);
            const newChannel: IChannel = { channel, notification: newNotification, isConnected: this.socket.connected };
            this.channels.push(newChannel);
            return newNotification;
        }
    }
}

export const factoryProvider = {
    provide: notificationToken.CHANNEL_FACTORY,
    useClass: NotificationChannelFactory,
};
