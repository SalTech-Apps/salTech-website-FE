import {
	getApiDashboard,
	type LoginRequest,
	type LoginResponseData,
} from "@/client";
import { loginWithPassword } from "./auth";

export type AdminLoginPayload = LoginRequest;
export type AdminLoginResult = {
	message: string;
	data: LoginResponseData;
};

export const login = async (
	data: AdminLoginPayload,
): Promise<AdminLoginResult> => {
	const res = await loginWithPassword(data);

	return {
		message: "Login successful",
		data: res,
	};
};

export const getStats = async () => {
	const { data } = await getApiDashboard({ throwOnError: true });
	const overview = data.data;

	return {
		totalJobs: overview.totalJobs,
		activeJobs: overview.activeJobs,
		totalApplicants: overview.totalApplicants,
		newThisWeek: overview.newThisWeek,
		recentApplications: overview.recentApplications || [],
	};
};
