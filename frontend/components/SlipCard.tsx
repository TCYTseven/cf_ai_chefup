"use client";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";

interface SlipCardProps {
    question: string;
    onAnswer: (answer: "yes" | "no") => void;
}

export const SlipCard = ({ question, onAnswer }: SlipCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -50, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Card className="w-[300px] h-[200px] bg-yellow-100 text-black shadow-xl rotate-1 border-2 border-yellow-200">
                <CardBody className="flex items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-handwriting font-bold">{question}</h3>
                </CardBody>
                <CardFooter className="flex justify-center gap-4 pb-6">
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => onAnswer("no")}
                        className="font-bold"
                    >
                        Nope
                    </Button>
                    <Button
                        color="success"
                        variant="shadow"
                        onPress={() => onAnswer("yes")}
                        className="font-bold text-white"
                    >
                        Yes!
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};
