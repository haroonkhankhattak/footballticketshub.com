export interface AlertInfoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    showConfirm?: boolean;
    showCancel?: boolean;
    cancelText?: string;
    confirmText?: string;
    cancelAction?: () => void;
    confirmAction?: () => void;
    title?: string;
    subtitle?: string;
    description?: string;
    boldText?: string[];
    icon?: React.ReactNode;
}
