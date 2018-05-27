import { PubSubMessageBase } from './model';
import { IPubSubMessageParser } from './parser';
import { Injectable } from '@angular/core';

export interface IPubSubMessageParser {
    parse(message: PubSubMessageBase, ...args);
}

class DefaultParser implements IPubSubMessageParser {
    parse(message: PubSubMessageBase, ...args) {
        return message;
    }
}

@Injectable()
export class PubSubParsingService {
    private _parser: IPubSubMessageParser = new DefaultParser();

    public get parser() {
        return this._parser;
    }

    public set parser(v: IPubSubMessageParser) {
        this._parser = v;
    }
}
