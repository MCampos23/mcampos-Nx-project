import { OrderItem } from './order-item';


export class Order {
    id? : string;
    orderItems? : Array<OrderItem>;
    street?: string;
    shippingAddress1? : string;
    shippingAddress2? : string;
    zip?: string;
    city? : string;
    country? : string;
    phone? : string;
    status?: number;
    totalPrice? : string;
    user? : any;
    dateOrdered? : string; 
}