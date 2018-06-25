import { expect } from 'chai';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as YangNewOptions } from './schema';
import { yangSchematicRunner } from '../utils/test-utils';


describe('New Schematic', () => {
  const newOptions: YangNewOptions = {
    name: 'foo',
    directory: 'bar',
    version: '6.0.0'
  };

  let appTree: UnitTestTree;
  beforeEach(() => {
    appTree = yangSchematicRunner.runSchematic('ng-new', newOptions);
  });


  it('should create files of an application', () => {
    const files = appTree.files;

    expect(files).contains('/bar/angular.json');
    expect(files).contains('/bar/src/tsconfig.app.json');
    expect(files).contains('/bar/src/main.ts');
    expect(files).contains('/bar/src/app/app.module.ts');
  });


  it('should create files for yang', () => {
    const files = appTree.files;

    expect(files).contains('/bar/src/app/core/core.module.ts');
    expect(files).contains('/bar/src/app/shared/shared.module.ts');
    expect(files).contains('/bar/src/app/features/features.module.ts');
  });
});
