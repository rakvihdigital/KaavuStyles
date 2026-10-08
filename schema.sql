-- Kavvu Style Supabase Database Schema

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT,
    stock INT DEFAULT 10,
    sizes TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL'],
    colors TEXT[] DEFAULT ARRAY['Crimson', 'Gold', 'Ivory'],
    lifestyle_tags TEXT[] DEFAULT ARRAY['Festive', 'Ethnic'],
    images TEXT[] NOT NULL,
    is_latest BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. HERO BANNERS TABLE
CREATE TABLE IF NOT EXISTS public.banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    cta_text TEXT DEFAULT 'EXPLORE COLLECTION',
    cta_link TEXT DEFAULT '/shop',
    is_active BOOLEAN DEFAULT true,
    order_num INT DEFAULT 1,
    text_align TEXT DEFAULT 'left',
    text_color TEXT DEFAULT '#F8F3EC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'Pending', -- Pending, Processing, Shipped, Delivered, Cancelled
    items JSONB NOT NULL,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. LIFESTYLE TAGS TABLE
CREATE TABLE IF NOT EXISTS public.lifestyle_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL
);

-- 6. SIZES TABLE
CREATE TABLE IF NOT EXISTS public.sizes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL
);

-- 7. COLORS TABLE
CREATE TABLE IF NOT EXISTS public.colors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    hex TEXT NOT NULL
);

-- 8. INSTAGRAM POSTS TABLE
CREATE TABLE IF NOT EXISTS public.instagram_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_url TEXT NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    order_num INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. COUPONS TABLE
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    discount_type TEXT DEFAULT 'percentage', -- 'percentage' or 'fixed'
    discount_value DECIMAL(10,2) NOT NULL,
    max_discount DECIMAL(10,2),
    min_order_value DECIMAL(10,2) DEFAULT 0,
    usage_limit INT,
    times_used INT DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lifestyle_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Create Public Read Policies for Storefront
CREATE POLICY "Allow Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Banners" ON public.banners FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Read Tags" ON public.lifestyle_tags FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Sizes" ON public.sizes FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Colors" ON public.colors FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Instagram" ON public.instagram_posts FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Coupons" ON public.coupons FOR SELECT USING (true);

-- Admin Full Access Policies (Allows full CRUD for authenticated service role or admin app)
CREATE POLICY "Allow Admin Full Categories" ON public.categories FOR ALL USING (true);
CREATE POLICY "Allow Admin Full Products" ON public.products FOR ALL USING (true);
CREATE POLICY "Allow Admin Full Banners" ON public.banners FOR ALL USING (true);
CREATE POLICY "Allow Admin Full Orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow Admin Full Tags" ON public.lifestyle_tags FOR ALL USING (true);
CREATE POLICY "Allow Admin Full Sizes" ON public.sizes FOR ALL USING (true);
CREATE POLICY "Allow Admin Full Colors" ON public.colors FOR ALL USING (true);
CREATE POLICY "Allow Admin Full Instagram" ON public.instagram_posts FOR ALL USING (true);
CREATE POLICY "Allow Admin Full Coupons" ON public.coupons FOR ALL USING (true);

-- SEED INITIAL SAMPLE DATA
INSERT INTO public.categories (name, slug, image_url) VALUES
('Royal Sarees', 'sarees', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800'),
('Designer Kurtis', 'kurtis', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800'),
('Bridal Lehengas', 'lehengas', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800'),
('Indo-Western', 'indo-western', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800')
ON CONFLICT DO NOTHING;

INSERT INTO public.coupons (code, description, discount_type, discount_value, max_discount, min_order_value, usage_limit, times_used, valid_from, is_active) VALUES
('KAAVU10', 'Enjoy 10% Off on Orders Above ₹999/-', 'percentage', 10.00, 500.00, 999.00, NULL, 14, NOW(), true),
('SAVE20', 'Festive Season 20% Special Discount', 'percentage', 20.00, 1000.00, 2000.00, 100, 23, NOW(), true),
('WELCOME500', 'Flat ₹500 off on luxury sarees', 'fixed', 500.00, NULL, 4999.00, 50, 8, NOW(), true)
ON CONFLICT (code) DO NOTHING;

-- MIGRATION ALTER TABLE STATEMENTS (Run if updating an existing table)
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS text_align TEXT DEFAULT 'left';
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS text_color TEXT DEFAULT '#F8F3EC';

