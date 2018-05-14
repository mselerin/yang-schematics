import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');


describe('yang-schematics-init', () => {
    it('should throw error on empty tree', () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        expect(() => runner.runSchematic('init', {}, Tree.empty())).toThrow();
        // expect(tree.files).toEqual([]);
    });
});
