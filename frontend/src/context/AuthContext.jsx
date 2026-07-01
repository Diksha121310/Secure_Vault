import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedToken =
            localStorage.getItem("token");

        if (storedToken) {

            setToken(storedToken);

            try {

                const decoded =
                    jwtDecode(storedToken);

                setUser({
                    email: decoded.sub,
                    name: decoded.name
                });

            } catch (err) {

                console.error(err);
            }
        }

    }, []);

    const login = (jwt) => {

        localStorage.setItem("token", jwt);

        setToken(jwt);

        try {

            const decoded =
                jwtDecode(jwt);

            setUser({
                email: decoded.sub,
                name: decoded.name
            });

        } catch (err) {

            console.error(err);
        }
    };

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};