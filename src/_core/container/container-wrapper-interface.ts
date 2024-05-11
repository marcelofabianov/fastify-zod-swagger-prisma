export interface ContainerWrapperInterface {
  add<T>(key: string, value: T): void
  get<T>(key: string): T
  has(key: string): boolean
}
