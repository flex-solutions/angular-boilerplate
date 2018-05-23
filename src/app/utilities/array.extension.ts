import { Injectable, Predicate } from '@angular/core';
import * as _ from 'lodash';
import { isUndefined } from 'util';

class ArrayEx {
  constructor() { }

  /*
   Removes an item from an array using the lodash library
   */
  removeItemFromArray<T>(array: Array<T>, item: any) {
    _.remove(array, function (current) {
      return JSON.stringify(current) === JSON.stringify(item);
    });
  }

  removeItems<T>(array: Array<T>, predicate: Predicate<T>) {
    _.remove(array, predicate);
  }

  /*
   Finds a specific item in an array using a predicate and repsaces it
   */
  setItem<T>(array: Array<T>, predicate: Predicate<T>, item: T) {
    const _oldItem = _.find(array, predicate);
    if (_oldItem) {
      const index = _.indexOf(array, _oldItem);
      array.splice(index, 1, item);
    } else {
      array.push(item);
    }
  }

  getItem<T>(array: Array<T>, predicate: Predicate<T>) {
    const item = _.find(array, predicate);
    return item;
  }

  getLastItem<T>(array: Array<T>) {
    if (array == null || isUndefined(array)) {
      return null;
    }

    const lastIndex = array.length - 1;
    const lastItem = array[lastIndex];

    return lastItem;
  }

  /*
   Adds an item to zero index
   */
  addItemToStart<T>(array: Array<T>, item: any) {
    array.splice(0, 0, item);
  }

  addItem<T>(array: Array<T>, item: any) {
    array.push(item);
  }

  /*
   From an array of type T, select all values of type R for property
   */
  getPropertyValues<T, R>(array: Array<T>, property: string): R {
    const result = _.map(array, property);
    return <R>(<any>result);
  }

  /*
   Util method to serialize a string to a specific Type
   */
  getSerialized<T>(arg: any): T {
    return <T>JSON.parse(JSON.stringify(arg));
  }

  moveItem<T>(array: Array<T>, item: any) { }

  // check if an element exists in array using a comparer function
  inArray<T>(array: Array<T>, predicate: Predicate<T>) {
    const _oldItem = _.find(array, predicate);
    if (_oldItem) {
      return true;
    }
    return false;
  }

  // adds an element to the array if it does not already exist using a comparer
  // function
  addIfNotExist<T>(array: Array<T>, predicate: Predicate<T>, item: any) {
    if (!this.inArray(array, predicate)) {
      this.addItem(array, item);
    }
  }
}

const ArrayExtension = new ArrayEx();
Object.freeze(ArrayExtension);

export default ArrayExtension;
