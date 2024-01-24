export interface IInputProps {
  placeholder: string;
  type: string;
  name: string;
  showPassword?: boolean;
  validation?: IValidation;
  toggleShowPassword?: () => void;
  marginBottom?: boolean;
  btnWidth?: string;
}

export interface IValidation {
  required: string;
  pattern: {
    value: RegExp;
    message: string;
  };
  validate?: {};
}

export interface IStyledInputProps {
  marginBottom?: boolean;
}
