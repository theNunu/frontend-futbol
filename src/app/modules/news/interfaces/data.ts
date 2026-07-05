// export interface RequestDto {
//     name: string;
//     active?: boolean
// }
// 1. Interfaz para estructurar los Query Params de búsqueda
export interface FiltrosNews {
    title?: string;
    is_active?: string | boolean; // Acepta string por los selects HTML y boolean por lógica
}

export interface News {
    news_id: number;
    title: string;
    description: string;
    summary: string;
    begin_date: string | null;
    end_date: string | null;
}
export interface NewsI {
    news_id: number;
    title: string;
    description: string;
    summary: string;
    begin_date: string | null;
    end_date: string | null;
}
export interface ApiResponse {
    status_code: number;
    success: boolean;
    message: string;
    data: News[]; // Aquí vive el objeto real
}

export interface dtoNews {
    news_id: number;
    title: string;
    description: string;
    summary: string;
    begin_date: string | null;
    end_date: string | null;
}

export interface updateNews {
    news_id: number;
    title: string;
    description: string;
    summary: string;
    begin_date: string | null;
    end_date: string | null;
}
