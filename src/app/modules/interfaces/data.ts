// export interface RequestDto {
//     name: string;
//     active?: boolean
// }

export interface News {
    news_id: number;
    title: string;
    description: string;
    summary: string;
    begin_date: string;
    end_date: string;
}

export interface ApiResponse {
    status_code: number;
    success: boolean;
    message: string;
    data: News; // Aquí vive el objeto real
}
