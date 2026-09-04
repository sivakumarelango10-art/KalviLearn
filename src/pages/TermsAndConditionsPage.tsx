import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, Mail, MapPin } from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'

/**
 * KalviCode — Terms & Conditions Page
 * Public route accessible to all users detailing the academic code of conduct and service terms.
 */
export const TermsAndConditionsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'KalviCode — Terms & Conditions'
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
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Document</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Terms &amp; Conditions
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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, registering for, or using KalviCode (&quot;the Platform&quot;), you acknowledge that you have read, understood, and agreed to be bound by these Terms &amp; Conditions. If you do not agree to these terms, you must discontinue using the Platform immediately.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                2. Academic Eligibility &amp; Account Registration
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                <li>
                  <strong className="text-neutral-800">Authorized Academic Access:</strong> KalviCode is an educational learning portal designed for verified students, educators, and community members of Kalvium. Access to practice arenas, curricula, and evaluation services requires authentication via an authorized institutional Google account.
                </li>
                <li>
                  <strong className="text-neutral-800">Account Responsibility:</strong> You are responsible for safeguarding your login credentials and maintaining the confidentiality of your account session. You agree to notify administrators immediately of any unauthorized access.
                </li>
                <li>
                  <strong className="text-neutral-800">Identity Integrity:</strong> You agree to provide truthful, accurate student information and not impersonate any other individual or student.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                3. User Conduct &amp; Academic Honesty
              </h2>
              <p>KalviCode promotes genuine learning and algorithmic mastery. Users must adhere strictly to academic honesty:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                <li>
                  <strong className="text-neutral-800">Manual Coding Practice:</strong> The Practice Arena strictly prohibits unauthorized clipboard automation, copy-pasting code from third-party sources, or using artificial intelligence tools to generate answers without instructor approval.
                </li>
                <li>
                  <strong className="text-neutral-800">No Malicious Exploitation:</strong> You must not probe, scan, or test the vulnerability of our execution servers, run malicious binaries, launch denial-of-service attacks, or attempt to circumvent sandbox resource limits.
                </li>
                <li>
                  <strong className="text-neutral-800">Fair Execution Runner Usage:</strong> Do not write infinite loops, memory bombs, or computationally abusive scripts intended to disrupt platform availability for other students.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                4. Code Execution Sandbox &amp; Testing Limitations
              </h2>
              <p>
                The platform provides automated evaluation across Python, Java, C++, and Node.js:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                <li>
                  <strong className="text-neutral-800">Execution Constraints:</strong> Code submissions are bounded by a standard execution timeout (typically 3000ms per test case) and strict memory limits. Submissions exceeding bounds will be classified as Time Limit Exceeded (TLE) or Runtime Error.
                </li>
                <li>
                  <strong className="text-neutral-800">Hidden Test Integrity:</strong> Test cases numbered 4 through 10 are hidden to evaluate edge cases, boundary parameters, and algorithmic rigor. Hardcoded output mappings designed to pass only sample cases will fail hidden verification.
                </li>
                <li>
                  <strong className="text-neutral-800">Service Availability:</strong> While we endeavor to ensure 99.9% uptime, code evaluation runners may experience transient scheduled maintenance or updates.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                5. Intellectual Property Rights
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                <li>
                  <strong className="text-neutral-800">Platform Materials:</strong> All curriculum modules, problem problem descriptions, test case suites, graphics, interface designs, and branding are the exclusive property of KalviCode and its licensors. You may not distribute, reproduce, or resell curriculum content without prior written permission.
                </li>
                <li>
                  <strong className="text-neutral-800">Student Submissions:</strong> You retain ownership of your original algorithmic source code submissions. By submitting code to the Platform, you grant KalviCode a non-exclusive license to compile, analyze, evaluate, and store the code for educational and administrative purposes.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                6. Gamification, XP &amp; Belt Mastery
              </h2>
              <p>
                Experience points (XP), streak counters, and belt mastery tiers (Belt 1, Belt 2, Belt 3) are academic motivational tools. They carry zero monetary value and cannot be transferred, redeemed, or exchanged. We reserve the right to recalibrate scores if submissions are found to violate anti-cheat standards.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                7. Disclaimers &amp; Limitation of Liability
              </h2>
              <p>
                KalviCode is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. To the maximum extent permitted by applicable law, we disclaim all warranties, express or implied, including fitness for a particular purpose and non-infringement.
              </p>
              <p>
                In no event shall KalviCode, its founders, educators, or affiliates be liable for any indirect, incidental, consequential, or punitive damages arising out of your access to or inability to access the platform.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                8. Termination of Access
              </h2>
              <p>
                We reserve the right to suspend or terminate account access without notice if a student engages in academic dishonesty, repeatedly attempts to compromise platform sandboxes, or violates any provision of these Terms.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                9. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka.
              </p>
            </section>

            {/* Contact Information Box */}
            <section className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200/90 space-y-3">
              <h2 className="text-base font-bold text-neutral-900">
                Contact Us
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                For questions regarding these Terms &amp; Conditions, please reach out to our platform administrators:
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
              to="/privacy-policy"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline underline-offset-2"
            >
              View Privacy Policy
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

export default TermsAndConditionsPage
