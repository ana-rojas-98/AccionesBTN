import { GET_APIS, PUT_APIS, ADD_APIS } from '../actions/types.js';

const initialState = {
    apis: [],
};
  
export default function (state = initialState, action) {
    switch (action.type) {
      case GET_APIS:
        return {
          ...state,
          apis: action.payload,
        };

      case PUT_APIS:
        return {
        ...state,
        apis: [action.payload],
        };
      case ADD_APIS:
          return {
            ...state,
            apis: [...state.apis, action.payload],
        };

       default:
        return state;

    }

}