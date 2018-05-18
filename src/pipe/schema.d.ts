export interface Schema {
    name: string;
    /**
     * The name of the project.
     */
    project?: string;
    /**
     * Specifies if a spec file is generated.
     */
    spec: boolean;
}
