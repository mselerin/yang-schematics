import * as path from 'path';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as YangNewOptions } from '../ng-new/schema';


describe('Yang Init Schematic', () => {
    const schematicRunner = new SchematicTestRunner(
        'yang-schematics', path.join(__dirname, '../collection.json')
    );

    const defaultOptions: YangNewOptions = {
        name: 'foo',
        directory: 'bar',
        version: '6.0.0'
    };

    let appTree: UnitTestTree;
    beforeEach(() => {
        const options = { ...defaultOptions };
        appTree = schematicRunner.runSchematic('ng-new', options);
    });


    it('should create files of an application', () => {
        const files = appTree.files;

        expect(files.indexOf('/bar/angular.json')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/bar/src/tsconfig.app.json')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/bar/src/main.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/bar/src/app/app.module.ts')).toBeGreaterThanOrEqual(0);
    });


    it('should create files for yang', () => {
        const files = appTree.files;

        expect(files.indexOf('/bar/src/app/core/core.module.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/bar/src/app/shared/shared.module.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/bar/src/app/features/features.module.ts')).toBeGreaterThanOrEqual(0);
    });
});
