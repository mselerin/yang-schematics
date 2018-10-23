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
      expect(() => yangSchematicRunner.runSchematic('feature', {}, Tree.empty())).toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(() => {
      appTree = runYangNew();
    });


    it('should create feature module without component', () => {
      appTree = yangSchematicRunner.runSchematic('feature', {
        name: featureName,
        component: false
      }, appTree);

      const files = appTree.files;

      expect(files).toContain('/src/app/features/bar/bar.module.ts');
      expect(files).not.toContain('/src/app/features/bar/bar.component.ts');
    });


    it('should create feature module with component', () => {
      appTree = yangSchematicRunner.runSchematic('feature', {
        name: featureName,
        component: true
      }, appTree);

      const files = appTree.files;

      expect(files).toContain('/src/app/features/bar/bar.module.ts');
      expect(files).toContain('/src/app/features/bar/bar.component.ts');
    });


    it('should create feature module with component +template +styles', () => {
      appTree = yangSchematicRunner.runSchematic('feature', {
        name: featureName,
        component: true,
        template: true,
        styles: true
      }, appTree);

      const files = appTree.files;

      expect(files).toContain('/src/app/features/bar/bar.module.ts');
      expect(files).toContain('/src/app/features/bar/bar.component.ts');
      expect(files).toContain('/src/app/features/bar/bar.component.html');
      expect(files).toContain('/src/app/features/bar/bar.component.scss');
    });



    it('should update routing', () => {
      appTree = yangSchematicRunner.runSchematic('feature', {
        name: featureName
      }, appTree);

      const fileContent = getFileContent(appTree, YangUtils.FEATURES_MODULE_FILE);
      const path = `{ path: '${strings.dasherize(featureName)}', loadChildren: '@app/features/${strings.dasherize(featureName)}/${strings.dasherize(featureName)}.module#${strings.classify(featureName)}Module' }`;

      expect(fileContent).toContain(path);
    });
  });


  describe('With foo feature', () => {
    let appTree: UnitTestTree;
    beforeEach(() => {
      appTree = runYangNew();

      appTree = yangSchematicRunner.runSchematic('feature', {
        name: 'foo'
      }, appTree);
    });


    it('should create sub feature module with component', () => {
      appTree = yangSchematicRunner.runSchematic('feature', {
        name: 'foo/' + featureName,
        component: true
      }, appTree);

      const files = appTree.files;

      expect(files).toContain('/src/app/features/foo/bar/bar.component.ts');
    });
  });
});
