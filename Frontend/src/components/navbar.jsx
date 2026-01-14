import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowRightCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

const navigationMenu = [{ name: "Login", href: "/login" }];

const primaryBtnClass =
  "flex items-center gap-2 rounded bg-accent px-4 py-2 font-semibold text-primary-dark border border-accent-light/80 cursor-pointer transition data-hover:bg-accent-dark data-hover:text-neutral-dark";

const menuBtnClass =
  "bg-accent text-primary-dark rounded-md px-4 py-2 text-sm text-center font-medium transition-all duration-200 cursor-pointer";

const popoverButtonClass =
  "text-left rounded-md px-3 py-2 hover:bg-accent-light transition";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-40 bg-primary-dark/40 text-neutral-light backdrop-blur-md shadow-2xs transition-all duration-300"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-secondary hover:bg-accent/10 hover:text-accent-light transition cursor-pointer">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="size-6 text-accent group-data-[open]:hidden" />
              <XMarkIcon className="hidden size-6 text-accent group-data-[open]:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            {/* Logo */}
            <div className="flex shrink-0 items-center space-x-2">
              <Link to="/">
                <img src={Logo} alt="GyanSetu Logo" className="h-10 w-auto" />
              </Link>
              <Link
                to="/"
                className="text-accent text-lg font-semibold tracking-wide"
              >
                GyanSetu
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:ml-10 sm:block">
              <div className="flex items-center space-x-4">
                {!isAuthenticated ? (
                  <>
                    {navigationMenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={
                          location.pathname === item.href ? "page" : undefined
                        }
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-accent text-primary-dark"
                            : "hover:bg-accent/20 hover:text-accent-light",
                          "rounded-md px-4 py-2 text-sm font-medium transition"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <div className="w-0.5 h-8 bg-primary" />

                    <Link to="/register">
                      <Button className={primaryBtnClass}>
                        Register
                        <ArrowRightCircleIcon className="size-6" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Popover className="relative">
                    {({ close }) => (
                      <>
                        <PopoverButton
                          className="
                            inline-flex items-center justify-center
                            rounded-md border border-gray-700
                            bg-gray-900 text-accent
                            p-2
                            hover:bg-gray-800 active:bg-gray-700
                            focus:outline-none focus:ring-2 focus:ring-accent
                            focus:ring-offset-2 focus:ring-offset-gray-900
                            transition
                          "
                        >
                          <Bars3Icon className="h-5 w-5" />
                        </PopoverButton>

                        <PopoverPanel
                          anchor="bottom"
                          className="
                            z-50 mt-3 w-48 rounded-lg
                            border border-gray-700 bg-gray-900
                            shadow-xl shadow-black/30
                            flex flex-col gap-1 p-1
                            origin-top-right
                            transition
                            data-[enter]:animate-in data-[leave]:animate-out
                            data-[enter]:fade-in data-[leave]:fade-out
                            data-[enter]:zoom-in-95 data-[leave]:zoom-out-95
                          "
                        >
                          <Button
                            onClick={() => {
                              close();
                              logout();
                            }}
                            className={`${menuBtnClass} ${popoverButtonClass}`}
                          >
                            Logout
                          </Button>

                          <Button
                            onClick={() => {
                              close();
                              navigate("/change-password");
                            }}
                            className={`${menuBtnClass} ${popoverButtonClass}`}
                          >
                            Change Password
                          </Button>

                          <Button
                            onClick={() => {
                              close();
                              navigate("/profile");
                            }}
                            className={`${menuBtnClass} ${popoverButtonClass}`}
                          >
                            Profile
                          </Button>
                        </PopoverPanel>
                      </>
                    )}
                  </Popover>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden border-t border-accent-dark/30">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {!isAuthenticated ? (
            <>
              {navigationMenu.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-accent text-primary-dark"
                      : "hover:bg-accent/20 hover:text-accent-light",
                    "block rounded-md px-4 py-2 text-base font-medium transition cursor-pointer"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}

              <Link to="/register">
                <Button className={primaryBtnClass}>
                  Register
                  <ArrowRightCircleIcon className="size-6" />
                </Button>
              </Link>
            </>
          ) : (
            <Button onClick={logout} className={menuBtnClass}>
              Logout
            </Button>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
