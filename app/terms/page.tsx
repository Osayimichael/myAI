import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="w-full flex justify-center p-10 bg-white dark:bg-background">
      <div className="w-full max-w-screen-md space-y-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 underline"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Mobby
        </Link>
        <h1 className="text-3xl font-bold">Mobby</h1>
        <h2 className="text-2xl font-semibold">
          Terms of Use and Disclaimer for AI Chatbot 
        </h2>
        <p className="text-gray-700 font-semibold">Effective Date: March 4, 2025</p>
        <ol className="list-decimal list-inside space-y-4">
          <li className="text-gray-700">
            <span className="font-semibold">Acceptance of Terms:</span> By
            accessing and using Mobby ("Chatbot"), provided by Osayi Eromhonsele ("Provider"),
            you acknowledge that you have read, understood, and agreed to be bound
            by these Terms of Use. If you do not agree with these terms, do not
            use the Chatbot.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">No Warranties:</span> The Chatbot is
            provided "as is" and "as available" without any warranties, express
            or implied. Osayi Eromhonsele makes no representations or warranties regarding
            the accuracy, reliability, completeness, or suitability of the
            Chatbot for any purpose. To the fullest extent permitted by law, all
            warranties, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement, are expressly disclaimed.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">No Guarantees on Availability or Support:</span>{" "}
            Osayi Eromhonsele does not guarantee that Mobby will always be available,
            uninterrupted, secure, or error-free. Maintenance, updates, and
            technical support are provided at Osayi’s discretion and are not
            guaranteed.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">Limitation of Liability:</span> To
            the fullest extent permitted by applicable law, Osayi Eromhonsele shall not be
            liable for any direct, indirect, incidental, consequential, special,
            exemplary, or punitive damages arising from or related to your use
            of or inability to use the Chatbot. This includes but is not limited
            to loss of profits, data, business, or any other losses, even if
            Osayi Eromhonsele has been advised of the possibility of such damages.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">No Legal, Financial, or Professional Advice:</span>{" "}
            Mobby is intended for informational and general purposes only.
            It does not constitute legal, financial, medical, or professional
            advice. Any reliance on the information provided by the Chatbot is
            at your own risk.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">User Responsibility:</span> You are
            solely responsible for your use of the Chatbot and any actions or
            decisions made based on its output. Osayi Eromhonsele is not responsible for any
            consequences resulting from the use or misuse of the Chatbot.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">Data Security and Privacy:</span>{" "}
            Mobby does not store user conversations, inputs, or outputs beyond
            the active session. Users should not input sensitive, confidential,
            or personally identifiable information. Mobby may use third-party AI
            models and APIs to generate responses. Osayi Eromhonsele is not responsible for
            how third-party services process user data.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">Intellectual Property:</span> All content,
            trademarks, and intellectual property related to Mobby, including but
            not limited to its name, responses, and underlying technology, are
            owned by Osayi Eromhonsele. Unauthorized reproduction, distribution, or modification
            of Mobby is prohibited.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">Indemnification:</span> You agree to
            indemnify, defend, and hold harmless Osayi Eromhonsele from any claims,
            liabilities, damages, losses, and expenses, including reasonable
            legal fees, arising from your use of the Chatbot or violation of
            these Terms of Use.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">Modifications to Terms:</span> Osayi Eromhonsele
            reserves the right to modify these Terms of Use at any time without
            prior notice. Continued use of the Chatbot constitutes acceptance of
            the modified terms.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">Governing Law:</span> These Terms of
            Use shall be governed by and construed in accordance with the laws
            of the applicable jurisdiction without regard to its conflict of law
            provisions.
          </li>
          <li className="text-gray-700">
            <span className="font-semibold">Contact Information:</span> If you
            have any questions or concerns regarding these Terms of Use, please
            contact Osayi Eromhonsele at osayimichael@yahoo.com.
          </li>
        </ol>
        <p className="text-gray-700 font-semibold">Copyright © 2025 Osayi Eromhonsele. All Rights Reserved.</p>
      </div>
    </div>
  );
}
