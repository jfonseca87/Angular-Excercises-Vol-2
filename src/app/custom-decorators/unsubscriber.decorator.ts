export function Unsubscriber() {
  return function (constructor: Function) {
    const original = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function () {
      for (let prop in this) {
        const property = this[prop];
        // We can use this method when in component we use object subscription
        // if ( property && (typeof property.unsubscribe === "function") ) {
        //   property.unsubscribe();
        // }
        // We can use this method when we use a subject object and also takeuntil operator
        if (property && typeof property.unsubscribe === 'function') {
          property.next();
          property.complete();
        }
      }
      original &&
        typeof original === 'function' &&
        original.apply(this, arguments);
    };
  };
}
