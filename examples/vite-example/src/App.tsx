import {
  getMovistarSkin,
  ThemeConfig,
  ThemeContextProvider,
} from "@telefonica/mistica";
import { Main } from "./atomic/page";
import { useMemo } from "react";

export const App = () => {
  const themeConfig: ThemeConfig = useMemo(
    () => ({
      skin: getMovistarSkin(),
      i18n: { locale: "pt-BR", phoneNumberFormattingRegionCode: "BR" },
      colorScheme: "light",
    }),
    []
  );
  return (
    <ThemeContextProvider theme={themeConfig}>
      <Main />
    </ThemeContextProvider>
  );
};
