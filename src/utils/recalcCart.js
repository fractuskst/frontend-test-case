const recalcCart = (state) => {
  state.cartCount = state.cart.reduce((t, i) => t + i.quantity, 0);
  state.totalPrice = state.cart.reduce((t, i) => t + i.price * i.quantity, 0);
};

export default recalcCart;
