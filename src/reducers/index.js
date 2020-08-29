import {combineReducers} from 'redux';
import productoReducer from './productosReducer';

export default combineReducers({
    productos: productoReducer
});