import { expect } from 'chai';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as NgNewOptions } from '@schematics/angular/ng-new/schema';
import { getFileContent } from '@schematics/angular/utility/test';
import { yangSchematicRunner } from '../utils/test-utils';
import { Tree } from '@angular-devkit/schematics';


describe('Init Schematic', () => {
    const ngNewOptions: NgNewOptions = {
        name: 'foo',
        directory: '.',
        version: '6.0.0'
    };

    let appTree: UnitTestTree;
    beforeEach(() => {
        appTree = yangSchematicRunner.runExternalSchematic('@schematics/angular', 'ng-new', ngNewOptions);
        appTree = yangSchematicRunner.runSchematic('init', {}, appTree);
    });


    it('should throw error on empty tree', () => {
        expect(() => yangSchematicRunner.runSchematic('init', {}, Tree.empty())).to.throw();
    });


    it('should create files for yang', () => {
        const files = appTree.files;

        expect(files.includes('/src/app/core/core.module.ts')).to.be.true;
        expect(files.includes('/src/app/shared/shared.module.ts')).to.be.true;
        expect(files.includes('/src/app/features/features.module.ts')).to.be.true;
    });


    it('should contains a home feature and component', () => {
        const files = appTree.files;

        expect(files.includes('/src/app/features/home/home.module.ts')).to.be.true;
        expect(files.includes('/src/app/features/home/home.component.ts')).to.be.true;
        expect(files.includes('/src/app/features/home/home.component.html')).to.be.true;
    });


    it('should contains specific stuffs inside package.json', () => {
        const fileContent = getFileContent(appTree, '/package.json');
        const pkg = JSON.parse(fileContent);

        expect(pkg.scripts['prebuild']).to.be.eq('node prebuild.js');
        expect(pkg.dependencies['whatwg-fetch']).to.not.be.undefined;
        expect(pkg.devDependencies['yang-schematics']).to.not.be.undefined;
    });


    it('should fail if specified directory does not exist', () => {
        let thrownError: Error | null = null;
        try {
            yangSchematicRunner.runSchematic('init', {});
        } catch (err) {
            thrownError = err;
        }
        expect(thrownError).to.not.be.undefined;
    });
});
