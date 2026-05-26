export function Asistente({ nombre, tarea, emoji }: { nombre: string; tarea: string; emoji: string }) {
    return (
        <div>
            <h3>{ nombre }</h3>
            <p>{ emoji } { tarea }</p>
        </div>
    );
}