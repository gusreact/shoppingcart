import React, { useState } from 'react';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import type { Producto } from '../../../types/Producto';

export function FormularioContainer({ estadoInicialForm }: { estadoInicialForm: Producto }) {
    const [datosForm, setDatosForm] = useState<Producto>(estadoInicialForm);
    const [loading, setLoading] = useState(false);
    const [imagenFile, setImagenFile] = useState<File | null>(null);

    const manejarCambio = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setDatosForm(prevDatos => ({
            ...prevDatos,
            [name]: value
        }));
    };

    const manejarCambioImagen = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const file = evento.target.files?.[0] ?? null;
        setImagenFile(file);
    };
    const manejarEnvio = async (evento: React.SubmitEvent<HTMLFormElement>) => {
        setLoading(true);
        evento.preventDefault();
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }

        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
        const formData = new FormData();
        formData.append('image', imagenFile);
        try {
            console.log("Subiendo imagen a Imgbb...");
            const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });
            const datosImgbb = await respuestaImgbb.json();
            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

                // Unimos la URL de la imagen con el resto de los datos del formulario
                const productoCompleto = {
                    ...datosForm,
                    // Agregamos la URL obtenida
                    imagen: datosImgbb.data.url
                }
                // Por el momento hacemos un console.log
                console.log('Enviando los siguientes datos COMPLETOS a la API:',
                productoCompleto);
                // Obtenemos la instancia de la base de datos
                const db = getFirestore();
                // Apuntamos a la colección "productos" (si no existe, se crea)
                const productosCollection = collection(db, "productos nacionales");
                // Agregamos el nuevo documento a la colección
                await addDoc(productosCollection, productoCompleto);
            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    };
    
    const cancelarEdicion = () => {
        //TO DO
    };
    const productoAEditar = null; //TO DO
    return (
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
    );
}
