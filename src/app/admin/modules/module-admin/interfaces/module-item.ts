// export interface ModuleItem {
//     id: number;
//     name: string;
//     route: string | null;
//     icon: string | null;
//     children: ModuleItem[];
//     isOpen?: boolean; // Propiedad local para controlar si el acordeón está abierto
// }
export interface ModuleItem {
    module_id: number;
    name: string;
    route: string | null;
    icon: string | null;
    parent_id: number | null;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    children: ModuleItem[];
    // Propiedad exclusiva del frontend para controlar el acordeón
    isOpen?: boolean;
}