/** @format */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://safavnifxlutntnkyzmv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhZmF2bmlmeGx1dG50bmt5em12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzM3MzAsImV4cCI6MjA5NDc0OTczMH0.WanQdbIf6ExColYJRNmW37D-xHOlBU1OVZeVDoelR7U";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
