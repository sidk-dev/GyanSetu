import { useLocation } from "react-router";

export default function Footer() {
  const location = useLocation();

  let isChatPath = location.pathname == "/chat";

  return (
    <footer
      className={isChatPath ? "hidden" : "bg-primary-dark text-neutral-light"}
    >
      <div className="mx-auto max-w-7xl py-3 flex flex-col sm:flex-row justify-center items-center text-sm text-gray-300">
        © 2026 GyanSetu. All rights reserved.
      </div>
    </footer>
  );
}
