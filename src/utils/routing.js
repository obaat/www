import NProgress from "nprogress"
import { onLoading } from "react-static"

export default function configureLoadingProgressBar() {
  onLoading(loading => (loading ? NProgress.start() : NProgress.done()))
}
