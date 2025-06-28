import React from "react";
import { Badge } from "./ui/badge";
import {
  CircleCheck,
  Clock,
  CreditCard,
  DollarSign,
  QrCode,
  RefreshCw,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface FormatBadgeProps {
  type:
    | "Pix"
    | "Dinheiro"
    | "Cartão"
    | "Não Iniciado"
    | "Em Andamento"
    | "Finalizado";
}

type TypeIconData = {
  icon: LucideIcon;
  color: string;
  text: string;
};

const paymentList: Record<"Pix" | "Dinheiro" | "Cartão", TypeIconData> = {
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

const statusList: Record<
  "Não Iniciado" | "Em Andamento" | "Finalizado",
  TypeIconData
> = {
  "Não Iniciado": {
    icon: Clock,
    color: "bg-[rgba(200,50,50,0.15)]",
    text: "text-[rgb(160,0,0)]",
  },
  "Em Andamento": {
    icon: RefreshCw,
    color: "bg-[rgba(240,180,50,0.15)]",
    text: "text-[rgb(180,140,0)]",
  },
  Finalizado: {
    icon: CircleCheck,
    color: "bg-[rgba(50,200,100,0.15)]",
    text: "text-[rgb(0,160,60)]",
  },
};

const FormatBadge = ({ type }: FormatBadgeProps) => {
  let data: TypeIconData | undefined;

  if (type === "Pix" || type === "Dinheiro" || type === "Cartão") {
    data = paymentList[type];
  } else {
    data = statusList[type as keyof typeof statusList];
  }

  if (!data) {
    return <Badge>{type}</Badge>;
  }

  const Icon = data.icon;
  return (
    <Badge
      className={`${data.color} ${data.text} hover:bg-muted flex items-center gap-2`}
    >
      <Icon
        className={`${type === "Em Andamento" ? "animate-spin" : ""}`}
        size={16}
      />
      {type}
    </Badge>
  );
};

export default FormatBadge;
