import { test, expect } from '@playwright/test';
import { Given, When, Then, DataTable } from '@cucumber/cucumber';

let page: any;

Given('I am on the todo application', async function() {
    page = await this.page!;
    await page.goto('http://localhost');
});

When('I enter {string} in the task title field', async function(title: string) {
    await page.fill('input[placeholder="What needs to be done?"]', title);
});

When('I select {string} priority', async function(priority: string) {
    await page.selectOption('select:first-of-type', priority);
});

When('I select {string} category', async function(category: string) {
    await page.selectOption('select:nth-of-type(2)', category);
});

When('I click {string} button', async function(buttonText: string) {
    await page.click(`button:text("${buttonText}")`);
});

When('I click the checkbox next to {string}', async function(title: string) {
    await page.click(`[data-testid="checkbox-todo"]:near(:text("${title}"))`);
});

When('I click the delete button for {string}', async function(title: string) {
    await page.click(`button:text("Delete"):near(:text("${title}"))`);
});

When('I set the due date to tomorrow', async function() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    await page.fill('input[type="date"]', formattedDate);
});

Given('I have a task {string}', async function(title: string) {
    await page.fill('input[placeholder="What needs to be done?"]', title);
    await page.click('button:text("Add Task")');
});

Given('I have the following tasks:', async function(dataTable: DataTable) {
    const tasks = dataTable.hashes();
    for (const task of tasks) {
        await page.fill('input[placeholder="What needs to be done?"]', task.Title);
        if (task.Priority) {
            await page.selectOption('select:first-of-type', task.Priority);
        }
        await page.click('button:text("Add Task")');
    }
});

Then('I should see {string} in the task list', async function(title: string) {
    await expect(page.locator(`.todo-item:has-text("${title}")`)).toBeVisible();
});

Then('the task should have {string} priority badge', async function(priority: string) {
    await expect(page.locator(`.priority:text("${priority}")`)).toBeVisible();
});

Then('the task should have {string} category tag', async function(category: string) {
    await expect(page.locator(`.category:text("${category}")`)).toBeVisible();
});

Then('the task should be marked as completed', async function() {
    await expect(page.locator('.todo-item.completed')).toBeVisible();
});

Then('the task should appear with strikethrough text', async function() {
    const completedTask = page.locator('.todo-item.completed');
    await expect(completedTask).toBeVisible();
    const hasStrikethrough = await completedTask.evaluate((el: HTMLElement) => {
        const style = window.getComputedStyle(el);
        return style.textDecoration.includes('line-through');
    });
    expect(hasStrikethrough).toBeTruthy();
});

Then('{string} should be removed from the task list', async function(title: string) {
    await expect(page.locator(`.todo-item:has-text("${title}")`)).not.toBeVisible();
});

Then('I should only see tasks with {string} or {string} priority', async function(priority1: string, priority2: string) {
    const tasks = await page.locator('.todo-item').all();
    for (const task of tasks) {
        const priority = await task.locator('.priority').textContent();
        expect([priority1, priority2]).toContain(priority);
    }
});

Then('{string} should not be visible', async function(title: string) {
    await expect(page.locator(`.todo-item:has-text("${title}")`)).not.toBeVisible();
});

Then('the task should display tomorrow\'s date', async function() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toLocaleDateString();
    await expect(page.locator(`.due-date:has-text("${formattedDate}")`)).toBeVisible();
});
