export interface IData {
    tournament_id: number;
    name: string;
    season: string;
}

export interface RequestDto {
    name: string
    season: string
}

export interface Tournament {
    tournament_id: number;
    name: string;
    season: string;
    //   created_at?: string; // El ? significa que es opcional
    //   updated_at?: string;
}