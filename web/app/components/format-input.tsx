/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "./ui/input";

interface FormatInputProps {
  onChange: (value: string | number | undefined) => void;
  onBlur?: () => void;
  maxLength?: number;
  style?: string;
  type: string;
  value: any;
  placeholder: string;
}

const FormatInput = ({
  onChange,
  placeholder,
  value,
  style,
  type,
  ...props
}: FormatInputProps) => {
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return `${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
      7,
      11
    )}`;
  };

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  };

  const formatOnlyNumber = (value: number) => {
    if (value > 0) {
      return value;
    } else {
      return 0;
    }
  };

  const formatTime = (value: string) => {
    const numeric = value.replace(/\D/g, "");

    if (numeric.length < 3) return numeric;

    const hour = numeric.slice(0, 2);
    const minute = numeric.slice(2, 4);

    return `${hour}:${minute}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let formated: string | number | undefined;
    switch (type) {
      case "phone":
        formated = formatPhone(value);
        break;
      case "cep":
        formated = formatCep(value);
        break;
      case "onlyNumber":
        const numberValue = Number(value);
        formated = formatOnlyNumber(numberValue);
        break;
      case "time":
        formated = formatTime(value);
        break;
      default:
        break;
    }
    onChange(formated);
  };

  return (
    <Input
      className={style}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export default FormatInput;
