"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
    id: string,
    name: string,
    email: string
}

type AuthContextType = {
    user: User | null,
    loading: boolean,
    login: (email: string, password: string) => Promise<void>,
    signup: (name: string, email: string, password: string) => Promise<void>,
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await fetch("/api/auth/me",{
                    credentials: "include",
                });

                if(!res.ok) {
                    setUser(null);
                    return;
                }

                const data = await res.json();
                console.log(data.user);
                setUser(data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [])


    async function login(email: string, password: string) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        if (!res) throw new Error("Cannot login");

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Login failed");

        setUser(data.user);
    }

    async function signup(name: string, email: string, password: string) {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, email, password })
        });

        if (!res) throw new Error("Cannot signup");

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Signup failed");

        setUser(data.user);
    }

    async function logout() {
        // await fetch("api/auth/logout", {method: "POST"});
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) throw new Error("useAuth must be used withing AuthProvider");

    return ctx;
}