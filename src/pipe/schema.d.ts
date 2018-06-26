export interface Schema {
  /**
   * The name of the pipe.
   */
  name: string;
  /**
   * The path to create the pipe.
   */
  path?: string;
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * Flag to indicate if a dir is created.
   */
  flat?: boolean;
  /**
   * Specifies if a spec file is generated.
   */
  spec?: boolean;
  /**
   * Allows for skipping the module import.
   */
  skipImport?: boolean;
  /**
   * Allows specification of the declaring module.
   */
  module?: string;
  /**
   * Specifies if declaring module exports the pipe.
   */
  export?: boolean;
}
