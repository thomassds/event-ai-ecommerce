import Link from "next/link";

interface MenuItem {
  label: string;
  href: string;
  onClick: () => void;
}
export const RenderMenuItem = ({
  item,
  level = 0,
}: {
  item: MenuItem;
  level?: number;
}) => {
  const paddingLeft = level * 16;

  return (
    <li key={item.href}>
      <button
        onClick={item.onClick}
        className={`block py-3 px-4 text-neutral-700 hover:bg-brand-50 hover:text-brand-700 transition-colors duration-200 rounded-lg font-medium`}
        style={{ paddingLeft: `${16 + paddingLeft}px` }}
      >
        {item.label}
      </button>
    </li>
  );
};
