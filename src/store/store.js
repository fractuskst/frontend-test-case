import { configureStore, createSlice } from "@reduxjs/toolkit";
import recalcCart from "../utils/recalcCart";

const initialState = {
  products: [],
  cart: [],
  user: null,
  loading: false,
  error: null,
  cartCount: 0,
  totalPrice: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      recalcCart(state);
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      recalcCart(state);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
      }

      recalcCart(state);
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearCart: (state) => {
      state.cart = [];
      state.cartCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectProducts = (state) => state.app.products;
export const selectCart = (state) => state.app.cart;
export const selectCartCount = (state) => state.app.cartCount;
export const selectTotalPrice = (state) => state.app.totalPrice;
export const selectUser = (state) => state.app.user;
export const selectLoading = (state) => state.app.loading;
export const selectError = (state) => state.app.error;

export const { setProducts, addToCart, removeFromCart, updateQuantity, setUser, setLoading, setError, clearCart } =
  appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
