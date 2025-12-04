/*
  # Drop custom users table
  
  1. Changes
    - Drop the custom `users` table that was created but never used
    - The application uses Supabase Auth (auth.users) exclusively
    - This table was causing confusion and is not needed
  
  2. Reason
    - The application uses auth.users from Supabase Auth
    - The custom users table was never integrated
    - All foreign keys in other tables already reference auth.users correctly
*/

DROP TABLE IF EXISTS users CASCADE;
