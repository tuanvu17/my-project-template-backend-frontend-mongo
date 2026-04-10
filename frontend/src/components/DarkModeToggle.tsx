//@ts-ignore
import nightwind from "nightwind/helper";
import { useDispatch, useSelector } from "react-redux";
import { selectMode, toggleMode } from "../store/slice";
import Icon from "./shared/Icon";

const DarkModeToggle = () => {
  const mode = useSelector(selectMode);
  const dispatch = useDispatch();

  const handleChangeDarkMode = () => {
    nightwind.toggle();
    dispatch(toggleMode());
  };

  return (
    <button
      onClick={handleChangeDarkMode}
      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle dark mode"
    >
      {mode === "dark" ? (
        <Icon name="light_mode" className="text-slate-900 dark:text-slate-100" />
      ) : (
        <Icon name="dark_mode" className="text-slate-900 dark:text-slate-100" />
      )}
    </button>
  );
};

export default DarkModeToggle;
