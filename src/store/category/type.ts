export interface IOption {
  id: number;
  title: string;
}

export interface IOptionCategory extends IOption {
  alias: string;
}
