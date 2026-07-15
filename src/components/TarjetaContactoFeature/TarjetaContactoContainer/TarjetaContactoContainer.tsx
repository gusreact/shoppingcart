import { useState, useEffect } from 'react';
import { FirebaseError } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore';
import { TarjetaContactoList } from '../TarjetaContactoList/TarjetaContactoList';
import { db } from '../../../firebase/config';
import type { Empleado } from '../../../types/Empleado';
import { SpinnerComponent } from '../../SpinnerComponent/SpinnerComponent';

export function TarjetaContactoContainer() {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const empleadosDB = collection(db,"equipo");
        getDocs(empleadosDB)
            .then((resp) => {
                console.log("✓ Conexión exitosa a Firestore");
                console.log("Cantidad de documentos:", resp.docs.length);
                console.log("Documentos obtenidos:", resp.docs.map((doc) => doc.data()));
                
                if (resp.docs.length === 0) {
                    console.warn("⚠ No hay documentos en la colección 'equipo'");
                }
                
                setEmpleados(
                    resp.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            id: parseInt(doc.id, 10),
                            nombre: data.nombre,
                            rol: data.rol,
                            email: data.email,
                            fotoURL: data.fotoURL,
                        };
                    })
                );
            })
            .catch((error: unknown) => {
                if (error instanceof FirebaseError) {
                    console.error("✗ FirebaseError al conectar a Firestore:", error);
                    console.error("Código de error:", error.code);
                    console.error("Mensaje:", error.message);
                    setError(error.message);
                } else if (error instanceof Error) {
                    console.error("✗ Error al conectar a Firestore:", error.message);
                    setError(error.message);
                } else {
                    console.error("✗ Error desconocido al conectar a Firestore:", error);
                    setError('Error desconocido');
                }
            });
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez
    
    if (empleados.length === 0 && !error) {
        return <SpinnerComponent message="Cargando empleados, por favor espere..." />;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <TarjetaContactoList empleados={empleados} />
        </div>
    );
}