import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as YangNewOptions } from './schema';
import { yangSchematicRunner } from '../utils/test-utils';


describe('New Schematic', () => {
  describe('With specific options', () => {
    it('should throw error when no name', () => {
      expect(() => yangSchematicRunner.runSchematic('ng-new', {})).toThrow();
    });

    it('should create files when no directory', () => {
      let appTree: UnitTestTree = yangSchematicRunner.runSchematic('ng-new', {
        name: 'foo',
        version: '7.0.0'
      });

      const files = appTree.files;
      expect(files).toContain('/foo/angular.json');
    });

    it('should install packages when no skipInstall', () => {
      expect(() => yangSchematicRunner.runSchematic('ng-new',  {
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
    beforeEach(() => {
      appTree = yangSchematicRunner.runSchematic('ng-new', newOptions);
    });


    it('should create files of an application', () => {
      const files = appTree.files;

      expect(files).toContain('/bar/angular.json');
      expect(files).toContain('/bar/src/tsconfig.app.json');
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
