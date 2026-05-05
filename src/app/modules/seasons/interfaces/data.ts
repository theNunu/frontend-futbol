export interface RequestDto {
    name: string;
    active: boolean
}

export interface Season {
  season_id: number;
  name: string;
  active: boolean;
}

export interface ApiResponse {
  status_code: number;
  success: boolean;
  message: string;
  data: Season; // Aquí vive el objeto real
}
