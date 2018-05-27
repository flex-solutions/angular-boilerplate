import { Injectable } from '@angular/core';

export interface IPubSubConfig {
    host: string;
}

@Injectable()
export class PubSubConfigService {

    private _config: IPubSubConfig;

    public get config() {
        return this._config;
    }

    public set config(v: IPubSubConfig) {
        this._config = v;
    }
}
