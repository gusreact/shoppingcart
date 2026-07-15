import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import type { Cupon } from '../../types/Cupon';
import { FormularioCuponContainer } from '../FormularioCuponFeature/FormularioCuponContainer/FormularioCuponContainer';

const GestionCupones = () => {
    const [cupones, setCupones] = useState<Cupon[]>([]);
    const estadoInicialForm = {
        id: '',
        codigo: '',
        porcentaje: 0,
    };
    useEffect(() => {
        const fetchCupones = async () => {
            const cuponesRef = collection(db, "cupones"); //Ajustar "cupones" al nombre de tu colección
            const resp = await getDocs(cuponesRef);
            
            setCupones(
                resp.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        codigo: data.codigo,
                        porcentaje: data.porcentaje,
                    }
                })
           );
        };
        fetchCupones();
    }, [cupones]);
    
    const handleDelete = async (id: string) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este cupón?");
        if (confirmacion) {
            const docRef = doc(db, "cupones", id);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setCupones(cupones.filter(cupon => cupon.id !== id));
            alert("Cupón eliminado.");
        }
    };

    return (
       <div>
           <h2>Gestión de Cupones</h2>
           <hr />
           <FormularioCuponContainer estadoInicialForm={estadoInicialForm} />
           <hr />
           <h3>Lista de Cupones</h3>
           <ul>
               {cupones.map((cupon) => (
                   <li key={cupon.id}>
                       {cupon.codigo} - {cupon.porcentaje}%
                       <button onClick={() => handleDelete(cupon.id)} style={{ marginLeft:'10px' }}>Eliminar</button>
                   </li>
               ))}
            </ul>
        </div>
   );
};
export default GestionCupones;
        