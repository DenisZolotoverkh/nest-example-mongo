/**
 * Abstract class representing a generic storage.
 * @template T The type of the entity to be stored.
 * @template ID The type of the entity's ID. Defaults to `string`.
 */
import { BaseEntity } from './base.entity';

export abstract class BaseStorage<T extends BaseEntity, ID> {
  /**
   * Finds an entity by its ID.
   * @param id The ID of the entity to find.
   * @returns A promise that resolves to the found entity, or null if not found.
   */
  abstract findById(id: ID): Promise<T | null>;

  /**
   * Creates a new entity in the storage.
   * @param data The entity to create.
   * @returns A promise that resolves to the created entity.
   */
  abstract create(data: Partial<T>): Promise<T>;

  /**
   * Deletes an entity by its ID.
   * @param id The ID of the entity to delete.
   * @returns A promise that resolves to the deleted entity.
   */
  abstract delete(id: ID): Promise<void>;

  /**
   * Updates an existing entity in the storage.
   * @param id The ID of the entity to delete.
   * @param data The data for updating the entity.
   * @returns A promise that resolves to the updated entity.
   */
  abstract update(id: ID, data: Partial<T>): Promise<T>;
}