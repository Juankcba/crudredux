import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';

// Crear nuevos Productos

export function crearNuevoProductoAction(producto) {

    return (dispatch) => {
            dispatch(agregarProducto());
            try {
                dispatch(agregarProductoExito(producto));
            } catch (error) {
                dispatch(agregarProductoError(true));
            }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
    
});

// si el producto se guarda en la base 
    const agregarProductoExito = producto => ({
        type: AGREGAR_PRODUCTO_EXITO,
        payload: producto
    });
// si hubo un error

const agregarProductoError = () =>({

})