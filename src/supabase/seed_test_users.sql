-- =====================================================
-- RIZIA - TEST USER CREDENTIALS
-- Run this in your Supabase SQL Editor to create test users
-- =====================================================

-- Password hashes are SHA-256 hashes (matching the hashPassword function in supabaseClient.ts)
-- admin123 = 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9
-- test123 = ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae

-- =====================================================
-- ADMIN USER
-- =====================================================
-- Email: admin@rizia.com
-- Password: admin123

INSERT INTO public.users_login (email, password_hash, is_admin, created_at, login_count)
VALUES ('admin@rizia.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', true, NOW(), 0)
ON CONFLICT (email) DO UPDATE SET 
    password_hash = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
    is_admin = true;

INSERT INTO public.users (login_id, name, email, category, created_at)
SELECT id, 'Admin User', 'admin@rizia.com', 'Administrator', NOW()
FROM public.users_login
WHERE email = 'admin@rizia.com'
ON CONFLICT (email) DO UPDATE SET 
    name = 'Admin User',
    category = 'Administrator';

-- =====================================================
-- TEST USER 1 (Regular User)
-- =====================================================
-- Email: test@rizia.com
-- Password: test123

INSERT INTO public.users_login (email, password_hash, is_admin, created_at, login_count)
VALUES ('test@rizia.com', 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae', false, NOW(), 0)
ON CONFLICT (email) DO UPDATE SET 
    password_hash = 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae',
    is_admin = false;

INSERT INTO public.users (login_id, name, email, category, created_at)
SELECT id, 'Test User', 'test@rizia.com', 'Event Enthusiast', NOW()
FROM public.users_login
WHERE email = 'test@rizia.com'
ON CONFLICT (email) DO UPDATE SET 
    name = 'Test User',
    category = 'Event Enthusiast';

-- =====================================================
-- TEST USER 2 (Another Regular User)
-- =====================================================
-- Email: john.doe@example.com
-- Password: test123

INSERT INTO public.users_login (email, password_hash, is_admin, created_at, login_count)
VALUES ('john.doe@example.com', 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae', false, NOW(), 0)
ON CONFLICT (email) DO UPDATE SET 
    password_hash = 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae',
    is_admin = false;

INSERT INTO public.users (login_id, name, email, category, created_at)
SELECT id, 'John Doe', 'john.doe@example.com', 'Music Lover', NOW()
FROM public.users_login
WHERE email = 'john.doe@example.com'
ON CONFLICT (email) DO UPDATE SET 
    name = 'John Doe',
    category = 'Music Lover';

-- =====================================================
-- TEST USER 3 (Another Regular User)
-- =====================================================
-- Email: sarah.smith@example.com
-- Password: test123

INSERT INTO public.users_login (email, password_hash, is_admin, created_at, login_count)
VALUES ('sarah.smith@example.com', 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae', false, NOW(), 0)
ON CONFLICT (email) DO UPDATE SET 
    password_hash = 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae',
    is_admin = false;

INSERT INTO public.users (login_id, name, email, category, created_at)
SELECT id, 'Sarah Smith', 'sarah.smith@example.com', 'Art Enthusiast', NOW()
FROM public.users_login
WHERE email = 'sarah.smith@example.com'
ON CONFLICT (email) DO UPDATE SET 
    name = 'Sarah Smith',
    category = 'Art Enthusiast';

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================
-- Run this to verify the users were created successfully
SELECT 
    ul.email,
    ul.is_admin,
    u.name,
    u.category,
    ul.created_at
FROM public.users_login ul
LEFT JOIN public.users u ON ul.email = u.email
ORDER BY ul.is_admin DESC, ul.email;
