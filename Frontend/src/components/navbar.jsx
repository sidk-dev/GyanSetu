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
                    <PopoverButton className="rounded-md border border-accent text-accent px-4 py-2 cursor-pointer">
                      <Bars3Icon className="h-4 w-4" />
                    </PopoverButton>

                    <PopoverPanel
                      anchor="bottom"
                      className="mt-3 flex flex-col gap-1"
                    >
                      <Button onClick={logout} className={menuBtnClass}>
                        Logout
                      </Button>
                      <Button
                        onClick={() => navigate("/change-password")}
                        className={menuBtnClass}
                      >
                        Change Password
                      </Button>
                      <Button
                        onClick={() => navigate("/profile")}
                        className={menuBtnClass}
                      >
                        Profile
                      </Button>
                    </PopoverPanel>
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
