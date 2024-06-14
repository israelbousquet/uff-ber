export interface User {
  user_id: number,
  driver_id?: number,
  passenger_id?: number,
}

export interface UserCreated {
  created_at: Date,
  id: number,
  iduff: string,
  name: string,
  rating: number,
  updated_at: Date,
}

export interface Cadastro {
  iduff: string,
  password: string,
  driver: boolean, 
  cnh: string
}

// 14000000000