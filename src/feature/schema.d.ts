export interface Schema {
    /**
     * The name of the feature.
     */
    name: string;
    /**
     * The name of the project.
     */
    project?: string;
    /**
     * Specifies if a component with the same name is generated.
     */
    component: boolean;
    /**
     * Specifies if the component generation should have a separate template file.
     */
    template: boolean;
    /**
     * Specifies if the component generation should have a separate style file.
     */
    styles: boolean;
}
