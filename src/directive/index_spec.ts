import { expect } from 'chai';
import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as DirectiveOptions } from '../directive/schema';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { getFileContent } from '@schematics/angular/utility/test';


describe('Directive Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      expect(() => yangSchematicRunner.runSchematic('directive', {}, Tree.empty())).to.throw();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(() => {
      appTree = runYangNew();
    });


    const directiveName = 'superDummy';
    const defaultOptions: DirectiveOptions = {
      name: directiveName,
      spec: true
    };


    it('should create files inside shared', () => {
      appTree = yangSchematicRunner.runSchematic('directive', {
        ...defaultOptions
      }, appTree);

      const files = appTree.files;

      expect(files).contains(`/src/app/shared/directives/${strings.dasherize(directiveName)}.directive.ts`);
      expect(files).contains(`/src/app/shared/directives/${strings.dasherize(directiveName)}.directive.spec.ts`);
    });


    it('should import directive inside shared.module', () => {
      appTree = yangSchematicRunner.runSchematic('directive', {
        ...defaultOptions
      }, appTree);

      const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
      expect(moduleContent).to.match(/import.*SuperDummyDirective.*from ['"].\/directives\/super-dummy.directive['"]/);
      expect(moduleContent).to.match(/DECLARATIONS: any\[]\s*=\s*\[[^\]]+?,\r?\n\s+SuperDummyDirective\r?\n/m);
    });
  });
});
