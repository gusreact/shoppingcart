import React from 'react';
import type { Producto } from '../../../types/Producto';

export function FormularioProducto({datosForm, manejarCambio, manejarCambioImagen, manejarEnvio, modoEdicion, cancelarEdicion, productoAEditar, loading} : {datosForm: { id: string; categoria: string; nombre: string; descripcion: string; precio: number; cantidad: number; stock: number; imagen: string }; manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void; manejarCambioImagen: (e: React.ChangeEvent<HTMLInputElement>) => void; manejarEnvio: (e: React.SubmitEvent<HTMLFormElement>) => void; modoEdicion: boolean; cancelarEdicion: () => void; productoAEditar: Producto | null; loading: boolean}) {
    const formStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '24rem',
        margin: '3rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        gap: '16px'
    };

    return (
        <form style={formStyle} onSubmit={manejarEnvio}>
            <h3>{modoEdicion ? 'Editar producto' : 'Agregar nuevo producto'}</h3>
            <div>
                <label>Categoría:</label>
                <input
                    type="text"
                    name="categoria"
                    placeholder="Ej: Tecnología"
                    value={datosForm.categoria}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Nombre del Producto:</label>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Ej: Teclado Mecánico"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Descripción:</label>
                <input
                    type="text"
                    name="descripcion"
                    placeholder="Ej: Teclado Mecánico"
                    value={datosForm.descripcion}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name="precio"
                    placeholder="Ej: 95"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Cantidad:</label>
                <input
                    type="number"
                    name="cantidad"
                    placeholder="Ej: 95"
                    value={datosForm.cantidad}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    name="stock"
                    placeholder="Ej: 5"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Imagen:</label>
                <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={manejarCambioImagen}
                />
                {modoEdicion && datosForm.imagen && (
                    <div>
                        <p>Imagen actual:</p>
                        <img src={datosForm.imagen} alt="Vista previa" style={{ width: '100px' }} />
                    </div>
                )}
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Actualizando...' : modoEdicion ? 'Actualizar producto' : 'Agregar Producto'}
            </button>
            {productoAEditar && (
                <button onClick={cancelarEdicion}>
                    Cancelar Edición
                </button>
            )}
        </form>
    );
}