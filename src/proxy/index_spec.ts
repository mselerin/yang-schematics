import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as ProxyOptions } from '../proxy/schema';
import { getFileContent } from '@schematics/angular/utility/test';


const defaultOptions: ProxyOptions = {};

describe('Proxy Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      return expect(yangSchematicRunner.runSchematicAsync('proxy', {}, Tree.empty()).toPromise()).rejects.toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();
    });

    describe('With default options', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('proxy', defaultOptions, appTree).toPromise();
      });

      it('should create files inside app', () => {
        const files = appTree.files;
        expect(files).toContain(`/proxy.conf.json`);
      });


      it('should add proxy config inside angular.json', () => {
        const fileContent = getFileContent(appTree, '/angular.json');
        const json = JSON.parse(fileContent);
        const defaultProject = json.defaultProject;
        let architect = json.projects[defaultProject].architect;
        if (!architect)
          architect = json.projects[defaultProject].targets;

        expect(architect.serve.options.proxyConfig).toEqual('proxy.conf.json');
      });
    });

  });
});
