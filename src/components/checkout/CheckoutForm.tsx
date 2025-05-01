import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, UserCircle2 } from "lucide-react";
import { CheckoutFormData, CheckoutStep } from "@/types/checkout";
import PersonalDetailsStep from "./steps/PersonalDetailsStep";
import VisitorDetailsStep from "./steps/VisitorDetailsStep";
import PaymentDetailsStep from "./steps/PaymentDetailsStep";
import { cn } from "@/lib/utils";

const CheckoutForm = () => {
    const [currentStep, setCurrentStep] = React.useState<CheckoutStep>("details");
    const form = useForm<CheckoutFormData>();

    const steps = [
        { id: "details" as const, title: "Your Details" },
        { id: "visitor" as const, title: "Additional Info" },
        { id: "payment" as const, title: "Payment" },
    ];

    const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

    const handleNext = async () => {
        const fields = getFieldsForStep(currentStep);
        const isValid = await form.trigger(fields);

        if (isValid) {
            const nextStep = steps[currentStepIndex + 1];
            if (nextStep) {
                setCurrentStep(nextStep.id);
            }
        }
    };

    const handleBack = () => {
        const previousStep = steps[currentStepIndex - 1];
        if (previousStep) {
            setCurrentStep(previousStep.id);
        }
    };

    const getFieldsForStep = (step: CheckoutStep): (keyof CheckoutFormData)[] => {
        switch (step) {
            case "details":
                return [
                    "email",
                    "confirmEmail",
                    "phone",
                    "firstName",
                    "lastName",
                    "address",
                    "postcode",
                    "city",
                    "country",
                    "acceptTerms",
                ];
            case "visitor":
                return ["visitor1FirstName", "visitor1LastName"];
            case "payment":
                return ["cardNumber", "expiryDate", "cvv", "cardHolderName"];
            default:
                return [];
        }
    };

    return (
        <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1 pb-7">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                        {currentStepIndex + 1}
                    </div>
                    <h2 className="text-2xl font-semibold">
                        {steps[currentStepIndex].title}
                    </h2>
                </div>

                <div className="flex gap-2 mt-6">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="flex items-center">
                                <div
                                    className={cn(
                                        "w-3 h-3 rounded-full",
                                        currentStepIndex === index
                                            ? "bg-primary"
                                            : currentStepIndex > index
                                                ? "bg-primary/80"
                                                : "bg-gray-200"
                                    )}
                                />
                                <div
                                    className={cn(
                                        "text-sm ml-2",
                                        currentStepIndex === index
                                            ? "text-primary font-medium"
                                            : "text-gray-500"
                                    )}>
                                    {step.title}
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-px bg-gray-200 my-auto mx-2" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form className="space-y-6">
                        {currentStep === "details" && (
                            <PersonalDetailsStep control={form.control} />
                        )}
                        {currentStep === "visitor" && (
                            <VisitorDetailsStep control={form.control} />
                        )}
                        {currentStep === "payment" && (
                            <PaymentDetailsStep control={form.control} />
                        )}

                        <div className="flex justify-between pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                disabled={currentStepIndex === 0}
                                className="h-11">
                                <ChevronLeft className="mr-2" />
                                Back
                            </Button>

                            <Button
                                type="button"
                                onClick={
                                    currentStep === "payment"
                                        ? form.handleSubmit(() => { })
                                        : handleNext
                                }
                                className="h-11">
                                {currentStep === "payment" ? "Complete Purchase" : "Continue"}
                                {currentStep !== "payment" && <ChevronRight className="ml-2" />}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CheckoutForm;
