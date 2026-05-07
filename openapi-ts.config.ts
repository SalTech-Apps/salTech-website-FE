import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	input: "./openapi/openapi.json",
	output: {
		path: "./app/client",
		postProcess: ["prettier"],
	},
	plugins: [
		"@hey-api/schemas",
		"@hey-api/client-axios",
		{
			dates: true,
			name: "@hey-api/transformers",
		},
		{
			enums: "javascript",
			name: "@hey-api/typescript",
		},
		{
			name: "@hey-api/sdk",
			transformer: true,
		},
	],
});
