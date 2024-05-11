export interface UserInterface {
  getId(): string
  getName(): string
  getEmail(): string
  getCreatedAt(): Date
  getUpdatedAt(): Date
  getDeletedAt(): Date | null
  getArchivedAt(): Date | null
  isDeleted(): boolean
  isArchived(): boolean
  delete(): void
  archive(): void
  restore(): void
  activate(): void
}
