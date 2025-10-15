import { toggleMenu } from "@/store/slices/ui-slice";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppSelector } from "./use-app-selector";

export const useAppUi = () => {
  const dispatch = useAppDispatch();
  const { isMenuOpen } = useAppSelector((state) => state.ui);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return { isMenuOpen, handleToggleMenu };
};
