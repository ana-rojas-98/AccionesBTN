import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import { GET_APIS, PUT_APIS, ADD_APIS} from './types';
import { tokenConfig } from './auth';


export const getApis = () => (dispatch, getState) => {
    axios
    .get('/api/apis/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_APIS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));

}

export const getValidacion = (msg) => (dispatch, getState) => {
  dispatch(createMessage({ validacion: msg}))

}



export const putApis = (api) => (dispatch, getState) => {
  axios
    .put(`/api/apis/${api.id}/`, api, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: 'Ordenes agreadas' }));
      dispatch({
        type: PUT_APIS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const postApis = (api) => (dispatch, getState) => {
  axios
    .post('/api/apis/', api, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: 'Ordenes actualizadas' }));
      dispatch({
        type: ADD_APIS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};


