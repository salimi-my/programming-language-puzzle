import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Language } from "@/types/puzzle";

interface LanguageBadgeProps {
  language: Language;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

/**
 * Language badge with programming language icon
 */
export function LanguageBadge({
  language,
  variant = "secondary",
  className,
}: LanguageBadgeProps) {
  // Map language names to icon paths
  const iconMap: Record<Language, string> = {
    Python: "/pl-icons/python.svg",
    Java: "/pl-icons/java.svg",
    "C++": "/pl-icons/cplusplus.svg",
    Ruby: "/pl-icons/ruby.svg",
    Swift: "/pl-icons/swift.svg",
  };

  const iconPath = iconMap[language];

  return (
    <Badge variant={variant} className={`gap-1.5 ${className || ""}`}>
      {iconPath && (
        <Image
          src={iconPath}
          alt={`${language} icon`}
          width={16}
          height={16}
          className="shrink-0"
        />
      )}
      {language}
    </Badge>
  );
}
