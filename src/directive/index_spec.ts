import { expect } from 'chai';
import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as DirectiveOptions } from '../directive/schema';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { getFileContent } from '@schematics/angular/utility/test';

const elementName = 'superDummy';
const defaultOptions: DirectiveOptions = {
  name: elementName,
  spec: true
};

describe('Directive Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      expect(() => yangSchematicRunner.runSchematic('directive', defaultOptions, Tree.empty())).to.throw();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(() => {
      appTree = runYangNew();
    });

    describe('With default options', () => {
      beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('directive', defaultOptions, appTree);
      });

      it('should create files inside shared', () => {
        const files = appTree.files;

        expect(files).contains(`/src/app/shared/directives/${strings.dasherize(elementName)}.directive.ts`);
        expect(files).contains(`/src/app/shared/directives/${strings.dasherize(elementName)}.directive.spec.ts`);
      });


      it('should import directive inside shared.module', () => {
        const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
        expect(moduleContent).to.match(/import.*SuperDummyDirective.*from ['"].\/directives\/super-dummy.directive['"]/);
        expect(moduleContent).to.match(/const DECLARATIONS: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyDirective\r?\n/m);
      });
    });


    describe('With path-like name', () => {
      it('should create files inside shared/path', () => {
        appTree = yangSchematicRunner.runSchematic('directive', {
          ...defaultOptions, name: 'shared/foo/bar/' + elementName
        }, appTree);

        const files = appTree.files;

        expect(files).contains(`/src/app/shared/modules/foo/bar/super-dummy.directive.ts`);
        expect(files).contains(`/src/app/shared/modules/foo/bar/super-dummy.directive.spec.ts`);
      });
    });


    describe('With foo module + non-flat', () => {
      beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('module', {
          name: 'shared/foo'
        }, appTree);

        appTree = yangSchematicRunner.runSchematic('directive', {
          ...defaultOptions, name: 'shared/foo/' + elementName, flat: false
        }, appTree);
      });

      it('should create files inside shared/foo/super-dummy', () => {
        const files = appTree.files;

        expect(files).contains(`/src/app/shared/modules/foo/super-dummy/super-dummy.directive.ts`);
        expect(files).contains(`/src/app/shared/modules/foo/super-dummy/super-dummy.directive.spec.ts`);
      });

      it('should import directive inside shared/modules/foo/foo.module', () => {
        const moduleContent = getFileContent(appTree, '/src/app/shared/modules/foo/foo.module.ts');
        expect(moduleContent).to.match(/import.*SuperDummyDirective.*from ['"].\/super-dummy\/super-dummy.directive['"]/);
        expect(moduleContent).to.match(/const DECLARATIONS: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyDirective\r?\n/m);
      });
    });

  });
});
