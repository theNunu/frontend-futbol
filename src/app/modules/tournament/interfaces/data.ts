

// export interface ApiResponse {
//     status_code: number;
//     success: boolean;
//     message: string;
//     data: Tournaments[]; // Aquí vive el objeto real
// }

// Tu interfaz base adaptada a T (por defecto es Tournaments[])
export interface ApiResponse<T = Tournaments[]> {
    status_code: number;
    success: boolean;
    message: string;
    data: T; // 'T' representa un array (Tournaments[]) o un solo objeto (Tournaments)
}

export interface Tournaments {
    tournament_id: number;
    name: string;
    season: string;
    // season_id: number;
}

export interface TournamentI {
    tournament_id: number;
    name: string;
    // season: string;
    // season_id: number;
}

export interface TournamentDto {
    // tournament_id: number;
    name: string;
    season: string;
    // season_id: number;
}

export interface TournamentDtoResponse {
    tournament_id: number;
    name: string;
    season: string;
    // season_id: number;
}

export interface TournamentDtoUpdate {
    tournament_id: number;
    name: string;
    season: string;
    // season_id: number;
}

// 2. Modelo exacto de los datos del Torneo dentro del objeto "data"
export interface Tournament {
  tournament_id: number;
  name: string;
  season: string; // Opcional por si no viene en todas las respuestas
}