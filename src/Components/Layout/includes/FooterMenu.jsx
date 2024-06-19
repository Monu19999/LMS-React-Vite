import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function FooterMenu() {
    const bottom_menus = useSelector((state) => state.app.data.bottom_menus);

    function createLink(item) {
        if (item.menu_type == 1) {
            return item.page ? "page/" + item.page.slug : "/";
        } else if (item.menu_type == 2) {
            return item.db_controller_route
                ? item.db_controller_route.route
                : "/";
        } else if (item.menu_type == 3) {
            return item.custom_url;
        } else {
            return "#";
        }
    }
    function loopMenuObj(menus) {
        return Object.values(menus).map((menu) => {
            return (
                <Link
                    to={createLink(menu)}
                    key={menu.id}
                    className="btn btn-link"
                >
                    {menu.title_en}
                </Link>
            );
        });
    }
    function RenderMenus() {
        return (
            <div className="col-lg-12 col-md-12 text-center">
                {bottom_menus && loopMenuObj(bottom_menus)}
            </div>
        );
    }
    return (
        <div
            className="container-fluid py-3"
            style={{
                backgroundColor: "#1e233d",
                borderBottom: "1px solid rgba(256, 256, 256, .1)",
            }}
        >
            <div className="row g-5 justify-content-center">
                <RenderMenus />
            </div>
        </div>
    );
}

export default FooterMenu;
