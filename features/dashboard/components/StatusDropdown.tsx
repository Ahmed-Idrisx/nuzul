"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookingStatus } from "@/features/user/types/user.types";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { bookingStatuses } from "@/constant/site";

const statusClasses: Record<BookingStatus, string> = {
  PENDING: "border-amber-200 bg-amber-100 text-amber-700",
  PAID: "border-emerald-200 bg-emerald-100 text-emerald-700",
  CANCELLED: "border-rose-200 bg-rose-100 text-rose-700",
};

export default function StatusDropdown({
  status,
  disabled,
  label,
  onChange,
}: {
  status: BookingStatus;
  disabled: boolean;
  label: string;
  onChange: (status: BookingStatus) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();

    setMenuPosition({
      top: buttonRect.bottom + 8,
      left: Math.max(8, buttonRect.right - 144),
    });
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        if (menuRef.current?.contains(event.target as Node)) return;
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={toggleDropdown}
        className={`inline-flex cursor-pointer min-w-28 items-center justify-between gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold outline-none transition focus:ring-2 focus:ring-primary/30 disabled:cursor-wait disabled:opacity-60 ${statusClasses[status]}`}
      >
        {status}
        <FiChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            role="listbox"
            aria-label={label}
            style={{ top: menuPosition.top, left: menuPosition.left }}
            className="fixed z-100 min-w-36 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
          >
            {bookingStatuses.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === status}
                onClick={() => {
                  setIsOpen(false);
                  if (option !== status) onChange(option);
                }}
                className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-xs font-semibold ${statusClasses[option]}`}
              >
                {option}
                {option === status && <FiCheck size={14} />}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
