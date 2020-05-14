// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

import { initialState } from "../redux/reducers/exampleReducer"

export interface IReducerParams {
  (state?: IState, action?: any): IState
}

export type IState = typeof initialState

export interface IRootReducer {
  counter: IState
}
