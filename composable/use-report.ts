import { BASE_URL } from "~~/config/default";

/**
 * @description 页面预览上报
 * @param pageName 页面名称
 */
const report = (pageName: string) => {
  const clientWidth = sessionStorage.getItem("clientWidth");
  const isWeb = (clientWidth && Number(clientWidth) >= 994) || false;
  useFetch(`${BASE_URL}/view`, {
    method: "POST",
    body: {
      type: isWeb ? "web" : "h5",
      page_name: pageName,
    },
    key: `${pageName}-${Date.now()}`,
  });
};

export default report;
