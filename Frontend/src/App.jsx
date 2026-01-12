import Home from "./pages/unauthenticated/home";

function App() {
  return (
    <>
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          <h1>App</h1>
          <Home />
        </main>
      </div>
    </>
  );
}

export default App;
