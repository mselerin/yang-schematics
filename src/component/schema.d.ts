export interface Schema {
    name: string;
    path: string;
    feature: string;
    shared: boolean;
    flat: boolean;
    spec: boolean;
    styles?: boolean;
    template?: boolean;
    routing: boolean;
    route: string;
}
