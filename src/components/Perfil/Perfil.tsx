import {useAuth} from '../../hooks/useAuth'

const Perfil = () => {
    const { logout, user } = useAuth();

    return (
        <>
            <h1>Perfil de Usuario</h1>
            ¡Hola de nuevo, {user?.email}!
            <button onClick={logout}>Cerrar Sesión</button>
        </>
    );
}

export default Perfil;