import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';

// Use a custom domain as the supabase URL
const supabase = createClient<Database>(
    'https://rpwpuujyefmrtvlonerj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwd3B1dWp5ZWZtcnR2bG9uZXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5MzU5MDcsImV4cCI6MjAxMjUxMTkwN30.JI1d_c1LOVphLpVrYf9taApV9VvzLiBfcAfVOorf81U'
)

export default supabase;