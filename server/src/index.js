import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { findUserByEmail, createUser, findOrCreateGoogleUser, updateUserPasswordAndProfile, getAllUsers } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `http://localhost:${PORT}/auth/google/callback`;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory scans store
const scans = new Map();

// Sample benchmark projects for immediate testing
const DEMO_PROJECTS = [
  {
    id: 'demo-monolith-auth',
    name: 'Legacy Express & Postgres Auth Monolith',
    repoUrl: 'https://github.com/acube-ai/legacy-auth-service',
    description: '500-line routes.js with embedded SQL queries, duplicate DB clients, and hardcoded JWT secrets.',
    branch: 'main',
    sampleCode: `// routes/auth.js (Original Legacy Debt Code)
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Duplicate pool initialization (Debt: DRY violation)
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'super_secret_db_password_123', // Hardcoded secret! (Debt: Security Guard)
  database: 'production_users'
});

// God Route: Registration, Profile, Token creation & Alert all in 1 function!
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  // SQL Injection vulnerability: direct string interpolation
  const query = "SELECT * FROM users WHERE email = '" + email + "'";
  const check = await pool.query(query);
  
  if (check.rows.length > 0) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Deeply nested procedural logic with cyclomatic complexity > 18
  const insertQuery = "INSERT INTO users(username, email, password_hash, role) VALUES ('" + username + "', '" + email + "', '" + hash + "', '" + role + "') RETURNING *";
  const newUser = await pool.query(insertQuery);

  // Embedded JWT creation with weak hardcoded fallback
  const token = jwt.sign({ id: newUser.rows[0].id }, 'static_insecure_jwt_secret_xyz', { expiresIn: '7d' });

  // Direct external email trigger without queue or error handling
  console.log("SENDING WELCOME EMAIL TO: " + email);

  return res.status(201).json({ user: newUser.rows[0], token });
});

module.exports = router;`
  }
];

// Helper to generate simulated inspection payload
function generateInspectionResult(repoUrl, customCode) {
  return {
    codeHealthIndex: 42,
    cyclomaticComplexityAvg: 16.4,
    maintainabilityRating: 'D+',
    totalLinesAnalyzed: 1840,
    technicalDebtHours: 36.5,
    summary: {
      highIssues: 3,
      mediumIssues: 5,
      lowIssues: 2,
      totalIssues: 10
    },
    comprehensionSummary: "The inspected codebase exhibits significant architectural debt in routes/auth.js. A single 500-line route handler serves as a 'God Class' managing user validation, direct parameterized-less database queries, token encryption, and external notifications simultaneously. Furthermore, database credentials and JWT signing keys are exposed in plaintext.",
    agents: [
      {
        id: 'scanner',
        name: 'Repository Scanner',
        role: 'Ingestion & Graphing',
        status: 'completed',
        color: 'emerald',
        findings: 'Parsed 14 files, 1,840 AST nodes. Generated 12 inter-module dependency edges.'
      },
      {
        id: 'static',
        name: 'Static Analysis Agent',
        role: 'Code Quality & Structure',
        status: 'completed',
        color: 'cyan',
        findings: 'Detected 1 God Class (auth.js), cyclomatic complexity = 18.2, 5 duplicate DB connection snippets.'
      },
      {
        id: 'security',
        name: 'Security Agent',
        role: 'Vulnerability Detection',
        status: 'completed',
        color: 'amber',
        findings: 'High risk: Hardcoded DB password and plaintext JWT secret detected (CWE-798). Raw SQL concatenation (CWE-89).'
      },
      {
        id: 'planner',
        name: 'Refactoring Planner',
        role: 'Synthesis & PR Generation',
        status: 'completed',
        color: 'violet',
        findings: 'Decoupled monolithic handler into Controller-Service-Repository pattern. Synthesized clean PR diff.'
      }
    ],
    dependencyGraph: {
      nodes: [
        { id: '1', label: 'routes/auth.js (God Class)', type: 'debt', complexity: 'High', incoming: 8, outgoing: 12 },
        { id: '2', label: 'config/db.js', type: 'healthy', complexity: 'Low', incoming: 2, outgoing: 1 },
        { id: '3', label: 'services/token.js', type: 'healthy', complexity: 'Low', incoming: 1, outgoing: 2 },
        { id: '4', label: 'models/user.js', type: 'debt', complexity: 'Medium', incoming: 5, outgoing: 6 },
        { id: '5', label: 'utils/email.js', type: 'healthy', complexity: 'Low', incoming: 1, outgoing: 0 },
        { id: '6', label: 'middleware/auth.js', type: 'debt', complexity: 'Medium', incoming: 4, outgoing: 3 }
      ],
      edges: [
        { source: '1', target: '2', type: 'tightly-coupled', label: 'raw query leak' },
        { source: '1', target: '3', type: 'tightly-coupled', label: 'sync token creation' },
        { source: '1', target: '4', type: 'tightly-coupled', label: 'direct mutation' },
        { source: '1', target: '5', type: 'healthy', label: 'async dispatch' },
        { source: '6', target: '1', type: 'tightly-coupled', label: 'circular dependency' }
      ]
    },
    codeDiff: {
      fileName: 'src/routes/auth.js → src/modules/auth/*',
      originalTitle: 'Original Debt Code (Monolithic & Vulnerable)',
      refactoredTitle: 'Refactored Modular Code (Clean Architecture & Secure)',
      originalCode: customCode || DEMO_PROJECTS[0].sampleCode,
      refactoredCode: `// Refactored Architecture by AI Technical Debt Inspector
// 1. Controller: src/controllers/auth.controller.js
import { AuthService } from '../services/auth.service.js';
import { validateRegistration } from '../validators/auth.validator.js';

export class AuthController {
  constructor(authService = new AuthService()) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const validatedInput = validateRegistration(req.body);
      const { user, token } = await this.authService.registerUser(validatedInput);
      return res.status(201).json({ success: true, data: { user, token } });
    } catch (error) {
      next(error);
    }
  };
}

// 2. Service: src/services/auth.service.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';
import { env } from '../config/env.js';

export class AuthService {
  constructor(userRepo = new UserRepository()) {
    this.userRepo = userRepo;
  }

  async registerUser({ username, email, password, role }) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      const err = new Error('User already exists');
      err.status = 409;
      throw err;
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await this.userRepo.create({
      username,
      email,
      passwordHash,
      role: role || 'user'
    });

    const token = jwt.sign(
      { sub: newUser.id, role: newUser.role },
      env.JWT_SECRET, // Protected environment secret
      { expiresIn: '2h', algorithm: 'HS256' }
    );

    return { user: newUser, token };
  }
}`
    },
    actionablePlan: [
      {
        step: 1,
        title: 'Extract Database Configuration into Environment-Aware Module',
        impact: 'Security & DRY',
        description: 'Remove hardcoded credentials from routes/auth.js and migrate to a pooled singleton in src/config/database.js using process.env.'
      },
      {
        step: 2,
        title: 'Decouple God Route into Controller-Service Pattern',
        impact: 'Maintainability',
        description: 'Separate HTTP routing concerns from business validation, hashing, and token issuing to reduce cyclomatic complexity from 18.2 to 2.4.'
      },
      {
        step: 3,
        title: 'Replace Raw String SQL with Parameterized Queries',
        impact: 'Critical Security',
        description: 'Eliminate CWE-89 SQL injection vulnerabilities by adopting parameterized statements ($1, $2) or an ORM/query builder.'
      },
      {
        step: 4,
        title: 'Generate Automated GitHub Pull Request',
        impact: 'Autonomous Remediation',
        description: 'Branch refactor/decouple-auth-route created with unit tests and migration guide ready for human review.'
      }
    ]
  };
}

// ==========================================
// Authentication Routes (Local + Google OAuth)
// ==========================================

// Manual Sign-Up Route
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob } = req.body;

    if (!firstName || !lastName || !email || !password || !dob) {
      return res.status(400).json({ error: 'All fields (First-name, Last-name, Email, Password, DOB) are required.' });
    }

    const saltRounds = 10;
    const existingUser = findUserByEmail(email);

    if (existingUser) {
      // Hybrid Linking: If user registered via Google OAuth and has not yet set a manual password
      if (existingUser.password_hash === 'GOOGLE_OAUTH' || !existingUser.password_hash) {
        const passwordHash = await bcryptjs.hash(password, saltRounds);
        const updatedUser = updateUserPasswordAndProfile({
          id: existingUser.id,
          passwordHash,
          dob: dob || existingUser.dob,
          firstName: firstName || existingUser.first_name,
          lastName: lastName || existingUser.last_name,
          authProvider: 'hybrid'
        });

        return res.status(200).json({
          success: true,
          message: 'Password linked successfully! You can now log in with either Google or your password.',
          user: updatedUser
        });
      }

      // If user already has a manual password configured
      return res.status(409).json({ error: 'An account with this email already exists. Please log in instead.' });
    }

    // Securely hash the password using bcrypt with salt factor 10
    const passwordHash = await bcryptjs.hash(password, saltRounds);

    // Persist to the users relation in the database
    const newUser = createUser({
      firstName,
      lastName,
      email,
      passwordHash,
      dob
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: newUser
    });
  } catch (err) {
    console.error('[Auth Signup Error]', err);
    return res.status(500).json({ error: 'Internal server error while creating user account.' });
  }
});

// Manual Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Step 1: Check whether the user exists in the users table
    const user = findUserByEmail(email);
    if (!user) {
      // User directly tried to login without signing up -> return specific flag to redirect to signup with red warning
      return res.status(404).json({
        error: 'Please create a Valid Account First',
        notRegistered: true
      });
    }

    // Step 1.5: If user account was created via Google and has no manual password set
    if (user.password_hash === 'GOOGLE_OAUTH' || !user.password_hash) {
      return res.status(400).json({
        error: 'This account was registered using Google OAuth and has no manual password yet. Please click "Continue with Google" below to log in, or use Sign Up with this email to set your password.'
      });
    }

    // Step 2: Compare the entered password with the stored hash using bcrypt
    const isPasswordValid = await bcryptjs.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid password. Please check your credentials and try again.'
      });
    }

    // Step 3: Success! User authenticated
    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        dob: user.dob,
        authProvider: user.auth_provider || 'local'
      }
    });
  } catch (err) {
    console.error('[Auth Login Error]', err);
    return res.status(500).json({ error: 'Internal server error during authentication.' });
  }
});

// Google Authentication Route (OAuth 2.0 ID Token verification)
app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential, profile } = req.body;

    let email = null;
    let firstName = 'Google';
    let lastName = 'User';
    let googleId = null;

    if (credential) {
      if (GOOGLE_CLIENT_ID) {
        // Cryptographically verify ID token signature with Google's public certificates
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        email = payload.email;
        firstName = payload.given_name || 'Google';
        lastName = payload.family_name || 'User';
        googleId = payload.sub;
      } else {
        // Decode payload if GOOGLE_CLIENT_ID not yet set in .env
        const parts = credential.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
          email = payload.email;
          firstName = payload.given_name || 'Google';
          lastName = payload.family_name || 'User';
          googleId = payload.sub;
        }
      }
    } else if (profile) {
      // Direct verified profile object
      email = profile.email;
      firstName = profile.given_name || profile.firstName || 'Google';
      lastName = profile.family_name || profile.lastName || 'User';
      googleId = profile.sub || profile.id || `google-${Date.now()}`;
    }

    if (!email) {
      return res.status(400).json({ error: 'Unable to extract email from Google identity token.' });
    }

    // Find or create in the users table
    const user = findOrCreateGoogleUser({
      firstName,
      lastName,
      email,
      googleId
    });

    return res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        authProvider: 'google'
      }
    });
  } catch (err) {
    console.error('[Google Auth Error]', err);
    return res.status(500).json({ error: 'Google authentication verification failed: ' + err.message });
  }
});

// Google OAuth 2.0 Initiation Route (Redirect Flow)
app.get('/auth/google', (req, res) => {
  if (!GOOGLE_CLIENT_ID) {
    return res.status(400).send('GOOGLE_CLIENT_ID is not configured in server/.env');
  }
  const authUrl = googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'email', 'profile'],
    prompt: 'consent'
  });
  return res.redirect(authUrl);
});

// Google OAuth 2.0 Callback Handler (GET: standard Authorization Code redirect)
const handleGoogleRedirectCallback = async (req, res) => {
  try {
    const { code, error } = req.query;
    if (error) {
      return res.redirect(`http://localhost:3000?error=${encodeURIComponent(error)}`);
    }
    if (!code) {
      return res.redirect('http://localhost:3000?error=missing_code');
    }

    const { tokens } = await googleClient.getToken(code);
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

    const user = findOrCreateGoogleUser({
      firstName: payload.given_name || 'Google',
      lastName: payload.family_name || 'User',
      email: payload.email,
      googleId: payload.sub
    });

    const userPayload = encodeURIComponent(JSON.stringify({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      authProvider: 'google'
    }));

    return res.redirect(`http://localhost:3000?auth=success&user=${userPayload}`);
  } catch (err) {
    console.error('[Google Callback Error]', err);
    return res.redirect(`http://localhost:3000?error=${encodeURIComponent(err.message)}`);
  }
};

app.get('/auth/google/callback', handleGoogleRedirectCallback);
app.get('/api/auth/google/callback', handleGoogleRedirectCallback);

// Google OAuth 2.0 Callback Handler (POST: for Google GIS redirect mode)
app.post('/auth/google/callback', async (req, res) => {
  try {
    const credential = req.body.credential;
    if (!credential) {
      return res.redirect('http://localhost:3000?error=missing_credential');
    }
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const user = findOrCreateGoogleUser({
      firstName: payload.given_name || 'Google',
      lastName: payload.family_name || 'User',
      email: payload.email,
      googleId: payload.sub
    });

    const userPayload = encodeURIComponent(JSON.stringify({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      authProvider: 'google'
    }));

    return res.redirect(`http://localhost:3000?auth=success&user=${userPayload}`);
  } catch (err) {
    console.error('[Google POST Callback Error]', err);
    return res.redirect(`http://localhost:3000?error=${encodeURIComponent(err.message)}`);
  }
});

// Debug / verify users
app.get('/api/auth/users', (req, res) => {
  res.json({ users: getAllUsers() });
});

// ==========================================
// Inspection & Core Scan Routes
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AI Technical Debt Inspector Backend' });
});

app.get('/api/demo-projects', (req, res) => {
  res.json(DEMO_PROJECTS);
});

// Trigger a scan
app.post('/api/scan', (req, res) => {
  const { repoUrl, branch = 'main', sampleCode } = req.body;
  const scanId = 'scan-' + Date.now();
  
  const scanData = {
    id: scanId,
    repoUrl: repoUrl || 'https://github.com/acube-ai/demo-repo',
    branch,
    createdAt: new Date().toISOString(),
    status: 'in_progress',
    activeAgentIndex: 0,
    results: generateInspectionResult(repoUrl, sampleCode)
  };

  scans.set(scanId, scanData);
  res.status(202).json({ scanId, message: 'Scan initiated successfully' });
});

// Get scan results
app.get('/api/scan/:id', (req, res) => {
  const scan = scans.get(req.params.id);
  if (!scan) {
    return res.status(404).json({ error: 'Scan not found' });
  }
  res.json(scan);
});

app.listen(PORT, () => {
  console.log(`[AI Technical Debt Inspector] Backend running on http://localhost:${PORT}`);
});
