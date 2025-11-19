"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { ArrowRight, ChefHat } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-8 py-8 md:py-10 relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center z-10 max-w-4xl px-4"
      >
        <div className="mb-6 p-3 bg-default-100 rounded-full">
          <ChefHat size={48} className="text-primary" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
          Cooking made <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">fun</span> again.
        </h1>

        <p className="text-xl md:text-2xl text-default-500 max-w-2xl mb-10 leading-relaxed">
          Stop scrolling for recipes. Draw a slip from the Magic Hat and let AI craft the perfect meal for your mood.
        </p>

        <div className="flex gap-4">
          <Button
            size="lg"
            color="primary"
            className="font-bold text-lg px-8 py-6 shadow-lg shadow-orange-500/20"
            endContent={<ArrowRight />}
            onPress={() => router.push("/onboarding")}
          >
            Start Cooking
          </Button>
          <Button
            size="lg"
            variant="bordered"
            className="font-bold text-lg px-8 py-6"
            as={Link}
            href="https://github.com"
            isExternal
          >
            View on GitHub
          </Button>
        </div>
      </motion.div>

      {/* Floating Cards Animation (Decorative) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[10%] hidden lg:block p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-default-200 rotate-6"
      >
        <span className="text-2xl">🌮</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-[10%] hidden lg:block p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-default-200 -rotate-6"
      >
        <span className="text-2xl">🥗</span>
      </motion.div>

    </section>
  );
}
