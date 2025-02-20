import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import { BrowserContext, Page } from 'playwright/test';

export interface ICustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
  secondPage?: Page;
  stackPath?: string;
  headless?: boolean;
}

export class CustomWorld extends World implements ICustomWorld {
  headless?: boolean;
  constructor(options: IWorldOptions) {
    console.log('CustomWorld constructor', options);
    super(options);
  }
}

setWorldConstructor(CustomWorld);
