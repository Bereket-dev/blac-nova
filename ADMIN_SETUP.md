# Firebase admin + Cloudinary setup

## 1. Firebase

1. Create a Firebase project (or use an existing one).
2. Enable **Authentication → Email/Password**.
3. Create the owner user with a fake phone email, e.g. `0912345678@blacnova.local`, and a strong password.
4. Create a **Firestore** database.
5. Deploy rules from [`firestore.rules`](firestore.rules) (Firebase Console → Firestore → Rules, or `firebase deploy --only firestore:rules`).
6. Create a service account (Project settings → Service accounts → Generate new private key). Copy:
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY` (keep `\n` escaped in `.env.local`)
7. Copy the web app config into the `NEXT_PUBLIC_FIREBASE_*` vars in [`.env.example`](.env.example).

## 2. Cloudinary

1. Create a Cloudinary cloud.
2. Copy cloud name, API key, and API secret into `.env.local`.
3. Optionally set `CLOUDINARY_UPLOAD_FOLDER=blac-nova/projects`.
4. Signed uploads are used via `/api/cloudinary/sign` (no unsigned preset required).

## 3. Local env

```bash
cp .env.example .env.local
# fill values, then:
npm run seed
npm run dev
```

Open `/admin/login` and sign in with the owner email/password.

## 4. Seed behaviour

`npm run seed` writes the original 3 categories and 5 projects once. If both collections already have documents, it skips.
