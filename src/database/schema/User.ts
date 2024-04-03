export interface User {
  Id: number
  ScooterId: number | null
  Account: string
  Password: string
  Salt: string
}
