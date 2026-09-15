"use client";

import { ChangeEvent, RefObject } from "react";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";

type ProfileAvatarProps = {
  imageSrc: string | null;
  firstName: string;
  lastName: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ProfileAvatar = ({
  imageSrc,
  firstName,
  lastName,
  fileInputRef,
  onChange,
}: ProfileAvatarProps) => {
  return (
    <div className="flex justify-center bg-neutral-100">
      <div className="relative -mt-17.5 h-35 w-35 shrink-0 rounded-full ring-4 ring-neutral-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Profile picture"
            fill
            sizes="140px"
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-200 text-2xl font-bold text-neutral-500">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Change profile picture"
          className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90"
        >
          <FiEdit2 size={16} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfileAvatar;
