import {Tree} from '@angular-devkit/schematics';
import {runYangNew, yangSchematicRunner} from '../utils/test-utils';
import {UnitTestTree} from '@angular-devkit/schematics/testing';
import {Schema as ModuleOptions} from '../module/schema';
import {strings} from '@angular-devkit/core';
import {YangUtils} from '../utils/yang-utils';
import {getFileContent} from '@schematics/angular/utility/test';

const elementName = 'superDummy';
const defaultOptions: ModuleOptions = {
  name: elementName
};


describe('Module Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      return expect(yangSchematicRunner.runSchematicAsync('module', {}, Tree.empty()).toPromise()).rejects.toThrow();
    });
  });

  describe('With broken project', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();
    });

    it('should throw when bad module options', () => {
      return expect(yangSchematicRunner.runSchematicAsync('module', {
          ...defaultOptions,
          module: 'xyz'
        }, appTree).toPromise()).rejects.toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();
    });

    describe('Shared module', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('module', defaultOptions, appTree).toPromise();
      });

      it('should create files inside shared', () => {
        const files = appTree.files;

        expect(files).toContain(`/src/app/shared/modules/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.module.ts`);
      });


      it('should import module inside shared.module', () => {
        const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
        expect(moduleContent).toMatch(/import.*SuperDummyModule.*from ['"]\.\/modules\/super-dummy\/super-dummy.module['"]/);
        expect(moduleContent).toMatch(/const MODULES: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyModule\r?\n/m);
      });
    });


    describe('Feature module', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('feature', {
          name: 'foo',
          component: false,
          template: false,
          styles: false
        }, appTree).toPromise();

        appTree = await yangSchematicRunner.runSchematicAsync('module', {
          ...defaultOptions, name: 'foo/' + elementName
        }, appTree).toPromise();
      });


      it('should create files inside the foo feature', () => {
        const files = appTree.files;
        expect(files).toContain(`/src/app/features/foo/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.module.ts`);
      });


      it('should import module inside the foo feature', () => {
        const moduleContent = getFileContent(appTree, '/src/app/features/foo/foo.module.ts');
        expect(moduleContent).toMatch(/import.*SuperDummyModule.*from ['"]\.\/super-dummy\/super-dummy.module['"]/);
        expect(moduleContent).toMatch(/const MODULES: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyModule\r?\n/m);
      });
    });

  });
});
