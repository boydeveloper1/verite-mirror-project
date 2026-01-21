-- Fix 1: Block public SELECT access to subscribers table
-- Currently anyone can read all subscriber emails and quiz health data
CREATE POLICY "Only service role can read subscribers"
ON subscribers FOR SELECT
USING (false);

-- Fix 2: Drop the vulnerable cart UPDATE policy that allows anyone to modify any cart
-- The current policy uses USING (true) which is a critical security hole
DROP POLICY IF EXISTS "Anyone can update their cart by session" ON abandoned_carts;

-- Fix 3: Create a proper UPDATE policy that only allows service role to update carts
-- Cart updates should only happen through edge functions with proper validation
CREATE POLICY "Only service role can update carts"
ON abandoned_carts FOR UPDATE
USING (false);