import { expect } from 'chai';
import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { strings } from '@angular-devkit/core';
import { Schema as ServiceOptions } from './schema';

const elementName = 'superDummy';

describe('Service Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      expect(() => yangSchematicRunner.runSchematic('service', {}, Tree.empty())).to.throw();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(() => {
      appTree = runYangNew();
    });


    const defaultOptions: ServiceOptions = {
      name: elementName,
      spec: true
    };

    it('should create flat files', () => {
      appTree = yangSchematicRunner.runSchematic('service', {
        ...defaultOptions, flat: true
      }, appTree);

      const files = appTree.files;

      expect(files).contains(`/src/app/services/${strings.dasherize(elementName)}.service.ts`);
      expect(files).contains(`/src/app/services/${strings.dasherize(elementName)}.service.spec.ts`);
    });
  });
});
