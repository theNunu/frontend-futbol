// export interface IData {
//     tournament_id: number;
//     name: string;
//     season: string;
// }

export interface RequestDto {
    name: string;
    active: boolean
}

export interface Seasons {
  season_id: number;
  name: string;
  active: boolean;
}

export interface Season {
    // season_id: number;
    // name: string;
    // active: boolean;
    status_code: number;
  success: boolean;
  message: string;
  data: Seasons; // Aquí vive el objeto real
}

export interface mySeason {
  season_id: number;
  name: string;
  active: boolean;
}