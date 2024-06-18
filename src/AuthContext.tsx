import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export interface AuthContextType {
    user: string | null;
    login: (user : string, password : string) => any;
    logout: () => any;
    register: (user : string, password : string) => any;
  }
  
  const defaultValue: AuthContextType = {
    user: null,
    login: (user, password) => {},
    logout: () => {},
    register: (user, password) => {}
  };
  
  export const AuthContext = createContext(defaultValue);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/checkAuth', { withCredentials: true })
        .then(response => setUser(response.data))
        .catch(() => setUser(null));
    }, []);

    const login = (username, password) => {
        return axios.post('http://localhost:5000/login', { username, password }, { withCredentials: true })
        .then(response => {
            setUser(response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Login error", error);
            throw error;
        });
    }

    const logout = () => {
        return axios.get('http://localhost:5000/logout', { withCredentials: true })
        .then(() => setUser(null))
        .catch(error => {
            console.error("Logout error", error);
            throw error;
        });
    }

    const register = (username, password) => {
        return axios.post('http://localhost:5000/register', { username, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Register error", error);
            throw error;
        });
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;