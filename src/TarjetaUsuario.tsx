export function TarjetaUsuario({ nombre, profesion }: { nombre: string; profesion: string }) {
    return (
        <div>
            <h2>{nombre}</h2>
            <p>{profesion}</p>
        </div>
    );
}
