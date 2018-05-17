import { expect } from 'chai';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { Tree } from '@angular-devkit/schematics';
import { getFileContent } from '@schematics/angular/utility/test';
import { YangUtils } from '../utils/yang-utils';
import { strings } from '@angular-devkit/core';

const featureName = 'bar';

describe('Feature Schematic', () => {
    describe('With empty project', () => {
        it('should throw error on empty tree', () => {
            expect(() => yangSchematicRunner.runSchematic('feature', {}, Tree.empty())).to.throw();
        });
    });

    describe('With fresh project', () => {
        let appTree: UnitTestTree;
        beforeEach(() => {
            appTree = runYangNew();
        });


        it('should create feature module without component', () => {
            appTree = yangSchematicRunner.runSchematic('feature', {
                name: featureName,
                component: false,
                template: false,
                styles: false
            }, appTree);

            const files = appTree.files;

            expect(files.includes('/src/app/features/bar/bar.module.ts')).to.be.true;
            expect(files.includes('/src/app/features/bar/bar.component.ts')).to.be.false;
        });


        it('should create feature module with component', () => {
            appTree = yangSchematicRunner.runSchematic('feature', {
                name: featureName,
                component: true,
                template: false,
                styles: false
            }, appTree);

            const files = appTree.files;

            expect(files).contains('/src/app/features/bar/bar.component.ts');
            expect(files).not.contains('/src/app/features/bar/bar.component.html');
            expect(files).not.contains('/src/app/features/bar/bar.component.scss');
        });


        it('should create feature module with component and template', () => {
            appTree = yangSchematicRunner.runSchematic('feature', {
                name: featureName,
                component: true,
                template: true,
                styles: false
            }, appTree);

            const files = appTree.files;

            expect(files).contains('/src/app/features/bar/bar.component.ts');
            expect(files).contains('/src/app/features/bar/bar.component.html');
            expect(files).not.contains('/src/app/features/bar/bar.component.scss');
        });


        it('should create feature module with component, template and styles', () => {
            appTree = yangSchematicRunner.runSchematic('feature', {
                name: featureName,
                component: true,
                template: true,
                styles: true
            }, appTree);

            const files = appTree.files;

            expect(files).contains('/src/app/features/bar/bar.component.ts');
            expect(files).contains('/src/app/features/bar/bar.component.html');
            expect(files).contains('/src/app/features/bar/bar.component.scss');
        });


        it('should update routing', () => {
            appTree = yangSchematicRunner.runSchematic('feature', {
                name: featureName,
                component: false,
                template: false,
                styles: false
            }, appTree);

            const fileContent = getFileContent(appTree, YangUtils.FEATURES_MODULE_FILE);
            const path = `{ path: '${strings.dasherize(featureName)}', loadChildren: '@app/features/${strings.dasherize(featureName)}/${strings.dasherize(featureName)}.module#${strings.classify(featureName)}Module' }`;

            expect(fileContent).include(path);
        });
    });
});
