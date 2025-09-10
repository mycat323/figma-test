import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nmtwfnwthfogpqxfmnqs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tdHdmbnd0aGZvZ3BxeGZtbnFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTI3OTksImV4cCI6MjA3MzA2ODc5OX0.a7zUZqC_QOa4W19wF_DL2X-BBr7Fu6spuxrpTh5IaGs'

export const supabase = createClient(supabaseUrl, supabaseKey)

