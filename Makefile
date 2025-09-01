.PHONY: dev reverse

# Set up adb reverse tunnels
reverse:
	adb reverse tcp:8081 tcp:8081
	adb reverse tcp:19000 tcp:19000
	adb reverse tcp:19001 tcp:19001
	@echo "✅ ADB reverse tunnels ready"

# Run Expo dev server
dev: reverse
	npx expo start --dev-client --host localhost
