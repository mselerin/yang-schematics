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
   * The name of the feature where to create this component (optional).
   */
  feature?: string;
  /**
   * Flag to indicate if the component should be created inside the shared module.
   */
  shared?: boolean;
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
