import {Schema as NgSchema} from '@schematics/angular/component/schema';

export interface Schema extends NgSchema {
  /**
   * Specifies if a route for this component should be created (feature component only).
   */
  routing?: boolean;
  /**
   * Specifies the route path for this component (feature component only).
   */
  route?: string;
}
