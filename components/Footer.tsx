import { Zap } from 'lucide-react'

const links = {
  Product: ['Features', 'How It Works', 'Analytics', 'Pricing', 'Enterprise'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  Integrations: ['Salesforce', 'HubSpot', 'Slack', 'Zapier', 'Notion'],
}

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-violet-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">TapFlow</span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The digital identity and lead generation platform for modern professionals.
            </p>
            <div className="flex gap-3 mt-6">
              {['𝕏', 'in', 'f'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors text-xs font-bold"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                {category}
              </div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2025 TapFlow, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
