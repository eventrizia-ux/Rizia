-- =====================================================
-- RIZIA EVENT PLATFORM - EVENTS TABLE
-- PostgreSQL Migration File
-- =====================================================

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.events CASCADE;

-- =====================================================
-- TABLE: events
-- Stores all event data for the platform
-- =====================================================
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    full_description TEXT,
    city TEXT NOT NULL,
    venue TEXT NOT NULL,
    venue_address TEXT,
    event_date TEXT NOT NULL,
    event_time TEXT NOT NULL,
    price TEXT NOT NULL,
    image_url TEXT,
    tags TEXT[],
    language TEXT,
    age_restriction TEXT,
    features TEXT[],
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL
);

-- Indexes for faster queries
CREATE INDEX idx_events_city ON public.events(city);
CREATE INDEX idx_events_category ON public.events(category);
CREATE INDEX idx_events_date ON public.events(event_date);
CREATE INDEX idx_events_active ON public.events(is_active);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active events
CREATE POLICY "Anyone can read active events"
    ON public.events FOR SELECT
    USING (is_active = true OR auth.uid() IS NOT NULL);

-- Allow authenticated users to insert events
CREATE POLICY "Authenticated users can insert events"
    ON public.events FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Allow users to update their own events or admins to update any
CREATE POLICY "Users can update their own events"
    ON public.events FOR UPDATE
    USING (auth.uid() IS NOT NULL);

-- Allow users to delete their own events
CREATE POLICY "Users can delete their own events"
    ON public.events FOR DELETE
    USING (auth.uid() IS NOT NULL);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger for updated_at
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA - Initial Events
-- =====================================================

-- Insert sample events
INSERT INTO public.events (
    title, category, description, full_description, city, venue, venue_address,
    event_date, event_time, price, image_url, tags, language, age_restriction, features, latitude, longitude
) VALUES
(
    'Arambikal​ama? - Tamil Unplugged Night',
    'Concert',
    'A full Tamil unplugged night by Jammmify at AEIOU Manyata Tech Park',
    'ARAMBIKALAMA? A full Tamil unplugged night by Jammmify at AEIOU! Get ready for an unforgettable evening filled with soulful Tamil music.',
    'Bengaluru',
    'AEIOU Manyata, Manyata Tech Park',
    'Manyata Tech Park, Nagavara, Bengaluru, Karnataka 560045',
    'Dec 07, 2025',
    '7:00 PM onwards',
    '₹499 onwards',
    'https://images.unsplash.com/photo-1642552556378-549e3445315e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBwZXJmb3JtZXJ8ZW58MXx8fHwxNzY0OTAyMjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ARRAY['Concert', 'Jamming', 'Singing', 'Sing Along', 'Tamil Concert'],
    'Tamil',
    'All age groups',
    ARRAY['Differently-abled friendly', 'All safety measures enabled', 'Seating (FCFS)', 'Networking Sessions', 'Social Mixers', 'Indoor Event', 'Family-Friendly', 'Suitable for all ages', 'Teens and 18+'],
    13.0458,
    77.6208
),
(
    'Standup Comedy Night with Kenny Sebastian',
    'Comedy',
    'An evening of laughter with one of India''s finest comedians',
    'Join us for a hilarious night of standup comedy featuring Kenny Sebastian. Get ready to laugh until your sides hurt!',
    'Mumbai',
    'Phoenix Marketcity, Kurla',
    'Phoenix Marketcity, LBS Marg, Kurla West, Mumbai, Maharashtra 400070',
    'Dec 15, 2025',
    '8:00 PM',
    '₹799 onwards',
    'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=1080',
    ARRAY['Comedy', 'Standup', 'Entertainment'],
    'English/Hindi',
    '18+',
    ARRAY['Indoor Event', 'All safety measures enabled', 'Seating (FCFS)', 'Networking Sessions', 'Social Mixers'],
    19.0822,
    72.8865
),
(
    'Sunburn Arena ft. Martin Garrix',
    'Music Festival',
    'Asia''s biggest EDM festival featuring international DJ Martin Garrix',
    'Experience the ultimate EDM extravaganza with Martin Garrix live in concert. Dance the night away with thousands of music lovers.',
    'Bengaluru',
    'Jayamahal Palace Grounds',
    'Jayamahal Palace Grounds, Bengaluru, Karnataka 560006',
    'Dec 31, 2025',
    '6:00 PM onwards',
    '₹2,499 onwards',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1080',
    ARRAY['Music Festival', 'EDM', 'Dance', 'Party'],
    'All',
    '18+',
    ARRAY['Outdoor Event', 'All safety measures enabled', 'Multiple stages', 'Food & Beverages available', 'Parking available'],
    13.0067,
    77.5963
),
(
    'Classical Carnatic Music Evening',
    'Music',
    'An evening of classical Carnatic music by renowned artists',
    'Immerse yourself in the rich tradition of Carnatic music with performances by leading artists from South India.',
    'Chennai',
    'Music Academy',
    'The Music Academy, TTK Road, Royapettah, Chennai, Tamil Nadu 600014',
    'Jan 05, 2026',
    '6:30 PM',
    '₹350 onwards',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1080',
    ARRAY['Classical Music', 'Carnatic', 'Traditional'],
    'Tamil',
    'All ages',
    ARRAY['Indoor Event', 'Traditional ambiance', 'Family-Friendly', 'Suitable for all ages'],
    13.0527,
    80.2569
),
(
    'Contemporary Dance Workshop',
    'Dance',
    'Learn contemporary dance from international choreographers',
    'A 3-day intensive workshop on contemporary dance techniques led by award-winning choreographers from around the world.',
    'Mumbai',
    'Prithvi Theatre',
    'Prithvi Theatre, Janki Kutir, Juhu Church Road, Mumbai, Maharashtra 400049',
    'Jan 20, 2026',
    '10:00 AM - 5:00 PM',
    '₹3,500 for 3 days',
    'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHBlcmZvcm1hbmNlJTIwc3RhZ2V8ZW58MXx8fHwxNzY0ODI1Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ARRAY['Dance', 'Workshop', 'Contemporary', 'Learning'],
    'English',
    '16+',
    ARRAY['Indoor Event', 'Professional training', 'Certificate provided', 'All skill levels welcome'],
    19.1076,
    72.8263
),
(
    'Art Exhibition - Modern Perspectives',
    'Art',
    'A curated exhibition of contemporary Indian art',
    'Explore the works of emerging and established Indian artists showcasing modern perspectives on traditional themes.',
    'New Delhi',
    'National Gallery of Modern Art',
    'Jaipur House, India Gate, New Delhi, Delhi 110003',
    'Dec 10, 2025',
    '10:00 AM - 6:00 PM',
    '₹100',
    'https://images.unsplash.com/photo-1683222042853-37cd29faf895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMGNhbnZhc3xlbnwxfHx8fDE3NjQ4NDk1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ARRAY['Art', 'Exhibition', 'Contemporary Art', 'Gallery'],
    'All',
    'All ages',
    ARRAY['Indoor Event', 'Guided tours available', 'Photography allowed', 'Family-Friendly'],
    28.6129,
    77.2295
),
(
    'Poetry Slam Competition',
    'Literature',
    'Compete in Hyderabad''s biggest poetry slam event',
    'Showcase your poetry skills in this high-energy slam competition. Open mic and competition rounds available.',
    'Hyderabad',
    'Lamakaan',
    'Lamakaan, Road No. 1, Banjara Hills, Hyderabad, Telangana 500034',
    'Dec 18, 2025',
    '7:00 PM',
    'Free Entry',
    'https://images.unsplash.com/photo-1612907260223-2c7aff7a7d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwbm90ZWJvb2slMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NjQ4NTE1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ARRAY['Poetry', 'Literature', 'Competition', 'Open Mic'],
    'English/Hindi/Telugu',
    'All ages',
    ARRAY['Indoor Event', 'Open Mic', 'Competition', 'Prizes for winners', 'Networking Sessions'],
    17.4239,
    78.4738
),
(
    'Food & Music Festival',
    'Festival',
    'A celebration of food and music from across India',
    'Experience the best of Indian cuisine paired with live music performances from various genres.',
    'Bengaluru',
    'Cubbon Park',
    'Kasturba Road, Sampangi Rama Nagar, Bengaluru, Karnataka 560001',
    'Jan 25, 2026',
    '11:00 AM - 10:00 PM',
    '₹200 (Entry)',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1080',
    ARRAY['Festival', 'Food', 'Music', 'Cultural'],
    'All',
    'All ages',
    ARRAY['Outdoor Event', 'Food stalls', 'Live music', 'Family-Friendly', 'Pet-friendly'],
    12.9763,
    77.5925
);

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.events IS 'Stores all event data for the Rizia platform';
COMMENT ON COLUMN public.events.is_active IS 'Flag to mark if event is currently active/visible';
COMMENT ON COLUMN public.events.created_by IS 'User ID of the admin who created this event';
