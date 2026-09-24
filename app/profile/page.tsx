import type { Metadata } from "next";

import ProfileMainContent from "@/features/user/components/ProfileMainContent";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your Nuzul profile and account details.",
};

export default function Profile() {
  return <ProfileMainContent />;
}
