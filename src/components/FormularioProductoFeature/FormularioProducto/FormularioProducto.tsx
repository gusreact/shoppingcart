import React from 'react';
import type { Producto } from '../../../types/Producto';

export function FormularioProducto({datosForm, manejarCambio, manejarCambioImagen, manejarEnvio, modoEdicion, cancelarEdicion, productoAEditar, loading} : {datosForm: { id: string; categoria: string; nombre: string; descripcion: string; precio: number; cantidad: number; stock: number; imagen: string }; manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void; manejarCambioImagen: (e: React.ChangeEvent<HTMLInputElement>) => void; manejarEnvio: (e: React.SubmitEvent<HTMLFormElement>) => void; modoEdicion: boolean; cancelarEdicion: () => void; productoAEditar: Producto | null; loading: boolean}) {
    const formStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '28rem',
        margin: '0 auto',
    };

    return (
        <form style={formStyle} onSubmit={manejarEnvio} className="d-flex flex-column gap-3">
            <h3 className="mb-0">{modoEdicion ? 'Editar producto' : 'Agregar nuevo producto'}</h3>

            <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Categoría</label>
                <input
                    type="text"
                    name="categoria"
                    className="form-control rounded-3"
                    placeholder="Ej: Tecnología"
                    value={datosForm.categoria}
                    onChange={manejarCambio}
                />
            </div>

            <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Nombre del Producto</label>
                <input
                    type="text"
                    name="nombre"
                    className="form-control rounded-3"
                    placeholder="Ej: Teclado Mecánico"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>

            <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Descripción</label>
                <input
                    type="text"
                    name="descripcion"
                    className="form-control rounded-3"
                    placeholder="Ej: Teclado Mecánico"
                    value={datosForm.descripcion}
                    onChange={manejarCambio}
                />
            </div>

            <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Precio</label>
                <input
                    type="number"
                    name="precio"
                    className="form-control rounded-3"
                    placeholder="Ej: 95"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />
            </div>

            <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Cantidad</label>
                <input
                    type="number"
                    name="cantidad"
                    className="form-control rounded-3"
                    placeholder="Ej: 95"
                    value={datosForm.cantidad}
                    onChange={manejarCambio}
                />
            </div>

            <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Stock</label>
                <input
                    type="number"
                    name="stock"
                    className="form-control rounded-3"
                    placeholder="Ej: 5"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                />
            </div>

            <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Imagen</label>
                <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                    className="form-control rounded-3"
                    onChange={manejarCambioImagen}
                />
                {modoEdicion && datosForm.imagen && (
                    <div className="mt-2">
                        <p className="mb-2 fw-semibold">Imagen actual</p>
                        <img src={datosForm.imagen} alt="Vista previa" style={{ width: '100px', borderRadius: '12px' }} />
                    </div>
                )}
            </div>

            <div className="d-flex gap-2 flex-wrap mt-2">
                <button type="submit" className="btn btn-success rounded-3" disabled={loading}>
                    {loading ? 'Actualizando...' : modoEdicion ? 'Actualizar producto' : 'Agregar Producto'}
                </button>
                {productoAEditar && (
                    <button type="button" className="btn btn-outline-secondary rounded-3" onClick={cancelarEdicion}>
                        Cancelar Edición
                    </button>
                )}
            </div>
        </form>
    );
}