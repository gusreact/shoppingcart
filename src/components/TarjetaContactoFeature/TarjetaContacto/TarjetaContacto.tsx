export function TarjetaContacto({ nombre, email, puesto, foto }: { nombre: string; email: string, puesto: string, foto: string }) {
    return (
        <div>
            <h2>{nombre}</h2>
            <img src={foto} alt={nombre} width="150" />
            <p>Email: {email}</p>
            <p>Puesto: {puesto}</p>
        </div>
    );
}