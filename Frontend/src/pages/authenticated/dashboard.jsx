import CreateSlot from "../../components/slot/createSlot";
import SlotFeed from "../../components/slot/slotFeed";

const layoutClassName =
  "relative flex-1 flex flex-col lg:flex-row items-start px-4 sm:px-6 lg:px-10 py-5 sm:py-8 gap-5 sm:gap-7";
const createSlotPanelClassName =
  "w-full lg:w-1/3 lg:sticky lg:top-20 lg:self-start";
const feedPanelClassName = "w-full lg:w-2/3 min-w-0 flex-1 flex flex-col gap-5";

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col bg-bg min-h-screen">
      <main className={layoutClassName}>
        <section
          className={`${createSlotPanelClassName} rounded-2xl border border-primary-dark/70 bg-secondary/85 p-2 sm:p-3 shadow-xl backdrop-blur-sm`}
          aria-label="Create slot"
        >
          <CreateSlot />
        </section>

        <section
          className={`${feedPanelClassName} rounded-2xl border border-primary-dark/70 bg-secondary/70 p-2 sm:p-3 shadow-xl backdrop-blur-sm`}
          aria-label="Slot feed"
        >
          <SlotFeed isProfile={false} />
        </section>
      </main>
    </div>
  );
}
