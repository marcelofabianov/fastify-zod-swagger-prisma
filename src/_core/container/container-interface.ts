export interface ContainerInterface {
  register(): void
  get<T>(key: string): T
}
