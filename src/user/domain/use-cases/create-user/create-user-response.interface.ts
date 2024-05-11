export interface CreateUserResponseInterface {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly archivedAt: Date | null
}
