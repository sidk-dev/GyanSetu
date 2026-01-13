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
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
    },
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
    onSettled: () => {
      queryClient.invalidateQueries(["slots"]);
    },
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
    <div className="mb-4 p-5 border rounded-lg shadow-sm h-auto sticky">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg">{slot.skill_text}</h3>
          {isProfile ? (
            <span className="text-sm text-gray-500 cursor-default">
              {slot.user.first_name} {slot.user.last_name}
            </span>
          ) : (
            <button
              onClick={() => navigate(`/profile?id=${slot.user.id}`)}
              className="text-sm text-cyan-600 hover:underline"
            >
              {slot.user.first_name} {slot.user.last_name}
            </button>
          )}
        </div>
        <span className="text-xs text-gray-200">
          Posted on {formatPostedAt(slot.created_at)}
        </span>
      </div>

      <p className="text-gray-200 mb-4">{slot.description}</p>

      <div className="text-sm text-gray-200 mb-4">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>
            {isSameDay
              ? `${startDate} · ${startTime} – ${endTime}`
              : `${startDate} ${startTime} → ${endDate} ${endTime}`}
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        {isProfile ? (
          !userId && (
            <Button
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isLoading}
              className={`px-4 py-2 rounded-lg font-medium transition
              bg-red-500 text-white hover:bg-red-600
              ${deleteMutation.isLoading ? "opacity-60 cursor-wait" : ""}`}
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </Button>
          )
        ) : (
          <Button
            onClick={() => bookingMutation.mutate()}
            disabled={booked || bookingMutation.isLoading}
            className={`px-4 py-2 rounded-lg font-medium transition
              ${
                booked
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
              ${bookingMutation.isLoading ? "opacity-60 cursor-wait" : ""}`}
          >
            {booked
              ? "Booked ✅"
              : bookingMutation.isLoading
              ? "Booking..."
              : "Book"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default SlotCard;
