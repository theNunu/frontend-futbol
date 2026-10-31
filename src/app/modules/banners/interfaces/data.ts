

// export interface ApiResponse {
//     status_code: number;
//     success: boolean;
//     message: string;
//     data: Banners[]; // Aquí vive el objeto real
// }
export interface ApiResponse<T = Banners[]> {
    status_code: number;
    success: boolean;
    message: string;
    data: T; // 'T' representa un array (Tournaments[]) o un solo objeto (Tournaments)
}


export interface Banners {
    banner_id: number;
    file_id: number | null;
    files: File | null; 

}
export interface Banner {
    banner_id: number;
    file_id: number | null;
    files: File | null; 

}
export interface BannerI {
    banner_id: number;
    file_id: number | null;
    files: File | null; 

}

export interface BannerDto {
    banner_id: number;
    file_id: number | null;
    files: File | null; 

}

export interface BannerDtoUpdate {
    // banner_id: number;
    file_id: number | null;
    files: File | null; 

}

export interface File {
    file_id: number;
    name: string;
    path: string;
    mime_type: string;
    size: number;
}