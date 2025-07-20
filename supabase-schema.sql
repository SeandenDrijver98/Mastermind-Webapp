-- Mastermind Game Database Schema for Supabase
-- Run this SQL in your Supabase SQL editor to create the necessary tables

-- Enable Row Level Security (RLS)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create Games table
CREATE TABLE IF NOT EXISTS public.Games (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    auth_id uuid NOT NULL,
    attempts smallint NOT NULL DEFAULT '0'::smallint,
    createdAt date DEFAULT now(),
    CONSTRAINT Games_pkey PRIMARY KEY (id),
    CONSTRAINT Games_auth_id_fkey FOREIGN KEY (auth_id) REFERENCES auth.users(id)
);

-- Create Statistics table
CREATE TABLE IF NOT EXISTS public.Statistics (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    max_streak bigint NOT NULL DEFAULT '0'::bigint,
    current_streak bigint NOT NULL DEFAULT '0'::bigint,
    total_games bigint NOT NULL DEFAULT '0'::bigint,
    user_id uuid NOT NULL,
    CONSTRAINT Statistics_pkey PRIMARY KEY (id),
    CONSTRAINT Statistics_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_games_auth_id ON public.Games(auth_id);
CREATE INDEX IF NOT EXISTS idx_statistics_user_id ON public.Statistics(user_id);

-- Enable Row Level Security on all tables
ALTER TABLE public.Games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.Statistics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for Games table
CREATE POLICY "Users can view their own games" ON public.Games
    FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Users can insert their own games" ON public.Games
    FOR INSERT WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Users can update their own games" ON public.Games
    FOR UPDATE USING (auth.uid() = auth_id);

CREATE POLICY "Users can delete their own games" ON public.Games
    FOR DELETE USING (auth.uid() = auth_id);

-- Create RLS policies for Statistics table
CREATE POLICY "Users can view their own statistics" ON public.Statistics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own statistics" ON public.Statistics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own statistics" ON public.Statistics
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own statistics" ON public.Statistics
    FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically create user statistics when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.Statistics (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user statistics
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a view for leaderboard (public read access)
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
    s.user_id,
    u.email,
    s.total_games,
    s.max_streak,
    s.current_streak
FROM public.Statistics s
JOIN auth.users u ON s.user_id = u.id
WHERE s.total_games > 0
ORDER BY s.max_streak DESC, s.total_games DESC;

-- Grant access to the leaderboard view
GRANT SELECT ON public.leaderboard TO anon;
GRANT SELECT ON public.leaderboard TO authenticated;

-- Create a function to get user's game statistics
CREATE OR REPLACE FUNCTION public.get_user_game_stats(user_uuid UUID)
RETURNS TABLE(
    total_games BIGINT,
    max_streak BIGINT,
    current_streak BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.total_games,
        s.max_streak,
        s.current_streak
    FROM public.Statistics s
    WHERE s.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.get_user_game_stats(UUID) TO authenticated; 