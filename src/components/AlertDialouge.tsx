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
import { AlertInfoProps } from "../lib/types/types"


export const AlertDialouge: React.FC<AlertInfoProps> = ({
    open,
    onOpenChange,
    confirmAction,
    title,
    subtitle,
    description,
    boldPhrases,
    confirmText,
    icon,
    showCancel = false,
    cancelText = "Cancel",
}) => {

    const highlightPhrases = (text: string) => {
        let result = text;
        boldPhrases.forEach((phrase) => {
            const regex = new RegExp(`(${phrase})`, "g");
            result = result.replace(regex, "<strong>$1</strong>");
        });
        return result;
    };

    const formattedDescription = description
        .split("\n")
        .map((line) => highlightPhrases(line.trim()));

    const sentences = description.match(/[^.!?]+[.!?]+/g) || [];

    return (
        <>
            <Toaster position="top-center" richColors />
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[600px] max-w-[350px] max-h-[90vh] p-6">
                    <DialogHeader>
                        <DialogTitle className="font-light flex flex-col sm:flex-row items-center text-sm sm:text-xl gap-1 sm:gap-2 text-green-600">
                            {/* <AlertTriangle className="w-5 h-5 text-yellow-600" /> */}
                            {icon}
                            {title || ""}
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm mt-4 text-black">
                            {subtitle || ""}

                            <div className="mt-4 text-start">
                                {sentences.map((sentence, idx) => (
                                    <span
                                        key={idx}
                                        className="font-light mt-2 text-black"
                                        dangerouslySetInnerHTML={{ __html: highlightPhrases(sentence.trim()) }}
                                    />
                                ))}
                            </div>

                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-4 gap-2">
                        {showCancel && (
                            <Button variant="outline" onClick={() => {
                                onOpenChange(false);
                            }}>
                                {cancelText}
                            </Button>
                        )}

                        <Button
                            onClick={() => {
                                confirmAction?.();
                                onOpenChange(false);
                            }}
                        >
                            {confirmText || ""}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}









