export interface MasterAccount {
  // Descripción
  origin: string; //
  type: string;
  name: string;
  description: string;
  target: string; //

  // Montos
  amount: number; //
  balance: number; //
  collected: number; //
  available: number; //

  // Fechas
  date: Date;
  dueDate: Date;
  createdAt: Date;

  // Actualizaciones

  updated: boolean;
  updatedBy: string;

  // Identificadores
  updateId: string;
  user: string;
}
