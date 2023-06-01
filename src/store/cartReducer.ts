import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image: string
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));

    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.price;
      }

      localStorage.setItem("cart", JSON.stringify(state.items));

    },
    decreaseQuantity: (state, action: PayloadAction<number>) =>{
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.price;
        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
        localStorage.setItem("cart", JSON.stringify(state.items));

      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));

    },
  
    checkout: (state) => {
      state.items = [];
      localStorage.removeItem("cart");

    },
    deleteAllItems: (state) => {
      state.items = [];
      localStorage.removeItem("cart");

    },
    loadCart: (state) => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        state.items = JSON.parse(cartData);
      }
    },
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, deleteItem ,checkout,deleteAllItems,loadCart} =
  cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectItemTotal = (itemId: number) => (state: { cart: CartState }) => {
  const item = state.cart.items.find((item) => item.id === itemId);
  return item ? item.totalPrice : 0;
};

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.totalPrice, 0);

export default cartSlice.reducer;