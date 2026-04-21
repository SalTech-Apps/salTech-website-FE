export type HealthStatus = {
  ok: true;
  uptimeSeconds: number;
};

export function getHealthStatus(): HealthStatus {
  return {
    ok: true,
    uptimeSeconds: Math.floor(process.uptime()),
  };
}
