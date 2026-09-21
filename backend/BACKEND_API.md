# Backend API Documentation

## Overview

Financial Life Platform Backend API built with NestJS. All endpoints require JWT authentication via Bearer token.

**Base URL:** `http://localhost:3001/api`  
**API Docs:** `http://localhost:3001/api/docs` (Swagger UI)

---

## Authentication

### Headers Required
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### Token Format
- **Access Token:** Valid for 7 days
- **Refresh Token:** Valid for 30 days
- **Reset Token:** Valid for 1 hour

---

## API Endpoints

### Authentication (8 endpoints)

#### 1. Register User
```
POST /auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response (201):
{
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "consumer",
    "createdAt": "2026-09-20T..."
  },
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}

Error (400): Email already registered
```

#### 2. Login
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response (200): Same as Register
Error (401): Invalid credentials
```

#### 3. Logout
```
POST /auth/logout
Authorization: Bearer <TOKEN>

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### 4. Get Current User
```
GET /auth/me
Authorization: Bearer <TOKEN>

Response (200):
{
  "id": "uuid",
  "email": "john@example.com",
  "name": "John Doe",
  "role": "consumer",
  "createdAt": "2026-09-20T..."
}

Error (401): Invalid token
```

#### 5. Refresh Token
```
POST /auth/refresh
Content-Type: application/json

Request Body:
{
  "refreshToken": "eyJhbGc..."
}

Response (200):
{
  "token": "eyJhbGc..."
}

Error (401): Invalid refresh token
```

#### 6. Forgot Password
```
POST /auth/forgot-password
Content-Type: application/json

Request Body:
{
  "email": "john@example.com"
}

Response (200):
{
  "message": "Password reset email sent"
}

Note: Email check doesn't reveal if account exists (security)
```

#### 7. Reset Password
```
POST /auth/reset-password
Content-Type: application/json

Request Body:
{
  "token": "reset-token-from-email",
  "password": "NewSecurePass123"
}

Response (200):
{
  "message": "Password reset successfully"
}

Error (401): Invalid or expired token
```

#### 8. Verify Email
```
POST /auth/verify-email
Content-Type: application/json

Request Body:
{
  "token": "verify-token"
}

Response (200):
{
  "message": "Email verified successfully"
}
```

---

### Users (4 endpoints)

#### 1. Get Profile
```
GET /users/profile
Authorization: Bearer <TOKEN>

Response (200):
{
  "id": "uuid",
  "email": "john@example.com",
  "name": "John Doe",
  "avatar": "https://...",
  "role": "consumer",
  "createdAt": "2026-09-20T..."
}
```

#### 2. Update Profile
```
PUT /users/profile
Authorization: Bearer <TOKEN>
Content-Type: application/json

Request Body:
{
  "name": "Jane Doe",
  "avatar": "https://..."
}

Response (200): Updated user object
```

#### 3. Change Password
```
POST /users/change-password
Authorization: Bearer <TOKEN>
Content-Type: application/json

Request Body:
{
  "oldPassword": "CurrentPass123",
  "newPassword": "NewPass123"
}

Response (200):
{
  "message": "Password changed successfully"
}

Error (400): Current password is incorrect
```

#### 4. Delete Account
```
DELETE /users/:id
Authorization: Bearer <TOKEN>

Response (200):
{
  "message": "Account deleted successfully"
}

Note: Soft delete - account marked as inactive
```

---

### Documents (5 endpoints)

#### 1. List Documents
```
GET /documents
GET /documents?type=insurance
Authorization: Bearer <TOKEN>

Query Parameters:
- type: insurance | tax | claim | credit | other (optional)

Response (200):
[
  {
    "id": "uuid",
    "fileName": "2026-W-2.pdf",
    "fileUrl": "https://...",
    "type": "tax",
    "category": "income",
    "fileSize": 1200000,
    "createdAt": "2026-09-20T..."
  },
  ...
]
```

#### 2. Get Document
```
GET /documents/:id
Authorization: Bearer <TOKEN>

Response (200): Single document object
Error (404): Document not found
```

#### 3. Upload Document
```
POST /documents
Authorization: Bearer <TOKEN>
Content-Type: application/json

Request Body:
{
  "fileName": "2026-W-2.pdf",
  "fileUrl": "https://s3.../file.pdf",
  "type": "tax",
  "category": "income",
  "fileSize": 1200000,
  "mimeType": "application/pdf"
}

Response (201): Created document object
```

#### 4. Delete Document
```
DELETE /documents/:id
Authorization: Bearer <TOKEN>

Response (200):
{
  "message": "Document deleted successfully"
}
```

#### 5. Extract Text
```
POST /documents/:id/extract
Authorization: Bearer <TOKEN>

Response (200):
{
  "text": "Extracted text from document..."
}

Note: Calls AI service for OCR processing
```

---

### Health Score (6 endpoints)

#### 1. Get Current Score
```
GET /health-score
Authorization: Bearer <TOKEN>

Response (200):
{
  "id": "uuid",
  "userId": "uuid",
  "overallScore": 78,
  "breakdown": {
    "insurance": {
      "score": 82,
      "status": "healthy",
      "gaps": ["Review umbrella"]
    },
    "tax": {
      "score": 75,
      "status": "on-track",
      "missingDocs": 2
    },
    "credit": {
      "score": 88,
      "trend": "up",
      "recentChanges": 3
    },
    "claims": {
      "score": 70,
      "pending": 1,
      "resolved": 5
    },
    "documents": {
      "score": 85,
      "totalCount": 20,
      "organized": 18
    }
  },
  "opportunities": [...],
  "createdAt": "2026-09-20T..."
}
```

#### 2. Refresh Score
```
POST /health-score/refresh
Authorization: Bearer <TOKEN>
Content-Type: application/json

Request Body:
{
  "overallScore": 80,
  "breakdown": {...},
  "opportunities": [...]
}

Response (200): Updated health score
```

#### 3. Get History
```
GET /health-score/history
GET /health-score/history?limit=6
Authorization: Bearer <TOKEN>

Query Parameters:
- limit: 1-100 (default: 12)

Response (200): Array of health scores
```

#### 4. Get Trend
```
GET /health-score/trend
GET /health-score/trend?months=3
Authorization: Bearer <TOKEN>

Query Parameters:
- months: 1-24 (default: 6)

Response (200):
[
  {
    "date": "2026-09-20T...",
    "score": 75
  },
  {
    "date": "2026-08-20T...",
    "score": 73
  },
  ...
]
```

#### 5. Get Comparison
```
GET /health-score/comparison
Authorization: Bearer <TOKEN>

Response (200):
{
  "current": 80,
  "previous": 78,
  "change": 2
}
```

#### 6. Get Opportunities
```
GET /health-score/opportunities
GET /health-score/opportunities?limit=5
Authorization: Bearer <TOKEN>

Query Parameters:
- limit: 1-20 (default: 5)

Response (200): Array of opportunities sorted by priority
```

---

### Alerts (7 endpoints)

#### 1. List Alerts
```
GET /alerts
GET /alerts?unreadOnly=true
GET /alerts?type=renewal
GET /alerts?priority=high
Authorization: Bearer <TOKEN>

Query Parameters:
- unreadOnly: true | false (optional)
- type: renewal | deadline | missing_doc | opportunity | risk (optional)
- priority: low | medium | high (optional)

Response (200):
[
  {
    "id": "uuid",
    "type": "renewal",
    "title": "Insurance renewal due",
    "message": "Your auto policy renews on Oct 1...",
    "priority": "high",
    "read": false,
    "actionUrl": "/documents/...",
    "createdAt": "2026-09-20T..."
  },
  ...
]
```

#### 2. Get Alert
```
GET /alerts/:id
Authorization: Bearer <TOKEN>

Response (200): Single alert object
Error (404): Alert not found
```

#### 3. Mark as Read
```
PATCH /alerts/:id
Authorization: Bearer <TOKEN>

Response (200): Updated alert object (read: true)
```

#### 4. Mark All as Read
```
PATCH /alerts/read-all
Authorization: Bearer <TOKEN>

Response (200):
{
  "message": "All alerts marked as read"
}
```

#### 5. Delete Alert
```
DELETE /alerts/:id
Authorization: Bearer <TOKEN>

Response (200):
{
  "message": "Alert deleted successfully"
}
```

#### 6. Get Unread Count
```
GET /alerts/unread/count
Authorization: Bearer <TOKEN>

Response (200):
{
  "count": 5
}
```

#### 7. Get by Type/Priority
Covered in List Alerts with query parameters

---

## Error Responses

### Standard Error Format
```
{
  "statusCode": 400,
  "message": "Error message",
  "error": "BadRequest"
}
```

### Common Status Codes
- **200:** OK
- **201:** Created
- **400:** Bad Request (validation error)
- **401:** Unauthorized (missing/invalid token)
- **404:** Not Found
- **409:** Conflict (duplicate email)
- **500:** Internal Server Error

---

## Database Schema

### Users Table
- `id` (UUID, PK)
- `name` (varchar)
- `email` (varchar, unique)
- `passwordHash` (varchar)
- `role` (enum: consumer, professional)
- `avatar` (varchar, nullable)
- `emailVerified` (boolean)
- `emailVerificationToken` (varchar, nullable)
- `passwordResetToken` (varchar, nullable)
- `passwordResetExpires` (timestamp, nullable)
- `isActive` (boolean)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Documents Table
- `id` (UUID, PK)
- `userId` (UUID, FK → users)
- `fileName` (varchar)
- `fileUrl` (varchar)
- `extractedText` (text, nullable)
- `type` (enum: insurance, tax, claim, credit, other)
- `category` (varchar, nullable)
- `fileSize` (bigint, nullable)
- `mimeType` (varchar, nullable)
- `isActive` (boolean)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Alerts Table
- `id` (UUID, PK)
- `userId` (UUID, FK → users)
- `type` (enum: renewal, deadline, missing_doc, opportunity, risk)
- `title` (varchar)
- `message` (text)
- `priority` (enum: low, medium, high)
- `read` (boolean)
- `actionUrl` (varchar, nullable)
- `relatedEntityId` (varchar, nullable)
- `isActive` (boolean)
- `createdAt` (timestamp)

### Health Scores Table
- `id` (UUID, PK)
- `userId` (UUID, FK → users)
- `overallScore` (int)
- `breakdown` (jsonb)
- `opportunities` (jsonb)
- `previousScore` (int)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

---

## Running Migrations

```bash
# Run all pending migrations
npm run typeorm migration:run

# Revert last migration
npm run typeorm migration:revert

# Generate migration from entities
npm run typeorm migration:generate -- src/database/migrations/MigrationName

# Show migration status
npm run typeorm migration:show
```

---

## Example Usage

### Complete Flow: Register → Login → Create Document → Get Health Score

```bash
# 1. Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'

# Save the token from response

# 2. Login
TOKEN=$(curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }' | jq -r '.token')

# 3. Create Document
curl -X POST http://localhost:3001/api/documents \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "2026-W-2.pdf",
    "fileUrl": "https://s3.../file.pdf",
    "type": "tax",
    "category": "income"
  }'

# 4. Get Health Score
curl -X GET http://localhost:3001/api/health-score \
  -H "Authorization: Bearer $TOKEN"
```

---

## Rate Limiting

Currently no rate limiting implemented. Recommended for production:
- 100 requests per minute per user
- 1000 requests per minute per IP

---

## Pagination

Supported on endpoints with multiple results:
- Query parameter: `limit` (default: 20, max: 100)
- Query parameter: `offset` (default: 0)

---

## Versioning

Current API Version: **v1**  
Versioning strategy: URL-based (`/api/v1/...`)

---

**Last Updated:** 2026-09-20  
**Status:** Beta
