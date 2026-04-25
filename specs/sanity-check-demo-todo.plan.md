# Sanity Check Test Plan for Demo TODO App

## Application Overview

The demo TODO app is a simple task management application that allows users to add, complete, delete, and filter todo items. It uses local storage for persistence and provides basic CRUD operations on todos.

## Test Scenarios

### 1. Basic Functionality

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 1.1. Add a new todo item

**File:** `tests/sanity/add-todo.spec.ts`

**Steps:**
  1. Navigate to the demo TODO app
  2. Type 'buy some cheese' in the 'What needs to be done?' input field
  3. Press Enter to submit the todo

**Expected Results:**
  - The todo 'buy some cheese' appears in the list
  - The input field is cleared
  - The counter shows '1 item left'

#### 1.2. Mark a todo as completed

**File:** `tests/sanity/complete-todo.spec.ts`

**Steps:**
  1. Add a todo item 'buy some cheese'
  2. Click the checkbox next to the todo item

**Expected Results:**
  - The todo is marked as completed (visually indicated)
  - The counter shows '0 items left'
  - The todo appears under the 'Completed' filter

#### 1.3. Delete a todo item

**File:** `tests/sanity/delete-todo.spec.ts`

**Steps:**
  1. Add a todo item 'buy some cheese'
  2. Click the '×' button next to the todo item

**Expected Results:**
  - The todo is removed from the list
  - The counter updates accordingly

#### 1.4. Filter to show only active todos

**File:** `tests/sanity/filter-active.spec.ts`

**Steps:**
  1. Add two todo items
  2. Mark one as completed
  3. Click the 'Active' filter link

**Expected Results:**
  - Only active todos are displayed
  - Completed todos are hidden

#### 1.5. Filter to show only completed todos

**File:** `tests/sanity/filter-completed.spec.ts`

**Steps:**
  1. Add two todo items
  2. Mark one as completed
  3. Click the 'Completed' filter link

**Expected Results:**
  - Only completed todos are displayed
  - Active todos are hidden

#### 1.6. Filter to show all todos

**File:** `tests/sanity/filter-all.spec.ts`

**Steps:**
  1. Add two todo items
  2. Mark one as completed
  3. Click the 'All' filter link

**Expected Results:**
  - All todos are displayed regardless of status

#### 1.7. Mark all todos as completed

**File:** `tests/sanity/mark-all-complete.spec.ts`

**Steps:**
  1. Add three todo items
  2. Click the 'Mark all as complete' checkbox

**Expected Results:**
  - All todos are marked as completed
  - The counter shows '0 items left'
  - 'Clear completed' button appears

#### 1.8. Clear all completed todos

**File:** `tests/sanity/clear-completed.spec.ts`

**Steps:**
  1. Add three todo items
  2. Mark all as completed
  3. Click the 'Clear completed' button

**Expected Results:**
  - All completed todos are removed from the list
  - Active todos remain

### 2. Edge Cases and Validation

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 2.1. Attempt to add an empty todo

**File:** `tests/sanity/add-empty-todo.spec.ts`

**Steps:**
  1. Focus on the input field
  2. Press Enter without typing anything

**Expected Results:**
  - No new todo is added
  - The list remains unchanged
  - Input field remains empty

#### 2.2. Attempt to add a todo with only whitespace

**File:** `tests/sanity/add-whitespace-todo.spec.ts`

**Steps:**
  1. Type spaces or tabs in the input field
  2. Press Enter

**Expected Results:**
  - No new todo is added
  - The list remains unchanged

#### 2.3. Add duplicate todo items

**File:** `tests/sanity/add-duplicate-todo.spec.ts`

**Steps:**
  1. Add a todo 'test'
  2. Add another todo 'test'
  3. Verify both appear in the list

**Expected Results:**
  - Both identical todos are added and displayed

#### 2.4. Edit a todo item

**File:** `tests/sanity/edit-todo.spec.ts`

**Steps:**
  1. Add a todo item
  2. Double-click on the todo text
  3. Modify the text in the edit field
  4. Press Enter to save

**Expected Results:**
  - The todo text is editable
  - Changes are saved when pressing Enter
  - Todo remains in the list with updated text

#### 2.5. Verify todo persistence

**File:** `tests/sanity/persistence.spec.ts`

**Steps:**
  1. Add a few todos
  2. Refresh the page
  3. Check that todos are still present

**Expected Results:**
  - The app loads with previously added todos
  - Todos persist across page refreshes

### 3. Negative Testing

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 3.1. Handle invalid input gracefully

**File:** `tests/sanity/invalid-input.spec.ts`

**Steps:**
  1. Attempt to input special characters or very long strings
  2. Submit the todo
  3. Verify the app handles it without crashing

**Expected Results:**
  - No action occurs
  - No error is displayed

#### 3.2. Stress test with many todos

**File:** `tests/sanity/stress-test.spec.ts`

**Steps:**
  1. Add 10 or more todo items
  2. Perform various operations (complete, delete, filter)
  3. Verify performance and functionality

**Expected Results:**
  - The app remains functional
  - No data loss occurs

#### 3.3. Check UI consistency

**File:** `tests/sanity/ui-consistency.spec.ts`

**Steps:**
  1. Interact with all UI elements
  2. Verify consistent styling and behavior
  3. Check for any visual glitches

**Expected Results:**
  - The app loads correctly
  - No broken elements

### 4. Accessibility and Usability

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 4.1. Keyboard navigation

**File:** `tests/sanity/keyboard-navigation.spec.ts`

**Steps:**
  1. Use Tab to navigate through elements
  2. Use Enter/Space to interact
  3. Verify all functions work via keyboard

**Expected Results:**
  - All interactive elements are keyboard accessible
  - Tab order is logical

#### 4.2. Screen reader compatibility

**File:** `tests/sanity/screen-reader.spec.ts`

**Steps:**
  1. Use browser developer tools to check accessibility
  2. Verify semantic HTML structure

**Expected Results:**
  - Screen reader announces elements correctly
  - ARIA labels are present where needed

#### 4.3. Responsive design

**File:** `tests/sanity/responsive-design.spec.ts`

**Steps:**
  1. Resize the browser window
  2. Check layout on mobile and desktop sizes

**Expected Results:**
  - The app is responsive on different screen sizes

### 5. Cross-browser Compatibility

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 5.1. Test in multiple browsers

**File:** `tests/sanity/cross-browser.spec.ts`

**Steps:**
  1. Run the sanity tests in Chromium, Firefox, and WebKit
  2. Compare results for consistency

**Expected Results:**
  - Functionality works identically in different browsers

### 6. Performance

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 6.1. Page load performance

**File:** `tests/sanity/load-performance.spec.ts`

**Steps:**
  1. Measure time to load the page
  2. Check for any slow operations

**Expected Results:**
  - Page loads quickly
  - Interactions are responsive

#### 6.2. Local storage performance

**File:** `tests/sanity/storage-performance.spec.ts`

**Steps:**
  1. Add many todos quickly
  2. Check save/load times

**Expected Results:**
  - Local storage operations are fast

### 7. Error Handling

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 7.1. Offline functionality

**File:** `tests/sanity/offline-mode.spec.ts`

**Steps:**
  1. Disable network
  2. Add todos
  3. Re-enable network
  4. Verify data persistence

**Expected Results:**
  - App handles network failures gracefully
  - Local storage fallback works

#### 7.2. Error recovery

**File:** `tests/sanity/error-recovery.spec.ts`

**Steps:**
  1. Simulate JavaScript errors
  2. Verify app doesn't crash completely

**Expected Results:**
  - App recovers from JavaScript errors

### 8. Integration

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 8.1. External links

**File:** `tests/sanity/external-links.spec.ts`

**Steps:**
  1. Click on 'TodoMVC' link
  2. Verify it opens the correct page

**Expected Results:**
  - Links to external sites work

#### 8.2. Footer information

**File:** `tests/sanity/footer-info.spec.ts`

**Steps:**
  1. Check the footer for correct credits and links

**Expected Results:**
  - Footer information is displayed correctly

### 9. Data Integrity

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 9.1. Local storage integrity

**File:** `tests/sanity/local-storage.spec.ts`

**Steps:**
  1. Add todos
  2. Inspect local storage
  3. Verify data accuracy

**Expected Results:**
  - Data in local storage matches displayed todos

#### 9.2. Counter accuracy

**File:** `tests/sanity/counter-accuracy.spec.ts`

**Steps:**
  1. Add, complete, and delete todos
  2. Verify counter updates correctly

**Expected Results:**
  - Counter accurately reflects active todos

### 10. Security

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 10.1. XSS protection

**File:** `tests/sanity/xss-protection.spec.ts`

**Steps:**
  1. Try to add HTML/script in todo text
  2. Verify it's displayed as text, not executed

**Expected Results:**
  - No XSS vulnerabilities in todo text

#### 10.2. Data exposure check

**File:** `tests/sanity/data-exposure.spec.ts`

**Steps:**
  1. Check network requests
  2. Verify no sensitive data is sent

**Expected Results:**
  - No sensitive data exposure

### 11. Regression

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 11.1. Regression testing

**File:** `tests/sanity/regression-check.spec.ts`

**Steps:**
  1. Run tests for known issues
  2. Verify fixes are still in place

**Expected Results:**
  - Previously fixed bugs do not reappear

### 12. User Experience

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 12.1. User feedback

**File:** `tests/sanity/user-feedback.spec.ts`

**Steps:**
  1. Perform actions
  2. Check for visual feedback (e.g., strikethrough for completed)

**Expected Results:**
  - App provides clear feedback for actions

#### 12.2. Usability check

**File:** `tests/sanity/usability.spec.ts`

**Steps:**
  1. Simulate new user interaction
  2. Verify ease of learning

**Expected Results:**
  - Intuitive and easy to use

### 13. Compatibility

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 13.1. Input method compatibility

**File:** `tests/sanity/input-methods.spec.ts`

**Steps:**
  1. Test with keyboard, mouse, touch (if applicable)

**Expected Results:**
  - Works with various input methods

#### 13.2. Browser extensions compatibility

**File:** `tests/sanity/extensions-compatibility.spec.ts`

**Steps:**
  1. Enable common extensions
  2. Verify app still works

**Expected Results:**
  - Compatible with browser extensions

### 14. Localization

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 14.1. Localization check

**File:** `tests/sanity/localization.spec.ts`

**Steps:**
  1. Check all text for correct language

**Expected Results:**
  - Text is in English as expected

### 15. Maintenance

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 15.1. Code quality check

**File:** `tests/sanity/code-quality.spec.ts`

**Steps:**
  1. Review code for best practices (though this is a demo)

**Expected Results:**
  - Code is maintainable

#### 15.2. Dependencies check

**File:** `tests/sanity/dependencies.spec.ts`

**Steps:**
  1. Check for outdated libraries

**Expected Results:**
  - Dependencies are up to date

### 16. Documentation

**Seed:** `tests/seed-demo-todo.spec.ts`

#### 16.1. In-app help

**File:** `tests/sanity/documentation.spec.ts`

**Steps:**
  1. Check for tooltips, help text, etc.

**Expected Results:**
  - Help text is present and accurate
