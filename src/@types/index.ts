import { Board } from './Board';

interface res<D> {
  error: string | null;
  data: D;
}

export type { res, Board };
