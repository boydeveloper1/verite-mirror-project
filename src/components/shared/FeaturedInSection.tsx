import { motion } from "framer-motion";

// Featured publication names with refined styling to match luxury aesthetic
const publications = [
  { name: "VOGUE", style: "font-serif italic" },
  { name: "GQ", style: "font-bold" },
  { name: "FORBES", style: "font-bold" },
  { name: "ELLE", style: "font-serif italic" },
  { name: "COSMOPOLITAN", style: "font-bold" },
  { name: "HARPER'S BAZAAR", style: "font-serif" },
];

export const FeaturedInSection = () => {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs uppercase tracking-[0.25em] text-brand-gold font-medium mb-8 md:mb-10"
        >
          As Featured In
        </motion.p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group"
            >
              <span
                className={`text-lg md:text-xl lg:text-2xl text-foreground/40 
                  group-hover:text-foreground/70 transition-colors duration-300 tracking-wider ${pub.style}`}
              >
                {pub.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
