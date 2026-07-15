import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, updateDoc, doc, addDoc } from "firebase/firestore";
import type { Producto } from '../../types/Producto';
import { FormularioProducto } from '../FormularioProductoFeature/FormularioProducto/FormularioProducto';
import styled from "styled-components";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importamos los íconos como componentes
// 1. Definimos un componente base para los botones
const BotonAccion = styled.button`
 background-color: transparent;
 border: 1px solid #ccc;
 border-radius: 5px;
 padding: 5px 10px;
 cursor: pointer;
 margin-left: 8px;
 transition: all 0.2s ease;
 &:hover {
 transform: translateY(-2px);
 box-shadow: 0 2px 5px rgba(0,0,0,0.1);
 }
`;
// 2. Extendemos el estilo base para crear variantes
const BotonEditar = styled(BotonAccion)`
 border-color: #ffc107;
 color: #ffc107;
 &:hover {
 background-color: #ffc107;
 color: white;
 }
`;
const BotonEliminar = styled(BotonAccion)`
 border-color: #dc3545;
 color: #dc3545;
 &:hover {
 background-color: #dc3545;
 color: white;
 }
`;

const ProductoItem = styled.li`
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 12px 16px;
 border-bottom: 1px solid #e0e0e0;
 background-color: #fff;
 transition: background-color 0.2s ease;
 &:hover {
 background-color: #f8f9fa;
 }
`;
const ProductoInfo = styled.span`
 flex-grow: 1;
 font-size: 16px;
`;


const Gestion = () => {
    const [datosForm, setDatosForm] = useState<Producto>({
        id: '',
        categoria: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad: 0,
        stock: 0,
        imagen: ''
    });
    const [loading, setLoading] = useState(false);
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [productoAEditar, setProductoAEditar] = useState<Producto | null>(null);
    const estadoInicialForm = {
        id: '',
        categoria: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad: 0,
        stock: 0,
        imagen: ''
    };

    useEffect(() => {
        if (productoAEditar) {
            setDatosForm(productoAEditar);
        } else {
            setDatosForm(estadoInicialForm);
        }
    }, [productoAEditar]);

    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "productos nacionales"); //Ajustar "productos" al nombre de tu colección
            const resp = await getDocs(productosRef);
            
            setProductos(
                resp.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        nombre: data.nombre,
                        categoria: data.categoria,
                        precio: data.precio,
                        stock: data.stock,
                        imagen: data.imagen,
                        descripcion: data.descripcion ?? '',
                        cantidad: 0,
                    }
                })
           );
        };
        fetchProductos();
    }, [productos]);
    
    const handleEditClick = (producto: Producto) => {
        setProductoAEditar(producto);
    };

    const handleDelete = async (id: string) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (confirmacion) {
            const docRef = doc(db, "Productos nacionales", id);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    };

    const manejarCambio = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };
    
    const manejarCambioImagen = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
        setImagenFile(evento.target.files ? evento.target.files[0] : null);
    };
    
    const manejarEnvio = async (e: React.SubmitEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        if (datosForm.nombre.trim() === "" || datosForm.precio <= 0) {
            alert("Por favor, complete todos los campos y asegúrese de que el precio sea mayor a cero.");
            return; // Detiene la ejecución de la función
        }
        let urlImagen = datosForm.imagen; // Mantenemos la imagen actual por defecto
        if (imagenFile) {
            const formData = new FormData();
            formData.append('image', imagenFile);
            const apiKey = import.meta.env.VITE_IMGBB_API_KEY; //<--¡REEMPLAZAR CON TU API KEY!
            try {
                const response = await
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (data.success) {
                    urlImagen = data.data.url; // Obtenemos la nueva URL
                } else {
                    throw new Error('La subida de la imagen falló.');
                }
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
                setLoading(false);
                return;
            }
        }
        const productoFinal = { ...datosForm, imagen: urlImagen };
        try {console.log("Producto final a enviar a Firestore:", productoFinal);
            if (productoAEditar) {
                const docRef = doc(db, "productos nacionales", productoAEditar.id);
                // update
                await updateDoc(docRef, productoFinal);
                alert("Producto actualizado con éxito.");
            } else {
                // create
                await addDoc(collection(db, "productos nacionales"), productoFinal);
                alert("Producto guardado con éxito.");
            }
            setLoading(false);
            // ... (reseteo de formulario) ...
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    const cancelarEdicion = () => {
        setProductoAEditar(null);
    };

    return (
       <div>
           <h2>Gestión de Productos</h2>
           <hr />
           <FormularioProducto
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarEnvio={manejarEnvio}
                manejarCambioImagen={manejarCambioImagen}
                modoEdicion={!!productoAEditar}
                cancelarEdicion={cancelarEdicion}
                productoAEditar={productoAEditar}
                loading={loading}
                 />
           <hr />
           <h3>Lista de Productos</h3>
           <ul>
               {productos.map((prod) => (
                    <ProductoItem key={prod.id}>
                        <ProductoInfo>
                            {prod.nombre} - {prod.categoria} - ${prod.precio} - {prod.stock}
                        </ProductoInfo>
                        <div>
                            <BotonEditar onClick={() => handleEditClick(prod)}>
                                <FaEdit style={{ marginRight: '5px' }} /> Editar
                            </BotonEditar>
                            <BotonEliminar onClick={() => handleDelete(prod.id)}>
                                <FaTrash style={{ marginRight: '5px' }} /> Eliminar
                            </BotonEliminar>
                        </div>
                    </ProductoItem>
               ))}
            </ul>
        </div>
   );
};
export default Gestion;