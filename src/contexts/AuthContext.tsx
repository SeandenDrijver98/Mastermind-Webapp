import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (
        email: string,
        password: string
    ) => Promise<{ data: any; error: any }>
    signUp: (
        email: string,
        password: string
    ) => Promise<{ data: any; error: any }>
    signOut: () => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for existing session on app load
        const checkAuth = async () => {
            try {
                const { user: currentUser } = await api.auth.getCurrentUser()
                setUser(currentUser)
            } catch (error) {
                console.error('Auth check failed:', error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()

        // Listen for auth state changes
        const {
            data: { subscription },
        } = api.utils.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                setUser(session.user)
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
            }
        })

        return () => {
            subscription?.unsubscribe()
        }
    }, [])

    const signIn = async (email: string, password: string) => {
        const result = await api.auth.signIn(email, password)
        if (result.data?.user) {
            setUser(result.data.user)
        }
        return result
    }

    const signUp = async (email: string, password: string) => {
        const result = await api.auth.signUp(email, password)
        if (result.data?.user) {
            setUser(result.data.user)
        }
        return result
    }

    const signOut = async () => {
        const result = await api.auth.signOut()
        setUser(null)
        return result
    }

    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
