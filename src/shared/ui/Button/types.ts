import { ButtonHTMLAttributes } from "react";

export enum BtnVariants {
  primary = "primary",
  secondary = "secondary",
  danger = "danger",
  success = "success",
  warning = "warning",
  info = "info",
  transparent = "transparent"
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof BtnVariants, icon?: JSX.Element }
