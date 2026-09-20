import Link from 'next/link';
import { ArrowRight, Shield, TrendingUp, Clock, Brain } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          FinLife
        </h1>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-gray-700 hover:text-gray-900">
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Your Financial Life, Organized & Optimized
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Consolidate insurance, claims, credit, and taxes. Get AI-powered insights
          and never miss an important deadline again.
        </p>

        <div className="flex gap-4 justify-center mb-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Demo Dashboard
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Feature preview */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <img
            src="https://via.placeholder.com/800x450/f0f9ff/0284c7?text=Dashboard+Preview"
            alt="Dashboard"
            className="w-full rounded-lg"
          />
        </div>
      </section>

      {/* Features section */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why FinLife?
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Financial Health Score',
                description: 'Real-time insights into your overall financial wellness',
              },
              {
                icon: Brain,
                title: 'AI-Powered Insights',
                description: 'Smart recommendations tailored to your financial situation',
              },
              {
                icon: Clock,
                title: 'Never Miss Deadlines',
                description: 'Automatic alerts for renewals, taxes, and important dates',
              },
              {
                icon: Shield,
                title: 'Bank-Grade Security',
                description: 'Your financial data encrypted and protected at all times',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Take Control of Your Financial Life</h3>
          <p className="text-blue-100 mb-8">
            Join thousands who have organized their finances and found peace of mind.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Get Started Today
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-semibold text-white mb-4">FinLife</h5>
              <p className="text-sm text-gray-400">
                Simplifying financial organization and planning
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Security', 'Pricing'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Contact'] },
            ].map((col, idx) => (
              <div key={idx}>
                <h5 className="font-semibold text-white mb-4">{col.title}</h5>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 FinLife. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
