import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface WishlistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isInWishlist: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

export default function WishlistButton({
  isInWishlist,
  className,
  variant = "outline",
  size = "default",
  ...props
}: WishlistButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "flex items-center justify-center",
        isInWishlist && "text-red-500 hover:text-red-600",
        className
      )}
      {...props}
    >
      <Heart className={cn("h-5 w-5", isInWishlist && "fill-current")} />
    </Button>
  );
}
