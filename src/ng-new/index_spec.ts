import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as YangNewOptions } from './schema';
import { yangSchematicRunner } from '../utils/test-utils';


describe('New Schematic', () => {
  describe('With specific options', () => {
    it('should throw error when no name', () => {
      return expect(yangSchematicRunner.runSchematicAsync('ng-new', {}).toPromise()).rejects.toThrow();
    });

    it('should create files when no directory', async () => {
      let appTree = await yangSchematicRunner.runSchematicAsync('ng-new', {
        name: 'foo',
        version: '7.0.0'
      }).toPromise();

      const files = appTree.files;
      expect(files).toContain('/foo/angular.json');
    });

    it('should install packages when no skipInstall', () => {
      expect(() => yangSchematicRunner.runSchematicAsync('ng-new',  {
        name: 'foo',
        version: '7.0.0',
        skipInstall: false,
        linkCli: true
      })).not.toThrow();
    });
  });


  describe('With correct options', () => {
    const newOptions: YangNewOptions = {
      name: 'foo',
      directory: 'bar',
      version: '7.0.0'
    };

    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await yangSchematicRunner.runSchematicAsync('ng-new', newOptions).toPromise();
    });


    it('should create files of an application', () => {
      const files = appTree.files;

      expect(files).toContain('/bar/angular.json');
      expect(files).toContain('/bar/tsconfig.app.json');
      expect(files).toContain('/bar/src/main.ts');
      expect(files).toContain('/bar/src/app/app.module.ts');
    });


    it('should create files for yang', () => {
      const files = appTree.files;

      expect(files).toContain('/bar/src/app/core/core.module.ts');
      expect(files).toContain('/bar/src/app/shared/shared.module.ts');
      expect(files).toContain('/bar/src/app/features/features.module.ts');
    });
  });
});
