export type IPopups = {
  [name in TPopups]: boolean;
};

export type TPopups =
  | 'formProduct'
  | 'formTask'
  | 'formMap'
  | 'formUser'
  | 'viewTask'
  | 'viewMapProducts'
  | 'viewLocation'
  | 'selectMap'
  | 'selectPoints'
  | 'selectProducts'
  | 'selectWorkSchedule'
  | 'windowConfirm'
  | 'windowInformation';
