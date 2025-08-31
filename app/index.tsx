import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
	const [count, setCount] = useState(0);
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				backgroundColor: "black",
				alignItems: "center",
			}}
		>
			<Text className="text-white">
				Edit ee app/index.tsx to edit this screen.
			</Text>
			<Button
				onPress={() => setCount((count) => count + 1)}
				title={`count is ${count}`}
			/>
		</View>
	);
}
