import Link from "next/link";
import { MessageCircle } from "lucide-react";

type WhatsAppButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "whatsapp";
  size?: "default" | "compact";
};

export function WhatsAppButton({
  href,
  label,
  variant = "primary",
  size = "default",
}: WhatsAppButtonProps) {
  const variantClasses =
    variant === "whatsapp"
      ? "bg-[#25d366] text-[#082c18] shadow-[0_16px_38px_rgba(37,211,102,0.2)] hover:bg-[#31e474]"
      : "bg-[var(--accent)] text-[#1d0c05] shadow-[0_16px_42px_rgba(255,106,25,0.28)] hover:bg-[#ff7d35]";

  const sizeClasses =
    size === "compact"
      ? "min-h-10 px-5 text-sm"
      : "min-h-14 px-8 text-base";

  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition ${variantClasses} ${sizeClasses}`}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden="true" size={18} strokeWidth={2.2} />
      {label}
    </Link>
  );
}
