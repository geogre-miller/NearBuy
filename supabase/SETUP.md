# Supabase Setup Instructions for SMTOWN Marketplace

## Prerequisites
1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase
3. Note down your project URL and anon public key

## Database Setup

### Step 1: Execute SQL Scripts
Run the following SQL files in order through the Supabase SQL Editor:

1. **schema.sql** - Creates all tables, indexes, and triggers
2. **rls-policies.sql** - Sets up Row Level Security policies
3. **sample-data.sql** - Inserts sample categories and data

### Step 2: Configure Authentication
1. In Supabase Dashboard, go to Authentication > Settings
2. Enable Email authentication
3. Configure email templates if needed
4. Set up social auth providers if desired (Google, Facebook, etc.)

### Step 3: Storage Setup (for images)
1. Go to Storage in Supabase Dashboard
2. Create a bucket named `marketplace-media`
3. Set bucket to public
4. Configure upload policies:
```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'marketplace-media');

-- Users can update their own uploads
CREATE POLICY "Users can update own uploads" ON storage.objects
FOR UPDATE USING (auth.uid()::text = (storage.foldername(name))[1]);
```

### Step 4: Environment Variables
Add these to your mobile app environment:

```env
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
```

## Mobile App Integration

### React Native with Supabase
```bash
npm install @supabase/supabase-js
```

### Flutter with Supabase
```bash
flutter pub add supabase_flutter
```

### Basic Client Setup (React Native)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## API Usage Examples

### Authentication
```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
})
```

### Create User Profile
```typescript
const { data, error } = await supabase
  .from('user_profiles')
  .insert({
    user_id: user.id,
    full_name: 'Nguyễn Văn Nam',
    phone_number: '0987654321',
    address: '123 Đường Nguyễn Tất Thành',
    ward: 'Phường Quyết Thắng'
  })
```

### Fetch Posts
```typescript
const { data, error } = await supabase
  .from('posts')
  .select(`
    *,
    user_profiles(full_name, avatar_url, rating),
    categories(name_vietnamese),
    post_media(media_url, is_primary)
  `)
  .eq('status', 'active')
  .order('created_at', { ascending: false })
  .limit(20)
```

### Real-time Updates
```typescript
const subscription = supabase
  .channel('posts')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'posts'
  }, (payload) => {
    console.log('New post:', payload.new)
  })
  .subscribe()
```

## Deployment Checklist

- [ ] All SQL scripts executed successfully
- [ ] RLS policies are active and tested
- [ ] Storage bucket created and configured
- [ ] Authentication providers configured
- [ ] Environment variables set in mobile app
- [ ] Test user registration and profile creation
- [ ] Test post creation and image upload
- [ ] Test real-time subscriptions
- [ ] Verify security policies work correctly

## Performance Optimization

### Indexing
All necessary indexes are created in the schema.sql file for optimal query performance.

### Caching Strategy
- Cache categories data in mobile app (rarely changes)
- Use pagination for post listings
- Implement image optimization and lazy loading
- Cache user profiles for offline viewing

### Real-time Features
- New posts notifications
- New messages alerts
- Live comment updates
- Online user status

## Security Considerations

### Row Level Security
- All tables have RLS enabled
- Users can only access their own private data
- Public data is accessible to all authenticated users
- Proper validation on all insert/update operations

### Data Validation
- Phone number format validation
- Price range validation
- Image file type and size limits
- Content moderation for descriptions

## Monitoring and Analytics

### Built-in Supabase Analytics
- Monitor API usage
- Track authentication events
- Database performance metrics
- Error logging and monitoring

### Custom Analytics
Consider adding tracking for:
- Most viewed categories
- Popular search terms
- User engagement metrics
- Geographic usage patterns

## Backup and Recovery

### Automatic Backups
Supabase provides automatic daily backups for paid plans.

### Manual Backup
```sql
-- Export user data
COPY (SELECT * FROM user_profiles) TO 'user_profiles.csv' CSV HEADER;

-- Export posts data  
COPY (SELECT * FROM posts) TO 'posts.csv' CSV HEADER;
```

## Support and Maintenance

### Regular Tasks
- Monitor database performance
- Review and update RLS policies
- Clean up expired posts
- Update category listings
- User feedback and feature requests

### Scaling Considerations
- Database connection pooling
- Read replicas for heavy read workloads
- CDN for image delivery
- Database partitioning for large datasets
