/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { parse } from "date-fns";
import { formatDate } from "@/utils/functions";

interface FormatInputProps {
  onChange: (value: any) => void;
  onBlur?: () => void;
  maxLength?: number;
  style?: string;
  type: string;
  placeholder: string;
  initialValue?: any;
}

const FormatInput = ({
  onChange,
  onBlur,
  placeholder,
  style,
  type,
  initialValue = "",
  ...props
}: FormatInputProps) => {
  const [value, setValue] = useState<any>("");
  const initialized = useRef(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      let formatted: any;
      switch (type) {
        case "phone":
          formatted = formatPhone(value);
          break;
        case "cep":
          formatted = formatCep(value);
          break;
        case "onlyNumber":
          formatted = formatOnlyNumber(Number(value));
          break;
        case "time":
          formatted = formatTime(value);
          break;
        case "date":
          formatted = formatDatePicker(value);
          break;
      }

      onChange(formatted);
    },
    [type, onChange]
  );

  useEffect(() => {
    if (initialized.current || initialValue === "") return;
    let formatted: any;

    switch (type) {
      case "phone":
        formatted = formatPhone(String(initialValue));
        break;
      case "cep":
        formatted = formatCep(String(initialValue));
        break;
      case "onlyNumber":
        formatted = formatOnlyNumber(Number(initialValue));
        break;
      case "time":
        formatted = formatTime(String(initialValue));
        break;
      case "date":
        formatted = formatDatePicker(formatDate(initialValue, "normal"));
        break;
    }

    onChange(formatted);

    initialized.current = true;
  }, [initialValue, type, onChange]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let result = "";

    if (digits.length <= 2) {
      result = digits;
    } else if (digits.length <= 6) {
      result = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      // Telefone fixo: (XX) XXXX-XXXX
      result = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(
        6
      )}`;
    } else if (digits.length === 11) {
      // Celular: (XX) 9XXXX-XXXX
      result = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
        7
      )}`;
    } else {
      result = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
        7,
        11
      )}`;
    }

    setValue(result);
    return result;
  };

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const result = digits.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    setValue(result);
    return result;
  };

  const formatOnlyNumber = (value: number) => {
    const result = value > 0 ? value : 0;
    setValue(result);
    return result;
  };

  const formatTime = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    const result =
      digits.length >= 3
        ? `${digits.slice(0, 2)}:${digits.slice(2, 4)}`
        : digits;
    setValue(result);
    return result;
  };

  const formatDatePicker = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    let result = "";

    if (digits.length <= 2) result = digits;
    else if (digits.length <= 4)
      result = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    else
      result = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;

    setValue(result);
    const date = parse(result, "dd/MM/yyyy", new Date());
    return date;
  };

  return (
    <Input
      className={style}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      {...props}
    />
  );
};

export default FormatInput;
