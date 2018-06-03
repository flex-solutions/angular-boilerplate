import { Subject, Observable } from 'rxjs';

export abstract class ObservableEventBase<T> {
    protected readonly subject: Subject<T>;
    observable: Observable<T>;
    constructor() {
        this.subject = new Subject<T>();
        this.observable = this.subject.asObservable();
    }

    public subscribe(next, error?, complete?) {
        return this.subject.subscribe(next, error, complete);
    }

    public unsubscribe() {
        this.subject.unsubscribe();
    }

    public publish(value: T) {
        this.subject.next(value);
    }

    public complete() {
        this.subject.complete();
    }
}
