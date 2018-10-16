export interface Schema {
  /**
   * The name of the feature.
   */
  name: string;
  /**
   * The path to create the feature.
   */
  path?: string;
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * Specifies if a spec file is generated.
   */
  spec?: boolean;
  /**
   * Allows specification of the declaring module.
   */
  module?: string;
  /**
   * Specifies if a component with the same name is generated.
   */
  component?: boolean;
  /**
   * Specifies if the component generation should have a separate template file.
   */
  template?: boolean;
  /**
   * Specifies if the component generation should have a separate style file.
   */
  styles?: boolean;
  /**
   * The file extension to be used for style files.
   */
  styleext?: string;
}
