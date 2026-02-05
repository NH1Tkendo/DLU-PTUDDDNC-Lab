// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { Component } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Patch Component decorator to default standalone: false for test mocks (Angular 20 fix)
const OriginalComponent = Component;
(window as any).ɵpatchedComponent = true;
Object.defineProperty(globalThis, 'Component', {
  value: function (metadata: any) {
    if (metadata && metadata.standalone === undefined) {
      metadata.standalone = false;
    }
    return OriginalComponent(metadata);
  },
  writable: false,
  configurable: true,
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
