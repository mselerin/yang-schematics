import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as NgNewOptions } from '@schematics/angular/ng-new/schema';
import { getFileContent } from '@schematics/angular/utility/test';
import { yangSchematicRunner } from '../utils/test-utils';
import { Tree } from '@angular-devkit/schematics';


describe('Init Schematic', () => {
  describe('With empty project', () => {
    it('should fail if specified directory does not exist', () => {
      expect(() => yangSchematicRunner.runSchematic('init', {}, Tree.empty())).toThrow();
    });
  });


  describe('With broken project', () => {
    const ngNewOptions: NgNewOptions = {
      name: 'foo',
      directory: '.',
      version: '6.0.0'
    };

    let appTree: UnitTestTree;
    beforeEach(() => {
      appTree = yangSchematicRunner.runExternalSchematic('@schematics/angular', 'ng-new', ngNewOptions);
    });

    it('should throw error when no package.json', () => {
      appTree.delete('/package.json');
      expect(() => yangSchematicRunner.runSchematic('init', {}, appTree)).toThrow();
    });

    it('should throw error when empty package.json', () => {
      appTree.overwrite('/package.json', '');
      expect(() => yangSchematicRunner.runSchematic('init', {}, appTree)).toThrow();
    });

    it('should throw error when no tsconfig.json', () => {
      appTree.delete('/tsconfig.json');
      expect(() => yangSchematicRunner.runSchematic('init', {}, appTree)).toThrow();
    });

    it('should throw error when empty tsconfig.json', () => {
      appTree.overwrite('/tsconfig.json', '');
      expect(() => yangSchematicRunner.runSchematic('init', {}, appTree)).toThrow();
    });

    it('should throw error when no angular.json', () => {
      appTree.delete('/angular.json');
      expect(() => yangSchematicRunner.runSchematic('init', {}, appTree)).toThrow();
    });

    it('should throw error when empty angular.json', () => {
      appTree.overwrite('/angular.json', '');
      expect(() => yangSchematicRunner.runSchematic('init', {}, appTree)).toThrow();
    });
  });


  describe('With fresh project', () => {
    const ngNewOptions: NgNewOptions = {
      name: 'foo',
      directory: '.',
      version: '6.0.0'
    };

    let appTree: UnitTestTree;
    beforeEach(() => {
      appTree = yangSchematicRunner.runExternalSchematic('@schematics/angular', 'ng-new', ngNewOptions);
      appTree = yangSchematicRunner.runSchematic('init', {}, appTree);
    });


    it('should throw error on empty tree', () => {
      expect(() => yangSchematicRunner.runSchematic('init', {}, Tree.empty())).toThrow();
    });


    it('should create files for yang', () => {
      const files = appTree.files;

      expect(files).toContain('/angular.json');
      expect(files).toContain('/prebuild.js');
      expect(files).toContain('/src/app/core/core.module.ts');
      expect(files).toContain('/src/app/shared/shared.module.ts');
      expect(files).toContain('/src/app/features/features.module.ts');
      expect(files).toContain('/src/app/services/config.service.ts');
    });


    it('should contains a home feature and component', () => {
      const files = appTree.files;

      expect(files).toContain('/src/app/features/home/home.module.ts');
      expect(files).toContain('/src/app/features/home/home.component.ts');
      expect(files).toContain('/src/app/features/home/home.component.html');
    });


    it('should contains specific stuffs inside package.json', () => {
      const fileContent = getFileContent(appTree, '/package.json');
      const pkg = JSON.parse(fileContent);

      expect(pkg.scripts['prebuild']).toEqual('node prebuild.js');
      expect(pkg.dependencies['whatwg-fetch']).toBeDefined();
      expect(pkg.devDependencies['yang-schematics']).toBeDefined();
    });


    it('should contains specific stuffs inside angular.json', () => {
      const fileContent = getFileContent(appTree, '/angular.json');
      const json = JSON.parse(fileContent);
      const defaultProject = json.defaultProject;
      let architect = json.projects[defaultProject].architect;
      if (!architect)
        architect = json.projects[defaultProject].targets;

      expect(json.cli.defaultCollection).toEqual('yang-schematics');
      expect(architect.build.options['stylePreprocessorOptions']).not.toBeNull();
      expect(architect.test.options['stylePreprocessorOptions']).not.toBeNull();
    });
  });
});
