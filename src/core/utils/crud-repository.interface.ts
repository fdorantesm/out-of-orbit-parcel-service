export interface CrudRepository<Entity, Interface> {
  create(data: Interface): Entity | Promise<Entity>;
  find(filter: Partial<Interface>): Entity[] | Promise<Entity[]>;
  findOne(filter: Partial<Interface>): Entity | Promise<Entity>;
  update(
    filter: Partial<Interface>,
    data: Partial<Entity>,
  ): Entity | Promise<Entity>;
  delete(filter: Partial<Interface>): void;
}
