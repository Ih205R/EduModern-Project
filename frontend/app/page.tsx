import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { WorkbookGrid } from '@/components/workbooks/WorkbookGrid';
import { BookOpen, Sparkles, Download, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  // This would come from API in real implementation
  const featuredWorkbooks = [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream via-white to-lavender/20 py-20 md:py-32 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-left">
              <div className="inline-flex items-center space-x-2 bg-lavender/50 px-4 py-2 rounded-full animate-bounce-in">
                <Sparkles className="h-4 w-4 text-blue" />
                <span className="font-subheading font-medium text-sm text-dark">
                  Premium Educational Content
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-heading-xl text-dark leading-tight animate-fade-in-up">
                Master Any Subject with{' '}
                <span className="text-blue">Premium Workbooks</span>
              </h1>

              <p className="font-body text-body-lg text-dark/80 max-w-xl animate-fade-in-up animate-delay-100">
                Discover expertly crafted educational workbooks designed for modern learners.
                Create, share, and learn with AI-powered content generation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-200">
                <Link href="/workbooks">
                  <Button size="xl" variant="primary" className="group">
                    Browse Workbooks
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="xl" variant="outline">
                    Start Creating Free
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in-up animate-delay-300">
                <div>
                  <div className="font-heading font-extrabold text-3xl text-blue">10K+</div>
                  <div className="font-body text-sm text-dark/60">Workbooks</div>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-3xl text-blue">50K+</div>
                  <div className="font-body text-sm text-dark/60">Students</div>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-3xl text-blue">4.9/5</div>
                  <div className="font-body text-sm text-dark/60">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Decorative */}
            <div className="relative hidden lg:block animate-fade-in-right">
              <div className="relative w-full h-[500px]">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-lavender/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Floating Cards */}
                <div className="absolute top-10 right-10 bg-white rounded-lg shadow-soft-lg p-6 max-w-xs hover-lift">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-blue" />
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-dark">Mathematics</div>
                      <div className="font-body text-sm text-dark/60">Advanced Calculus</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-dark/60">Progress</span>
                    <span className="font-subheading font-medium text-blue">87%</span>
                  </div>
                  <div className="w-full bg-grayblue/30 rounded-full h-2 mt-2">
                    <div className="bg-blue h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>

                <div className="absolute bottom-20 left-10 bg-white rounded-lg shadow-soft-lg p-6 max-w-xs hover-lift" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div>
                      <div className="font-heading font-extrabold text-dark">Complete!</div>
                      <div className="font-body text-sm text-dark/60">Physics Workbook</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-heading font-extrabold text-heading-lg text-dark mb-4">
              Why Choose EduModern?
            </h2>
            <p className="font-body text-body-lg text-dark/70 max-w-2xl mx-auto">
              Everything you need to create, manage, and distribute premium educational content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue/5 to-lavender/10 rounded-lg p-8 hover-lift animate-fade-in-up">
              <div className="w-16 h-16 bg-blue/10 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-blue" />
              </div>
              <h3 className="font-heading font-extrabold text-heading-sm text-dark mb-3">
                AI-Powered Content
              </h3>
              <p className="font-body text-body-md text-dark/70">
                Generate high-quality educational content instantly with our advanced AI technology.
                Save hours of work.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-lavender/10 to-blue/5 rounded-lg p-8 hover-lift animate-fade-in-up animate-delay-100">
              <div className="w-16 h-16 bg-lavender/20 rounded-lg flex items-center justify-center mb-6">
                <Download className="h-8 w-8 text-blue" />
              </div>
              <h3 className="font-heading font-extrabold text-heading-sm text-dark mb-3">
                Instant Downloads
              </h3>
              <p className="font-body text-body-md text-dark/70">
                Purchase and download workbooks instantly. All files are professionally formatted
                PDFs ready to print.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue/5 to-lavender/10 rounded-lg p-8 hover-lift animate-fade-in-up animate-delay-200">
              <div className="w-16 h-16 bg-blue/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue" />
              </div>
              <h3 className="font-heading font-extrabold text-heading-sm text-dark mb-3">
                Creator Community
              </h3>
              <p className="font-body text-body-md text-dark/70">
                Join thousands of educators sharing their knowledge. Monetize your expertise and
                reach students worldwide.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Workbooks Section */}
      <section className="py-20 bg-cream">
        <Container>
          <div className="flex items-center justify-between mb-12 animate-fade-in-up">
            <div>
              <h2 className="font-heading font-extrabold text-heading-lg text-dark mb-2">
                Featured Workbooks
              </h2>
              <p className="font-body text-body-md text-dark/70">
                Discover our most popular educational materials
              </p>
            </div>
            <Link href="/workbooks">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {featuredWorkbooks.length > 0 ? (
            <div className="animate-fade-in-up animate-delay-100">
              <WorkbookGrid workbooks={featuredWorkbooks} />
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in-up">
              <BookOpen className="h-16 w-16 text-grayblue mx-auto mb-4" />
              <p className="font-body text-body-lg text-dark/60">
                Featured workbooks coming soon!
              </p>
              <Link href="/workbooks" className="mt-4 inline-block">
                <Button variant="primary">Browse All Workbooks</Button>
              </Link>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue to-blue/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <Container>
          <div className="relative z-10 text-center max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="font-heading font-extrabold text-heading-lg text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="font-body text-body-lg text-white/90 mb-8">
              Join thousands of students and educators using EduModern to create and share
              premium educational content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="xl" variant="secondary" className="hover-glow">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/about">
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-blue">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}