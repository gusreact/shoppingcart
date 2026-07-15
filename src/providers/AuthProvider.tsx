import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import type { CurrentUser } from '../types/CurrentUser';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    type User,
} from "firebase/auth";

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(); // Obtenemos la instancia de auth una sola vez
    const db = getFirestore(); // Inicializamos Firestore
    // Función para registrar un nuevo usuario
    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    // Función para iniciar sesión
    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    // Función para cerrar sesión
    const logout = () => {
        signOut(auth);
    };
    useEffect(() => {
        // onAuthStateChanged es el observador de Firebase
        const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
            if (currentUser) {
                // Si hay un usuario, buscamos su rol en Firestore.
                const userDocRef = doc(db, "usuarios", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists() && userDocSnap.data().rol === 'admin') {
                    // Si el documento existe y tiene rol de admin, lo asignamos.
                    setUser({ ...currentUser, rol: 'admin', email: currentUser.email ?? '' });
                } else {
                    // Para cualquier otro caso, es un usuario regular.
                    setUser({ ...currentUser, rol: 'user', email: currentUser.email ?? '' });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        // Limpiamos el observador al desmontar
        return () => unsubscribe();
    }, [auth, db]); // Agregamos 'auth' como dependencia
    // Crear el objeto 'value' con TODAS las funciones definidas
    const value = {
        user,
        loading, // Es buena práctica pasar el estado de carga también
        signup,
        login, // Ahora 'login' sí existe y se puede pasar
        logout,
    };
    // Retornar el Provider, asegurándonos de no renderizar hasta que cargue
    // Esto evita que los componentes hijos puedan acceder a 'user' cuando es null
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};