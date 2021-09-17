import { UserServiceService } from '../app/services/user-service.service';

export class SpyFactory {
  build<T>(obj: new (...args: any[]) => T): any {
    const res = {} as any;

    const keys = Object.getOwnPropertyNames(obj.prototype);
    keys.forEach(key => {
      res[key] = jest.fn().mockReturnValue({});
    });

    return res;
  }

  createSomething(): any {
    return this.build(UserServiceService);
  }
}
