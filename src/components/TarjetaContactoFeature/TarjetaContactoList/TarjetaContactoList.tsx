import type { Empleado } from "../../../types/Empleado";
import { TarjetaContacto } from "../TarjetaContacto/TarjetaContacto";
export function TarjetaContactoList({ empleados } : { empleados : Empleado[] }) {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {empleados.map(empleados => (
                <TarjetaContacto key={empleados.id}
                    nombre={empleados.nombre}
                    email={empleados.email}
                    rol={empleados.rol}
                    fotoURL={empleados.fotoURL}
                />
            ))}
        </div>
    );
}