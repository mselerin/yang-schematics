import { expect } from 'chai';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as NgNewOptions } from '@schematics/angular/ng-new/schema';
import { getFileContent } from '@schematics/angular/utility/test';
import { yangSchematicRunner } from '../utils/test-utils';
import { Tree } from '@angular-devkit/schematics';


describe('Init Schematic', () => {
  describe('With empty project', () => {
    it('should fail if specified directory does not exist', () => {
      expect(() => yangSchematicRunner.runSchematic('init', {}, Tree.empty())).to.throw();
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
      expect(() => yangSchematicRunner.runSchematic('init', {}, Tree.empty())).to.throw();
    });


    it('should create files for yang', () => {
      const files = appTree.files;

      expect(files).contains('/angular.json');
      expect(files).contains('/prebuild.js');
      expect(files).contains('/src/app/core/core.module.ts');
      expect(files).contains('/src/app/shared/shared.module.ts');
      expect(files).contains('/src/app/features/features.module.ts');
      expect(files).contains('/src/app/services/config.service.ts');
    });


    it('should contains a home feature and component', () => {
      const files = appTree.files;

      expect(files).contains('/src/app/features/home/home.module.ts');
      expect(files).contains('/src/app/features/home/home.component.ts');
      expect(files).contains('/src/app/features/home/home.component.html');
    });


    it('should contains specific stuffs inside package.json', () => {
      const fileContent = getFileContent(appTree, '/package.json');
      const pkg = JSON.parse(fileContent);

      expect(pkg.scripts['prebuild']).to.be.eq('node prebuild.js');
      expect(pkg.dependencies['whatwg-fetch']).to.not.be.undefined;
      expect(pkg.devDependencies['yang-schematics']).to.not.be.undefined;
    });
  });
});
