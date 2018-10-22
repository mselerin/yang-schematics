import { expect } from 'chai';
import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as ModuleOptions } from '../module/schema';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { getFileContent } from '@schematics/angular/utility/test';

const elementName = 'superDummy';
const defaultOptions: ModuleOptions = {
  name: elementName
};


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

    describe('Shared module', () => {
      beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('module', defaultOptions, appTree);
      });

      it('should create files inside shared', () => {
        const files = appTree.files;

        expect(files).contains(`/src/app/shared/modules/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.module.ts`);
      });


      it('should import module inside shared.module', () => {
        const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
        expect(moduleContent).to.match(/import.*SuperDummyModule.*from ['"]\.\/modules\/super-dummy\/super-dummy.module['"]/);
        expect(moduleContent).to.match(/const MODULES: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyModule\r?\n/m);
      });
    });


    describe('Feature module', () => {
      beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('feature', {
          name: 'foo',
          component: false,
          template: false,
          styles: false
        }, appTree);

        appTree = yangSchematicRunner.runSchematic('module', {
          ...defaultOptions, name: 'foo/' + elementName
        }, appTree);
      });


      it('should create files inside the foo feature', () => {
        const files = appTree.files;
        expect(files).contains(`/src/app/features/foo/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.module.ts`);
      });


      it('should import module inside the foo feature', () => {
        const moduleContent = getFileContent(appTree, '/src/app/features/foo/foo.module.ts');
        expect(moduleContent).to.match(/import.*SuperDummyModule.*from ['"]\.\/super-dummy\/super-dummy.module['"]/);
        expect(moduleContent).to.match(/const MODULES: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyModule\r?\n/m);
      });
    });

  });
});
