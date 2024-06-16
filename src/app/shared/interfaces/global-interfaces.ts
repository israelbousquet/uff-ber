export interface User {
  user_id: number;
  driver_id?: number;
  passenger_id?: number;
}

export interface UserCreated {
  created_at: Date;
  id: number;
  iduff: string;
  name: string;
  rating: number;
  updated_at: Date;
}

export interface Cadastro {
  iduff: string;
  password: string;
  driver: boolean;
  cnh: string;
}

export interface LiftDetail {
  id: number;
  driver_id: number;
  passenger_id: number;
  status: string;
  start_location: Location;
  end_location: Location;
  created_at: Date;
  updated_at: Date;
}

export interface WayPoint {
  dropoff_location: Location;
  pickup_location: Location;
}

export interface Lift {
  lift: LiftDetail;
  waypoints: WayPoint[];
}

export interface Location {
  address?: string;
  name?: string;
  location?: any;
}

export interface Vehicle {
  id?: number;
  driver_id: number;
  model: string;
  color: string;
  license_plate: string;
  capacity: number;
  type: string;
}
// 14000000000
