export interface IOrder {
  currendPage: number
  pageSize: number
  orderList: any[]
  loading: boolean
}

// export interface orderListInParams  {
//   transactionId? : string
//   merchantTradeNo ?: string
//   timeRange?: any[]
//   orderStateGroup ?: number
//   page: number
//   pageSize: number
// }
export interface orderListInParams {
  admin: number
  status?: number
}

// export interface orderListOutParams {
//   id: string
//   merchantTradeNo: string
//   transactionId: string
//   paidAmount: string
//   payTime: string
//   orderState: number
// }

/**
 * @description 确认发货
 */
export interface confirmDeliveryInParams {
  number: string
}

/**
 * @description 取消发货
 */
export interface cancelDeliveryInParams {
  number: string
}

/**
 * @description 退款
 */
export interface refundInParams {
  number: string
  amount: number
  refundAmount: number
}
