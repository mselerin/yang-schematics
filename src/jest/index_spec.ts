import {Tree} from '@angular-devkit/schematics';
import {runYangNew, yangSchematicRunner} from '../utils/test-utils';
import {UnitTestTree} from '@angular-devkit/schematics/testing';
import {Schema as JestOptions} from '../proxy/schema';
import {getFileContent} from '@schematics/angular/utility/test';


const defaultOptions: JestOptions = {
  skipInstall: true
};

describe('Jest Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      return expect(yangSchematicRunner.runSchematicAsync('jest', {}, Tree.empty()).toPromise()).rejects.toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();
    });

    describe('With default options', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('jest', defaultOptions, appTree).toPromise();
      });

      it('should create files inside app', () => {
        const files = appTree.files;
        expect(files).toContain(`/jest.config.js`);
        expect(files).toContain(`/jest.setup.ts`);
      });


      it('should add jest:run inside angular.json', () => {
        const fileContent = getFileContent(appTree, '/angular.json');
        const json = JSON.parse(fileContent);
        const defaultProject = json.defaultProject;
        let architect = json.projects[defaultProject].architect;
        if (!architect)
          architect = json.projects[defaultProject].targets;

        expect(architect.test.builder).toEqual('@angular-builders/jest:run');
      });
    });

  });
});
