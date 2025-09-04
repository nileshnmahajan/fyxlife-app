# Fyxlife — Fitness Tracking App (Take‑Home Assignment)

A cross‑platform React Native (Expo) app that delivers a simple, motivating wellness experience with onboarding, daily dashboard, progress view, and a risk‑o‑meter. Built with Expo Router, React Native Paper, and small animations for a friendly feel.

## What’s inside

- Tech stack: Expo 53, React Native 0.79, React 19, Expo Router 5, React Native Paper, AsyncStorage
- Navigation: File‑based routing via `expo-router`
- State/storage: Local state + `@react-native-async-storage/async-storage` for persistence
- Styling: React Native Paper theme + simple custom styles and gradients

## Feature coverage (per assignment)

1) Onboarding flow
- Welcome screen with “Welcome to Fyxlife 🌱” and CTA “Get Started” (`app/index.tsx`).
- User info screen to collect Name, Age, Phone, Gender, Activity level (+ optional Height/Weight) with animated progress (`app/user-info.tsx`).
- Confirmation screen shows “Hi [Name], your profile is ready 🎉” and launches dashboard (`app/confirmation.tsx`).

2) Tracking and Daily Dashboard (Main)
- Wellness goals as cards: Move, Eat, Calm, each with progress, streaks, and swap goal action (`app/dashboard/index.tsx`).
- Friendly header greeting, date, quick actions, light animations.

3) Progress View
- Summary of daily/weekly/monthly completion vs plan with progress bars (`app/dashboard/progressScreen.tsx`).

4) Risk‑o‑meter ⚠
- Point‑in‑time risk snapshot grouped by systems (Cardio, Metabolic, Musculoskeletal, Neuro, Respiratory) with severity coloring (`app/dashboard/riskScreen.tsx`).

Bonus items implemented
- Local storage so onboarding is remembered; returning users skip to dashboard (see redirect in `app/_layout.tsx`).
- Swap a goal (e.g., replace “20 min walk” → “10 min stretch”) via a modal on the dashboard.
- Streak counter on each wellness card.
- Motivating UI with small entrance animations and gradients.

Notes/shortcuts
- Progress and risk data are mocked locally for demonstration.
- No backend/auth in v0; phone field is collected but unused beyond display.

## Run it locally

Requirements
- Node.js 18+ and npm
- Android Studio (for emulator/SDK) or a physical Android device with USB debugging

Install and start (Expo dev server):

```cmd
npm install
npx expo start
```

Then press a to open Android, or scan the QR in a development build.

## Build an Android APK (local, no EAS)

Keystore
- A sample release keystore is configured in `android/gradle.properties` and checked into `android/app/fyxlife-release.keystore` for assignment convenience. Do not reuse for production.

Build commands (Windows, cmd.exe):

```cmd
REM Debug APK
npm run android:build:debug

REM Release APK
npm run android:build:release
```

APK output paths
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release.apk`

Install debug build to a connected device:

```cmd
npm run android:install:debug
```

If you hit issues
- Ensure Android SDKs and platform tools are installed in Android Studio.
- Try a clean build: `cd android && gradlew.bat clean && gradlew.bat assembleRelease`.

## App structure (key files)

- `app/_layout.tsx` — global providers, theme, and onboarding redirect if `userInfo` exists.
- `app/index.tsx` — Welcome screen (CTA → `/user-info`).
- `app/user-info.tsx` — Profile form, saves to AsyncStorage.
- `app/confirmation.tsx` — Animated success and CTA → `/dashboard`.
- `app/dashboard/_layout.tsx` — Bottom tabs: Dashboard, Progress, Risk.
- `app/dashboard/index.tsx` — Main dashboard with goals, swap modal, progress, and risk preview.
- `app/dashboard/progressScreen.tsx` — Detailed progress summary.
- `app/dashboard/riskScreen.tsx` — Risk‑o‑meter by body systems.
- `components/AppScreen.js`, `components/InputScreen.js` — Layout wrappers.
- `constants/colors.js` — Theme colors.

## AI tools used

- GitHub Copilot for scaffolding screens, animations, and UI polish; also assisted with small refactors and comments. Prompts included “onboarding with progress bar,” “swap goals modal,” and “risk meter cards.”
- Chat‑assisted pair programming for troubleshooting Expo Router setup and Android build scripts.

## Design thought: basic AI suggestion logic (swap goals)

For v1, expose a simple Recommendation API that takes the user profile + daily context and returns 1–3 suggested swaps. Example input/output contract:
- Input: `{ user: { age, gender, activityLevel, height?, weight? }, goals: [...], context: { dayOfWeek, timeOfDay, weather?, fatigue? } }`
- Output: `{ suggestions: [{ fromGoalId, to: { label, target, unit }, rationale: string, confidence: 0–1 }] }`

Heuristics (rule‑based v0):
- If completion < 30% after 7pm ⇒ suggest shorter Move (“10 min stretch”).
- If “Eat” behind target by midday ⇒ suggest “1 fruit + 500ml water” micro‑goal.
- If high stress day (calendar/workload) ⇒ prioritize Calm.

This can evolve to a lightweight model using recent adherence, streaks, and time‑series patterns to rank alternatives.

## Assumptions

- Local‑only persistence via AsyncStorage; no remote sync.
- Mocked progress/risk data to demonstrate UI and interactions.
- New Architecture flag is enabled; tested with Hermes.

## How to scale from v0 → v1

- Data: Replace mocks with a thin backend (Supabase/Firebase or Node API) for profiles, goals, progress events.
- Observability: Add analytics and error reporting (Sentry).
- Performance: Virtualize long lists, memoize heavy components, prefetch assets.
- Offline first: Queue progress events, background sync.
- Security: Real keystore handling, env‑based config, secret management.
- UX: Add charts, richer goal templates, notifications, and streak widgets.