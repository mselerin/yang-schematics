export interface Schema {
    path: string;
    project?: string;
    name: string;
    feature: string;
    shared?: boolean;
    flat?: boolean;
    spec?: boolean;
    styles?: boolean;
    template?: boolean;
    routing?: boolean;
    route?: string;
}
