## API ROUTES

### 🩺 Doctor APIs

#### ➤ Register Doctor

```
POST http://localhost:2100/doctor/register
```

**Request Body:**

```json
{
  "email": "doctor02@gmail.com",
  "name": "Doctor 02",
  "password": "12345",
  "phone": "1222"
}
```

**Response Body:**

```json
{
    "success": true,
    "message": "User created successfully",
    "id": 5,
    "name": "haha",
    "email": "doctor09@gmail.com",
    "phone": "1222",
    "userType": "Doctor"
}
```

---



#### ➤ Login Doctor

```
POST http://localhost:2100/auth/doctor/login
```

**Request Body:**

```json
{
  "email": "doctor03@gmail.com",
  "password": "12345"
}
```

**Response Body**

```json
{
    "success": true,
    "message": "Login Successful",
    "accessToken": "eyJhbGciOiJIUzI1Nckyx2eSRKYzB4pu0Yar",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5",
    "id": 4,
    "name": "Doctor 02",
    "email": "doctor03@gmail.com",
    "phone": "1222",
    "userType": "Doctor"
}
```

---

#### ➤ Logout Doctor

```
POST http://localhost:2100/auth/doctor/logout
```

**Response Body**

```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

---

### 👤 User APIs

#### ➤ Register User

```
POST http://localhost:2100/users/register
```

**Request Body:**

```json
{
  "email": "user03@gmail.com",
  "name": "User 02",
  "password": "12345",
  "phone": ""
}
```

**Response Body:**
```json
{
    "success": true,
    "message": "User created successfully",
    "id": 3,
    "name": "User 02",
    "email": "user03@gmail.com",
    "phone": "",
    "userType": "User"
}

```

---

#### ➤ Login User

```
POST http://localhost:2100/auth/user/login
```

**Request Body:**

```json
{
  "email": "user01@gmail.com",
  "password": "12345"
}
```

**Response Body**

```json
{
  "success": true,
    "message": "Login Successul",
    "accessToken": "JUeXBlIjoiVXNlcrmkkar9jg",
    "refreshToken": "eyJhbGcTl6lH4YiN-2bAcXblw",
    "id": 1,
    "name": "User 02",
    "email": "user01@gmail.com",
    "phone": "",
    "userType": "User"
}
```

---

#### ➤ Logout User

```
POST http://localhost:2100/auth/user/logout
```

```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

---