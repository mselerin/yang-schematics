import { expect } from 'chai';
import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { strings } from '@angular-devkit/core';
import { Schema as ServiceOptions } from './schema';

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


        const serviceName = 'superDummy';
        const defaultOptions: ServiceOptions = {
            name: serviceName,
            spec: true
        };

        it('should create flat files', () => {
            appTree = yangSchematicRunner.runSchematic('service', {
                ...defaultOptions, flat: true
            }, appTree);

            const files = appTree.files;

            expect(files).contains(`/src/app/core/services/${strings.dasherize(serviceName)}.service.ts`);
            expect(files).contains(`/src/app/core/services/${strings.dasherize(serviceName)}.service.spec.ts`);
        });
    });
});
