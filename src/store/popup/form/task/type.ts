export interface ITaskFormDataFields {
  article: {
    value: string;
    errors: string[];
  };
  dateStart: {
    value: string;
    errors: string[];
  };
  dateEnd: {
    value: string;
    errors: string[];
  };
}

export interface ITaskFormFields {
  article: string;
  dateStart: string;
  dateEnd: string;
}
