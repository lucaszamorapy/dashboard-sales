import { Input } from "./ui/input";

interface PhoneInputProps {
  onChange: (value: string) => void;
  onBlur?: () => void;
  maxLength?: number;
  type: string;
  value: string | undefined;
  placeholder: string;
}

const FormatInput = ({
  onChange,
  placeholder,
  value,
  type,
  ...props
}: PhoneInputProps) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let formated = "";
    switch (type) {
      case "phone":
        formated = formatPhone(value);
        break;
      case "cep":
        formated = formatCep(value);
        break;
      default:
        break;
    }
    onChange(formated);
  };

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export default FormatInput;
