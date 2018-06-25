export interface Schema {
  /**
   * The path to create the component.
   */
  path?: string;
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * The name of the component.
   */
  name: string;
  /**
   * Allows specification of the declaring module.
   */
  module?: string;
  /**
   * Flag to indicate if a dir is created.
   */
  flat?: boolean;
  /**
   * Specifies if a spec file is generated.
   */
  spec?: boolean;
  /**
   * Specifies if the component generation should have a separate style file.
   */
  styles?: boolean;
  /**
   * Specifies if the component generation should have a separate template file.
   */
  template?: boolean;
  /**
   * Specifies if a route for this component should be created (feature component only).
   */
  routing?: boolean;
  /**
   * Specifies the route path for this component (feature component only).
   */
  route?: string;
}
