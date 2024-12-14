import {createContext, ReactNode, useState} from 'react'

export interface AuthContextType {
    isAuthenticated: boolean,
    setAuthenticated: (isAuthenticated: boolean) => void,
    role: 'default' | 'customer' | 'admin',
    setRole: (role: 'default' | 'customer' | 'admin') => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
    children ?: ReactNode,
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    const [role, setRole] = useState<'default' | 'customer' | 'admin'>('default')

    return <AuthContext.Provider value={{
        isAuthenticated,
        setAuthenticated,
        role,
        setRole
    }}>
        {children as ReactNode}
    </AuthContext.Provider>
}
