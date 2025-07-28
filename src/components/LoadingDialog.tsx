import React, { useEffect } from "react";
import {
    Dialog,
    DialogContent,
} from "../components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Listing } from "../pages/tickets/listing";
import { ADD_TO_BASKET } from "../api/queries/AddToBasket";
import { useMutation } from "@apollo/client";

interface LoadingDialogProps {
    open: boolean;
    listing: Listing;
    quantity: number;
    onAdded: () => void;
    onAlert: () => void;
    onError: (errorMessage: string) => void;
}

export const LoadingDialog: React.FC<LoadingDialogProps> = ({ open, listing, quantity, onAdded, onAlert, onError }) => {
    const [addToBasket] = useMutation(ADD_TO_BASKET);

    useEffect(() => {
        if (!open) return;


        addToBasket({
            variables: {
                ticketIds: listing.tickets.slice(0, quantity).map(t => t.ticket_id),
            },
        })
            .then(response => {
                const result = response?.data?.addToBasket;

                if (!result?.success) {
                    console.log("Basket Error:", result.message);
                    if (result.message == "Before adding more tickets to the basket remove existing tickets.") {
                        // onError("Before adding more tickets to the basket, please remove existing tickets.");
                        onAlert();
                        return;
                    }
                    onError(result.message || "Something went wrong while adding to basket.");
                    return;
                }

                console.log("Success:", result);
                onAdded();
            })
            .catch(err => {
                console.error("GraphQL Error:", err);

                const graphQLError = err?.graphQLErrors?.[0];

                const code = graphQLError?.extensions?.code || "UNKNOWN_ERROR";
                const message = graphQLError?.message || err?.message || "An unexpected error occurred.";

                console.log("GraphQL Error Code:", code);
                onError(`${message} (Code: ${code})`);
            });

    }, [open]);


    return (
        <Dialog open={open}>
            <DialogContent className="w-full max-w-sm rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center bg-white dark:bg-zinc-900">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="bg-primary/10 p-4 rounded-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">Processing Your Request</h3>
                        <p className="text-sm text-muted-foreground mt-1">Please wait a moment...</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
