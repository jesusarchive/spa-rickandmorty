import { cn } from "@/utils/cn";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: Readonly<ButtonProps>) {
  return <button className={cn("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded")} {...props} />;
}
