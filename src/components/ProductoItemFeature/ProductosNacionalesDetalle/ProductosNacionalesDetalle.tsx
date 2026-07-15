// En src/componentes/ProductosNacionales/ProductosNacionalesDetalle.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Importaciones clave para obtener un solo documento
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase/config';
import styles from './productosNacionalesDetalle.module.css';
import type { Producto } from '../../../types/Producto';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ProductosNacionalesDetalle = () => {
    const [prod, setItem] = useState<Producto | null>(null);
    const { id } = useParams(); //Tomamos el parámetro id
    useEffect(() => {
        if (id) {
            // Creamos la referencia al documento
            const docRef = doc(db, "productos nacionales", id);
            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) { // Verificamos si el documento existe
                        setItem({
                            id: resp.id,
                            nombre: resp.data().nombre,
                            categoria: resp.data().categoria,
                            precio: resp.data().precio,
                            stock: resp.data().stock,
                            imagen: resp.data().imagen,
                            descripcion: resp.data().descripcion ?? '',
                            cantidad: 0,
                        });
                    } else {
                        console.log("No se encontró el producto");
                    }
                })
                .catch(error => console.log(error));
        }
    }, [id]);
    return (
        <div className={styles.CartaDetalle}>
            {prod && (
                <Helmet>
                    <title>Mi Tienda | {prod.nombre}</title>
                    <meta name="description" content={`Detalles y precio del producto ${prod.nombre}.`} />
                </Helmet>
            )}

            {prod ? (
                <div key={prod.id} >
                    <img src={prod.imagen} alt={prod.nombre} style={{width: '100px' }} />
                    <h3>{prod.nombre}</h3>
                    <p>Categoría: {prod.categoria}</p>
                    <p>Precio: ${prod.precio}</p>
                    <p>Stock: {prod.stock} unidades</p>
                    <p><Link to="/productos-nacionales">Volver al listado</Link></p>
                    <hr />
                </div>
            ) : (
                
                <p>Cargando producto...</p>
            )}
        </div>
    );
};
export default ProductosNacionalesDetalle;