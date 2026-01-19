import { Button } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { bookSlot, deleteSlot } from "../../api/auth_api";

function SlotCard({ slot, userId = null, isProfile = false }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const booked = !!slot.for_user;

  const bookingMutation = useMutation({
    mutationFn: () => bookSlot(slot.id),
    onSuccess: () => queryClient.invalidateQueries(["slots"]),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteSlot(slot.id),
    onMutate: async () => {
      await queryClient.cancelQueries(["slots"]);
      const previousData = queryClient.getQueryData(["slots"]);

      queryClient.setQueryData(["slots"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            results: page.results.filter((s) => s.id !== slot.id),
          })),
        };
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["slots"], context.previousData);
      }
    },
    onSettled: () => queryClient.invalidateQueries(["slots"]),
  });

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  const formatTime = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date));

  const formatPostedAt = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date));

  const startDate = formatDate(slot.start_time);
  const endDate = formatDate(slot.end_time);
  const startTime = formatTime(slot.start_time);
  const endTime = formatTime(slot.end_time);
  const isSameDay = startDate === endDate;

  return (
    <div className="mb-5 rounded-xl border border-primary-dark bg-secondary backdrop-blur p-6 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl ">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold text-neutral-light tracking-tight">
            {slot.skill_text}
          </h3>

          {isProfile ? (
            <p className="text-sm text-neutral-medium mt-0.5">
              {slot.user.first_name} {slot.user.last_name}
            </p>
          ) : (
            <button
              onClick={() => navigate(`/profile?id=${slot.user.id}`)}
              className="text-sm text-accent hover:text-accent-light transition"
            >
              {slot.user.first_name} {slot.user.last_name}
            </button>
          )}
        </div>

        <span className="text-xs text-neutral-medium whitespace-nowrap">
          Posted {formatPostedAt(slot.created_at)}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-neutral-light">
        {slot.description}
      </p>

      <div className="mt-6 pt-4 border-t border-primary-dark flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-neutral-medium">
          <span className="text-base">🕒</span>
          <span>
            {isSameDay
              ? `${startDate} · ${startTime} – ${endTime}`
              : `${startDate} ${startTime} → ${endDate} ${endTime}`}
          </span>
        </div>

        <div>
          {isProfile ? (
            !userId && (
              <Button
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isLoading}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition
                bg-error text-white hover:opacity-90
                ${deleteMutation.isLoading ? "opacity-60 cursor-wait" : ""}`}
              >
                {deleteMutation.isLoading ? "Deleting..." : "Delete"}
              </Button>
            )
          ) : (
            <Button
              onClick={() => bookingMutation.mutate()}
              disabled={booked || bookingMutation.isLoading}
              className={`rounded-lg px-5 py-2 text-sm font-medium transition-all
              ${
                booked
                  ? "bg-success text-white cursor-not-allowed"
                  : "bg-accent text-neutral-dark hover:bg-accent-light"
              }
              ${bookingMutation.isLoading ? "opacity-60 cursor-wait" : ""}`}
            >
              {booked
                ? "Booked"
                : bookingMutation.isLoading
                  ? "Booking..."
                  : "Book Slot"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SlotCard;
