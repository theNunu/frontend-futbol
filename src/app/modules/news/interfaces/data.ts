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
    // file_id: number;
    // image?: File; // Relación polimórfica que devuelve Laravel
    // file_id: number | null;
    // // Opcional por si en el futuro decides cargar el objeto del archivo
    // file?: File;
    file_id: number | null;
    files: File | null; //

}
export interface NewsI {
    news_id: number;
    title: string;
    description: string;
    summary: string;
    begin_date: string | null;
    end_date: string | null;

    // file_id: number;
    // image?: File; // Rell;
    // // Opcional por si en el futuro decides cargar el objeto del archivo
    // file?: File;
    file_id: number | null;
    files: File | null; //
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
    file_id: number | null;
    files: File | null; //
    // file_id: number;
    // image?: File; // Relación polimórfica que devuelve Laravel
}

export interface updateNews {
    news_id: number;
    title: string;
    description: string;
    summary: string;
    begin_date: string | null;
    end_date: string | null;
    file_id: number | null;
    files: File | null; //
    // file_id: number;
    // image?: File; // Relación polimórfica que devuelve Laravel
}

export interface File {
    file_id: number;
    name: string;
    path: string;
    mime_type: string;
    size: number;
}
