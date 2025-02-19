Feature: Todo Task Management
  As a user
  I want to manage my tasks
  So that I can stay organized and productive

  Background:
    Given I am on the todo application

  Scenario: Create a new task
    When I enter "Buy groceries" in the task title field
    And I select "HIGH" priority
    And I select "Shopping" category
    And I click "Add Task" button
    Then I should see "Buy groceries" in the task list
    And the task should have "HIGH" priority badge
    And the task should have "Shopping" category tag

  Scenario: Toggle task completion
    Given I have a task "Complete project report"
    When I click the checkbox next to "Complete project report"
    Then the task should be marked as completed
    And the task should appear with strikethrough text

  Scenario: Delete a task
    Given I have a task "Old task"
    When I click the delete button for "Old task"
    Then "Old task" should be removed from the task list

  Scenario: Enable Focus Mode
    Given I have the following tasks:
      | Title          | Priority | Completed |
      | Urgent meeting | URGENT   | false     |
      | Regular task   | MEDIUM   | false     |
      | Important call | HIGH     | false     |
    When I click "Focus Mode" button
    Then I should only see tasks with "URGENT" or "HIGH" priority
    And "Regular task" should not be visible

  Scenario: Set task due date
    When I enter "Team meeting" in the task title field
    And I set the due date to tomorrow
    And I click "Add Task" button
    Then I should see "Team meeting" in the task list
    And the task should display tomorrow's date
