# TodoMVC Tests

Tests for the Playwright TodoMVC demo application (https://demo.playwright.dev/todomvc).

## Test Files

### Basic Functionality

- **add-todo.spec.ts** - Adding new todo items
- **delete-todo.spec.ts** - Deleting todo items
- **complete-todo.spec.ts** - Marking todos as completed
- **clear-completed.spec.ts** - Clearing all completed items
- **mark-all-complete.spec.ts** - Marking all todos as completed at once

### Filtering

- **filter-all.spec.ts** - Filter to show all todos
- **filter-active.spec.ts** - Filter to show only active todos
- **filter-completed.spec.ts** - Filter to show only completed todos

## What's tested

- Creating new todo items
- Marking todos as completed/incomplete
- Deleting todo items
- Filtering todos by status (all, active, completed)
- Item counter updates
- Batch operations (mark all, clear all)

## Running tests

```bash
npm test -- tests/todomvc
```
