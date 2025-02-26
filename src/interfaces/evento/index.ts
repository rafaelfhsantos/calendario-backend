export interface IEvento {
  description: string;
  startTime: Date;
  endTime: Date;
  user_id: number;
}

export interface IEventoUpdate {
  description?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface IEventoList {
  id: number;
  description: string;
  startTime: Date;
  endTime: Date;
  user_id: number;
}


