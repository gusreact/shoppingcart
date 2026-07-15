import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from 'firebase/app';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario logueado:", user);
            alert("¡Inicio de sesión exitoso!");
            navigate('/'); //
        })
        .catch((error: unknown) => {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error en el login:", errorCode, errorMessage);
                alert("Error: " + errorMessage);
            } else if (error instanceof Error) {
                console.error("Error en el login:", error.message);
                alert("Error: " + error.message);
            } else {
                console.error("Error desconocido en el login:", error);
                alert("Error desconocido");
            }
        });
    };
    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="p-4 border rounded shadow">
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Ingresa tu email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="********"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">Ingresar</button>
            </form>
            <p>¿No tenés una cuenta? <Link to="/registro">Registrate aquí</Link></p>
        </div>
    );
};
export default Login;