import React from "react";
import { Badge } from "./ui/badge";
import { CreditCard, DollarSign, QrCode } from "lucide-react";
import { PaymentMethod } from "../types";
import { type LucideIcon } from "lucide-react";

interface PaymentMethodBadgeProps {
  method: PaymentMethod;
}

type PaymentIconData = {
  icon: LucideIcon;
  color: string;
  text: string;
};

interface IListMethod {
  Pix: PaymentIconData;
  Dinheiro: PaymentIconData;
  Cartão: PaymentIconData;
}

const PaymentMethodBadge = ({ method }: PaymentMethodBadgeProps) => {
  const list: IListMethod = {
    Pix: {
      icon: QrCode,
      color: "bg-[rgba(0,255,170,0.25)]", // Neon verde água translúcido
      text: "text-[rgb(0,255,170)]", // Texto neon
    },
    Dinheiro: {
      icon: DollarSign,
      color: "bg-[rgba(0,195,255,0.25)]", // Azul neon translúcido
      text: "text-[rgb(0,195,255)]", // Azul neon vibrante
    },
    Cartão: {
      icon: CreditCard,
      color: "bg-[rgba(255,0,200,0.25)]", // Rosa neon translúcido
      text: "text-[rgb(255,0,200)]",
    },
  };

  const Icon = list[method].icon;
  return (
    <Badge
      className={`${list[method].color} ${list[method].text} hover:bg-muted flex items-center gap-2`}
    >
      <Icon size={16} />
      {method}
    </Badge>
  );
};

export default PaymentMethodBadge;
