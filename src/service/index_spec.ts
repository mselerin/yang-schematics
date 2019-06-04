import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { strings } from '@angular-devkit/core';
import { Schema as ServiceOptions } from './schema';

const elementName = 'superDummy';

describe('Service Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      return expect(yangSchematicRunner.runSchematicAsync('service', {}, Tree.empty()).toPromise()).rejects.toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();
    });


    const defaultOptions: ServiceOptions = {
      name: elementName,
      spec: true
    };

    it('should create flat files', async () => {
      appTree = await yangSchematicRunner.runSchematicAsync('service', {
        ...defaultOptions, flat: true
      }, appTree).toPromise();

      const files = appTree.files;

      expect(files).toContain(`/src/app/services/${strings.dasherize(elementName)}.service.ts`);
      expect(files).toContain(`/src/app/services/${strings.dasherize(elementName)}.service.spec.ts`);
    });
  });
});
