import { expect } from 'chai';
import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as PipeOptions } from '../pipe/schema';
import { strings } from '@angular-devkit/core';
import { YangUtils } from '../utils/yang-utils';
import { getFileContent } from '@schematics/angular/utility/test';


describe('Pipe Schematic', () => {
    describe('With empty project', () => {
        it('should throw error on empty tree', () => {
            expect(() => yangSchematicRunner.runSchematic('pipe', {}, Tree.empty())).to.throw();
        });
    });

    describe('With fresh project', () => {
        let appTree: UnitTestTree;
        beforeEach(() => {
            appTree = runYangNew();
        });


        const pipeName = 'superDummy';
        const defaultOptions: PipeOptions = {
            name: pipeName,
            spec: true
        };


        it('should create files inside shared', () => {
            appTree = yangSchematicRunner.runSchematic('pipe', {
                ...defaultOptions
            }, appTree);

            const files = appTree.files;

            expect(files).contains(`/src/app/shared/pipes/${strings.dasherize(pipeName)}.pipe.ts`);
            expect(files).contains(`/src/app/shared/pipes/${strings.dasherize(pipeName)}.pipe.spec.ts`);
        });


        it('should import pipe inside shared.module', () => {
            appTree = yangSchematicRunner.runSchematic('pipe', {
                ...defaultOptions
            }, appTree);

            const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
            expect(moduleContent).to.match(/import.*SuperDummyPipe.*from ['"].\/pipes\/super-dummy.pipe['"]/);
            expect(moduleContent).to.match(/DECLARATIONS\s*=\s*\[[^\]]+?,\r?\n\s+SuperDummyPipe\r?\n/m);
        });
    });
});
