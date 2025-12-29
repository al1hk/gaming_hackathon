export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  discountPercentage?: number;
  imageUrl: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface RouterContextType {
  push: (path: string) => void;
  pathname: string;
}