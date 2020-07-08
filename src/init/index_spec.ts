import {UnitTestTree} from '@angular-devkit/schematics/testing';
import {Schema as NgNewOptions, Style} from '@schematics/angular/ng-new/schema';
import {getFileContent} from '@schematics/angular/utility/test';
import {NG_VERSION, yangSchematicRunner} from '../utils/test-utils';
import {Tree} from '@angular-devkit/schematics';


describe('Init Schematic', () => {
  describe('With empty project', () => {
    it('should fail if specified directory does not exist', () => {
      return expect(yangSchematicRunner.runSchematicAsync('init', {}, Tree.empty()).toPromise()).rejects.toThrow();
    });
  });


  describe('With broken project', () => {
    const ngNewOptions: NgNewOptions = {
      name: 'foo',
      directory: '.',
      version: NG_VERSION
    };

    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await yangSchematicRunner.runExternalSchematicAsync('@schematics/angular', 'ng-new', ngNewOptions).toPromise();
    });

    it('should throw error when no package.json', () => {
      appTree.delete('/package.json');
      return expect(yangSchematicRunner.runSchematicAsync('init', {}, appTree).toPromise()).rejects.toThrow();
    });

    it('should throw error when empty package.json', () => {
      appTree.overwrite('/package.json', '');
      return expect(yangSchematicRunner.runSchematicAsync('init', {}, appTree).toPromise()).rejects.toThrow();
    });

    it('should throw error when no tsconfig.json', () => {
      appTree.delete('/tsconfig.json');
      appTree.delete('/tsconfig.base.json');
      return expect(yangSchematicRunner.runSchematicAsync('init', {}, appTree).toPromise()).rejects.toThrow();
    });

    it('should throw error when empty tsconfig.json', () => {
      appTree.overwrite('/tsconfig.json', '');
      appTree.overwrite('/tsconfig.base.json', '');
      return expect(yangSchematicRunner.runSchematicAsync('init', {}, appTree).toPromise()).rejects.toThrow();
    });

    it('should throw error when no angular.json', () => {
      appTree.delete('/angular.json');
      return expect(yangSchematicRunner.runSchematicAsync('init', {}, appTree).toPromise()).rejects.toThrow();
    });

    it('should throw error when empty angular.json', () => {
      appTree.overwrite('/angular.json', '');
      return expect(yangSchematicRunner.runSchematicAsync('init', {}, appTree).toPromise()).rejects.toThrow();
    });
  });


  describe('With fresh project', () => {
    const ngNewOptions: NgNewOptions = {
      name: 'foo',
      directory: '.',
      style: Style.Scss,
      version: NG_VERSION
    };

    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await yangSchematicRunner.runExternalSchematicAsync('@schematics/angular', 'ng-new', ngNewOptions).toPromise();
      appTree = await yangSchematicRunner.runSchematicAsync('init', {}, appTree).toPromise();
    });


    it('should throw error on empty tree', () => {
      return expect(yangSchematicRunner.runSchematicAsync('init', {}, Tree.empty()).toPromise()).rejects.toThrow();
    });


    it('should create files for yang', () => {
      const files = appTree.files;

      expect(files).toContain('/angular.json');
      expect(files).toContain('/webpack.extra.js');
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
      expect(files).toContain('/src/app/features/home/home.component.scss');
      expect(files).not.toContain('/src/app/features/home/home.component.css');
    });


    it('should contains specific stuffs inside package.json', () => {
      const fileContent = getFileContent(appTree, '/package.json');
      const pkg = JSON.parse(fileContent);

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

      expect(architect.build.builder).toEqual('ngx-build-plus:build');
      expect(architect.build.options.extraWebpackConfig).toEqual('webpack.extra.js');
      expect(architect.serve.builder).toEqual('ngx-build-plus:dev-server');
      expect(architect.serve.options.extraWebpackConfig).toEqual('webpack.extra.js');
    });
  });
});
