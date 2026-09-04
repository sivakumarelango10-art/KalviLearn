import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Mail, MapPin } from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'

/**
 * KalviCode — Privacy Policy Page
 * Public route accessible to all users with complete legal disclosures.
 */
export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'KalviCode — Privacy Policy'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen w-full bg-neutral-50 font-sans text-neutral-900 selection:bg-red-100 selection:text-red-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="KalviCode Home">
            <BrandLogo size="sm" orientation="horizontal" />
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <article className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8 animate-in fade-in duration-200">
          {/* Document Header */}
          <div className="border-b border-neutral-200/80 pb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#ED2A2B] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal Document</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Privacy Policy
            </h1>

            <p className="text-xs sm:text-sm text-neutral-500 font-medium">
              Last Updated: September 4, 2026
            </p>
          </div>

          {/* Section Content */}
          <div className="space-y-8 text-sm text-neutral-700 leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                1. Introduction &amp; Overview
              </h2>
              <p>
                Welcome to KalviCode (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), an academic learning and coding practice platform designed for students, educators, and institutions. We are committed to protecting your privacy and ensuring the security of your personal information.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, process, and safeguard your data when you visit our website, sign in via Google authentication, utilize our practice arena, submit code solutions, or interact with our learning curricula.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                2. Information We Collect
              </h2>
              <p>We collect information to provide, maintain, and improve our educational services:</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                <li>
                  <strong className="text-neutral-800">Authentication Information:</strong> When you sign in using Google OAuth, we receive your verified email address, full name, profile avatar, and unique Google authentication identifier.
                </li>
                <li>
                  <strong className="text-neutral-800">Academic &amp; Learning Progress:</strong> We record problem completion records, belt mastery tiers (Belt 1, Belt 2, Belt 3), earned experience points (XP), learning streak counters, solution submission timestamps, and curriculum module reading activity.
                </li>
                <li>
                  <strong className="text-neutral-800">Code Submissions &amp; Evaluation Data:</strong> When you execute or submit code in Python, Java, C++, or Node.js, we record your source code, execution runtime, test cases passed, and compiler diagnostics to verify correctness and compute mastery metrics.
                </li>
                <li>
                  <strong className="text-neutral-800">Device &amp; Usage Logs:</strong> Technical diagnostic details including browser type, operating system, network connection status, timestamped API interaction records, and client-side error telemetry.
                </li>
                <li>
                  <strong className="text-neutral-800">Local Browser Storage:</strong> We use browser localStorage and sessionStorage to retain active language preferences, uncommitted editor code drafts, and offline state synchronization cache.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                3. How We Use Your Information
              </h2>
              <p>The information we collect is utilized exclusively for educational and platform operational purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                <li>Authenticating authorized academic access and maintaining active login sessions.</li>
                <li>Evaluating submitted source code against visible and hidden algorithmic test benchmarks.</li>
                <li>Syncing student progress, saved solutions, and submission history across devices in real time.</li>
                <li>Calculating academic leaderboards, streak continuity, and belt graduation qualifications.</li>
                <li>Enforcing platform integrity, anti-plagiarism mechanisms, and fair coding guidelines.</li>
                <li>Diagnosing technical bugs, service interruptions, and execution runner latency.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                4. Code Execution &amp; Sandbox Security
              </h2>
              <p>
                Student code submitted to KalviCode is executed within isolated, resource-constrained execution sandboxes. Code is tested against both visible example inputs and server-side hidden test cases. Hidden test inputs and benchmarks are maintained strictly server-side to safeguard academic evaluation integrity and prevent hardcoded exploits.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                5. Data Sharing &amp; Third-Party Services
              </h2>
              <p>
                We do not sell, rent, or trade your personal data to third parties. We share information only with trusted infrastructure providers necessary to operate the platform:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                <li>
                  <strong className="text-neutral-800">Google Identity Services:</strong> For single sign-on authentication and identity verification.
                </li>
                <li>
                  <strong className="text-neutral-800">Supabase:</strong> For cloud PostgreSQL database hosting, row-level security, and progress persistence.
                </li>
                <li>
                  <strong className="text-neutral-800">Vercel:</strong> For static frontend hosting, serverless execution infrastructure, and content delivery.
                </li>
                <li>
                  <strong className="text-neutral-800">Educational Institutions:</strong> Aggregate academic progress may be shared with affiliated academic coordinators and instructors for coursework evaluation.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                6. Data Retention &amp; Protection
              </h2>
              <p>
                We retain your account data and submission history for as long as your account remains registered with KalviCode. We employ industry-standard administrative, physical, and technical safeguards, including HTTPS encryption in transit, salted session hashes, and strict database access controls.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                7. Your Rights &amp; Choices
              </h2>
              <p>As a student or user of KalviCode, you retain rights regarding your information:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                <li>Access and review all past code submissions through your Solution Vault.</li>
                <li>Request verification or correction of your registered student profile information.</li>
                <li>Request account deactivation and removal of personal identifiers from our databases.</li>
                <li>Clear local browser cache and saved code drafts at any time through browser settings.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                8. Changes to This Privacy Policy
              </h2>
              <p>
                We may revise this Privacy Policy periodically to reflect updates in our features, statutory guidelines, or infrastructure. Changes will be published directly on this page with an updated &quot;Last Updated&quot; timestamp. We encourage users to review this page periodically.
              </p>
            </section>

            {/* Contact Information Box */}
            <section className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200/90 space-y-3">
              <h2 className="text-base font-bold text-neutral-900">
                Contact Us
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                If you have questions, feedback, or privacy-related requests regarding this Privacy Policy, please contact our academic administration team:
              </p>

              <div className="space-y-2 pt-1 text-xs sm:text-sm text-neutral-800">
                <div className="font-bold text-neutral-900">KalviCode</div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Mail className="w-4 h-4 text-[#ED2A2B] flex-shrink-0" />
                  <span>Email: <a href="mailto:codingplatform10@gmail.com" className="font-medium text-neutral-900 hover:underline">codingplatform10@gmail.com</a></span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <MapPin className="w-4 h-4 text-[#ED2A2B] flex-shrink-0" />
                  <span>Address: Bangalore, Karnataka</span>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Navigation Actions */}
          <div className="border-t border-neutral-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/terms-and-conditions"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline underline-offset-2"
            >
              View Terms &amp; Conditions
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Login</span>
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}

export default PrivacyPolicyPage
