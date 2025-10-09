"use client";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { Input } from "./input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SearchInput = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/eventos?name=${inputValue}`);
      setInputValue("");
    }
  };

  return (
    <Input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={onKeyDown}
      iconLeft={
        <button
          type="submit"
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Buscar"
        >
          <MagnifyingGlassIcon className="text-primary" size={20} />
        </button>
      }
      iconRight={
        inputValue ? (
          <button
            onClick={() => setInputValue("")}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
            aria-label="Limpar busca"
          >
            <XIcon size={16} className="text-gray-400" />
          </button>
        ) : undefined
      }
      className="bg-white "
    />
  );
};
