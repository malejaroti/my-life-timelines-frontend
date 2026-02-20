import { Outlet } from "react-router";
function PageContainer() {
  return (
    <div className="px-10 py-5">
        <Outlet />
    </div>
  )
}

export default PageContainer