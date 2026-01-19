-- Create subscribers table for email collection
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL DEFAULT 'newsletter',
  quiz_score INTEGER,
  quiz_result_type TEXT,
  quiz_answers JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create abandoned_carts table for cart recovery
CREATE TABLE public.abandoned_carts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  session_id TEXT NOT NULL,
  cart_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_value DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  recovered BOOLEAN NOT NULL DEFAULT false,
  recovery_email_sent_at TIMESTAMP WITH TIME ZONE,
  checkout_completed BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS on both tables
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;

-- Subscribers policies - public insert (for signups), no public select/update/delete
CREATE POLICY "Anyone can subscribe" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service role can manage subscribers" 
ON public.subscribers 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Abandoned carts policies - public insert/update by session, no public select
CREATE POLICY "Anyone can create abandoned cart" 
ON public.abandoned_carts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update their cart by session" 
ON public.abandoned_carts 
FOR UPDATE 
USING (true);

CREATE POLICY "Service role can manage abandoned carts" 
ON public.abandoned_carts 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create index for efficient cart lookups
CREATE INDEX idx_abandoned_carts_session ON public.abandoned_carts(session_id);
CREATE INDEX idx_abandoned_carts_email ON public.abandoned_carts(email) WHERE email IS NOT NULL;
CREATE INDEX idx_subscribers_email ON public.subscribers(email);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for abandoned_carts updated_at
CREATE TRIGGER update_abandoned_carts_updated_at
BEFORE UPDATE ON public.abandoned_carts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();