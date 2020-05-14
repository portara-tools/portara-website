import { DECREMENT, INCREMENT, TICK, RESET } from '../actions/exampleActions'

export const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}

const exampleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TICK:
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      }
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      }
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      }
    case RESET:
      return {
        ...state,
        count: initialState.count,
      }
    default:
      return state
  }
}

export default exampleReducer;