import {
  Avatar,
  Badge,
  IconShoppingCartRegular,
  MainNavigationBar,
  NavigationBarAction,
  NavigationBarActionGroup,
  Placeholder,
} from "@telefonica/mistica";
import { useState } from "react";

export default {
  title: "Components/Headers/Header",
  parameters: {
    fullScreen: true,
  },
};

export const Header = () => {
  const INITIAL_INDEX = 0;
  const [selectedIndex, setSelectedIndex] = useState(INITIAL_INDEX);
  return (
    <>
      <MainNavigationBar
        withBorder={true}
        burgerMenuExtra={<Placeholder />}
        sections={["Main"].map((title, idx) => ({
          title,
          onPress: () => setSelectedIndex(idx),
        }))}
        selectedIndex={selectedIndex}
        right={
          <NavigationBarActionGroup>
            <NavigationBarAction
              onPress={() => {}}
              aria-label="shopping cart with 2 items"
            >
              <Badge value={2}>
                <IconShoppingCartRegular color="currentColor" />
              </Badge>
            </NavigationBarAction>
            <NavigationBarAction onPress={() => {}} aria-label="Open profile">
              <Avatar
                src={
                  "https://mistica-web.vercel.app/static/media/avatar.cb2db2e6.jpg"
                }
                size={36}
                initials="ML"
              />
            </NavigationBarAction>
          </NavigationBarActionGroup>
        }
      />
    </>
  );
};
