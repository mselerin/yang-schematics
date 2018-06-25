import { expect } from 'chai';
import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as ModuleOptions } from '../module/schema';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { getFileContent } from '@schematics/angular/utility/test';


describe('Module Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      expect(() => yangSchematicRunner.runSchematic('module', {}, Tree.empty())).to.throw();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(() => {
      appTree = runYangNew();
    });


    const moduleName = 'superDummy';
    const defaultOptions: ModuleOptions = {
      name: moduleName,
      spec: true
    };


    it('should create files inside shared', () => {
      appTree = yangSchematicRunner.runSchematic('module', {
        ...defaultOptions
      }, appTree);

      const files = appTree.files;

      expect(files).contains(`/src/app/shared/modules/${strings.dasherize(moduleName)}.module.ts`);
      expect(files).contains(`/src/app/shared/modules/${strings.dasherize(moduleName)}.module.spec.ts`);
    });


    it('should import module inside shared.module', () => {
      appTree = yangSchematicRunner.runSchematic('module', {
        ...defaultOptions
      }, appTree);

      const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
      expect(moduleContent).to.match(/import.*SuperDummyModule.*from ['"].\/modules\/super-dummy.module['"]/);
      expect(moduleContent).to.match(/MODULES: any\[]\s*=\s*\[[^\]]+?,\r?\n\s+SuperDummyModule\r?\n/m);
    });
  });
});
