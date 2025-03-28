"use client";
import { useEffect, useState } from "react";
import { getOrganization } from "@/services/getOrganization";
import { useStore } from "@/store/useStore";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Organization {
  id: string;
  name: string;
}

export default function OrganizationSelector() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const { setOrganizationId, setOrganizationName } = useStore();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const orgs = await getOrganization();
        setOrganizations(orgs || []);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSelection = async (org: Organization) => {
    setSelectedOrg(org);
    await setOrganizationId(org.id);
    await setOrganizationName(org.name);
    router.push("/stock");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="px-9 py-8 min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">
            Select Your Organization
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Choose an organization to continue to the dashboard
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-10 text-center"
          >
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent" />
            <p className="mt-4 text-gray-600">Loading organizations...</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {organizations.map((org) => (
                <motion.div
                  key={org.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className={`p-6 rounded-xl shadow-sm bg-white border-2 transition-all duration-300 ${
                    selectedOrg?.id === org.id
                      ? "border-green-500"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-4">{org.name}</h3>
                  <button
                    type="button"
                    onClick={() => handleSelection(org)}
                    className={`w-full py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                      selectedOrg?.id === org.id
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-green-500 text-white hover:bg-green-600 shadow hover:shadow-md"
                    }`}
                  >
                    {selectedOrg?.id === org.id
                      ? "Loading..."
                      : "Continue with this organization"}
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {organizations.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 text-center bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium mb-2 text-gray-700">
                  No Organizations Available
                </h3>
                <p className="text-gray-500">
                  Please contact your administrator to get access to an
                  organization.
                </p>
                <button
                  type="button"
                  className={`w-fit mt-4 py-3 px-4 bg-green-600 text-white shadow-md rounded-lg transition-all duration-300 font-medium`}
                >
                  <Link href="/create-organization">
                    Create an organization
                  </Link>
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
