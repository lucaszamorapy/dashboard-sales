/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { X } from "lucide-react";

interface GenericSelectProps {
  value: string | undefined;
  onChange: (value: any) => void;
  items: Array<string>;
  clearable?: boolean;
}

const GenericSelect = ({
  value,
  onChange,
  items,
  clearable = false,
}: GenericSelectProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um status" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item: string, index: number) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {clearable && (
        <X className="cursor-pointer" onClick={() => onChange("")} size={20} />
      )}
    </div>
  );
};

export default GenericSelect;
