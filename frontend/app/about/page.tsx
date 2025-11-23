import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { BookOpen, Target, Heart, Zap, Users, Award, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us - EduModern',
  description: 'Learn about EduModern\'s mission to revolutionize educational content creation and distribution.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue/10 via-lavender/20 to-cream py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue/10 px-4 py-2 rounded-full mb-6 animate-bounce-in">
              <BookOpen className="h-4 w-4 text-blue" />
              <span className="font-subheading font-medium text-sm text-dark">Our Story</span>
            </div>
            <h1 className="font-heading font-extrabold text-heading-xl text-dark mb-6">
              Empowering Education Through Innovation
            </h1>
            <p className="font-body text-body-lg text-dark/80 mb-8">
              EduModern is on a mission to democratize access to high-quality educational materials
              and empower educators to create, share, and monetize their expertise.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="font-heading font-extrabold text-heading-lg text-dark mb-6">
                Our Mission
              </h2>
              <p className="font-body text-body-lg text-dark/80 mb-6">
                We believe that every student deserves access to exceptional learning materials,
                and every educator should have the tools to create and share their knowledge
                effectively.
              </p>
              <p className="font-body text-body-lg text-dark/80 mb-8">
                Founded in 2025, EduModern combines cutting-edge AI technology with a passion
                for education to provide a platform where learning materials are not just
                distributed, but crafted with care and expertise.
              </p>
              <Link href="/workbooks">
                <Button size="lg" variant="primary" className="group">
                  Explore Workbooks
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue/10 to-lavender/20 rounded-lg p-8 hover-lift">
                  <Target className="h-12 w-12 text-blue mb-4" />
                  <h3 className="font-heading font-extrabold text-2xl text-dark mb-2">50K+</h3>
                  <p className="font-body text-sm text-dark/70">Active Students</p>
                </div>
                <div className="bg-gradient-to-br from-lavender/20 to-blue/10 rounded-lg p-8 hover-lift mt-8">
                  <Users className="h-12 w-12 text-blue mb-4" />
                  <h3 className="font-heading font-extrabold text-2xl text-dark mb-2">2K+</h3>
                  <p className="font-body text-sm text-dark/70">Educators</p>
                </div>
                <div className="bg-gradient-to-br from-blue/10 to-lavender/20 rounded-lg p-8 hover-lift -mt-8">
                  <BookOpen className="h-12 w-12 text-blue mb-4" />
                  <h3 className="font-heading font-extrabold text-2xl text-dark mb-2">10K+</h3>
                  <p className="font-body text-sm text-dark/70">Workbooks</p>
                </div>
                <div className="bg-gradient-to-br from-lavender/20 to-blue/10 rounded-lg p-8 hover-lift">
                  <Award className="h-12 w-12 text-blue mb-4" />
                  <h3 className="font-heading font-extrabold text-2xl text-dark mb-2">4.9/5</h3>
                  <p className="font-body text-sm text-dark/70">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-cream">
        <Container>
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-heading font-extrabold text-heading-lg text-dark mb-4">
              Our Core Values
            </h2>
            <p className="font-body text-body-lg text-dark/70 max-w-2xl mx-auto">
              The principles that guide everything we do at EduModern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-soft hover-lift animate-fade-in-up">
              <div className="w-16 h-16 bg-blue/10 rounded-lg flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-blue" />
              </div>
              <h3 className="font-heading font-extrabold text-heading-sm text-dark mb-3">
                Student-Centered
              </h3>
              <p className="font-body text-body-md text-dark/70">
                Every decision we make is guided by what's best for learners. Quality education
                should be accessible, engaging, and effective for everyone.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-soft hover-lift animate-fade-in-up animate-delay-100">
              <div className="w-16 h-16 bg-lavender/20 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-blue" />
              </div>
              <h3 className="font-heading font-extrabold text-heading-sm text-dark mb-3">
                Innovation First
              </h3>
              <p className="font-body text-body-md text-dark/70">
                We leverage the latest AI and technology to make content creation faster,
                easier, and more impactful for educators worldwide.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-soft hover-lift animate-fade-in-up animate-delay-200">
              <div className="w-16 h-16 bg-blue/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue" />
              </div>
              <h3 className="font-heading font-extrabold text-heading-sm text-dark mb-3">
                Community Driven
              </h3>
              <p className="font-body text-body-md text-dark/70">
                Our platform thrives because of our amazing community of educators and learners
                who share knowledge and support each other.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-heading font-extrabold text-heading-lg text-dark mb-4">
              Meet Our Team
            </h2>
            <p className="font-body text-body-lg text-dark/70 max-w-2xl mx-auto">
              Passionate educators and technologists working to transform education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', initial: 'SJ' },
              { name: 'Michael Chen', role: 'CTO', initial: 'MC' },
              { name: 'Emily Rodriguez', role: 'Head of Education', initial: 'ER' },
              { name: 'David Kim', role: 'Lead Designer', initial: 'DK' },
            ].map((member, index) => (
              <div
                key={member.name}
                className={`text-center animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue/20 to-lavender/30 rounded-full flex items-center justify-center mx-auto mb-4 hover-lift">
                  <span className="font-heading font-extrabold text-3xl text-dark">
                    {member.initial}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-lg text-dark mb-1">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-dark/60">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue to-blue/80">
        <Container>
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="font-heading font-extrabold text-heading-lg text-white mb-6">
              Join Our Mission
            </h2>
            <p className="font-body text-body-lg text-white/90 mb-8">
              Whether you're an educator looking to share your expertise or a student seeking
              quality learning materials, EduModern is here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="xl" variant="secondary" className="hover-glow">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}