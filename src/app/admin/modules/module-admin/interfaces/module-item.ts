export interface ModuleItem {
    id: number;
    name: string;
    route: string | null;
    icon: string | null;
    children: ModuleItem[];
    isOpen?: boolean; // Propiedad local para controlar si el acordeón está abierto
}