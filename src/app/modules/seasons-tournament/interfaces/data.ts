export interface SeasonDto {
    name: string;
    active?: boolean
}

export interface UpdateSeason {
  // season_id: number;
    name: string;
    active?: boolean
}


export interface SeasonI {
  season_id: number;
  name: string;
  active: boolean;
}

export interface ApiResponse {
  status_code: number;
  success: boolean;
  message: string;
  data: SeasonI; // Aquí vive el objeto real
}
