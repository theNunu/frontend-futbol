

export interface ApiResponse {
    status_code: number;
    success: boolean;
    message: string;
    data: Banners[]; // Aquí vive el objeto real
}

export interface Banners {
    banner_id: number;
    file_id: number | null;
    files: File | null; 

}

export interface BannerI {
    banner_id: number;
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