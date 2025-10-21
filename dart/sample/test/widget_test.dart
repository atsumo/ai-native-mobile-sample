import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:sample/main.dart';

void main() {
  testWidgets('Todo app smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const TodoApp());

    // Verify that our app starts with no todos.
    expect(find.text('No todos yet. Add one above!'), findsOneWidget);

    // Verify the title is present.
    expect(find.text('Todo List'), findsOneWidget);
  });

  testWidgets('Can add a todo', (WidgetTester tester) async {
    await tester.pumpWidget(const TodoApp());

    // Enter text in the TextField
    await tester.enterText(
      find.byType(TextField),
      'Test Todo Item',
    );

    // Tap the add button
    await tester.tap(find.text('Add'));
    await tester.pump();

    // Verify the todo appears in the list
    expect(find.text('Test Todo Item'), findsOneWidget);
  });

  testWidgets('Can toggle todo completion', (WidgetTester tester) async {
    await tester.pumpWidget(const TodoApp());

    // Add a todo
    await tester.enterText(find.byType(TextField), 'Test Todo');
    await tester.tap(find.text('Add'));
    await tester.pump();

    // Find and tap the checkbox
    await tester.tap(find.byType(Checkbox));
    await tester.pump();

    // Verify checkbox is checked
    final checkbox = tester.widget<Checkbox>(find.byType(Checkbox));
    expect(checkbox.value, true);
  });
}
