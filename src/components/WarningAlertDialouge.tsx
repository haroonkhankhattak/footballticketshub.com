import React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Toaster } from "sonner"
import { Listing } from "../pages/tickets/listing"
import { restrictionsList } from "../lib/constants/restrictions"
import { AlertTriangle } from "lucide-react"


interface AlertDialougeProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    listing: Listing
    onConfirm: () => void;

}

export const WarningAlertDialouge: React.FC<AlertDialougeProps> = ({
    open,
    onOpenChange,
    listing,
    onConfirm,
}) => {
    return (
        <>
            <Toaster position="top-center" richColors />
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[700px] max-w-[350px] max-h-[90vh] p-6">
                    <DialogHeader>
                        <DialogTitle className=" font-light flex items-start text-sm sm:text-xl gap-2 text-yellow-600">
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            Please review important details about your selected tickets
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm mt-4 text-grey-400">
                            Here are some important details regarding your chosen tickets:

                            <div className="mt-4 text-start ">

                                {listing.restrictions?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {
                                            listing.restrictions?.map((attr: string, i: number) => {
                                                const found = restrictionsList.find((item) => item.label === attr);
                                                const Icon = found?.icon;
                                                return (
                                                    <div>
                                                        <span
                                                            key={i}
                                                            className={`rounded-md px-2 py-1 inline-flex items-start gap-1 text-[8px] sm:text-xs border`}
                                                        >
                                                            {Icon && <Icon className="w-3 h-3" />}
                                                            {attr}
                                                        </span>
                                                        <h4 className="font-light text-orange-700 text-[8x] sm:text-sm mb-1">{found.description}</h4>

                                                    </div>
                                                );
                                            })
                                        }

                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">None</p>
                                )}

                            </div>
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-4 flex items-center justify-start">
                        <div className="mt-4 flex items-center justify-between w-full">
                            <h4 className="font-light text-black mb-1">Would you like to continue?</h4>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => onOpenChange(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        onConfirm?.();
                                        onOpenChange(false);
                                    }}
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>

                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </>
    )
}


const Info = ({
    label,
    value,
}: {
    label: string
    value: React.ReactNode | string | number | null | undefined
}) => (
    <div>
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        <div className="text-sm text-gray-900 dark:text-white">{value || "N/A"}</div>
    </div>
)








