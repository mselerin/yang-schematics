import * as path from "path";
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import {Schema as NgNewOptions} from '../ng-new/schema';
import {Style} from "@schematics/angular/ng-new/schema";
import {Observable} from "rxjs";

export const NG_VERSION = '9.0.0';

export const yangSchematicRunner = new SchematicTestRunner(
  'yang-schematics', path.join(__dirname, '../collection.json')
);

export const ngNewOptions: NgNewOptions = {
  name: 'foo',
  directory: '.',
  version: NG_VERSION,
  style: Style.Scss
};

export function runYangNew(): Observable<UnitTestTree> {
  return yangSchematicRunner.runSchematicAsync('ng-new', ngNewOptions);
}
