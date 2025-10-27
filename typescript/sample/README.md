# React Native Todo App Sample

A simple Todo application built with React Native and TypeScript for technology validation.

## Features

- Add new todo items
- Mark todos as completed/uncompleted
- Delete todo items
- Clean and intuitive native UI
- Fully typed with TypeScript
- Comprehensive test coverage

## Getting Started

### Prerequisites

- Node.js (18 or higher)
- npm or yarn
- React Native development environment set up
  - For iOS: Xcode and CocoaPods
  - For Android: Android Studio and Android SDK

### Installation

1. Navigate to the project directory:
```bash
cd typescript/sample
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. For iOS, install CocoaPods dependencies:
```bash
cd ios && pod install && cd ..
```

### Running the App

#### iOS
```bash
npm run ios
# or
yarn ios
```

#### Android
```bash
npm run android
# or
yarn android
```

#### Start Metro Bundler (if needed separately)
```bash
npm start
# or
yarn start
```

### Running Tests

```bash
npm test
# or
yarn test
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Project Structure

```
src/
  App.tsx           # Main application component and Todo implementation
__tests__/
  App.test.tsx      # Component tests
index.js            # Application entry point
```

## Implementation Details

- **Language**: TypeScript with strict mode enabled
- **State Management**: React useState hooks
- **UI Components**: React Native core components (no external UI libraries)
- **Testing**: Jest and React Native Testing Library
- **Architecture**: Single-component implementation for demo purposes

## Technology Stack

- React Native 0.73.0
- TypeScript 5.3.0
- Jest for testing
- React Native Testing Library
