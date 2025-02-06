import { cn } from "@/lib/utils";

export interface AlertProps {
    variant: "success" | "error" | "warning" | "info";
    message: string;
}

const variants = {
    error: "alert-error",
    success: "alert-success",
    warning: "alert-warning",
    info: "alert-info",
};

export default function Alert({ variant, message }: AlertProps) {
    return (
        <div
            role="alert"
            className={cn(
                "alert alert-soft rounded",
                variants[variant] ?? "alert-info"
            )}
        >
            <span>{message}</span>
        </div>
    );
}
