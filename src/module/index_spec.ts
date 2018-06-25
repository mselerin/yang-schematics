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
    const moduleName = 'superDummy';
    const defaultOptions: ModuleOptions = {
      name: moduleName,
      spec: true
    };

    describe('Shared module', () => {
      let appTree: UnitTestTree;
      beforeEach(() => {
        appTree = runYangNew();
      });

      it('should create files inside shared', () => {
        appTree = yangSchematicRunner.runSchematic('module', {
          ...defaultOptions
        }, appTree);

        const files = appTree.files;

        expect(files).contains(`/src/app/shared/modules/${strings.dasherize(moduleName)}/${strings.dasherize(moduleName)}.module.ts`);
        expect(files).contains(`/src/app/shared/modules/${strings.dasherize(moduleName)}/${strings.dasherize(moduleName)}.module.spec.ts`);
      });


      it('should import module inside shared.module', () => {
        appTree = yangSchematicRunner.runSchematic('module', {
          ...defaultOptions
        }, appTree);

        const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
        expect(moduleContent).to.match(/import.*SuperDummyModule.*from ['"]@app\/shared\/modules\/super-dummy\/super-dummy.module['"]/);
        expect(moduleContent).to.match(/MODULES: any\[]\s*=\s*\[[^\]]+?,\r?\n\s+SuperDummyModule\r?\n/m);
      });
    });


    describe('Feature module', () => {
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
        appTree = yangSchematicRunner.runSchematic('module', {
          ...defaultOptions, name: 'foo/' + moduleName
        }, appTree);

        const files = appTree.files;

        expect(files).contains(`/src/app/features/foo/${strings.dasherize(moduleName)}/${strings.dasherize(moduleName)}.module.ts`);
        expect(files).contains(`/src/app/features/foo/${strings.dasherize(moduleName)}/${strings.dasherize(moduleName)}.module.spec.ts`);
      });


      it('should import module inside the foo feature', () => {
        appTree = yangSchematicRunner.runSchematic('module', {
          ...defaultOptions, name: 'foo/' + moduleName
        }, appTree);

        const moduleContent = getFileContent(appTree, '/src/app/features/foo/foo.module.ts');
        expect(moduleContent).to.match(/import.*SuperDummyModule.*from ['"]@app\/features\/foo\/super-dummy\/super-dummy.module['"]/);
        expect(moduleContent).to.match(/MODULES: any\[]\s*=\s*\[[^\]]+?,\r?\n\s+SuperDummyModule\r?\n/m);
      });


      // it('should import component inside the foo feature', () => {
      //   appTree = yangSchematicRunner.runSchematic('component', {
      //     ...defaultOptions, feature: 'foo'
      //   }, appTree);
      //
      //   const moduleContent = getFileContent(appTree, '/src/app/features/foo/foo.module.ts');
      //   expect(moduleContent).to.match(/import.*SuperDummyComponent.*from ['"].\/super-dummy\/super-dummy.component['"]/);
      //   expect(moduleContent).to.match(/DECLARATIONS: any\[]\s*=\s*\[\r?\n\s+SuperDummyComponent\r?\n/m);
      // });
      //
      //
      // it('should create route inside the foo feature', () => {
      //   appTree = yangSchematicRunner.runSchematic('component', {
      //     ...defaultOptions, feature: 'foo', routing: true, route: 'bar'
      //   }, appTree);
      //
      //   const moduleContent = getFileContent(appTree, '/src/app/features/foo/foo-routing.module.ts');
      //
      //   expect(moduleContent).to.match(/import.*SuperDummyComponent.*from ['"].\/super-dummy\/super-dummy.component['"]/);
      //   expect(moduleContent).include(`{ path: 'bar', component: ${strings.classify(componentName)}Component }`);
      // });
      //
      //
      // it('should create same files with foo/name or feature: foo', () => {
      //   let appTreeWithBoolean = yangSchematicRunner.runSchematic('component', {
      //     ...defaultOptions, feature: 'foo'
      //   }, appTree);
      //
      //   let appTreeWithName = yangSchematicRunner.runSchematic('component', {
      //     ...defaultOptions, name: 'foo/' + componentName
      //   }, appTree);
      //
      //   expect(appTreeWithBoolean.files).eql(appTreeWithName.files);
      // })
    });

  });
});
