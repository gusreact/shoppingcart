import Productos from "../Productos/Productos";

export function Inicio() {
    return (
        <div>
            <h1>Productos</h1>
            <p>Aquí puedes encontrar una variedad de productos.</p>
            <Productos Mensaje={"Productos destacados"} />
        </div>
    );
}