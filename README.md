# giancarlopeysack.com

Personal site for Giancarlo Peysack. Next.js 14 (App Router) + TypeScript + Tailwind, deployed to Vercel. Sponsor and pilot forms write to Firebase Firestore.

## Local dev

```
npm install
cp .env.local.example .env.local   # fill in Firebase values
npm run dev
```

## Updating content

All copy and URLs live in `app/page.tsx`. The `LINKS` object at the top is the single place to change destinations for project tiles, waitlist buttons, social icons, and the contact CTAs.

To replace the avatar, drop a new square JPG at `public/giancarlo.jpg`.

## Firebase setup (one-time)

1. Go to https://console.firebase.google.com and create a project (any name).
2. In the project dashboard, click the web icon (`</>`) to register a web app. Skip Hosting.
3. Copy the firebaseConfig values it shows you.
4. In Vercel: Project Settings -> Environment Variables, add each `NEXT_PUBLIC_FIREBASE_*` var from `.env.local.example` for Production + Preview + Development.
5. Back in Firebase Console, go to Build -> Firestore Database -> Create database. Start in production mode, pick a region.
6. Replace the default rules with the snippet below (allows public *writes* only to the two form collections, no reads):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /pilot_requests/{doc} {
      allow create: if request.resource.data.keys().hasOnly(['name','company','email','category','stores','currentProcess','timeline','createdAt','source'])
        && request.resource.data.email is string
        && request.resource.data.email.size() < 200;
      allow read, update, delete: if false;
    }
    match /sponsorship_requests/{doc} {
      allow create: if request.resource.data.keys().hasOnly(['name','company','email','sponsorshipType','companyType','createdAt','source'])
        && request.resource.data.email is string
        && request.resource.data.email.size() < 200;
      allow read, update, delete: if false;
    }
    match /{document=**} { allow read, write: if false; }
  }
}
```

7. Redeploy on Vercel after env vars are set. New submissions will land in the Firestore console under `pilot_requests` and `sponsorship_requests`.

## Deploy

Pushes to `main` auto-deploy on Vercel.
