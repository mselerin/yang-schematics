import {Schema as NgSchema} from '@schematics/angular/module/schema';

export interface Schema extends NgSchema {
  /**
   * Specifies if a component with the same name is generated.
   */
  component?: boolean;
}
