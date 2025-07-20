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
    id: string
    user_id: string
    code: number[]
    attempts: number
    won: boolean
    created_at: string
    completed_at?: string
}

export interface GameAttempt {
    id: string
    game_id: string
    attempt_number: number
    guess: number[]
    feedback: {
        correct: number
        incorrect: number
    }
    created_at: string
}

export interface UserStats {
    user_id: string
    total_games: number
    games_won: number
    average_attempts: number
    best_score: number
    current_streak: number
    longest_streak: number
    updated_at: string
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
    createGame: async (code: number[]) => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const { data, error } = await supabase
            .from('games')
            .insert({
                user_id: user.id,
                code,
                attempts: 0,
                won: false,
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
            .from('games')
            .select('*')
            .eq('user_id', user.id)
            .is('completed_at', null)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

        return { data, error }
    },

    // Add an attempt to a game
    addAttempt: async (
        gameId: string,
        guess: number[],
        feedback: { correct: number; incorrect: number }
    ) => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        // Get current game to determine attempt number
        const { data: game } = await supabase
            .from('games')
            .select('attempts')
            .eq('id', gameId)
            .single()

        if (!game) throw new Error('Game not found')

        const attemptNumber = game.attempts + 1

        // Insert the attempt
        const { data: attempt, error: attemptError } = await supabase
            .from('game_attempts')
            .insert({
                game_id: gameId,
                attempt_number: attemptNumber,
                guess,
                feedback,
            })
            .select()
            .single()

        if (attemptError) return { data: null, error: attemptError }

        // Update game attempts count
        const { data: updatedGame, error: gameError } = await supabase
            .from('games')
            .update({ attempts: attemptNumber })
            .eq('id', gameId)
            .select()
            .single()

        return { data: { attempt, game: updatedGame }, error: gameError }
    },

    // Complete a game (win or lose)
    completeGame: async (gameId: string, won: boolean) => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const { data, error } = await supabase
            .from('games')
            .update({
                won,
                completed_at: new Date().toISOString(),
            })
            .eq('id', gameId)
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
            .from('games')
            .select('*')
            .eq('user_id', user.id)
            .not('completed_at', 'is', null)
            .order('created_at', { ascending: false })
            .limit(limit)

        return { data, error }
    },

    // Get attempts for a specific game
    getGameAttempts: async (gameId: string) => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        const { data, error } = await supabase
            .from('game_attempts')
            .select('*')
            .eq('game_id', gameId)
            .order('attempt_number', { ascending: true })

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
            .from('user_stats')
            .select('*')
            .eq('user_id', user.id)
            .single()

        // If no stats exist, create default stats
        if (error && error.code === 'PGRST116') {
            const { data: newStats, error: createError } = await supabase
                .from('user_stats')
                .insert({
                    user_id: user.id,
                    total_games: 0,
                    games_won: 0,
                    average_attempts: 0,
                    best_score: 0,
                    current_streak: 0,
                    longest_streak: 0,
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
            .from('user_stats')
            .select('*')
            .eq('user_id', user.id)
            .single()

        if (!currentStats) throw new Error('User stats not found')

        // Calculate new stats
        const newTotalGames = currentStats.total_games + 1
        const newGamesWon = gameWon
            ? currentStats.games_won + 1
            : currentStats.games_won
        const newAverageAttempts =
            (currentStats.average_attempts * currentStats.total_games +
                attempts) /
            newTotalGames
        const newBestScore = gameWon
            ? Math.min(currentStats.best_score || Infinity, attempts)
            : currentStats.best_score

        // Calculate streaks
        const newCurrentStreak = gameWon ? currentStats.current_streak + 1 : 0
        const newLongestStreak = Math.max(
            currentStats.longest_streak,
            newCurrentStreak
        )

        const { data, error } = await supabase
            .from('user_stats')
            .update({
                total_games: newTotalGames,
                games_won: newGamesWon,
                average_attempts: newAverageAttempts,
                best_score: newBestScore,
                current_streak: newCurrentStreak,
                longest_streak: newLongestStreak,
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)
            .select()
            .single()

        return { data, error }
    },

    // Get leaderboard
    getLeaderboard: async (limit = 10) => {
        const { data, error } = await supabase
            .from('user_stats')
            .select(
                `
        *,
        users:user_id (
          email
        )
      `
            )
            .order('games_won', { ascending: false })
            .order('average_attempts', { ascending: true })
            .limit(limit)

        return { data, error }
    },
}

// Real-time subscriptions
export const subscriptions = {
    // Subscribe to game updates
    subscribeToGame: (gameId: string, callback: (payload: any) => void) => {
        return supabase
            .channel(`game:${gameId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'games',
                    filter: `id=eq.${gameId}`,
                },
                callback
            )
            .subscribe()
    },

    // Subscribe to user stats updates
    subscribeToUserStats: (
        userId: string,
        callback: (payload: any) => void
    ) => {
        return supabase
            .channel(`user_stats:${userId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'user_stats',
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
