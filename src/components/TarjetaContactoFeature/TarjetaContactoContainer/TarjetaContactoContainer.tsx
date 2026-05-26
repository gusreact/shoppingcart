import { useState, useEffect } from 'react';
import { TarjetaContactoList } from '../TarjetaContactoList/TarjetaContactoList';

export function TarjetaContactoContainer() {
    const [nosotros, setNosotros] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        fetch('/data/nosotros.json')
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error('No se pudo cargar la información de los empleados');
            }
            return respuesta.json();
        })
        .then((datos) => {
            setNosotros(datos);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setCargando(false);
     });
    }, []);
    
    if (cargando) {
        return <p>Cargando empleados, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <TarjetaContactoList contactos={nosotros} />
        </div>
    );
}