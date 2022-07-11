import Portal from '../layouts/portal'
import CustomerInfoPortal from '../layouts/portal/customer-info-portal'
import DeviceDashboardPortal from '../layouts/portal/device-dashboard-portal'
import DevicePortal from '../layouts/portal/device-portal'
import { Route} from "react-router-dom";

const routes = [
    {
        name: "Portal",
        key: "portal",
        icon: 'ni ni-tv-2 text-primary',
        route: "/portal",
        component: <Portal />,
    },
    {
        name: "Customer Info",
        key: "customer-info",
        icon: 'ni ni-tv-2 text-primary',
        route: "/customer-info",
        component: <CustomerInfoPortal />,
    },
    {
        name: "Device Overview",
        key: "device-overview",
        icon: 'ni ni-tv-2 text-primary',
        route: "/device-overview",
        component: <DeviceDashboardPortal />,
    },
    {
        name: "Device",
        key: "device",
        icon: 'ni ni-tv-2 text-primary',
        route: "/device",
        component: <DevicePortal />,
    }
]

export default routes;

export const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        return <Route path={route.route} element={route.component} key={route.key} />;
      }
      return null;
});