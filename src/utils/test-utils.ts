import * as path from "path";
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as NgNewOptions } from '../ng-new/schema';

export const yangSchematicRunner = new SchematicTestRunner(
  'yang-schematics', path.join(__dirname, '../collection.json')
);

export const ngNewOptions: NgNewOptions = {
  name: 'foo',
  directory: '.',
  version: '6.0.0'
};

export function runYangNew(): UnitTestTree {
  return yangSchematicRunner.runSchematic('ng-new', ngNewOptions);
}
