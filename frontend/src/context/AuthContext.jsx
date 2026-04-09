import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const AUTH_STORAGE_KEY = "auth_session";

const readStoredSession = () => {
    if (typeof window === "undefined") return null;

    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        if (!parsed?.user) return null;

        return {
            user: parsed.user,
            role: parsed.role ?? parsed.user?.role ?? null,
        };
    } catch {
        return null;
    }
};

const writeStoredSession = (session) => {
    if (typeof window === "undefined") return;

    if (!session) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return;
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
};

export const AuthProvider = ({ children }) => {
    const session = readStoredSession();
    const [user, setUser] = useState(session?.user ?? null);
    const [role, setRole] = useState(session?.role ?? null); // ADMIN, STUDENT, ALUMNI
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(session?.user));

    const login = (userData) => {
        const nextRole = userData?.role ?? null;

        setIsAuthenticated(true);
        setUser(userData);
        setRole(nextRole);
        writeStoredSession({ user: userData, role: nextRole });
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
        writeStoredSession(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
