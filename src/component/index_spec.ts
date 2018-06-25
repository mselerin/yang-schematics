import { expect } from 'chai';
import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as ComponentOptions } from '../component/schema';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { getFileContent } from '@schematics/angular/utility/test';


describe('Component Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      expect(() => yangSchematicRunner.runSchematic('component', {}, Tree.empty())).to.throw();
    });
  });

  describe('With fresh project', () => {
    const componentName = 'superDummy';
    const defaultOptions: ComponentOptions = {
      name: componentName,
      spec: true,
      flat: false
    };

    describe('Shared component', () => {
      let appTree: UnitTestTree;
      beforeEach(() => {
        appTree = runYangNew();
      });


      it('should create files inside shared', () => {
        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, shared: true
        }, appTree);

        const files = appTree.files;

        expect(files).contains(`/src/app/shared/components/${strings.dasherize(componentName)}/${strings.dasherize(componentName)}.component.ts`);
        expect(files).contains(`/src/app/shared/components/${strings.dasherize(componentName)}/${strings.dasherize(componentName)}.component.spec.ts`);
      });


      it('should import component inside the shared module', () => {
        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, shared: true
        }, appTree);

        const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
        expect(moduleContent).to.match(/import.*SuperDummyComponent.*from ['"].\/components\/super-dummy\/super-dummy.component['"]/);
        expect(moduleContent).to.match(/DECLARATIONS: any\[]\s*=\s*\[[^\]]+?,\r?\n\s+SuperDummyComponent\r?\n/m);
      });


      it('should create same files with shared/name or shared: true', () => {
        let appTreeWithBoolean = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, shared: true
        }, appTree);

        let appTreeWithName = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, name: 'shared/' + componentName
        }, appTree);

        expect(appTreeWithBoolean.files).eql(appTreeWithName.files);
      });
    });


    describe('Feature component', () => {
      let appTree: UnitTestTree;
      beforeEach(() => {
        appTree = runYangNew();
        appTree = yangSchematicRunner.runSchematic('feature', {
          name: 'foo',
          component: false,
          template: false,
          styles: false
        }, appTree);
      });


      it('should create files inside the foo feature', () => {
        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, feature: 'foo'
        }, appTree);

        const files = appTree.files;

        expect(files).contains(`/src/app/features/foo/${strings.dasherize(componentName)}/${strings.dasherize(componentName)}.component.ts`);
        expect(files).contains(`/src/app/features/foo/${strings.dasherize(componentName)}/${strings.dasherize(componentName)}.component.spec.ts`);
      });


      it('should import component inside the foo feature', () => {
        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, feature: 'foo'
        }, appTree);

        const moduleContent = getFileContent(appTree, '/src/app/features/foo/foo.module.ts');
        expect(moduleContent).to.match(/import.*SuperDummyComponent.*from ['"].\/super-dummy\/super-dummy.component['"]/);
        expect(moduleContent).to.match(/DECLARATIONS: any\[]\s*=\s*\[\r?\n\s+SuperDummyComponent\r?\n/m);
      });


      it('should create route inside the foo feature', () => {
        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, feature: 'foo', routing: true, route: 'bar'
        }, appTree);

        const moduleContent = getFileContent(appTree, '/src/app/features/foo/foo-routing.module.ts');

        expect(moduleContent).to.match(/import.*SuperDummyComponent.*from ['"].\/super-dummy\/super-dummy.component['"]/);
        expect(moduleContent).include(`{ path: 'bar', component: ${strings.classify(componentName)}Component }`);
      });


      it('should create same files with foo/name or feature: foo', () => {
        let appTreeWithBoolean = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, feature: 'foo'
        }, appTree);

        let appTreeWithName = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, name: 'foo/' + componentName
        }, appTree);

        expect(appTreeWithBoolean.files).eql(appTreeWithName.files);
      })
    });
  });
});
