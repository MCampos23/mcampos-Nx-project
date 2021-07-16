import { OrderItem } from './order-item';
import { User } from '@mcampos/users'

export class Order {
    id? : string;
    orderItems? : Array<OrderItem>;
    shippingAddress1? : string;
    shippingAddress2? : string;
    zip?: string;
    city? : string;
    country? : string;
    phone? : string;
    status?: number;
    totalPrice? : string;
    user? : User;
    dateOrdered? : string; 

}