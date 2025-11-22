export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  oldprice?: number;
  rating: number;
  quantity: number;
}

export interface OrderData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postCode?: string;
  country: string;
  regionState?: string;
  cartItems: OrderItem[];
  totalAmount: number;
  deliveryMethod: string;
  paymentMethod: string;
}
