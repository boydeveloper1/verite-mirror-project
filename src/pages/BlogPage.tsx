import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blogPosts";
import { ArrowRight, Clock } from "lucide-react";
import productBanner from "@/assets/product-banner.jpg";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageHeroBanner
        title="Blog"
        subtitle="Expert tips, guides, and insights for your scalp care journey"
        breadcrumbs={[{ label: "Blog" }]}
        backgroundImage={productBanner}
      />
      
      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  {/* Thumbnail Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm animate-fade-in">
                        Scalp Care
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 animate-fade-in">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
