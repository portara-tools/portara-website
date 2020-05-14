//Action Types
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const TICK = "TICK";
export const RESET = "RESET"


//Action Creator
export const incrementCounter = () => ({
  type: INCREMENT
});

export const decrementCounter = () => ({
  type: DECREMENT
});

export const tick = () => ({
  type: TICK
});

export const reset = () => ({
  type: RESET
});
