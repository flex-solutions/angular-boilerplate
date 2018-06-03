export class SelectableModel<T> {
    isSelected: boolean;
    model: T;
}

export class SelectAndAddedModel<T> extends SelectableModel<T> {
    isAdded: boolean;
}
