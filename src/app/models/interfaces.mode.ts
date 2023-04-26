export interface Celula {
  linha: number;
  coluna: number;
  temMina: boolean;
  revelada: boolean;
  marcada: boolean;
  minasAdjacentes: number;
}
