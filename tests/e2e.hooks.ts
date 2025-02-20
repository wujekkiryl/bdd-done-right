import { ICustomWorld } from './e2e.world';
import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
  Wait,
} from 'testcontainers';
import { ChromiumBrowser, chromium } from '@playwright/test';
import { After, AfterAll, Before, BeforeAll } from '@cucumber/cucumber';

let browser: ChromiumBrowser;
let compose: StartedDockerComposeEnvironment;

BeforeAll({ timeout: 120000 }, async function () {
  browser = await chromium.launch({ headless: false });
  const stackPath = './'

  console.log('running compose up for stacks: ', [
    stackPath,
  ]);

  compose = await new DockerComposeEnvironment(
    stackPath,
    'docker-compose.dev.yml'
  ).up();
});

Before(async function (this: ICustomWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: ICustomWorld) {
  await this.page?.close();
  await this.context?.close();
});

AfterAll({ timeout: 120000 }, async function () {
  await browser.close();
  await compose.down();
});
