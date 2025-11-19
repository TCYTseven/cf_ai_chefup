"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";

export const StepsAccordion = ({ steps }: { steps: string[] }) => {
    return (
        <Accordion selectionMode="multiple" variant="splitted">
            {steps.map((step, idx) => (
                <AccordionItem
                    key={idx}
                    aria-label={`Step ${idx + 1}`}
                    title={`Step ${idx + 1}`}
                    className="font-medium"
                >
                    {step}
                </AccordionItem>
            ))}
        </Accordion>
    );
};
