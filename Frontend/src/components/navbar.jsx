import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  ArrowRightCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";
import Logo from "../assets/logo.png";

const navigation = [{ name: "Login", href: "/login" }];

function CustomButton({ children }) {
  return (
    <Button className="flex gap-2 rounded bg-accent px-4 py-2 font-semibold text-primary-dark data-hover:bg-accent-dark data-hover:text-neutral-dark border border-accent-light/80 cursor-pointer">
      {children}
      <ArrowRightCircleIcon className="size-6" />
    </Button>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const location = useLocation();

  let hideLoginNav = location.pathname == "/dashboard";

  return (
    <Disclosure
      as="nav"
      className="
        sticky top-0 z-999
        bg-primary-dark/40 text-neutral-light
        backdrop-blur-md
        shadow-2xs transition-all duration-300
      "
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div
            className={
              hideLoginNav
                ? "hidden"
                : "absolute inset-y-0 left-0 flex items-center sm:hidden"
            }
          >
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-secondary hover:bg-accent/10 hover:text-accent-light transition">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block text-accent size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden text-accent size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            {/* Logo and Company Name */}
            <div className="flex shrink-0 items-center space-x-2">
              <Link to={"/"}>
                <img alt="GyanSetu Logo" src={Logo} className="h-10 w-auto" />
              </Link>
              <Link to={"/"}>
                <span className="text-accent text-lg font-semibold tracking-wide">
                  GyanSetu
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div
              className={hideLoginNav ? "hidden" : "hidden sm:ml-10 sm:block"}
            >
              <div className="flex items-center space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={
                      location.pathname == item.href ? "page" : undefined
                    }
                    className={classNames(
                      location.pathname == item.href
                        ? "bg-accent text-primary-dark"
                        : "text-secondary dark:text-neutral-light hover:bg-accent/20 hover:text-accent-light",
                      "rounded-md px-4 py-2 text-sm text-center font-medium transition-all duration-200"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="w-0.5 bg-primary h-8"></div>
                <Link to={"/register"}>
                  <CustomButton>Register</CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel
        className={
          hideLoginNav ? "hidden" : "sm:hidden border-t border-accent-dark/30"
        }
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={location.pathname == item.href ? "page" : undefined}
              className={classNames(
                location.pathname == item.href
                  ? "bg-accent text-primary-dark"
                  : "text-neutral-light hover:bg-accent/20 hover:text-accent-light",
                "block rounded-md px-4 py-2 text-base font-medium transition-all duration-150"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          <Link to={"/register"}>
            <CustomButton>Register</CustomButton>
          </Link>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
