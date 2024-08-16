import { BaseDto } from '../dtos';

export abstract class BaseConfig<T extends BaseDto<unknown>> {
  protected configs: T;

  protected constructor(data: Partial<T>, dtoCls) {
    this.configs = dtoCls.create(data);
  }
}