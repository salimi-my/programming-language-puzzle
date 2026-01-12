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

  // Map language names to gradient colors
  const colorMap: Record<Language, string> = {
    Python:
      "bg-linear-to-r from-blue-500 to-yellow-500 text-white border-0 shadow-md hover:shadow-lg",
    Java: "bg-linear-to-r from-red-500 to-orange-500 text-white border-0 shadow-md hover:shadow-lg",
    "C++":
      "bg-linear-to-r from-blue-600 to-cyan-500 text-white border-0 shadow-md hover:shadow-lg",
    Ruby: "bg-linear-to-r from-red-600 to-pink-500 text-white border-0 shadow-md hover:shadow-lg",
    Swift:
      "bg-linear-to-r from-orange-500 to-red-500 text-white border-0 shadow-md hover:shadow-lg",
  };

  const iconPath = iconMap[language];
  const colorClass = colorMap[language];

  return (
    <Badge
      variant={variant}
      className={`gap-1.5 py-[3px] ps-1 ${colorClass} ${className || ""}`}
    >
      {iconPath && (
        <div className="flex items-center justify-center w-4.5 h-4.5 bg-white rounded-full p-0.5 shadow-inner">
          <Image
            src={iconPath}
            alt={`${language} icon`}
            width={14}
            height={14}
            className="shrink-0"
          />
        </div>
      )}
      {language}
    </Badge>
  );
}
