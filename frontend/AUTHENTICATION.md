# Authentication System Documentation

## Overview

Complete authentication system with Zustand state management, JWT token handling, and protected routes.

## Architecture

```
Frontend Auth Flow
├── _app.tsx (initializes auth on app load)
├── Auth Service (API calls to backend)
│   └── authService.ts
├── Auth Store (Zustand)
│   └── useAuth.ts
├── Protected Routes
│   └── ProtectedRoute.tsx
└── Auth Pages
    ├── login.tsx
    ├── signup.tsx
    ├── forgot-password.tsx
    └── reset-password.tsx
```

## Components & Files

### Pages

#### `/auth/login.tsx`
Login page with email and password.

**Features:**
- Email and password inputs
- Show/hide password toggle
- Remember me checkbox
- Forgot password link
- Sign up link
- Two-column layout (brand on left, form on right)
- Error message display
- Loading states

**API Call:**
```typescript
authService.login(email, password) → AuthResponse
```

#### `/auth/signup.tsx`
User registration page with validation.

**Features:**
- Full name input
- Email validation
- Password strength indicator
- Confirm password match validation
- Real-time validation feedback
- Terms & privacy checkbox
- Eye/show password toggles
- Password requirements display

**Validations:**
- Name: Required, non-empty
- Email: Valid email format
- Password: Min 8 chars, uppercase, lowercase, numbers
- Confirm: Must match password
- Terms: Must be checked

**API Call:**
```typescript
authService.register(email, password, name) → AuthResponse
```

#### `/auth/forgot-password.tsx`
Password reset request page.

**States:**
1. Form state - User enters email
2. Success state - Confirmation message

**Features:**
- Email input
- Submit button
- Success confirmation with resend option
- Back to login link

**API Call:**
```typescript
authService.requestPasswordReset(email) → void
```

#### `/auth/reset-password.tsx`
Password reset page (accessed via email link).

**Features:**
- Token validation from URL query
- New password input
- Confirm password input
- Password requirements display
- Automatic redirect to login on success
- Invalid token handling

**Validations:**
- Token must be valid
- Password requirements same as signup
- Passwords must match

**API Call:**
```typescript
authService.resetPassword(token, password) → void
```

#### `/dashboard`
Protected route example - redirects to login if unauthenticated.

### Services

#### `authService.ts`
API integration for authentication.

**Methods:**

```typescript
// Registration
register(email, password, name) → Promise<AuthResponse>

// Login
login(email, password) → Promise<AuthResponse>

// Logout
logout() → Promise<void>

// Get current user
getCurrentUser() → Promise<User>

// Token refresh
refreshToken() → Promise<string>

// Password reset
requestPasswordReset(email) → Promise<void>
resetPassword(token, password) → Promise<void>

// Email verification
verifyEmail(token) → Promise<void>

// Token management
getToken() → string | null
isAuthenticated() → boolean
```

**Token Storage:**
- `token` - Stored in localStorage
- `refreshToken` - Stored in localStorage (optional)

**Error Handling:**
- Automatic logout on 401 (Unauthorized)
- Error messages passed to caller
- Retry logic via axios interceptors

### State Management

#### `useAuth.ts` (Zustand Store)
Global authentication state and actions.

**State:**
```typescript
{
  user: User | null,           // Current authenticated user
  isLoading: boolean,          // Loading state
  isAuthenticated: boolean,    // Auth status
  error: string | null         // Error message
}
```

**Actions:**
```typescript
// Login with email/password
login(email, password) → Promise<void>

// Register new account
register(email, password, name) → Promise<void>

// Logout
logout() → Promise<void>

// Fetch current user from API
fetchCurrentUser() → Promise<void>

// Clear error message
clearError() → void
```

**Usage:**
```typescript
const { user, isAuthenticated, login } = useAuthStore();

// Subscribe to changes
useAuthStore.subscribe((state) => {
  console.log('Auth state changed:', state);
});
```

### Components

#### `ProtectedRoute.tsx`
Wrapper component for route protection.

**Features:**
- Checks authentication status
- Redirects to login if not authenticated
- Shows loading spinner while checking
- Fetches current user if needed

**Usage:**
```tsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## API Endpoints Expected

### Authentication Endpoints

```
POST /auth/register
{
  "email": "user@example.com",
  "password": "Password123",
  "name": "John Doe"
}
Response: { user, token, refreshToken? }

POST /auth/login
{
  "email": "user@example.com",
  "password": "Password123"
}
Response: { user, token, refreshToken? }

POST /auth/logout
Response: { success: true }

GET /auth/me
Headers: { Authorization: "Bearer token" }
Response: { user }

POST /auth/refresh
{
  "refreshToken": "refresh_token_value"
}
Response: { token }

POST /auth/forgot-password
{
  "email": "user@example.com"
}
Response: { message: "Reset email sent" }

POST /auth/reset-password
{
  "token": "reset_token",
  "password": "NewPassword123"
}
Response: { message: "Password reset successful" }

POST /auth/verify-email
{
  "token": "verification_token"
}
Response: { message: "Email verified" }
```

## Authentication Flow

### Login Flow
1. User enters email and password
2. Click "Sign In" button
3. `authService.login()` called with credentials
4. Backend validates and returns user + token
5. Token stored in localStorage
6. User state updated in Zustand store
7. Redirect to `/dashboard`

### Signup Flow
1. User enters name, email, password
2. Frontend validates all fields
3. Password strength verified
4. `authService.register()` called
5. Backend creates user and returns token
6. Token stored in localStorage
7. Redirect to `/dashboard`

### Protected Route Flow
1. User tries to access `/dashboard`
2. ProtectedRoute component checks `isAuthenticated`
3. If false:
   - Show loading spinner
   - Call `fetchCurrentUser()`
   - If user not found, redirect to `/auth/login`
4. If true:
   - Render protected component

### Password Reset Flow
1. User clicks "Forgot password" link on login
2. Enters email on `/auth/forgot-password`
3. Backend sends reset link via email
4. User clicks link in email (contains token)
5. Redirected to `/auth/reset-password?token=xyz`
6. Enter new password and confirm
7. `authService.resetPassword(token, password)` called
8. Redirect to `/auth/login`

## Token Management

### Storage
- Tokens stored in `localStorage`
- No sensitive data in JWT (avoid storing in localStorage in production)
- Consider using httpOnly cookies for production

### Expiration
- Token expiration handled by backend
- Automatic refresh via `refreshToken` endpoint
- 401 response triggers logout

### Refresh Token Logic
```typescript
// In axios interceptor
if (error.status === 401) {
  const newToken = await authService.refreshToken();
  retryRequest(newToken);
}
```

## Security Considerations

### Current Implementation
✅ JWT token handling
✅ Protected routes
✅ Password validation
✅ Token storage in localStorage

### Production Improvements
- [ ] Use httpOnly cookies instead of localStorage
- [ ] Implement CSRF tokens
- [ ] Add rate limiting on auth endpoints
- [ ] Implement refresh token rotation
- [ ] Add 2FA support
- [ ] Implement email verification
- [ ] Add account lockout after failed attempts
- [ ] Use secure password hashing (bcrypt)
- [ ] Implement audit logging

## Validation Rules

### Email
- Valid email format (RFC 5322)
- Must be unique (backend check)

### Password
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Recommended: special characters

### Name
- Non-empty
- Max 100 characters

## Error Handling

### API Errors
```typescript
try {
  await login(email, password);
} catch (error) {
  // error.response.data.message contains error details
  // Common errors:
  // - "Invalid credentials"
  // - "User not found"
  // - "Email already registered"
}
```

### Form Validation Errors
- Real-time validation on input change
- Error messages shown below fields
- Submit button disabled if form invalid

### Session Errors
- 401: Token expired → redirect to login
- 403: Forbidden → show error message
- 500: Server error → show generic error

## Usage Examples

### Login
```typescript
import { useAuthStore } from '@/hooks/useAuth';

function LoginComponent() {
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // Redirect handled automatically
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Form JSX
  );
}
```

### Check Authentication
```typescript
import { useAuthStore } from '@/hooks/useAuth';

function Component() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return <div>Hello, {user?.name}</div>;
}
```

### Logout
```typescript
function LogoutButton() {
  const { logout } = useAuthStore();

  return (
    <button onClick={logout}>
      Sign Out
    </button>
  );
}
```

### Protected Page
```typescript
import ProtectedRoute from '@/components/common/ProtectedRoute';

function Page() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
```

## Testing

### Manual Testing Checklist
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Signup with weak password
- [ ] Signup with mismatched passwords
- [ ] Forgot password flow
- [ ] Reset password flow
- [ ] Access protected route when authenticated
- [ ] Redirect to login when unauthenticated
- [ ] Token persists on page refresh
- [ ] Logout clears token and user

### Test Credentials
```
Email: test@example.com
Password: TestPassword123
```

## Next Steps

1. **Implement Backend Endpoints**
   - POST /auth/register
   - POST /auth/login
   - GET /auth/me
   - POST /auth/logout
   - POST /auth/forgot-password
   - POST /auth/reset-password

2. **Add Email Service**
   - Verify email on signup
   - Send password reset link
   - Email templates

3. **Enhanced Security**
   - 2FA implementation
   - OAuth/SSO integration
   - Rate limiting

4. **User Profile Management**
   - Edit profile page
   - Change password
   - Account settings

## Files Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   ├── signup.tsx
│   │   │   ├── forgot-password.tsx
│   │   │   └── reset-password.tsx
│   │   ├── dashboard.tsx
│   │   └── _app.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── components/
│   │   └── common/
│   │       └── ProtectedRoute.tsx
│   └── types/
│       └── index.ts
└── AUTHENTICATION.md
```
