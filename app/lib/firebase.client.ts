type CallableResult<T> = { data: T };

const app: Record<string, never> = {};

export const auth: Record<string, never> = {};
export const db: Record<string, never> = {};
export const storage: Record<string, never> = {};
export const functions: Record<string, never> = {};

export function httpsCallable<TData = Record<string, never>>(
	_functions: unknown,
	_name: string,
) {
	return async (_payload?: unknown): Promise<CallableResult<TData>> => {
		return { data: {} as TData };
	};
}

export default app;
