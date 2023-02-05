export type IPopups = {
  [name in TPopups]: boolean;
};

export type TPopups =
  | 'formProduct'
  | 'formTask'
  | 'formMap'
  | 'formAccount'
  | 'viewTask'
  | 'viewLocation'
  | 'selectMap'
  | 'selectPoints'
  | 'selectProducts'
  | 'windowConfirm'
  | 'windowInformation';
