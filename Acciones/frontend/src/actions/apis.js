import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import { GET_APIS, PUT_APIS, ADD_LEAD, GET_ERRORS} from './types';
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



export const putApis = (id, api) => (dispatch, getState) => {
  axios
    .put(`/api/apis/${id}/`, api, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: 'Lead Added' }));
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
      dispatch(createMessage({ addLead: 'Lead Added' }));
      dispatch({
        type: PUT_APIS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};


