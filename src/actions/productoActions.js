import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    DESCARGA_PRODUCTO_EXITO,
    DESCARGA_PRODUCTO_ERROR,
    COMENZAR_DESCARGAR_PRODUCTOS,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    PRODUCTO_EDITADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION
} from '../types';
import clienteAxios from'../config/axios';
import Swal from 'sweetalert2';
// Crear nuevos Productos

export function crearNuevoProductoAction(producto) {

    return async (dispatch) => {
            dispatch(agregarProducto());
            try {
                //insertar en la API 
               await clienteAxios.post('/productos',producto);

                //si todo sale bien actualizar el state
                
                dispatch(agregarProductoExito(producto));

                //alerta 
                Swal.fire(
                    'Correcto',
                    'El producto se agregó correctamente',
                    'success'
                );
            } catch (error) {
                console.log(error);
                //si hay un error cambiar el state 
                dispatch(agregarProductoError(true));

                //ALERTA DE ERROR
                Swal.fire({
                    icon: 'error',
                    title: 'Hubor un error',
                    text: 'Hubo un error'
                        
                    });
                    
                
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

const agregarProductoError = estado =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

//funcion que descarga los productos de la base de datos

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos());
        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductosExitosa(respuesta.data))
        } catch (error) {
            dispatch(descargaProductosError())
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGAR_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos =>  ({
    type: DESCARGA_PRODUCTO_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTO_ERROR,
    payload: true
});

//selecciona y elimina el producto

export function borrarProductoAction(id) {
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id) );
        try {
         await clienteAxios.delete(`/productos/${id}`);
         dispatch(eliminarProductoExito() );
         //si se elimina mostrar la alerta
         Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado!',
            'success'
          )
        } catch (error) {
            dispatch(eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,

});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

// colocar producto en ediccion 
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}
const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

//editar un registro en la api y stat
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto())
        try {
            await clienteAxios.put(`/productos/${producto.id}`,producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            
        }
    }
}
const editarProducto = () => ({
    type: COMENZAR_EDICION
    
});

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})