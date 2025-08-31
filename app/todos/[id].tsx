import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { STORAGE_KEY } from "@/constants/key";
import type { TodoListItem } from "@/constants/types";

export default function TodoItem() {
	const [todo, setTodo] = useState<TodoListItem | undefined>();
	const { id } = useLocalSearchParams<{ id: string }>();
	useEffect(() => {
		(async () => {
			try {
				const todos = await AsyncStorage.getItem(STORAGE_KEY);
				if (todos) {
					const parsedTodos: TodoListItem[] = JSON.parse(todos);
					setTodo(parsedTodos.find((todo) => todo.id === Number(id)));
				} else {
					setTodo(undefined);
				}
			} catch (error) {
				console.error(`Failed to load todos from storage: ${error}`);
				setTodo(undefined);
			}
		})();
	}, [id]);

	const updateTodo = async (newTodo: TodoListItem) => {
		try {
			const todos = await AsyncStorage.getItem(STORAGE_KEY);
			if (!todos) {
				return;
			}
			const parsedTodos: TodoListItem[] = JSON.parse(todos);
			const newTodos = parsedTodos.map((todo) =>
				todo.id === newTodo.id ? newTodo : todo,
			);
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
		} catch (err) {
			console.error("Failed to save todos", err);
		}
	};
	return (
		<View className="flex-1 items-center justify-center gap-4 bg-neutral-800">
			{todo && (
				<View className="mb-4 w-full gap-2 rounded-lg bg-neutral-800 p-4">
					<View className="gap-1">
						<Text className="text-sm text-white/40">Title:</Text>
						<TextInput
							value={todo.title}
							onChangeText={(text) => {
								const updatedTodo = { ...todo, title: text };
								updateTodo(updatedTodo);
							}}
							className="border-white/20 border-b-2 py-1 font-bold text-lg text-white"
						/>
					</View>
					<View className="gap-1">
						<Text className="text-sm text-white/40">Description:</Text>
						<TextInput
							value={todo.description}
							onChangeText={(text) => {
								const updatedTodo = { ...todo, description: text };
								updateTodo(updatedTodo);
							}}
							className="border-white/20 border-b-2 font-bold text-white"
						/>
					</View>
					<Text className="text-green-400 text-sm">
						{todo.completed ? "Completed" : "Pending"}
					</Text>
					<Pressable
						onPress={() => {
							const updatedTodo = { ...todo, completed: !todo.completed };
							updateTodo(updatedTodo);
						}}
						className="mt-4 self-start rounded-full bg-green-500 px-4 py-2 text-white"
					>
						<Text className="text-sm">Toggle Completion</Text>
					</Pressable>

					<Link
						href={"/"}
						className="mt-10 items-center justify-center text-lg text-white"
					>
						<Text className="text-center text-lg text-white">Back to Home</Text>
					</Link>
				</View>
			)}
		</View>
	);
}
