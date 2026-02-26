import { RiVipCrown2Line } from "react-icons/ri";

export default function AuthLogo({ className }: Readonly<{ className: string }>) {
  return (
    <div className="w-full aspect-square rounded-xl bg-foreground flex justify-center items-center">
      <RiVipCrown2Line className={`text-background ${className}`} />
    </div>
  );
}
