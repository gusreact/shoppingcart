import React, { useState } from 'react';
import { FormularioCupon } from '../FormularioCupon/FormularioCupon';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import type { Cupon } from '../../../types/Cupon';

export function FormularioCuponContainer({ estadoInicialForm, setCupones }: { estadoInicialForm: Cupon; setCupones: React.Dispatch<React.SetStateAction<Cupon[]>> }) {
    const [datosForm, setDatosForm] = useState<Cupon>(estadoInicialForm);
    const [loading, setLoading] = useState(false);

    const manejarCambio = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarEnvio = async (evento: React.SubmitEvent<HTMLFormElement>) => {
        setLoading(true);
        evento.preventDefault();

        try {
            console.log("Enviando datos del cupón a Firestore...");
            // Obtenemos la instancia de la base de datos
            const db = getFirestore();
            // Apuntamos a la colección "cupones" (si no existe, se crea)
            const cuponesCollection = collection(db, "cupones");
            // Agregamos el nuevo documento a la colección
            await addDoc(cuponesCollection, datosForm);
            setCupones(prevCupones => [...prevCupones, datosForm]); // Actualizamos el estado local con el nuevo cupón
            alert("Cupón guardado con éxito.");
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al guardar el cupón. Por favor, intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <FormularioCupon
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            loading={loading}
        />
    );
}
