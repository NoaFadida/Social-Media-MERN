import { create } from "apisauce";
const apiClient = create({
  baseURL: "http://10.0.0.102:3000",
  headers: { Accept: "application/vnd.github.v3+json" },
});
export default apiClient;
