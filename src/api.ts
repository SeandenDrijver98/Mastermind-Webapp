import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Environment variables for Supabase configuration
// You'll need to add these to your .env file:
// REACT_APP_SUPABASE_URL=your_supabase_url
// REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

// Create Supabase client
export const supabase: SupabaseClient = createClient(
    supabaseUrl,
    supabaseAnonKey
)

// Types for the database
export interface User {
    id: string
    email: string
    created_at: string
    updated_at: string
}

export interface Game {
    id: number
    auth_id: string
    attempts: number
    createdAt: string
}

export interface Statistics {
    id: number
    max_streak: number
    current_streak: number
    total_games: number
    user_id: string
}

// Authentication functions
export const auth = {
    // Sign up with email and password
    signUp: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        return { data, error }
    },

    // Sign in with email and password
    signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    },

    // Sign out
    signOut: async () => {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    // Get current user
    getCurrentUser: async () => {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()
        return { user, error }
    },

    // Get current session
    getCurrentSession: async () => {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession()
        return { session, error }
    },

    // Reset password
    resetPassword: async (email: string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${window.location.origin}/reset-password`,
            }
        )
        return { data, error }
    },

    // Update password
    updatePassword: async (password: string) => {
        const { data, error } = await supabase.auth.updateUser({
            password,
        })
        return { data, error }
    },

    // Update user profile
    updateProfile: async (updates: { email?: string; password?: string }) => {
        const { data, error } = await supabase.auth.updateUser(updates)
        return { data, error }
    },
}

// Game functions
export const games = {
    // Create a new game
    createGame: async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const { data, error } = await supabase
            .from('Games')
            .insert({
                auth_id: user.id,
                attempts: 0,
            })
            .select()
            .single()

        return { data, error }
    },

    // Get current active game for user
    getCurrentGame: async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const { data, error } = await supabase
            .from('Games')
            .select('*')
            .eq('auth_id', user.id)
            .order('createdAt', { ascending: false })
            .limit(1)
            .single()

        return { data, error }
    },

    // Update game attempts
    updateGameAttempts: async (gameId: number, attempts: number) => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const { data, error } = await supabase
            .from('Games')
            .update({ attempts })
            .eq('id', gameId)
            .eq('auth_id', user.id)
            .select()
            .single()

        return { data, error }
    },

    // Get game history for user
    getGameHistory: async (limit = 10) => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const { data, error } = await supabase
            .from('Games')
            .select('*')
            .eq('auth_id', user.id)
            .order('createdAt', { ascending: false })
            .limit(limit)

        return { data, error }
    },
}

// Statistics functions
export const statistics = {
    // Get or create user statistics
    getUserStats: async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        // Try to get existing stats
        const { data, error } = await supabase
            .from('Statistics')
            .select('*')
            .eq('user_id', user.id)
            .single()

        // If no stats exist, create default stats
        if (error && error.code === 'PGRST116') {
            const { data: newStats, error: createError } = await supabase
                .from('Statistics')
                .insert({
                    user_id: user.id,
                    total_games: 0,
                    max_streak: 0,
                    current_streak: 0,
                })
                .select()
                .single()

            return { data: newStats, error: createError }
        }

        return { data, error }
    },

    // Update user statistics after game completion
    updateStats: async (gameWon: boolean, attempts: number) => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        // Get current stats
        const { data: currentStats } = await supabase
            .from('Statistics')
            .select('*')
            .eq('user_id', user.id)
            .single()

        if (!currentStats) throw new Error('User stats not found')

        // Calculate new stats
        const newTotalGames = currentStats.total_games + 1
        const newCurrentStreak = gameWon ? currentStats.current_streak + 1 : 0
        const newMaxStreak = Math.max(currentStats.max_streak, newCurrentStreak)

        const { data, error } = await supabase
            .from('Statistics')
            .update({
                total_games: newTotalGames,
                current_streak: newCurrentStreak,
                max_streak: newMaxStreak,
            })
            .eq('user_id', user.id)
            .select()
            .single()

        return { data, error }
    },

    // Get leaderboard
    getLeaderboard: async (limit = 10) => {
        const { data, error } = await supabase
            .from('Statistics')
            .select(
                `
        *,
        users:user_id (
          email
        )
      `
            )
            .order('max_streak', { ascending: false })
            .order('total_games', { ascending: false })
            .limit(limit)

        return { data, error }
    },
}

// Real-time subscriptions
export const subscriptions = {
    // Subscribe to game updates
    subscribeToGame: (gameId: number, callback: (payload: any) => void) => {
        return supabase
            .channel(`game:${gameId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'Games',
                    filter: `id=eq.${gameId}`,
                },
                callback
            )
            .subscribe()
    },

    // Subscribe to user statistics updates
    subscribeToUserStats: (
        userId: string,
        callback: (payload: any) => void
    ) => {
        return supabase
            .channel(`statistics:${userId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'Statistics',
                    filter: `user_id=eq.${userId}`,
                },
                callback
            )
            .subscribe()
    },
}

// Utility functions
export const utils = {
    // Check if user is authenticated
    isAuthenticated: async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession()
        return !!session
    },

    // Get user profile
    getUserProfile: async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        return user
    },

    // Handle auth state changes
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
        return supabase.auth.onAuthStateChange(callback)
    },
}

// Export all functions as a single API object
export const api = {
    auth,
    games,
    statistics,
    subscriptions,
    utils,
    supabase,
}

export default api
