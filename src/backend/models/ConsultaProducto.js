import client from './db.js'; // Importa el cliente de conexión a la base de datos

export const ConsultaProducto = async () =>{

    try {
        //query para hacer la consulta de productos
        const result = await client.query(
            'SELECT id, codigo_barras, nombre, categoria, cantidad, precio_compra, precio_venta FROM productos'
        );
        return result.rows;
    }catch(error){
        //Mustra el error al mostrar los productos 
        console.error('Error al consultar los Productos : ',error);
        throw new Error('Error al  Consulltar los Productos');
    }
};



