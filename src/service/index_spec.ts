import { expect } from 'chai';
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');


describe('yang-schematics-service', () => {
    it('should throw error on empty tree', () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        expect(() => runner.runSchematic('service', {}, Tree.empty())).to.throw()
    });
});
