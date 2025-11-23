'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-cream py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-heading font-extrabold text-heading-lg text-dark mb-4">
              Get in Touch
            </h1>
            <p className="font-body text-body-lg text-dark/70 max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6 animate-fade-in-left">
              <div className="bg-white rounded-lg p-6 shadow-soft hover-lift">
                <div className="w-12 h-12 bg-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blue" />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-dark mb-2">Email Us</h3>
                <p className="font-body text-dark/70 mb-2">
                  Our team typically responds within 24 hours
                </p>
                <a
                  href="mailto:support@edumodern.com"
                  className="font-subheading font-medium text-blue hover:underline"
                >
                  support@edumodern.com
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-soft hover-lift">
                <div className="w-12 h-12 bg-lavender/30 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-blue" />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-dark mb-2">Call Us</h3>
                <p className="font-body text-dark/70 mb-2">Mon-Fri from 9am to 6pm CET</p>
                <a
                  href="tel:+123456789"
                  className="font-subheading font-medium text-blue hover:underline"
                >
                  +1 (234) 567-89
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-soft hover-lift">
                <div className="w-12 h-12 bg-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue" />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-dark mb-2">Visit Us</h3>
                <p className="font-body text-dark/70">
                  EduModern HQ<br />
                  Education District<br />
                  European Union
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 animate-fade-in-right">
              <div className="bg-white rounded-lg p-8 shadow-soft">
                {submitted ? (
                  <div className="text-center py-12 animate-scale-in">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="font-heading font-extrabold text-heading-md text-dark mb-3">
                      Message Sent!
                    </h3>
                    <p className="font-body text-body-md text-dark/70 mb-6">
                      Thank you for contacting us. We'll get back to you soon!
                    </p>
                    <Button variant="primary" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>

                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                    />

                    <Textarea
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full group"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}