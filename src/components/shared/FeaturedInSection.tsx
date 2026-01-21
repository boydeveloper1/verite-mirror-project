import { motion } from "framer-motion";

// Featured publication names with placeholder styling
const publications = [
  { name: "VOGUE", style: "font-serif italic tracking-wider" },
  { name: "GQ", style: "font-bold tracking-widest" },
  { name: "FORBES", style: "font-bold tracking-wide" },
  { name: "ELLE", style: "font-serif italic tracking-widest" },
  { name: "COSMOPOLITAN", style: "font-bold tracking-tight text-sm" },
  { name: "HARPER'S BAZAAR", style: "font-serif tracking-wide text-sm" },
];

export const FeaturedInSection = () => {
  return (
    <section className="py-8 md:py-12 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 md:mb-8"
        >
          As Featured In
        </motion.p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-14">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <span
                className={`text-lg md:text-xl lg:text-2xl text-muted-foreground/60 
                  group-hover:text-muted-foreground transition-colors duration-300 ${pub.style}`}
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
