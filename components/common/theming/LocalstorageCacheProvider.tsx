import {FC, useLayoutEffect} from "react";
import {CHANGE_THEME_MODE, DARKMODE_COOKIE_KEY} from "../../../store/types/themes";
import {useDispatch} from "react-redux";

export const LocalstorageCacheProvider: FC = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const darkMode = localStorage.getItem(DARKMODE_COOKIE_KEY)
    dispatch({
      type: CHANGE_THEME_MODE,
      payload: darkMode
    })
  }, [dispatch])

  return null
}