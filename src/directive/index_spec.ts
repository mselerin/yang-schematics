import {Tree} from '@angular-devkit/schematics';
import {runYangNew, yangSchematicRunner} from '../utils/test-utils';
import {UnitTestTree} from '@angular-devkit/schematics/testing';
import {Schema as DirectiveOptions} from '../directive/schema';
import {strings} from '@angular-devkit/core';
import {YangUtils} from '../utils/yang-utils';
import {getFileContent} from '@schematics/angular/utility/test';

const elementName = 'superDummy';
const defaultOptions: DirectiveOptions = {
  name: elementName,
  skipTests: false
};

describe('Directive Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      return expect(yangSchematicRunner.runSchematicAsync('directive', defaultOptions, Tree.empty()).toPromise()).rejects.toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();
    });

    describe('With default options', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('directive', defaultOptions, appTree).toPromise();
      });

      it('should create files inside shared', () => {
        const files = appTree.files;

        expect(files).toContain(`/src/app/shared/directives/${strings.dasherize(elementName)}.directive.ts`);
        expect(files).toContain(`/src/app/shared/directives/${strings.dasherize(elementName)}.directive.spec.ts`);
      });


      it('should import directive inside shared.module', () => {
        const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
        expect(moduleContent).toMatch(/import.*SuperDummyDirective.*from ['"].\/directives\/super-dummy.directive['"]/);
        expect(moduleContent).toMatch(/const DECLARATIONS: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyDirective\r?\n/m);
      });
    });


    describe('With path-like name', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('directive', {
          ...defaultOptions, name: 'shared/foo/bar/' + elementName
        }, appTree).toPromise();
      });

      it('should create files inside shared/path', () => {
        const files = appTree.files;

        expect(files).toContain(`/src/app/shared/foo/bar/super-dummy.directive.ts`);
        expect(files).toContain(`/src/app/shared/foo/bar/super-dummy.directive.spec.ts`);
      });
    });


    describe('With foo module + non-flat', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('module', {
          name: 'shared/foo'
        }, appTree).toPromise();

        appTree = await yangSchematicRunner.runSchematicAsync('directive', {
          ...defaultOptions, name: 'shared/foo/' + elementName, flat: false
        }, appTree).toPromise();
      });

      it('should create files inside shared/modules/foo/super-dummy', () => {
        const files = appTree.files;

        expect(files).toContain(`/src/app/shared/foo/super-dummy/super-dummy.directive.ts`);
        expect(files).toContain(`/src/app/shared/foo/super-dummy/super-dummy.directive.spec.ts`);
      });

      it('should import directive inside shared/modules/foo/foo.module', () => {
        const moduleContent = getFileContent(appTree, '/src/app/shared/foo/foo.module.ts');
        expect(moduleContent).toMatch(/import.*SuperDummyDirective.*from ['"].\/super-dummy\/super-dummy.directive['"]/);
        expect(moduleContent).toMatch(/const DECLARATIONS: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyDirective\r?\n/m);
      });
    });

  });
});
