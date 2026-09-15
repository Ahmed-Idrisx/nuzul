import { assets } from "@/assets";
import Image from "next/image";

const ProfileBanner = () => {
  return (
    <div className="relative h-75 w-full overflow-hidden">
      <Image
        src={assets.exclusiveOfferCardImg3}
        alt="Profile Banner"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
};

export default ProfileBanner;
