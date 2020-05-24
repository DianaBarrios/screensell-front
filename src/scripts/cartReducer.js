import axios from 'axios';

export const types = {
  INIT_PRODUCTS: 'INIT_PRODUCTS',
  ADD_TO_CART: 'ADD_TO_CART',
  CLEAR_CART: 'CLEAR_CART',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  CHANGE_QTY: 'CHANGE_QTY',
};

export const addToCart = (id, quantity) => {
  return {
    type: types.ADD_TO_CART,
    id,
    quantity,
  };
};

export const clearCart = () => {
  return {
    type: types.CLEAR_CART,
  };
};

export const removeItem = (id) => {
  return {
    type: types.REMOVE_PRODUCT,
    id,
  };
};

export const changeQty = (id, quantity) => {
  return {
    type: types.CHANGE_QTY,
    id,
    quantity,
  };
};

export const initProducts = (products) => {
  return {
    type: types.INIT_PRODUCTS,
    products,
  };
};

const defaultState = {
  products: [],
  addedItems: {},
};

export const loadState = () => {
  try {
    const cartState = localStorage.getItem('cart');
    if (cartState == null) {
      return defaultState;
    }

    return {
      products: [],
      addedItems: JSON.parse(cartState),
    };
  } catch (err) {
    return defaultState;
  }
};

const initState = loadState();

export const saveState = (addedItems) => {
  try {
    const serializedCart = JSON.stringify(addedItems);
    localStorage.setItem('cart', serializedCart);
  } catch {}
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case types.INIT_PRODUCTS:
      state.products = action.products;
      break;
    case types.ADD_TO_CART:
      if (state.addedItems.hasOwnProperty(action.id)) {
        console.log(state);
        state.addedItems[action.id].quantity += parseInt(action.quantity);
        if (action.quantity == 0) {
          delete state.addedItems[action.id];
        }
      } else {
        state.addedItems[action.id] = {
          quantity: parseInt(action.quantity),
        };
      }
      break;
    case types.CLEAR_CART:
      state.addedItems = {};
      break;
    case types.REMOVE_PRODUCT:
      if (state.addedItems.hasOwnProperty(action.id)) {
        delete state.addedItems[action.id];
      }
      break;
    case types.CHANGE_QTY:
      if (state.addedItems.hasOwnProperty(action.id)) {
        if (state.addedItems[action.id].quantity) {
          state.addedItems[action.id].quantity = action.quantity;
        }
      }
  }
  return {
    ...state,
  };
};

export default cartReducer;
