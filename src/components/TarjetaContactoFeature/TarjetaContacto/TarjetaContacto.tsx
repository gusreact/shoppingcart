export function TarjetaContacto({ nombre, email, rol, fotoURL }: { nombre: string; email: string, rol: string, fotoURL: string }) {
    return (
        <div>
            <h2>{nombre}</h2>
            <img src={fotoURL} alt={nombre} width="150" />
            <p>Email: {email}</p>
            <p>Puesto: {rol}</p>
        </div>
    );
}