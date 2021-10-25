import { GET_HISTORIAL, PUT_HISTORIAL, ADD_HISTORIAL } from '../actions/types.js';

const initialState = {
    historials: [],
};
  
export default function (state = initialState, action) {
    switch (action.type) {
      case GET_HISTORIAL:
        return {
          ...state,
          historials: action.payload,
        };

      case PUT_HISTORIAL:
        return {
        ...state,
        historials: [...state.historials, action.payload],
        };

      case ADD_HISTORIAL:
        return {
        ...state,
        historials: [...state.historials, action.payload],
        };

       default:
        return state;

    }

}