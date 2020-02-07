import {Tree} from '@angular-devkit/schematics';
import {runYangNew, yangSchematicRunner} from '../utils/test-utils';
import {UnitTestTree} from '@angular-devkit/schematics/testing';
import {Schema as PipeOptions} from '../pipe/schema';
import {strings} from '@angular-devkit/core';
import {YangUtils} from '../utils/yang-utils';
import {getFileContent} from '@schematics/angular/utility/test';


const elementName = 'superDummy';
const defaultOptions: PipeOptions = {
  name: elementName,
  skipTests: false
};

describe('Pipe Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      return expect(yangSchematicRunner.runSchematicAsync('pipe', {}, Tree.empty()).toPromise()).rejects.toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();
    });

    describe('With default options', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('pipe', defaultOptions, appTree).toPromise();
      });

      it('should create files inside shared', () => {
        const files = appTree.files;

        expect(files).toContain(`/src/app/shared/pipes/${strings.dasherize(elementName)}.pipe.ts`);
        expect(files).toContain(`/src/app/shared/pipes/${strings.dasherize(elementName)}.pipe.spec.ts`);
      });


      it('should import pipe inside shared.module', () => {
        const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
        expect(moduleContent).toMatch(/import.*SuperDummyPipe.*from ['"].\/pipes\/super-dummy.pipe['"]/);
        expect(moduleContent).toMatch(/const DECLARATIONS: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyPipe\r?\n/m);
      });
    });


    describe('With path-like name', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('pipe', {
          ...defaultOptions, name: 'shared/foo/bar/' + elementName
        }, appTree).toPromise();
      });

      it('should create files inside shared/path', () => {
        const files = appTree.files;

        expect(files).toContain(`/src/app/shared/modules/foo/bar/super-dummy.pipe.ts`);
        expect(files).toContain(`/src/app/shared/modules/foo/bar/super-dummy.pipe.spec.ts`);
      });
    });


    describe('With foo module + non-flat', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('module', {
          name: 'shared/foo'
        }, appTree).toPromise();

        appTree = await yangSchematicRunner.runSchematicAsync('pipe', {
          ...defaultOptions, name: 'shared/foo/' + elementName, flat: false
        }, appTree).toPromise();
      });

      it('should create files inside shared/foo/super-dummy', () => {
        const files = appTree.files;

        expect(files).toContain(`/src/app/shared/modules/foo/super-dummy/super-dummy.pipe.ts`);
        expect(files).toContain(`/src/app/shared/modules/foo/super-dummy/super-dummy.pipe.spec.ts`);
      });

      it('should import pipe inside shared/modules/foo/foo.module', () => {
        const moduleContent = getFileContent(appTree, '/src/app/shared/modules/foo/foo.module.ts');
        expect(moduleContent).toMatch(/import.*SuperDummyPipe.*from ['"].\/super-dummy\/super-dummy.pipe['"]/);
        expect(moduleContent).toMatch(/const DECLARATIONS: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyPipe\r?\n/m);
      });
    });


    describe('With custom options', () => {
      it('should skip import if specified', async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('pipe', {
          ...defaultOptions, skipImport: true
        }, appTree).toPromise();

        const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
        expect(moduleContent).not.toContain('SuperDummyPipe');
      });
    });

  });
});
