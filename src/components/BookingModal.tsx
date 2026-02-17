"use client";

import { useEffect } from "react";
import { Portal } from "@/components/Portal";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  bookingUrl: string;
}

export function BookingModal({ open, onClose, bookingUrl }: BookingModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal */}
        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/85 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Book an Appointment
              </h3>
              <p className="mt-1 text-sm text-white/70">
                You’ll be redirected to Booksy (Farmington Hills).
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/10 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mt-6">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full inline-flex items-center justify-between rounded-xl bg-[#4f8dff] px-5 py-4 font-semibold text-white hover:bg-[#3f7df5] transition-colors"
            >
              Open Booksy <span className="text-white/90">→</span>
            </a>
          </div>
        </div>
      </div>
    </Portal>
  );
}
