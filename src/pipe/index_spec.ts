import { expect } from 'chai';
import { Tree } from '@angular-devkit/schematics';
import { runYangNew, yangSchematicRunner } from '../utils/test-utils';
import { UnitTestTree } from '@angular-devkit/schematics/testing';


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
    });
});
