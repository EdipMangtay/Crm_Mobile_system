# Mobile store identity — release TODO

The Expo app (`apps/mobile`) currently has **no**:

- `ios.bundleIdentifier`
- `android.package`

This was pre-existing. Do **not** invent values for local development.

Before App Store / Google Play production configuration, choose both identifiers explicitly.

Local `npm run dev:mobile` / `expo start` does not require them.
