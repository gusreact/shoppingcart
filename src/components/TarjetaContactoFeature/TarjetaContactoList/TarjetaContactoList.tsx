import { TarjetaContacto } from "../TarjetaContacto/TarjetaContacto";
export function TarjetaContactoList({ contactos } : { contactos : { id: string; nombre: string; email: string; puesto: string; foto: string }[] }) {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {contactos.map(contacto => (
                <TarjetaContacto key={contacto.id}
                    nombre={contacto.nombre}
                    email={contacto.email}
                    puesto={contacto.puesto}
                    foto={contacto.foto}
                />
            ))}
        </div>
    );
}