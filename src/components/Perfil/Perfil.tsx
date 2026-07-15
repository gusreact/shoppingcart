import {useAuth} from '../../hooks/useAuth'

const Perfil = () => {
    const { logout } = useAuth();

    return (
        <>
            <h1>Perfil de Usuario</h1>
            ¡Hola de nuevo, usuario@email.com!
            <button onClick={logout}>Cerrar Sesión</button>
        </>
    );
}

export default Perfil;