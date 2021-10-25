import { combineReducers } from 'redux';
import leads from './leads';
import errors from './errors';
import messages from './messages';
import apis from './apis';
import auth from './auth';
import historials from './historial';

export default combineReducers({
  leads,
  errors, 
  messages,
  auth, 
  apis,
  historials,
});