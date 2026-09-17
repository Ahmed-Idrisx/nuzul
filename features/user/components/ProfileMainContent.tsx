"use client";

import Spinner from "@/components/ui/Spinner";
import { useAppContext } from "@/context/AppContext";

import ProfileBanner from "@/features/user/components/ProfileBanner";
import ProfileForm from "@/features/user/components/ProfileForm";

export default function ProfileMainContent() {
  const { user, isLoading } = useAppContext();

  console.log("PROFILE:", { user, isLoading });

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <div className="p-10 text-center">No user found</div>;
  }

  return (
    <>
      <ProfileBanner />
      <ProfileForm initialUser={user} />
    </>
  );
}
