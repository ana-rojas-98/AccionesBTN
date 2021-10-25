import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import { GET_HISTORIAL, PUT_HISTORIAL, ADD_HISTORIAL, GET_ERRORS} from './types';
import { tokenConfig } from './auth';


export const getHistorial = () => (dispatch, getState) => {
    axios
    .get('/api/historial/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_HISTORIAL,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));

}

export const putHistorial = (api) => (dispatch, getState) => {
  axios
    .put(`/api/historial/${api.id}/`, api, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ putLead: 'Historial Added'}));
      dispatch({
        type: PUT_HISTORIAL,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const postHistorial = (api) => (dispatch, getState) => {
  axios
    .post('/api/historial/', api, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: 'Historial Added'}));
      dispatch({
        type: ADD_HISTORIAL,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};