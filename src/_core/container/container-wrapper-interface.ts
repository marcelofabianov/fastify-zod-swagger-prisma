export interface ContainerWrapperInterface {
  add(key: string, value: unknown): void
  get(key: string): unknown
  has(key: string): boolean
}
