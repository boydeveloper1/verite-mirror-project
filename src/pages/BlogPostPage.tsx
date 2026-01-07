import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";
import { PreFooterSubscribe } from "@/components/shared/PreFooterSubscribe";
import { EmailPopup } from "@/components/shared/EmailPopup";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Get related posts (excluding current)
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PageHeroBanner
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title.substring(0, 30) + "..." }
        ]}
        backgroundImage={post.image}
      />
      
      {/* Article Content */}
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-3xl mx-auto">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b border-border animate-fade-in">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <Button variant="ghost" size="sm" className="ml-auto gap-2 hover:scale-105 transition-transform">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
            
            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-li:text-foreground/80 animate-fade-in-up"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
            
            {/* Back to Blog */}
            <div className="mt-12 pt-8 border-t border-border animate-fade-in">
              <Button asChild variant="outline" className="gap-2 hover:scale-105 transition-transform">
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16 animate-fade-in-up">
              <h3 className="text-2xl font-display font-bold text-foreground mb-8">
                Continue Reading
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((related, index) => (
                  <Link 
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    className="group overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:scale-[1.02] animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={related.image} 
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <PreFooterSubscribe />
      <Footer />
      <EmailPopup />
    </div>
  );
};

// Simple markdown-like formatter
function formatContent(content: string): string {
  return content
    // Handle headers - must process ### before ## to avoid conflicts
    .replace(/^### (.*?)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^- (.*?)$/gm, '<li class="ml-6 list-disc">$1</li>')
    .replace(/^\d+\. (.*?)$/gm, '<li class="ml-6 list-decimal">$1</li>');
}

export default BlogPostPage;
