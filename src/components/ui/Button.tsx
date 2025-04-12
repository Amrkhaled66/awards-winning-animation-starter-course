import { ReactNode } from "react";

export default function Button({
  text,
  bg = "bg-yellow-300 ",
  rightIcon,
  leftIcon,
}: {
  text: string;
  bg?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}) {
  return (
    <button
      className={` uppercase font-general text-xs font-bold w-fit flex gap-x-1 items-center rounded-full px-5 py-2 ${bg}`}
    >
      {leftIcon} {text} {rightIcon}
    </button>
  );
}
