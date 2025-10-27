# AI Native Mobile Sample

A monorepo for mobile technology validation samples using React Native and Flutter.

## Project Structure

This monorepo is organized by programming language, with separate sample applications:

```
ai-native-mobile-sample/
├── dart/
│   └── sample/          # Flutter Todo app sample
├── typescript/
│   └── sample/          # React Native Todo app sample
└── README.md
```

## Samples

### Dart (Flutter)

**Location**: `dart/sample`

A Todo application built with Flutter demonstrating:
- Material Design 3 UI
- State management with StatefulWidget
- Basic CRUD operations
- Widget testing

[View Flutter sample README](./dart/sample/README.md)

### TypeScript (React Native)

**Location**: `typescript/sample`

A Todo application built with React Native and TypeScript demonstrating:
- Native mobile UI components
- React hooks for state management
- TypeScript strict mode
- Jest testing with React Native Testing Library

[View React Native sample README](./typescript/sample/README.md)

## Getting Started

Each sample has its own README with specific setup and running instructions. Navigate to the respective directory to get started:

- Flutter: [dart/sample/README.md](./dart/sample/README.md)
- React Native: [typescript/sample/README.md](./typescript/sample/README.md)

## Purpose

This repository serves as a technology validation and comparison platform for:
- Cross-platform mobile development approaches
- Different state management patterns
- Performance characteristics
- Development experience and tooling