export function toArray(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.map((item) => String(item).trim()).filter(Boolean);
	}
	if (typeof value === "string") {
		return value
			.split("\n")
			.map((item) => item.trim())
			.filter(Boolean);
	}
	return [];
}

export function toOptionalNumber(value: unknown): number | undefined {
	if (value === null || value === undefined || value === "") return undefined;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : undefined;
}

export function getParamId(idParam: string | string[] | undefined): string {
	if (Array.isArray(idParam)) {
		return idParam[0] ?? "";
	}
	return idParam ?? "";
}
