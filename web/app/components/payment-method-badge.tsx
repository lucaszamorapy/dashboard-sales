import React from "react";
import { Badge } from "./ui/badge";
import { CreditCard, DollarSign, QrCode } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface PaymentMethodBadgeProps {
  method: "Pix" | "Dinheiro" | "Cartão";
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
      color: "bg-[rgba(0,168,120,0.15)]",
      text: "text-[rgb(0,128,96)]",
    },
    Dinheiro: {
      icon: DollarSign,
      color: "bg-[rgba(0,140,200,0.15)]",
      text: "text-[rgb(0,100,160)]",
    },
    Cartão: {
      icon: CreditCard,
      color: "bg-[rgba(180,100,200,0.15)]",
      text: "text-[rgb(120,60,150)]",
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
