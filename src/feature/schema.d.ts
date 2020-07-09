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
  skipTests?: boolean;
  /**
   * Allows specification of the declaring module.
   */
  module?: string;
  /**
   * Specifies if a component with the same name is generated.
   */
  component?: boolean;
  /**
   * The file extension to be used for style files.
   */
  style?: string;
  /**
   * Specifies if the component generation should have a separate style file.
   */
  inlineStyle?: boolean;
  /**
   * Specifies if the component generation should have a separate template file.
   */
  inlineTemplate?: boolean;
}
