import * as path from 'path';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as NgNewOptions } from '@schematics/angular/ng-new/schema';
import { Schema as YangFeaturesOptions } from './schema';


describe('Yang Feature Schematic', () => {
    const schematicRunner = new SchematicTestRunner(
        'yang-schematics', path.join(__dirname, '../collection.json')
    );

    const ngNewOptions: NgNewOptions = {
        name: 'foo',
        directory: '.',
        version: '6.0.0'
    };

    let appTree: UnitTestTree;
    beforeEach(() => {
        appTree = schematicRunner.runSchematic('ng-new', ngNewOptions);
    });


    it('should create feature module without component', () => {
        appTree = schematicRunner.runSchematic('feature', {
            name: 'bar',
            component: false,
            template: false,
            styles: false
        }, appTree);

        const files = appTree.files;

        expect(files.indexOf('/src/app/features/bar/bar.module.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/src/app/features/bar/bar.component.ts')).toBe(-1);
    });


    it('should create feature module with component', () => {
        appTree = schematicRunner.runSchematic('feature', {
            name: 'bar',
            component: true,
            template: false,
            styles: false
        }, appTree);

        const files = appTree.files;

        expect(files.indexOf('/src/app/features/bar/bar.component.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/src/app/features/bar/bar.component.html')).toBe(-1);
        expect(files.indexOf('/src/app/features/bar/bar.component.scss')).toBe(-1);
    });


    it('should create feature module with component and template', () => {
        appTree = schematicRunner.runSchematic('feature', {
            name: 'bar',
            component: true,
            template: true,
            styles: false
        }, appTree);

        const files = appTree.files;

        expect(files.indexOf('/src/app/features/bar/bar.component.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/src/app/features/bar/bar.component.html')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/src/app/features/bar/bar.component.scss')).toBe(-1);
    });


    it('should create feature module with component, template and styles', () => {
        appTree = schematicRunner.runSchematic('feature', {
            name: 'bar',
            component: true,
            template: true,
            styles: true
        }, appTree);

        const files = appTree.files;

        expect(files.indexOf('/src/app/features/bar/bar.component.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/src/app/features/bar/bar.component.html')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/src/app/features/bar/bar.component.scss')).toBeGreaterThanOrEqual(0);
    });
});
