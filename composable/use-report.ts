import { BASE_URL } from "~~/config/default"

/**
 * @description 页面预览上报
 * @param pageName 页面名称
 */
const report = (pageName: string) => {
  useFetch(`${BASE_URL}/view`, {
    method: "POST",
    body: {
      type: "web",
      page_name: pageName
    },
    key: "views"
  })
}

export default report