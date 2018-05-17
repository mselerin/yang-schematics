import { expect } from 'chai';
import * as path from 'path';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as NgNewOptions } from '@schematics/angular/ng-new/schema';
import { getFileContent } from '@schematics/angular/utility/test';


describe('Yang Init Schematic', () => {
    const schematicRunner = new SchematicTestRunner(
        'yang-schematics', path.join(__dirname, '../collection.json'),
    );

    const ngNewOptions: NgNewOptions = {
        name: 'foo',
        directory: '.',
        version: '6.0.0'
    };

    let appTree: UnitTestTree;
    beforeEach(() => {
        appTree = schematicRunner.runExternalSchematic('@schematics/angular', 'ng-new', ngNewOptions);
        appTree = schematicRunner.runSchematic('init', {}, appTree);
    });


    it('should create files for yang', () => {
        const files = appTree.files;

        expect(files.indexOf('/src/app/core/core.module.ts')).to.be.gte(0);
        expect(files.indexOf('/src/app/shared/shared.module.ts')).to.be.gte(0);
        expect(files.indexOf('/src/app/features/features.module.ts')).to.be.gte(0);
    });


    it('should contains a home feature and component', () => {
        const files = appTree.files;

        expect(files.indexOf('/src/app/features/home/home.module.ts')).to.be.gte(0);
        expect(files.indexOf('/src/app/features/home/home.component.ts')).to.be.gte(0);
        expect(files.indexOf('/src/app/features/home/home.component.html')).to.be.gte(0);
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
            schematicRunner.runSchematic('init', {});
        } catch (err) {
            thrownError = err;
        }
        expect(thrownError).to.not.be.undefined;
    });
});
