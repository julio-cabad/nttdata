import { Dispatch, SetStateAction } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

export type StateType<T> = [T, Dispatch<SetStateAction<T>>];
