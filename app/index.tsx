import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STORAGE_KEY = "@todos";
type TodoListItem = {
	id: number;
	title: string;
	description: string;
	completed: boolean;
};
export default function Index() {
	const [todos, setTodos] = useState<TodoListItem[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const todos = await AsyncStorage.getItem(STORAGE_KEY);
				if (todos) {
					setTodos(JSON.parse(todos));
				} else {
					setTodos([
						{
							id: 1,
							title: "Sample todo",
							description: "This is a sample todo",
							completed: false,
						},
					]);
				}
			} catch (error) {
				console.error(`Failed to load todos from storage: ${error}`);
			}
		})();
	}, []);

	const updateTodos = async (newTodos: TodoListItem[]) => {
		setTodos(newTodos);
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
		} catch (err) {
			console.error("Failed to save todos", err);
		}
	};
	return (
		<SafeAreaView className="h-full w-full gap-4 bg-neutral-700 px-2">
			<Pressable
				onPress={() => {
					const newTodo = {
						id: todos.length + 1,
						title: "",
						description: "",
						completed: false,
					};
					const newTodos = [...todos, newTodo];
					updateTodos(newTodos);
				}}
				className="mt-4 flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-white"
			>
				<Text className="font-bold text-lg text-white">New Todo</Text>
			</Pressable>
			<FlatList
				data={todos}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View className="mb-4 gap-2 rounded-lg bg-neutral-800 p-4">
						<View className="gap-1">
							<Text className="text-sm text-white/40">Title:</Text>
							<TextInput
								value={item.title}
								onChangeText={(text) => {
									const updated = todos.map((todo) =>
										todo.id === item.id ? { ...todo, title: text } : todo,
									);
									updateTodos(updated);
								}}
								className="border-white/20 border-b-2 py-1 font-bold text-lg text-white"
							/>
						</View>
						<View className="gap-1">
							<Text className="text-sm text-white/40">Description:</Text>
							<TextInput
								value={item.description}
								onChangeText={(text) => {
									const updated = todos.map((todo) =>
										todo.id === item.id ? { ...todo, description: text } : todo,
									);
									updateTodos(updated);
								}}
								className="border-white/20 border-b-2 font-bold text-white"
							/>
						</View>
						<Text className="text-green-400 text-sm">
							{item.completed ? "Completed" : "Pending"}
						</Text>
						<Pressable
							onPress={() => {
								const updated = todos.map((todo) =>
									todo.id === item.id
										? { ...todo, completed: !todo.completed }
										: todo,
								);
								updateTodos(updated);
							}}
							className="mt-4 self-start rounded-full bg-green-500 px-4 py-2 text-white"
						>
							<Text className="text-sm">Toggle Completion</Text>
						</Pressable>
					</View>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
}
