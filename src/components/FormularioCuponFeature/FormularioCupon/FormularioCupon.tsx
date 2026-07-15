import React from 'react';

export function FormularioCupon({datosForm, manejarCambio, manejarEnvio, loading} : {datosForm: { id: string; codigo: string; porcentaje: number; }; manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void; manejarEnvio: (e: React.SubmitEvent<HTMLFormElement>) => void; loading: boolean}) {
    const formStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        margin: 0,
    };

    return (
        <form style={formStyle} onSubmit={manejarEnvio} className="d-flex flex-column gap-3">
            <h3 className="mb-0">Agregar Nuevo Cupón</h3>

            <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Código</label>
                <input
                    type="text"
                    name="codigo"
                    className="form-control rounded-3"
                    placeholder="Ej: DESCUENTO10"
                    value={datosForm.codigo}
                    onChange={manejarCambio}
                />
            </div>

            <div className="d-flex flex-column gap-2">
                <label className="fw-semibold">Porcentaje de Descuento</label>
                <input
                    type="number"
                    name="porcentaje"
                    className="form-control rounded-3"
                    placeholder="Ej: 10"
                    value={datosForm.porcentaje}
                    onChange={manejarCambio}
                />
            </div>

            <button type="submit" className="btn btn-success rounded-3 mt-2" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Cupón'}
            </button>
        </form>
    );
}