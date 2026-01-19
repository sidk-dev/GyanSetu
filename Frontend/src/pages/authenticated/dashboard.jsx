import CreateSlot from "../../components/slot/createSlot";
import SlotFeed from "../../components/slot/slotFeed";

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col bg-bg min-h-screen ">
      <main className="flex-1 flex flex-col lg:flex-row items-start px-4 sm:px-6 lg:px-12 py-8 gap-8">
        <div className="lg:w-1/3 sticky top-20 self-start">
          <CreateSlot />
        </div>

        <div className="lg:w-2/3 flex-1 flex flex-col gap-4">
          <SlotFeed isProfile={false} />
        </div>
      </main>
    </div>
  );
}
