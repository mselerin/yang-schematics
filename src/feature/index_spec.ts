import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { Tree } from '@angular-devkit/schematics';
import { getFileContent } from '@schematics/angular/utility/test';
import { YangUtils } from '../utils/yang-utils';
import { strings } from '@angular-devkit/core';

const featureName = 'bar';

describe('Feature Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      return expect(yangSchematicRunner.runSchematicAsync('feature', {}, Tree.empty()).toPromise()).rejects.toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();
    });


    it('should create feature module without component', async () => {
      appTree = await yangSchematicRunner.runSchematicAsync('feature', {
        name: featureName,
        component: false
      }, appTree).toPromise();

      const files = appTree.files;

      expect(files).toContain('/src/app/features/bar/bar.module.ts');
      expect(files).not.toContain('/src/app/features/bar/bar.component.ts');
    });


    it('should create feature module with component', async () => {
      appTree = await yangSchematicRunner.runSchematicAsync('feature', {
        name: featureName,
        component: true
      }, appTree).toPromise();

      const files = appTree.files;

      expect(files).toContain('/src/app/features/bar/bar.module.ts');
      expect(files).toContain('/src/app/features/bar/bar.component.ts');
    });


    it('should create feature module with component +template +styles', async () => {
      appTree = await yangSchematicRunner.runSchematicAsync('feature', {
        name: featureName,
        component: true,
        template: true,
        styles: true
      }, appTree).toPromise();

      const files = appTree.files;

      expect(files).toContain('/src/app/features/bar/bar.module.ts');
      expect(files).toContain('/src/app/features/bar/bar.component.ts');
      expect(files).toContain('/src/app/features/bar/bar.component.html');
      expect(files).toContain('/src/app/features/bar/bar.component.scss');
    });



    it('should update routing', async () => {
      appTree = await yangSchematicRunner.runSchematicAsync('feature', {
        name: featureName
      }, appTree).toPromise();

      const fileContent = getFileContent(appTree, YangUtils.FEATURES_MODULE_FILE);
      const path = `{ path: '${strings.dasherize(featureName)}', loadChildren: () => import('@app/features/${strings.dasherize(featureName)}/${strings.dasherize(featureName)}.module').then(m => m.${strings.classify(featureName)}Module) }`

      expect(fileContent).toContain(path);
    });
  });


  describe('With foo feature', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();

      appTree = await yangSchematicRunner.runSchematicAsync('feature', {
        name: 'foo'
      }, appTree).toPromise();
    });


    it('should create sub feature module with component', async () => {
      appTree = await yangSchematicRunner.runSchematicAsync('feature', {
        name: 'foo/' + featureName,
        component: true
      }, appTree).toPromise();

      const files = appTree.files;

      expect(files).toContain('/src/app/features/foo/bar/bar.component.ts');
    });
  });
});
