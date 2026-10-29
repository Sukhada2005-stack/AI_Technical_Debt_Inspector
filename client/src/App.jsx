import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import Sidebar from './components/Sidebar';
import Workspaces from './components/Workspaces';
import Docs from './components/Docs';

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ai_inspector_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Handle redirect from Google OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'success') {
      const userRaw = params.get('user');
      if (userRaw) {
        try {
          const userObj = JSON.parse(decodeURIComponent(userRaw));
          setCurrentUser(userObj);
          localStorage.setItem('ai_inspector_user', JSON.stringify(userObj));
          setCurrentView('dashboard');
        } catch (e) {
          console.error('[OAuth Callback Error]', e);
        }
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Auth Modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'
  const [externalRedWarning, setExternalRedWarning] = useState(null);

  // Core Inspection Dashboard State (Preserved exactly as shown in screenshot)
  const [repoUrl, setRepoUrl] = useState('https://github.com/acube-ai/legacy-auth-service');
  const [branch, setBranch] = useState('main');
  const [isScanning, setIsScanning] = useState(false);
  const [activeStep, setActiveStep] = useState(4); // 4 = all agents ready

  const [scanResults, setScanResults] = useState({
    codeHealthIndex: 42,
    cyclomaticComplexityAvg: 16.4,
    technicalDebtHours: 36.5,
    summary: {
      highIssues: 3,
      mediumIssues: 5,
      lowIssues: 2,
      totalIssues: 10
    },
    comprehensionSummary: "The inspected codebase exhibits significant architectural debt in routes/auth.js. A single 500-line route handler serves as a 'God Class' managing user validation, direct database queries, token encryption, and external notifications simultaneously. Furthermore, database credentials and JWT signing keys are exposed in plaintext.",
    codeDiff: {
      fileName: 'routes/auth.js → src/modules/auth/*',
      originalTitle: 'Original Debt Code (Monolithic & Vulnerable)',
      refactoredTitle: 'Refactored Modular Code (Clean Architecture & Secure)',
      originalCode: `// routes/auth.js (Original Legacy Debt Code)
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

module.exports = router;`,
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
  });

  // Handler to trigger scan sequence
  const handleStartScan = async () => {
    setIsScanning(true);
    setActiveStep(0); // Start Scanner

    try {
      fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, branch })
      }).catch(() => {
        // Fallback to simulated local orchestration
      });
    } catch {
      // ignore
    }

    setTimeout(() => setActiveStep(1), 1200);
    setTimeout(() => setActiveStep(2), 2400);
    setTimeout(() => setActiveStep(3), 3600);
    setTimeout(() => {
      setActiveStep(4);
      setIsScanning(false);
    }, 4800);
  };

  const handleLoadDemo = () => {
    setRepoUrl('https://github.com/acube-ai/legacy-auth-service');
    setBranch('main');
    handleStartScan();
  };

  // Auth Modal triggers
  const handleOpenLogin = () => {
    setAuthModalMode('login');
    setExternalRedWarning(null);
    setAuthModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthModalMode('signup');
    setExternalRedWarning(null);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('ai_inspector_user', JSON.stringify(user));
    } catch {
      // ignore
    }
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('ai_inspector_user');
    } catch {
      // ignore
    }
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans">
      
      {currentView === 'landing' ? (
        /* ==================== LANDING PAGE VIEW ==================== */
        <LandingPage
          onOpenLogin={handleOpenLogin}
          onOpenSignup={handleOpenSignup}
          onOpenDocs={() => setCurrentView('docs')}
          onDirectAccess={() => setCurrentView('dashboard')}
        />
      ) : currentView === 'docs' ? (
        /* ==================== DOCUMENTATION VIEW (NO SIDEBAR) ==================== */
        <Docs
          onBackToLanding={() => setCurrentView('landing')}
          onOpenLogin={handleOpenLogin}
          onOpenSignup={handleOpenSignup}
          onDirectAccess={() => setCurrentView('dashboard')}
        />
      ) : (
        /* ==================== AUTHENTICATED WORKSPACE & DASHBOARD ==================== */
        <div className="flex-1 flex flex-col min-h-screen bg-[#090D16]">
          {/* Full-width Top Navbar (spans 100% across the top) */}
          <Navbar
            currentUser={currentUser}
            onLogout={handleLogout}
            onBackToLanding={() => setCurrentView('landing')}
          />

          {/* Workspace Area: Sidebar on the left + Main Content */}
          <div className="flex-1 flex relative">
            {/* Left Hover Expandable Sidebar (Mounted cleanly below the Navbar at top-[65px]) */}
            <Sidebar
              currentView={currentView}
              onViewChange={setCurrentView}
              currentUser={currentUser}
              onLogout={handleLogout}
            />

            {/* Main Content Area (Offset with pl-16 for collapsed sidebar) */}
            <main className="flex-1 pl-16 min-w-0 transition-all duration-300">
              {currentView === 'dashboard' ? (
                <Dashboard
                  repoUrl={repoUrl}
                  setRepoUrl={setRepoUrl}
                  branch={branch}
                  setBranch={setBranch}
                  onStartScan={handleStartScan}
                  isScanning={isScanning}
                  onLoadDemo={handleLoadDemo}
                  activeStep={activeStep}
                  scanResults={scanResults}
                />
              ) : (
                <Workspaces
                  currentRepoUrl={repoUrl}
                  onLaunchInspect={(selectedRepoUrl, selectedBranch) => {
                    setRepoUrl(selectedRepoUrl);
                    setBranch(selectedBranch);
                    setCurrentView('dashboard');
                    handleStartScan();
                  }}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Auth Modal (Sign-Up / Log-In with Bcrypt & Red Warning Routing) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        externalRedWarning={externalRedWarning}
        onClearExternalWarning={() => setExternalRedWarning(null)}
      />

    </div>
  );
}
