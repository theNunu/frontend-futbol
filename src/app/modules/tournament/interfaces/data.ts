

export interface ApiResponse {
    status_code: number;
    success: boolean;
    message: string;
    data: Tournaments[]; // Aquí vive el objeto real
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
