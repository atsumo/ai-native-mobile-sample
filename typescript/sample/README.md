# React Native Todo App (Expo)

A modern, Superlist-inspired todo application built with Expo and React Native.

## Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Styling**: NativeWind v4 (Tailwind CSS)
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **Gestures**: React Native Gesture Handler
- **Markdown**: react-native-markdown-display

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web
```

After running `npm start`, you can:
- Scan the QR code with Expo Go app (iOS/Android)
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser

## Features

- Task management (create, edit, delete)
- Task status tracking (TODO, IN_PROGRESS, DONE)
- Markdown support for task descriptions
- Swipe-to-delete
- Data persistence with AsyncStorage
