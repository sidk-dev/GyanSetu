import CreateSlot from "../../components/slot/createSlot";
import SlotFeed from "../../components/slot/slotFeed";

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 flex flex-col lg:flex-row items-start px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <div className="lg:w-1/3 sticky top-18 self-start">
          <CreateSlot />
        </div>

        <div className="lg:w-2/3 flex-1 border rounded-lg shadow-sm p-6">
          <SlotFeed isProfile={false} />
        </div>
      </main>
    </div>
  );
}
