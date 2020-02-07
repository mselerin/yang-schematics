import {Schema as NgSchema} from '@schematics/angular/component/schema';

export interface Schema extends NgSchema {
  /**
   * Specifies if the component generation should have a separate template file.
   */
  template?: boolean;
  /**
   * Specifies if the component generation should have a separate style file.
   */
  styles?: boolean;
  /**
   * Specifies if a route for this component should be created (feature component only).
   */
  routing?: boolean;
  /**
   * Specifies the route path for this component (feature component only).
   */
  route?: string;
}
