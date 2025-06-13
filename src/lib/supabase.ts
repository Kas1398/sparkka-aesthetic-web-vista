
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://urnanxutyovdgtxeprpi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybmFueHV0eW92ZGd0eGVwcnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTk3MDIsImV4cCI6MjA2NTM3NTcwMn0.HBJpWJbdbHr9rv-Y2r42mppUe9vtvmUKIfKyGS2W0M4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
