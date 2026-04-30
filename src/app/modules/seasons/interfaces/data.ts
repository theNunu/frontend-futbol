// export interface IData {
//     tournament_id: number;
//     name: string;
//     season: string;
// }

export interface RequestDto {
    name: string;
    active: boolean
}

export interface Season {
    season_id: number;
    name: string;
    active: boolean;
}