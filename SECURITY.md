# Security and deployment notes

## Account data

- `users_db.json` is a local runtime data file. It is intentionally excluded from Git.
- Never commit learner records, password hashes, session tokens, guardian contact details, or production exports.
- Use a persistent private volume for this file only in a single-instance prototype. For production or multiple server instances, migrate accounts and sessions to a managed database.
- The legacy demo learner and master-administrator seed accounts have been removed. Provision privileged accounts through a controlled administrative process; do not restore hard-coded credentials.

## Authentication changes

- New passwords must contain at least 10 characters.
- Passwords are hashed with PBKDF2-HMAC-SHA512 using 210,000 iterations.
- Existing accounts using the legacy 1,000-iteration hash are upgraded after a successful login.
- Legacy sessions without the new hash-version marker are invalidated at startup.
- Study-time and avatar updates require a bearer session token. Role-specific dashboards are restricted in the client.

## Password recovery

Password recovery endpoints currently return HTTP 503. This is intentional: the previous prototype returned reset codes in API responses, which is unsafe. Do not enable recovery until a verified email/SMS provider, expiring single-use tokens, rate limits, and delivery monitoring are implemented.

## Required environment

Set `GEMINI_API_KEY` as a server-side environment secret. Do not put it in frontend code, commit it, or expose it in browser responses. The application can start without the key and use its built-in tutor fallbacks.

## Before production

1. Serve the application over HTTPS.
2. Add server-side rate limiting and abuse monitoring to authentication and AI endpoints.
3. Move user data to a managed database with backups and access controls.
4. Add server-side role/permission checks to every school administration API; client-side dashboard gating is not a substitute.
5. Configure a verified password-recovery provider before enabling recovery.
6. Review POPIA obligations, retention periods, parental consent, and incident-response procedures with the responsible school/operator.
7. Because an account database was previously committed, remove sensitive blobs from Git history using a coordinated history rewrite, then rotate all potentially exposed passwords and revoke all old sessions/tokens. Deleting the current file alone does not erase historical Git commits.
