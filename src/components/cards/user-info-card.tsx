"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserCircleIcon,
  CaretDownIcon,
  GearIcon,
  TicketIcon,
  SignOutIcon,
} from "@phosphor-icons/react/ssr";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button, IconedButton } from "../buttons";
import { useAppAuth } from "@/hooks";

interface UserAccountDropdownProps {
  user: {
    name: string;
  };
}

function UserAccountDropdown({ user }: UserAccountDropdownProps) {
  const { signOut } = useAppAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsOpen(false);
    }
  }, [signOut]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, handleClickOutside, handleEscape]);

  const handleButtonKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          toggleDropdown();
          break;
        case "ArrowDown":
          event.preventDefault();
          setIsOpen(true);
          queueMicrotask(() => {
            const firstLink = dropdownRef.current?.querySelector("a");
            firstLink?.focus();
          });
          break;
      }
    },
    [toggleDropdown]
  );

  const handleDropdownKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const links = dropdownRef.current?.querySelectorAll("a");
      if (!links) return;

      const currentIndex = Array.from(links).indexOf(
        event.target as HTMLAnchorElement
      );

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          const nextIndex = (currentIndex + 1) % links.length;
          (links[nextIndex] as HTMLElement).focus();
          break;
        case "ArrowUp":
          event.preventDefault();
          const prevIndex = (currentIndex - 1 + links.length) % links.length;
          (links[prevIndex] as HTMLElement).focus();
          break;
        case "Tab":
          closeDropdown();
          break;
        case "Home":
          event.preventDefault();
          (links[0] as HTMLElement).focus();
          break;
        case "End":
          event.preventDefault();
          (links[links.length - 1] as HTMLElement).focus();
          break;
      }
    },
    [closeDropdown]
  );

  const menuItems = [
    {
      label: "Meus Dados",
      href: "/meus-dados",
      icon: <GearIcon size={18} aria-hidden="true" />,
    },
    {
      label: "Meus Ingressos",
      href: "/usuario/meus-ingressos",
      icon: <TicketIcon size={18} aria-hidden="true" />,
    },
    // Removido: Reembolsos deve aparecer apenas em Suporte e Contato
    {
      label: "Sair",
      href: "#",
      onClick: handleLogout,
      icon: <SignOutIcon size={18} aria-hidden="true" />,
    },
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {isOpen ? "Menu da conta aberto" : ""}
      </div>

      <button
        ref={buttonRef}
        type="button"
        className="flex items-center gap-3 text-white hover:text-gray-200 hover:bg-white/10 transition-all duration-200 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600 rounded-lg px-3 py-2 min-h-[44px] cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="user-dropdown"
        aria-label={`Menu da conta de ${user.name.split(" ")[0]}. ${
          isOpen ? "Aberto" : "Fechado"
        }. Pressione Enter ou Espaço para ${isOpen ? "fechar" : "abrir"}.`}
        id="user-account-button"
        onKeyDown={handleButtonKeyDown}
        onClick={toggleDropdown}
      >
        <UserCircleIcon size={30} aria-hidden="true" />
        <div className="flex flex-col items-start text-sm leading-tight">
          <span className="font-medium">Olá {user.name.split(" ")[0]}</span>
          <span className="text-xs opacity-90">Minha Conta</span>
        </div>
        <CaretDownIcon
          size={12}
          className={`transition-transform duration-200 motion-reduce:transition-none ml-1 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id="user-dropdown"
          className="absolute top-full mt-1 right-0 w-56 bg-white border border-gray-300 rounded-xl shadow-xl z-[9999] py-2 motion-reduce:transition-none"
          role="menu"
          aria-labelledby="user-account-button"
          onKeyDown={handleDropdownKeyDown}
        >
          {menuItems.map((item, index) => (
            <div key={item.onClick ? "#" : item.href} onClick={item?.onClick}>
              <Link
                href={item.href}
                role="menuitem"
                className="flex items-center justify-between text-sm text-neutral-700 hover:text-brand-700 hover:bg-brand-50 transition-colors duration-200 motion-reduce:transition-none py-3 px-4 focus:outline-none focus:bg-brand-100 focus:ring-2 focus:ring-brand-500 focus:ring-inset rounded-md mx-2"
                onClick={closeDropdown}
                tabIndex={0}
                aria-describedby={`menu-desc-${index}`}
              >
                <span className="font-normal">{item.label}</span>
                <span className="text-brand-700" aria-hidden="true">
                  {item.icon}
                </span>
                <span id={`menu-desc-${index}`} className="sr-only">
                  Navegar para {item.label}
                </span>
              </Link>
              {index < menuItems.length - 1 && (
                <div className="border-b border-gray-200" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function UserInfo() {
  const { user, isLoggedIn } = useAppAuth();
  const isLoading = false;

  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/auth");
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return (
      <IconedButton
        icon={<UserCircleIcon size={30} />}
        upperText="Faça login"
        lowerText="ou Cadastre-se"
        onClick={handleGoToLogin}
      />
    );
  }

  return <UserAccountDropdown user={user} />;
}

export function MobileUserInfoCard() {
  const { isLoggedIn, user, isLoading, signOut } = useAppAuth();

  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGoToLogin = () => {
    router.push("/auth");
  };

  const handleLogout = async () => {
    try {
      signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleMenuItemClick = () => {
    if (!isLoggedIn) router.push("/auth");
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
        <div className="flex flex-col gap-1">
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return (
      <Button
        type="button"
        variant="ghost"
        onClick={handleGoToLogin}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">Faça Login</span>
          <span className="text-xs text-gray-500">ou Cadastre-se</span>
        </div>
      </Button>
    );
  }

  const nameInitials = user.name
    .split(" ")
    .filter(Boolean)
    .reduce((acc, curr, idx, arr) => {
      if (idx === 0 || idx === arr.length - 1) {
        acc.push(curr[0]);
      }
      return acc;
    }, [] as string[])
    .join("")
    .toUpperCase();

  const mobileMenuItems = [
    {
      label: "Meus Dados",
      href: "/meus-dados",
      icon: <GearIcon size={18} aria-hidden="true" />,
    },
    {
      label: "Meus Ingressos",
      href: "/usuario/meus-ingressos",
      icon: <TicketIcon size={18} aria-hidden="true" />,
    },
  ];

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#5400D6] rounded-full flex items-center justify-center text-white font-semibold">
            {nameInitials}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              Olá {user.name.split(" ")[0]}
            </span>
            <span className="text-xs text-gray-500">Minha Conta</span>
          </div>
        </div>
        <CaretDownIcon
          size={16}
          className={`transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isExpanded && (
        <div className="ml-4 space-y-1">
          {mobileMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleMenuItemClick}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700">{item.label}</span>
              <span className="text-[#5400D6]" aria-hidden="true">
                {item.icon}
              </span>
            </Link>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left cursor-pointer"
          >
            <span className="text-sm text-gray-700">Sair</span>
            <span className="text-[#5400D6]" aria-hidden="true">
              <SignOutIcon size={18} aria-hidden="true" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
