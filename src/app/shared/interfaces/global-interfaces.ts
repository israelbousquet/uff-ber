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
  waypoints: WayPoint[]
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
  kind: string;
}

export interface UserDetail {
  user: UserDetailUser,
  driver: DriverDetailUser
} 

interface UserDetailUser {
  created_at: Date,
  updated_at: Date,
  id: number,
  name: string,
  iduff: string,
  rating: 5,
}

interface DriverDetailUser {
  created_at: Date,
  updated_at: Date,
  cnh: string,
  id: number,
}
