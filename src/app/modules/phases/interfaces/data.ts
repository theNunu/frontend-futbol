// src/app/features/tournaments/interfaces/phase.interface.ts
export interface Phase {
  phase_id: number;
  tournament_id: number;
  name: string;
  order: number;
//   has_extra_time: boolean;
//   has_penalties: boolean;
}

export interface Tournament {
  tournament_id: number;
  name: string;
  season: string;
  // created_at?: string;
  // updated_at?: string;
//   season_id?: number;
  phases?: Phase[]; // Relación de uno a muchos
}

// Estructura para crear una fase (lo que envías por POST)
export interface PhaseCreatePayload {
  tournament_id: number;
  name: string;
  order: number;
}

// Estructura de la respuesta genérica del backend
export interface ApiResponse<T> {
  status_code: number;
  success: boolean;
  message: string;
  data: T;
}

export interface TournamentResponseData {
  tournament: Tournament;
}

// Estructura estándar de respuesta del Backend
export interface ApiResponse<T> {
  status_code: number;
  success: boolean;
  message: string;
  data: T;
}

// Estructuras específicas para los endpoints
export interface TournamentsListResponse {
  tournaments: Tournament[];
}

export interface TournamentDetailResponse {
  tournament: Tournament;
}