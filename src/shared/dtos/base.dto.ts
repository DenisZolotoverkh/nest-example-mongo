// Should be imported first or TypeError: Reflect.getMetadata is not a function
// error will be raised
import 'reflect-metadata';

import { plainToInstance } from 'class-transformer';
import { ValidationError } from '../errors';
import { validateSync } from 'class-validator';

/**
 * Abstract base class for Data Transfer Objects (DTOs).
 * Provides a static `create` method to instantiate and validate DTOs.
 *
 * @typeParam T - The type of the DTO extending this base class.
 */
export abstract class BaseDto<T> {

  /**
   * Creates an instance of the DTO, populates it with the provided input,
   * and validates the data. If validation fails, it throws a `ValidationError`.
   *
   * @param input - A partial object containing the properties to populate the DTO.
   * @returns An instance of the DTO, fully populated and validated.
   * @throws ValidationError - If validation errors are found.
   */
  static create<T extends object>(this: new () => T, input: Partial<T>): T {
    const data = plainToInstance(this, input, { strategy: 'excludeAll' });
    const errors = validateSync(data);
    if (errors.length > 0) throw new ValidationError(errors.toString());

    // TS does not recognize second plainToInstance signature (without an array)
    // and complains that returned expression type T[] is not assignable to type T
    return data as T;
  }
}