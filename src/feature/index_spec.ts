import { expect } from 'chai';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { Tree } from '@angular-devkit/schematics';


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
                name: 'bar',
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
                name: 'bar',
                component: true,
                template: false,
                styles: false
            }, appTree);

            const files = appTree.files;

            expect(files.includes('/src/app/features/bar/bar.component.ts')).to.be.true;
            expect(files.includes('/src/app/features/bar/bar.component.html')).to.be.false;
            expect(files.includes('/src/app/features/bar/bar.component.scss')).to.be.false;
        });


        it('should create feature module with component and template', () => {
            appTree = yangSchematicRunner.runSchematic('feature', {
                name: 'bar',
                component: true,
                template: true,
                styles: false
            }, appTree);

            const files = appTree.files;

            expect(files.includes('/src/app/features/bar/bar.component.ts')).to.be.true;
            expect(files.includes('/src/app/features/bar/bar.component.html')).to.be.true;
            expect(files.includes('/src/app/features/bar/bar.component.scss')).to.be.false;
        });


        it('should create feature module with component, template and styles', () => {
            appTree = yangSchematicRunner.runSchematic('feature', {
                name: 'bar',
                component: true,
                template: true,
                styles: true
            }, appTree);

            const files = appTree.files;

            expect(files.includes('/src/app/features/bar/bar.component.ts')).to.be.true;
            expect(files.includes('/src/app/features/bar/bar.component.html')).to.be.true;
            expect(files.includes('/src/app/features/bar/bar.component.scss')).to.be.true;
        });
    });
});
