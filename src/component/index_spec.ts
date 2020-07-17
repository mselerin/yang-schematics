import {Tree} from '@angular-devkit/schematics';
import {runYangNew, yangSchematicRunner} from '../utils/test-utils';
import {UnitTestTree} from '@angular-devkit/schematics/testing';
import {Schema as ComponentOptions} from '../component/schema';
import {strings} from '@angular-devkit/core';
import {YangUtils} from '../utils/yang-utils';
import {getFileContent} from '@schematics/angular/utility/test';


const elementName = 'superDummy';
const defaultOptions: ComponentOptions = {
  name: elementName,
  skipTests: false,
  flat: false
};

describe('Component Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      return expect(yangSchematicRunner.runSchematicAsync('component', {}, Tree.empty()).toPromise()).rejects.toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();
    });


    describe('Not existing module', () =>{
      it('should create files inside a nothing folder & +template +style', async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('component', {
          ...defaultOptions, name: 'nothing/' + elementName,
          flat: true,
          inlineTemplate: false,
          inlineStyle: false
        }, appTree).toPromise();

        const files = appTree.files;
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.ts`);
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.html`);
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.scss`);
      });


      it('should create files inside a nothing folder & -template -style', async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('component', {
          ...defaultOptions, name: 'nothing/' + elementName,
          flat: true,
          inlineTemplate: true,
          inlineStyle: true
        }, appTree).toPromise();

        const files = appTree.files;
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.ts`);
        expect(files).not.toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.html`);
        expect(files).not.toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.scss`);
      });


      it('should create files inside a nothing folder & +template -style', async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('component', {
          ...defaultOptions, name: 'nothing/' + elementName,
          flat: true,
          inlineTemplate: false,
          inlineStyle: true
        }, appTree).toPromise();

        const files = appTree.files;
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.ts`);
        expect(files).toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.html`);
        expect(files).not.toContain(`/src/app/features/nothing/${strings.dasherize(elementName)}.component.scss`);
      });
    });


    describe('Shared component', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('component', {
          ...defaultOptions, name: 'shared/' + elementName,
          template: true,
          styles: false
        }, appTree).toPromise();
      });

      it('should create files inside shared', () => {
        const files = appTree.files;
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


    describe('With path-like name', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('component', {
          ...defaultOptions, name: 'shared/foo/bar/' + elementName
        }, appTree).toPromise();
      });

      it('should create files inside shared/path', () => {
        const files = appTree.files;

        expect(files).toContain(`/src/app/shared/foo/bar/super-dummy/super-dummy.component.ts`);
        expect(files).toContain(`/src/app/shared/foo/bar/super-dummy/super-dummy.component.spec.ts`);
      });
    });


    describe('Feature component', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('feature', {
          name: 'foo'
        }, appTree).toPromise();

        appTree = await yangSchematicRunner.runSchematicAsync('component', {
          ...defaultOptions, name: 'foo/' + elementName, routing: true, route: 'bar'
        }, appTree).toPromise();
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
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('feature', {
          name: 'foo'
        }, appTree).toPromise();

        appTree = await yangSchematicRunner.runSchematicAsync('module', {
          name: 'foo/bar'
        }, appTree).toPromise();

        appTree = await yangSchematicRunner.runSchematicAsync('component', {
          ...defaultOptions, name: 'foo/bar/' + elementName
        }, appTree).toPromise();
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
