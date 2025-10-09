import CustomHeader from "@/components/Utilities/CustomHeader";
import { Stack } from "expo-router";

export default function ExploreLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="details-now" options={{ title: "Details" }} />
      <Stack.Screen
        name="new-plan"
        // component={Details} // your component
        options={{
          header: () => <CustomHeader />, // set height here
        }}
      />
      <Stack.Screen
        name="new-purchase-plans/schemeName/[sno]"
        // component={SchemeName}
        options={{
          header: () => <CustomHeader />,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="new-purchase-plans/join-purchase-plan"
        // component={SchemeName}
        options={{
          header: () => <CustomHeader />,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="edit-profile"
        // component={Details} // your component
        // options={{
        //   header: () => <CustomHeader />, // set height here
        // }}
      />
    </Stack>
  );
}
