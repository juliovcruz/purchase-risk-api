import { CustomerModel } from './customer'

export interface TransactionModel {
  id: string
  value: number
  paid_at: string
  ip_location: string
  card_hold_name: string
  customer: CustomerModel
}
