import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as PipeOptions } from '../pipe/schema';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { getFileContent } from '@schematics/angular/utility/test';


const elementName = 'superDummy';
const defaultOptions: PipeOptions = {
  name: elementName,
  spec: true
};

describe('Pipe Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      expect(() => yangSchematicRunner.runSchematic('pipe', {}, Tree.empty())).toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(() => {
      appTree = runYangNew();
    });

    describe('With default options', () => {
      beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('pipe', defaultOptions, appTree);
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
      beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('pipe', {
          ...defaultOptions, name: 'shared/foo/bar/' + elementName
        }, appTree);
      });

      it('should create files inside shared/path', () => {
        const files = appTree.files;

        expect(files).toContain(`/src/app/shared/modules/foo/bar/super-dummy.pipe.ts`);
        expect(files).toContain(`/src/app/shared/modules/foo/bar/super-dummy.pipe.spec.ts`);
      });
    });


    describe('With foo module + non-flat', () => {
      beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('module', {
          name: 'shared/foo'
        }, appTree);

        appTree = yangSchematicRunner.runSchematic('pipe', {
          ...defaultOptions, name: 'shared/foo/' + elementName, flat: false
        }, appTree);
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

  });
});
