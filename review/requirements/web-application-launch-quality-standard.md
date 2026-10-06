Web Application Launch & Post-Launch Quality Standard
Production checklist for modern web applications, especially
AI-assisted/vibe-coded apps.
**Goal:** make the application feel deliberately engineered, secure,
reliable, usable, maintainable, and production-ready---not like a
prototype that happens to work.
1. Core Principles
A production web app should be:

- **Useful** --- solves a real user/business problem.
- **Intuitive** --- users understand what to do.
- **Reliable** --- important actions work and recover gracefully.
- **Secure** --- authentication, authorization, APIs, data, uploads,
  sessions, and payments are protected.
- **Accessible** --- usable with keyboard, assistive technology,
  readable contrast, labels, and predictable interactions.
- **Performant** --- fast on realistic devices and networks.
- **Observable** --- failures and important events can be monitored.
- **Maintainable** --- architecture, code, database, and configuration
  are understandable.
- **Scalable enough for the product** --- avoid both premature
  complexity and obvious architectural dead ends.
- **Trustworthy** --- no fake data, misleading states, or insecure
  shortcuts.

2. DON'Ts --- Prototype/Vibe-Coded Red Flags
Never ship these casually

1. Fake users, transactions, analytics, balances, reviews,
   notifications, or activity counts.
2. Placeholder buttons that do nothing.
3. Secrets, API keys, passwords, payment credentials, or database
   credentials in source code.
4. Security enforced only by hiding frontend buttons.
5. Treating authentication as authorization.
6. Client-controlled roles, prices, discounts, payment status, or
   ownership.
7. Raw database/API errors or stack traces shown to users.
8. Console errors, debug mode, or test data left in production.
9. Async actions with no loading, failure, timeout, retry, or success
   state.
10. Silent failures.
11. Assuming only the happy path exists.
12. Destructive actions without appropriate confirmation/recovery.
13. Huge components/files containing unrelated logic.
14. Business logic mixed directly into UI components.
15. Duplicate logic and inconsistent naming.
16. Dependencies added without understanding their purpose.
17. Database changes made manually with no migration strategy.
18. Sensitive information stored in plaintext.
19. APIs returning more data than the client actually needs.
20. Building for screenshots instead of real user workflows.

3. DON'Ts --- AI/Vibe-Coding UI Problems
Avoid visual patterns that make an app feel automatically generated:

- Purple/blue gradients everywhere.
- Gradient hero text without a brand reason.
- Excessive glassmorphism.
- Glowing borders on every card.
- Emojis replacing a consistent icon system.
- Three generic feature cards simply because the layout is popular.
- Random badges.
- Fade-in animations everywhere.
- Cursor-following effects with no product purpose.
- Decorative grain/noise over everything.
- Random font combinations.
- Low-contrast dark mode.
- Inconsistent spacing.
- Generic buzzword-heavy product copy.
- Excessive animation.

Better rule
**Every visual choice should improve usability, hierarchy, trust,**
**branding, or conversion. Otherwise remove it.**
4. Product & UX Foundation
Before building screens, define:

- What problem does the app solve?
- Who uses it?
- What are the primary user roles?
- What is each role allowed to do?
- What is the primary workflow?
- What information does each workflow require?
- What can go wrong?
- What happens after success?
- What happens after failure?
- What can be undone?
- Which actions are sensitive or irreversible?

Typical workflow
User
 ↓
Entry point
 ↓
Authentication (if required)
 ↓
Dashboard/workspace
 ↓
Core task
 ↓
Validation
 ↓
Server-side processing
 ↓
Confirmation/result
 ↓
Next action
5. Authentication
Authentication answers:
**Who is this user?**
Implement

- Secure registration where required.
- Secure login.
- Secure logout.
- Strong password hashing.
- Password reset/recovery.
- Email verification where appropriate.
- Session expiration.
- Secure session/cookie configuration.
- Brute-force/rate-limit protection.
- Clear authentication errors.
- MFA/passkeys for higher-risk applications where appropriate.

Never

- Store plaintext passwords.
- Log passwords or authentication secrets.
- Return passwords from APIs.
- Trust client-side authentication state as proof of identity.
- Put sensitive long-lived credentials somewhere the browser can
  freely access without a strong reason.

6. Authorization
Authorization answers:
**What is this authenticated user allowed to do?**
Authentication and authorization are separate.
Example
Student
 ├─ View own profile
 ├─ Edit own profile
 └─ Cannot edit another student's profile

Lecturer
 ├─ Manage assigned courses
 └─ Cannot access administrator controls

Admin
 ├─ Manage users
 └─ Access administrative operations
Implement

- Role-based access where appropriate.
- Resource ownership checks.
- Server-side authorization.
- Least privilege.
- Protected routes.
- Protected API endpoints.
- Authorization tests.

Explicitly test

- Direct access to protected URLs.
- Calling protected APIs without permission.
- Changing another user's resource ID.
- Attempting to change one's own role.
- Lower-privilege users accessing admin operations.
- Cross-organization/company data access.

7. Input Validation & Data Protection
Treat every external input as untrusted.
Validate:

- Browser-side for usability.
- Server-side for security.
- Database-side through constraints where appropriate.

Check:

- Required fields.
- Types.
- Lengths.
- Ranges.
- IDs/references.
- Dates.
- Files.
- Business rules.

Protect against:

- SQL injection.
- XSS.
- CSRF where applicable.
- Command injection.
- Path traversal.
- Unsafe uploads.
- Mass assignment.
- Parameter tampering.
- Broken access control.

Use established framework/security libraries. Do not invent
cryptography or security mechanisms yourself.
8. API Security
For every endpoint ask:

1. Who can call it?
2. What input does it accept?
3. What data can it access?
4. What does it return?
5. Can the request be repeated safely?
6. What if the user changes IDs?
7. What if authentication is missing/expired?
8. What if the endpoint is called directly without the UI?

Checklist

-  
  Authentication
-  
  Authorization
-  
  Input validation
-  
  Safe output
-  
  Rate limiting
-  
  Request-size limits
-  
  Safe errors
-  
  Intentional CORS configuration
-  
  HTTPS
-  
  Secure secrets
-  
  Logging/monitoring
-  
  Idempotency where appropriate
-  
  Pagination for large datasets

9. Payment Flow
Payments must never depend on the browser as the authority.
Correct mental model
User selects product/service
 ↓
Server creates/validates order
 ↓
Server determines authoritative price
 ↓
Payment provider initiated
 ↓
User completes payment
 ↓
Provider callback/webhook
 ↓
Server verifies event
 ↓
Server updates payment/order state
 ↓
User receives confirmed result
Implement

- Unique order/transaction IDs.
- Server-side amount calculation.
- Verified callbacks/webhooks.
- Idempotency.
- Duplicate-payment protection.
- Pending/success/failed states.
- Refund/cancellation handling.
- Transaction records.
- Reconciliation.

Never

- Trust a client-provided price.
- Mark an order paid from frontend state alone.
- Assume a redirect proves payment.
- Expose payment secrets.
- Store sensitive card data unless the architecture specifically
  supports the required compliance/security obligations.

10. Database & Data Architecture
Design the data model intentionally before creating many screens.
Major entities should have:

- Stable identifiers.
- Timestamps.
- Ownership.
- Relationships.
- Appropriate constraints.
- Appropriate indexes.

Consider:

- Foreign keys.
- Unique constraints.
- Transactions.
- Migrations.
- Backups.
- Audit history.
- Soft deletion where appropriate.
- Pagination.
- Query optimization.
- Protection of sensitive fields.

Example:
Users
 ↓
Organizations
 ↓
Projects
 ↓
Tasks
 ↓
Activity/Audit Events
11. UI/UX Refinement
A polished app is not just attractive---it reduces cognitive load.
Every important screen should answer:

- Where am I?
- What can I do here?
- What is most important?
- What just happened?
- What should I do next?

Create consistent systems for:

- Typography.
- Spacing.
- Buttons.
- Forms.
- Tables.
- Cards.
- Modals.
- Alerts.
- Toasts.
- Navigation.
- Status indicators.
- Loading states.
- Empty states.
- Error states.

12. Application States
Never design only the success state.
Default
 ↓
Loading
 ↓
Success
 ├─ Empty
 └─ Populated

Failure
 ├─ Retry
 └─ Recovery

Unauthorized
 ↓
Login / Permission explanation

Not Found
 ↓
Recovery/navigation
Forms should handle

- Idle.
- Editing.
- Validation error.
- Submitting.
- Success.
- Server error.
- Retry/recovery.
- Duplicate submission prevention.

13. Forms
Implement:

- Clear labels.
- Appropriate input types.
- Useful validation.
- Server-side validation.
- Specific error messages.
- Loading state.
- Duplicate-submit protection.
- Success confirmation.
- Recovery after failure.
- Keyboard accessibility.

Avoid:
"Invalid input."
Prefer:
"Phone number must contain 10 digits."
Tell users what went wrong, where, and how to fix it.
14. Tables & Data-Heavy Interfaces
For large datasets:

-  
  Search
-  
  Filtering
-  
  Sorting
-  
  Pagination
-  
  Useful column hierarchy
-  
  Responsive behavior
-  
  Empty state
-  
  Loading state
-  
  Bulk actions where justified
-  
  Export where useful
-  
  Permission-aware actions

Don't load thousands of unnecessary records into the browser.
15. Mobile & Accessibility
Don't treat mobile as a smaller desktop.
Test:

- Navigation.
- Forms.
- Tables.
- Dialogs.
- Sticky controls.
- Touch targets.
- Long text.
- File uploads.
- Slow networks.

Accessibility:

-  
  Semantic HTML
-  
  Keyboard navigation
-  
  Visible focus
-  
  Good contrast
-  
  Form labels
-  
  Accessible control names
-  
  Useful alt text
-  
  Correct heading hierarchy
-  
  Understandable errors
-  
  Reduced-motion support
-  
  Accessible dialogs

16. Performance
Measure real performance.
Optimize:

- JavaScript bundles.
- Images.
- Fonts.
- API calls.
- Database queries.
- Rendering.
- Caching.
- Large lists.
- Third-party scripts.

Avoid:

- Huge images.
- Unnecessary dependencies.
- Repeated API calls.
- N+1 database queries.
- Heavy animation on low-powered devices.
- Loading everything immediately.

17. Error Handling & Reliability
Handle:

- Network failure.
- Server errors.
- Timeouts.
- Expired sessions.
- Invalid input.
- Missing records.
- Duplicate actions.
- Permission errors.
- Payment failures.
- Third-party service failures.

Good error UX:
What happened
 ↓
Why (when useful)
 ↓
What can the user do?
 ↓
Retry / Back / Contact support
Never expose stack traces or internal implementation details to users.
18. File Upload Security
If uploads exist:

- Validate type.
- Validate size.
- Safely rename files.
- Restrict dangerous file types.
- Store files safely.
- Control private-file access.
- Don't trust filenames or MIME types alone.
- Scan files when the risk profile requires it.
- Use temporary/signed access for private files where appropriate.

19. Secrets & Environments
Separate:
Development
Testing
Staging
Production
Keep secrets in secure environment/configuration management.
Examples:

- Database credentials.
- API keys.
- Authentication secrets.
- Payment credentials.
- Email credentials.
- AI provider keys.

Never commit:
.env
production credentials
private keys
API secrets
database passwords
Provide an .env.example or equivalent with placeholders.
20. Logging & Observability
Monitor appropriate:

- Application errors.
- Authentication failures.
- Payment events.
- Important business events.
- API latency.
- Database failures.
- Background jobs.
- System health.

Never unnecessarily log:

- Passwords.
- Authentication tokens.
- Payment secrets.
- Sensitive personal information.

21. Backups & Recovery
Ask:
**"What happens if the production database disappears tomorrow?"**
Have a plan for:

- Database backups.
- Backup verification.
- Restore testing.
- File backups where required.
- Migration recovery.
- Incident/recovery procedures.

A backup that has never been tested is not a dependable recovery plan.
22. Audit Trails
For applications involving money, permissions, administration, or
sensitive records, consider recording:

- Who performed the action.
- What happened.
- When.
- Which resource was affected.
- Relevant before/after state where appropriate.

Examples:
Admin changed user role
Payment status changed
Invoice cancelled
Permissions changed
Record deleted
Protect audit records from unauthorized modification.
23. Testing
Don't test only the visual interface.
Unit tests
Test isolated business logic.
Integration tests
Test:

- API + database.
- Authentication.
- Authorization.
- Payments.
- External services.

End-to-end tests
Test real workflows:
Register
 → Login
 → Perform core action
 → Save
 → Verify result
 → Logout
Security tests
Test:

- Unauthorized requests.
- Privilege escalation.
- ID manipulation.
- Expired sessions.
- Rate limits.
- Injection attempts.
- Upload security.
- Payment tampering.

24. Deployment Checklist
Before production:

-  
  Production environment configured.
-  
  HTTPS enabled.
-  
  Secrets secured.
-  
  Database migrations applied.
-  
  Backups configured.
-  
  Error monitoring enabled.
-  
  Debug mode disabled.
-  
  Test accounts/data removed.
-  
  CORS reviewed.
-  
  Security headers reviewed.
-  
  Rate limits configured.
-  
  Domain configured.
-  
  Email/SMS tested.
-  
  Payment provider tested.
-  
  Webhooks verified.
-  
  Recovery/rollback plan understood.

25. Production Security Red Flags
Stop and review if you find:

- admin=true supplied by the frontend.
- Client-controlled prices.
- Plaintext passwords.
- API keys in frontend source.
- Authorization implemented only in the UI.
- Raw user input concatenated into database queries.
- Sensitive data returned from public endpoints.
- Payment marked successful from a redirect alone.
- No rate limiting on login.
- Unvalidated file uploads.
- Debug mode enabled.
- Development credentials in production.
- No backups.
- No way to investigate production errors.

26. Web App Pre-Launch Checklist
Product

-  
  Core problem is clear.
-  
  Core workflows complete.
-  
  User roles defined.
-  
  Permissions defined.
-  
  Empty/error/loading states exist.
-  
  No fake production data.

UI/UX

-  
  Design system consistent.
-  
  Navigation intuitive.
-  
  Forms clear.
-  
  Feedback immediate.
-  
  Destructive actions protected.
-  
  Mobile tested.
-  
  Accessibility reviewed.
-  
  Unnecessary visual effects removed.

Authentication

-  
  Registration tested.
-  
  Login tested.
-  
  Logout tested.
-  
  Password recovery tested.
-  
  Session expiry tested.
-  
  Brute-force protection considered.
-  
  Secure cookies/session handling configured.

Authorization

-  
  Roles defined.
-  
  Ownership checks.
-  
  Server-side authorization.
-  
  Direct URL access tested.
-  
  API authorization tested.
-  
  Privilege escalation tested.

API

-  
  Validation.
-  
  Authentication.
-  
  Authorization.
-  
  Rate limiting.
-  
  Safe errors.
-  
  CORS.
-  
  Pagination.
-  
  Request limits.
-  
  Idempotency where needed.

Database

-  
  Schema reviewed.
-  
  Relationships reviewed.
-  
  Constraints added.
-  
  Indexes reviewed.
-  
  Migrations available.
-  
  Backups configured.
-  
  Sensitive data protected.

Payments

-  
  Server determines amount.
-  
  Payment integration tested.
-  
  Callback/webhook verification.
-  
  Duplicate-payment protection.
-  
  Pending/failed/success states.
-  
  Refund/cancellation handling.
-  
  Transaction records.
-  
  Reconciliation process.

Performance

-  
  Images optimized.
-  
  JavaScript optimized.
-  
  API calls reviewed.
-  
  Database queries reviewed.
-  
  Large lists handled efficiently.
-  
  Mobile performance tested.

Security

-  
  HTTPS.
-  
  Secrets secured.
-  
  Input validation.
-  
  XSS protections.
-  
  SQL injection protections.
-  
  CSRF protections where applicable.
-  
  Authentication.
-  
  Authorization.
-  
  Upload security.
-  
  Security headers reviewed.
-  
  Dependency vulnerabilities reviewed.

Observability

-  
  Error monitoring.
-  
  Application logs.
-  
  Important events.
-  
  Payment monitoring.
-  
  Health checks.
-  
  Critical alerts.

27. After Launch
Immediately

1. Test registration/login.
2. Test critical workflows.
3. Test permissions with different roles.
4. Test payments.
5. Verify notifications.
6. Check production logs.
7. Check monitoring.
8. Test mobile.
9. Verify backups.
10. Remove development/test data.

First few weeks
Monitor:

- Error rates.
- Authentication failures.
- API latency.
- Database performance.
- Workflow completion rates.
- Abandoned workflows.
- Payment failures.
- Support requests.
- Feature usage.
- Browser/device problems.

Improve the product based on real evidence.
28. The AI/Vibe-Coding Quality Gate
Never accept AI-generated code simply because it works in a demo.
For every generated feature ask:

1. What if the user manipulates the request?
2. What if the user isn't authorized?
3. What if the API fails?
4. What if the request is repeated?
5. What if the database returns nothing?
6. What if input is unexpected?
7. Where is the business logic actually enforced?
8. Are secrets exposed?
9. Can another developer understand this code?
10. Can it be tested and maintained six months from now?

29. The "Don't Trust the UI" Rule
**The frontend is a user interface, not a security boundary.**
If the UI says:
Admin → Delete User
the server must still independently determine:
Who is making this request?
 ↓
Are they authenticated?
 ↓
Are they authorized?
 ↓
Does the resource exist?
 ↓
Is the operation valid?
 ↓
Perform the operation
 ↓
Record the result
This applies to:

- Roles.
- Prices.
- Discounts.
- Payments.
- Ownership.
- Account settings.
- File access.
- Admin operations.
- API calls.

30. The "Every Feature Has a Lifecycle" Rule
Don't build:
Button → API → Database
Think:
User intent
 ↓
UI
 ↓
Validation
 ↓
Authentication
 ↓
Authorization
 ↓
Business rules
 ↓
Database transaction
 ↓
External service (if needed)
 ↓
Success/failure handling
 ↓
User feedback
 ↓
Logging/audit
 ↓
Monitoring
Not every feature needs every layer, but every relevant layer should be
deliberately considered.
31. Final Standard
A production-grade web app should feel:
**Engineered > generated**
**Secure > shortcut-driven**
**Clear > clever**
**Reliable > impressive demos**
**Consistent > trendy**
**Accessible > decorative**
**Observable > mysterious**
**Maintainable > clever code**
**Truthful > fake metrics**
**User-centered > developer-centered**
The goal is not to avoid AI or vibe coding.
The goal is to use AI as an **accelerator while keeping engineering**
**judgment, security, product thinking, and quality control human-led.**
**AI can generate the implementation. The developer is still**
**responsible for proving that the application is correct, secure,**
**usable, maintainable, and production-ready.**