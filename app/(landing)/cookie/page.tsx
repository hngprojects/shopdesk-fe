import React from "react";
import { IoCheckmark } from "react-icons/io5";

const cookies = [
  {
    name: "RequestVerificationToken",
    type: "Anti-forgery",
    function: "Prevents CSRF vulnerability in forms",
    expiry: "At end of session",
  },
  {
    name: "ASP.NET_SessionId",
    type: "Session",
    function: "Identifies the user's session on the server",
    expiry: "At end of session",
  },
  {
    name: "cfuid",
    type: "Cloudflare",
    function: "Rate limiting policies",
    expiry: "At end of session",
  },
  {
    name: "cfuid",
    type: "Cloudflare",
    function: "Used to speed up page load times",
    expiry: "1 month",
  },
  {
    name: "C_ANALYTICS_GLOBAL_COOKIE",
    type: "Analytics",
    function: "Tracks anonymous contacts",
    expiry: "6 months",
  },
  {
    name: "AWSELB",
    type: "Load balancer",
    function: "Maps session to an instance",
    expiry: "Removed after session with server closes",
  },
  {
    name: "AWSALB",
    type: "Load balancer",
    function: "Maps session to an instance",
    expiry: "",
  },
  {
    name: "AWSALBCORS",
    type: "Load balancer",
    function: "Maps session to an instance",
    expiry: "",
  },
  {
    name: "ga",
    type: "Analytics",
    function: "Analyses how users use the websites, applications or services",
    expiry: "",
  },
];

const CookiePolicy = () => {
  return (
    <div>
      <div className="bg-green-600 text-white text-left">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold">Cookie Policy</h1>
          <p className="mt-3 max-w-md text-xl">
            We use cookies to give you a smoother experience. Build a stunning
            site, stay motivated, and keep costs low—no compromise needed.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <section className="mt-2">
          <h2 className="text-2xl font-bold">Introduction</h2>
          <p className="text-gray-600 mt-2">
            Welcome to our cookie policy. The purpose of this policy is to
            describe what cookies are, what we use them for, and how you can
            manage them during your visit to our website.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">What are cookies?</h2>
          <p className="text-gray-600 mt-2">
            We may place small text files called ‘cookies’ on your device when
            you visit our website. These files do not contain personal data but
            may store a unique identifier to associate your data with a certain
            device. Learn more at
            <a
              href="https://www.allaboutcookies.org"
              className="text-green-600 underline"
            >
              www.allaboutcookies.org
            </a>
            .
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Why do we use cookies?</h2>
          <p className="py-5">
            These files serve a number of useful purposes for you, including:
          </p>
          <ul className="mt-2 space-y-2">
            {[
              "Granting you access to restricted content.",
              "tailoring our website’s functionality to you personally by letting us remember your preferences, location or device type;",
              "Improving how our website performs;",
              "understanding who our audience is, so that we can provide content most relevant to you;",
              "allowing third parties to provide services to our website; and",
              "helping us deliver interest-based advertising where appropriate in compliance with the applicable laws.",
            ].map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="font-bold">
                  <IoCheckmark />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold">The types of cookies we use</h2>
          <p className="text-gray-600 mt-2">
            We use different types of cookies on our website. Some of these
            cookies are placed by us, while others are placed by our third-party
            plug-ins, suppliers, or advertisers. These cookies may be deleted
            from your device at different times, such as at the end of your
            browsing session or after a preset amount of time, or they may
            persist until you delete them.
          </p>
          <p className="mt-4">
            We use the following types of cookies on our website:
          </p>
          <ul className="mt-4 space-y-4">
            {[
              {
                title: "Essential cookies",
                description:
                  "These are cookies that allow our website to perform its essential functions. Without these cookies, some parts of our websites would stop working.",
              },
              {
                title: "Site analytics cookies",
                description:
                  "These are cookies that monitor how our website is performing, and how you interact with it. We use them to know how best to improve our website or services.",
              },
              {
                title: "Functional cookies",
                description:
                  "These are cookies that remember who you are as a user of our website. We use them to remember any preferences you may have selected on our website, like saving your username and password, or settings.",
              },
              {
                title: "Advertising cookies",
                description:
                  "These are cookies that match your interests or web searches with applicable advertising campaigns on our website. We use them to provide you with advertising that we think you might find useful.",
              },
              {
                title: "Social media cookies",
                description:
                  "These are cookies that integrate with social media platforms. We use them to help you share content from our website to your chosen social media platform.",
              },
              {
                title: "Flash cookies",
                description:
                  "These are cookies that help your device read content supported by Adobe Flash. We use them to make sure that any Flash advertisements or videos appear properly on your device.",
              },
              {
                title: "Third party cookies",
                description:
                  "These are cookies that some of our business partners use on our website. We have no access to or control over them. Information collected by any of these cookies or widgets is governed by the privacy policy of the company that created it, and not by us.",
              },
            ].map((cookie, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="font-bold">
                  <IoCheckmark />
                </span>
                <span>
                  <strong>{cookie.title} –</strong> {cookie.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Our cookies</h2>
          <p className="text-gray-600 mt-2">
            You can see the cookies we use in the following table:
          </p>

          <div className="mt-4 overflow-hidden">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-3 text-left font-semibold text-gray-700 w-1/4">
                    Name
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700 w-1/4">
                    Type
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700 w-1/4">
                    Function
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700 w-1/4">
                    Expiry
                  </th>
                </tr>
              </thead>
              <tbody>
                {cookies.map((cookie, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 break-words">{cookie.name}</td>
                    <td className="p-3 break-words">{cookie.type}</td>
                    <td className="p-3 break-words">{cookie.function}</td>
                    <td className="p-3 break-words">
                      {cookie.expiry || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Deleting cookies</h2>
          <p className="text-gray-600 mt-2">
            Your internet browser generally accepts cookies automatically, but
            you can often change this setting to stop accepting them. You can
            also delete cookies manually. You can read how to do this at
            <a
              href="https://www.digitaltrends.com/computing/how-to-delete-cookies/"
              className="text-green-600 underline"
            >
               https://www.digitaltrends.com/computing/how-to-delete-cookies/.
            </a>
          </p>
          <p className="text-gray-600 mt-2">
            Deleting or no longer accepting cookies may prevent you from
            accessing certain aspects of our website where cookies are
            necessary, or cause the website to forget your preferences. Deleting
            cookies may not prevent you from seeing advertisements on our
            website, but such advertising may be less relevant to you.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
