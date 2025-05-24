import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";

import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "./store/store";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
    // <ThemeProvider value={DefaultTheme}>
    //   <Stack>
    //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="login" />
    //     <Stack.Screen name="location/[id]" />
    //     <Stack.Screen name="+not-found" />
    //   </Stack>

    //   <StatusBar style="auto" />
    // </ThemeProvider>
  );
}
