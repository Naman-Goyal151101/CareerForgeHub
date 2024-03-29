/* eslint-disable @next/next/no-img-element */
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import Logout from "./Logout";
import AddSkills from "./addSkills";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "#/", current: true },
  { name: "Courses", href: "#courses", current: false },
  { name: "Mentor", href: "#mentor", current: false },
  { name: "Group", href: "/", current: false },
  { name: "Testimonial", href: "#testimonial", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CustomLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} passHref>
      <span onClick={onClick} className="px-3 py-4 text-lg font-normal">
        {children}
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [currentLink, setCurrentLink] = useState("/");

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const setLoggedInStatus = (value: boolean) => {
    setIsUserLoggedIn(value);
  };

  const handleLinkClick = (href: string) => {
    setCurrentLink(href);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // The user is logged in. Proceed accordingly.
      setIsUserLoggedIn(true);
    } else {
      // The user is not logged in.
      setIsUserLoggedIn(false);
    }
  }, []);


  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="relative flex h-12 md:h-20 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}

              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-12 w-40 lg:hidden"
                  src={"/assets/logo/logo.svg"}
                  alt="dsign-logo"
                />
                <img
                  className="hidden h-full w-full lg:block"
                  src={"/assets/logo/logo.svg"}
                  alt="dsign-logo"
                />
              </div>

              {/* LINKS */}

              <div className="hidden lg:block m-auto">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <CustomLink
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                    >
                      <span
                        className={classNames(
                          item.href === currentLink
                            ? "underline-links"
                            : "text-slategray",
                          "px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100"
                        )}
                        aria-current={item.href ? "page" : undefined}
                      >
                        {item.name}
                      </span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            </div>
            {!isUserLoggedIn ? (
              <>
                {/* SIGNIN DIALOG */}

                <Signdialog
                  setLoggedInStatus={setLoggedInStatus}
                  isUserLoggedIn={isUserLoggedIn}
                />

                {/* REGISTER DIALOG */}

                <Registerdialog
                  setLoggedInStatus={setLoggedInStatus}
                  isUserLoggedIn={isUserLoggedIn}
                />
              </>
            ) : (
              <>
                <Logout />
                <AddSkills />
              </>
            )}

            {/* DRAWER FOR MOBILE VIEW */}

            {/* DRAWER ICON */}

            <div className="block lg:hidden">
              <Bars3Icon
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            {/* DRAWER LINKS DATA */}

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
