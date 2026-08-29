/** @format */

export function getClientName(clients, clientId) {
  const client = clients?.find((c) => c.id === clientId);
  return client?.full_name || "N/A";
}

export function getDeveloperName(developers, developerId) {
  const dev = developers?.find((d) => d.id === developerId);
  return dev?.full_name || "Unassigned";
}
