import { expect } from 'chai';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as YangNewOptions } from './schema';
import { yangSchematicRunner } from '../utils/test-utils';


describe('New Schematic', () => {
    const newOptions: YangNewOptions = {
        name: 'foo',
        directory: 'bar',
        version: '6.0.0'
    };

    let appTree: UnitTestTree;
    beforeEach(() => {
        appTree = yangSchematicRunner.runSchematic('ng-new', newOptions);
    });


    it('should create files of an application', () => {
        const files = appTree.files;

        expect(files.includes('/bar/angular.json')).to.be.true;
        expect(files.includes('/bar/src/tsconfig.app.json')).to.be.true;
        expect(files.includes('/bar/src/main.ts')).to.be.true;
        expect(files.includes('/bar/src/app/app.module.ts')).to.be.true;
    });


    it('should create files for yang', () => {
        const files = appTree.files;

        expect(files.includes('/bar/src/app/core/core.module.ts')).to.be.true;
        expect(files.includes('/bar/src/app/shared/shared.module.ts')).to.be.true;
        expect(files.includes('/bar/src/app/features/features.module.ts')).to.be.true;
    });
});
