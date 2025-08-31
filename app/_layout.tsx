import "./global.css";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
	return (
		<SafeAreaView className="flex-1 bg-neutral-700">
			<Stack screenOptions={{ headerShown: false }} />
		</SafeAreaView>
	);
}
