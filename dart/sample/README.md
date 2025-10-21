# Flutter Todo App Sample

A simple Todo application built with Flutter for technology validation.

## Features

- Add new todo items
- Mark todos as completed/uncompleted
- Delete todo items
- Clean and intuitive Material Design 3 UI

## Getting Started

### Prerequisites

- Flutter SDK (3.0.0 or higher)
- Dart SDK (included with Flutter)

### Installation

1. Navigate to the project directory:
```bash
cd dart/sample
```

2. Install dependencies:
```bash
flutter pub get
```

### Running the App

```bash
flutter run
```

Select your target device when prompted (iOS simulator, Android emulator, web, etc.)

### Running Tests

```bash
flutter test
```

## Project Structure

```
lib/
  main.dart         # Main application entry point and Todo app implementation
test/
  widget_test.dart  # Widget tests for the Todo app
```

## Implementation Details

- **State Management**: Uses StatefulWidget with local state
- **UI Framework**: Flutter Material Design 3
- **Architecture**: Simple single-file implementation for demo purposes
