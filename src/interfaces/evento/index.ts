import { User } from "../../entities/User";

export interface IEvento {
  description: string;
  startTime: Date;
  endTime: Date;
  user_id: number;
}

export interface IEventoUpdate {
  description: string;
  startTime: Date;
  endTime: Date;
}



