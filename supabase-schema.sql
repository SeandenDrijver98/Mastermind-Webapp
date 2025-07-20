-- Mastermind Game Database Schema for Supabase
-- Run this SQL in your Supabase SQL editor to create the necessary tables

-- Enable Row Level Security (RLS)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create games table
CREATE TABLE IF NOT EXISTS public.games (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    code INTEGER[] NOT NULL,
    attempts INTEGER DEFAULT 0 NOT NULL,
    won BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create game_attempts table
CREATE TABLE IF NOT EXISTS public.game_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    game_id UUID REFERENCES public.games(id) ON DELETE CASCADE NOT NULL,
    attempt_number INTEGER NOT NULL,
    guess INTEGER[] NOT NULL,
    feedback JSONB NOT NULL, -- {correct: number, incorrect: number}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create user_stats table
CREATE TABLE IF NOT EXISTS public.user_stats (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    total_games INTEGER DEFAULT 0 NOT NULL,
    games_won INTEGER DEFAULT 0 NOT NULL,
    average_attempts DECIMAL(5,2) DEFAULT 0 NOT NULL,
    best_score INTEGER DEFAULT 0 NOT NULL,
    current_streak INTEGER DEFAULT 0 NOT NULL,
    longest_streak INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_games_user_id ON public.games(user_id);
CREATE INDEX IF NOT EXISTS idx_games_completed_at ON public.games(completed_at);
CREATE INDEX IF NOT EXISTS idx_game_attempts_game_id ON public.game_attempts(game_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON public.user_stats(user_id);

-- Enable Row Level Security on all tables
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for games table
CREATE POLICY "Users can view their own games" ON public.games
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own games" ON public.games
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own games" ON public.games
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own games" ON public.games
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for game_attempts table
CREATE POLICY "Users can view attempts for their own games" ON public.game_attempts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.games 
            WHERE games.id = game_attempts.game_id 
            AND games.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert attempts for their own games" ON public.game_attempts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.games 
            WHERE games.id = game_attempts.game_id 
            AND games.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update attempts for their own games" ON public.game_attempts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.games 
            WHERE games.id = game_attempts.game_id 
            AND games.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete attempts for their own games" ON public.game_attempts
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.games 
            WHERE games.id = game_attempts.game_id 
            AND games.user_id = auth.uid()
        )
    );

-- Create RLS policies for user_stats table
CREATE POLICY "Users can view their own stats" ON public.user_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" ON public.user_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON public.user_stats
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stats" ON public.user_stats
    FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically create user stats when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_stats (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user stats
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_stats_updated_at
    BEFORE UPDATE ON public.user_stats
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create a view for leaderboard (public read access)
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
    us.user_id,
    u.email,
    us.total_games,
    us.games_won,
    us.average_attempts,
    us.best_score,
    us.current_streak,
    us.longest_streak,
    CASE 
        WHEN us.total_games > 0 
        THEN ROUND((us.games_won::DECIMAL / us.total_games) * 100, 2)
        ELSE 0 
    END as win_percentage
FROM public.user_stats us
JOIN auth.users u ON us.user_id = u.id
WHERE us.total_games > 0
ORDER BY us.games_won DESC, us.average_attempts ASC;

-- Grant access to the leaderboard view
GRANT SELECT ON public.leaderboard TO anon;
GRANT SELECT ON public.leaderboard TO authenticated;

-- Create a function to get user's game statistics
CREATE OR REPLACE FUNCTION public.get_user_game_stats(user_uuid UUID)
RETURNS TABLE(
    total_games BIGINT,
    games_won BIGINT,
    average_attempts DECIMAL,
    best_score INTEGER,
    current_streak INTEGER,
    longest_streak INTEGER,
    win_percentage DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        us.total_games,
        us.games_won,
        us.average_attempts,
        us.best_score,
        us.current_streak,
        us.longest_streak,
        CASE 
            WHEN us.total_games > 0 
            THEN ROUND((us.games_won::DECIMAL / us.total_games) * 100, 2)
            ELSE 0 
        END as win_percentage
    FROM public.user_stats us
    WHERE us.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.get_user_game_stats(UUID) TO authenticated; 