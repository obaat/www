import NProgress from "nprogress"
import { Router } from "react-static"

export default function configureLoadingProgressBar() {
  Router.subscribe(loading => (loading ? NProgress.start() : NProgress.done()))
}
