export interface Product {
  id: number;
  productname: string;
  productprice: string;
  productcategory: string;
  productdescription: string;
  productImageUrl: string;
}

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    productname: string;
    productprice: string;
    productcategory: string;
    productdescription: string;
    productImageUrl: string;
  }) => void;
}

export interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    productname: string;
    productprice: string;
    productcategory: string;
    productdescription: string;
    productImageUrl: string;
  }) => void;

  selectedProduct: Product | null;
}

export interface LearnMoreProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: {
    productname: string;
    productdescription: string;
    productprice: string;
    productcategory: string;
  };
}

export interface HeaderProps {
  onStaffStatus: (isStaff: number) => void;
}

export interface OrderProduct extends Product {
  orderquantity: number; 
}

export interface Order {
  id: number;
  user: {
    id: number;
    name: string;
  };
  totalPrice: number;
  status: string;
  createdAt: string;
  address: string;
  products: OrderProduct[];
}

export interface CartItem {
  id: number;
  productname: string;
  productprice: number;
  orderquantity: number;
  productImageUrl: string;
  totalPrice: number;
}

export interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
}

export interface CrudUsers{
  id: number;
  username: string;
  useremail: string;
  userphone: string;
  userpassword: string;
  useraddress: string;
  staff: number;
}

export interface FormValuesRegister {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export interface FormValuesLogin {
  email: string;
  password: string;
}

export interface ResetPasswordValues {
  password: string;
}

export interface ForgotValues{
  email: string;
}