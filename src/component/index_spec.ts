import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as ComponentOptions } from '../component/schema';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { getFileContent } from '@schematics/angular/utility/test';


const elementName = 'superDummy';
const defaultOptions: ComponentOptions = {
  name: elementName,
  spec: true,
  flat: false
};

describe('Component Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      expect(() => yangSchematicRunner.runSchematic('component', {}, Tree.empty())).toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(() => {
      appTree = runYangNew();
    });


    describe('Not existing module', () =>{
      it('should create files inside a nothing folder & +template +style', () => {
        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, name: 'nothing/' + elementName,
          flat: true,
          inlineTemplate: false,
          inlineStyle: false
        }, appTree);

        const files = appTree.files;
        console.log(files);
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.ts`);
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.html`);
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.scss`);
      });


      it('should create files inside a nothing folder & -template -style', () => {
        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, name: 'nothing/' + elementName,
          flat: true,
          template: false,
          styles: false
        }, appTree);

        const files = appTree.files;
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.ts`);
        expect(files).not.toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.html`);
        expect(files).not.toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.scss`);
      });


      it('should create files inside a nothing folder & +template -style', () => {
        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, name: 'nothing/' + elementName,
          flat: true,
          inlineTemplate: false
        }, appTree);

        const files = appTree.files;
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.ts`);
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.html`);
        expect(files).not.toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.scss`);
      });
    });


    describe('Shared component', () => {
      beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, name: 'shared/' + elementName,
          template: true,
          styles: false
        }, appTree);
      });

      it('should create files inside shared', () => {
        const files = appTree.files;
        console.log(files);
        expect(files).toContain(`/src/app/shared/components/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.component.ts`);
        expect(files).toContain(`/src/app/shared/components/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.component.spec.ts`);
        expect(files).toContain(`/src/app/shared/components/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.component.html`);
      });


      it('should import component inside the shared module', () => {
        const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
        expect(moduleContent).toMatch(/import.*SuperDummyComponent.*from ['"].\/components\/super-dummy\/super-dummy.component['"]/);
        expect(moduleContent).toMatch(/const DECLARATIONS: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyComponent\r?\n/m);
      });
    });


    describe('Feature component', () => {
      beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('feature', {
          name: 'foo'
        }, appTree);

        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, name: 'foo/' + elementName, routing: true, route: 'bar'
        }, appTree);
      });


      it('should create files inside the foo feature', () => {
        const files = appTree.files;
        expect(files).toContain(`/src/app/features/foo/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.component.ts`);
        expect(files).toContain(`/src/app/features/foo/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.component.spec.ts`);
      });


      it('should import component inside the foo feature', () => {
        const moduleContent = getFileContent(appTree, '/src/app/features/foo/foo.module.ts');
        expect(moduleContent).toMatch(/import.*SuperDummyComponent.*from ['"].\/super-dummy\/super-dummy.component['"]/);
        expect(moduleContent).toMatch(/const DECLARATIONS: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyComponent\r?\n/m);
      });


      it('should create route inside the foo feature', () => {
        const moduleContent = getFileContent(appTree, '/src/app/features/foo/foo-routing.module.ts');
        expect(moduleContent).toMatch(/import.*SuperDummyComponent.*from ['"].\/super-dummy\/super-dummy.component['"]/);
        expect(moduleContent).toContain(`{ path: 'bar', component: ${strings.classify(elementName)}Component }`);
      });

    });


    describe('Module component', () => {
      beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('feature', {
          name: 'foo'
        }, appTree);

        appTree = yangSchematicRunner.runSchematic('module', {
          name: 'foo/bar'
        }, appTree);

        appTree = yangSchematicRunner.runSchematic('component', {
          ...defaultOptions, name: 'foo/bar/' + elementName
        }, appTree);
      });


      it('should create files inside the foo/bar module', () => {
        const files = appTree.files;
        expect(files).toContain(`/src/app/features/foo/bar/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.component.ts`);
        expect(files).toContain(`/src/app/features/foo/bar/${strings.dasherize(elementName)}/${strings.dasherize(elementName)}.component.spec.ts`);
      });


      it('should import component inside the foo/bar module', () => {
        const moduleContent = getFileContent(appTree, '/src/app/features/foo/bar/bar.module.ts');
        expect(moduleContent).toMatch(/import.*SuperDummyComponent.*from ['"].\/super-dummy\/super-dummy.component['"]/);
        expect(moduleContent).toMatch(/const DECLARATIONS: any\[]\s*=\s*\[[^\]]*\r?\n\s+SuperDummyComponent\r?\n/m);
      });

    });
  });
});
