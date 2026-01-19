const SUPABASE_URL = "https://apjphuihjhopkaspstii.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwanBodWloamhvcGthc3BzdGlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NjE4NzcsImV4cCI6MjA4MzMzNzg3N30._3WLXWYukCo8yo7QpeDzCsfhW5zQF0RCADgA2F_DSFg";

window.db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
