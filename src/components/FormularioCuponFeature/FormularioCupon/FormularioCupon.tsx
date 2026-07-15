import React from 'react';

export function FormularioCupon({datosForm, manejarCambio, manejarEnvio, loading} : {datosForm: { id: string; codigo: string; porcentaje: number; }; manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void; manejarEnvio: (e: React.SubmitEvent<HTMLFormElement>) => void; loading: boolean}) {
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
            <h3>Agregar Nuevo Cupón</h3>
            <div>
                <label>Código:</label>
                <input
                    type="text"
                    name="codigo"
                    placeholder="Ej: DESCUENTO10"
                    value={datosForm.codigo}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Porcentaje de Descuento:</label>
                <input
                    type="number"
                    name="porcentaje"
                    placeholder="Ej: 10"
                    value={datosForm.porcentaje}
                    onChange={manejarCambio}
                />
            </div>
            
            <button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Cupón'}
            </button>
        </form>
    );
}