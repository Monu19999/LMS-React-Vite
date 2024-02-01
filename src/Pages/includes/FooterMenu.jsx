import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FooterMenu(props) {
    function createLink(menu) {
        if (menu.menu_type == 1) {
            return menu.page ? "page/" + menu.page.slug : "/";
        } else if (menu.menu_type == 2) {
            return menu.db_controller_route
                ? "module/" + menu.db_controller_route.route
                : "/";
        } else {
            return menu.custom_url;
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
    function renderMenus() {
        return (
            <div className="col-lg-12 col-md-12 text-center">
                {loopMenuObj(props.menus)}
            </div>
        );
    }
    const [menus, setMenus] = useState("");
    useEffect(() => {
        let menu_tree = props.menus ? renderMenus(props.menus) : "";
        setMenus(menu_tree);
    }, []);
    return (
        <div
            className="container-fluid py-3"
            style={{
                backgroundColor: "#1e233d",
                borderBottom: "1px solid rgba(256, 256, 256, .1)",
            }}
        >
            <div className="row g-5 justify-content-center">
                {menus}
                {/* <div className="col-lg-12 col-md-12 text-center">
                    <a className="btn btn-link" href="index.html">
                        Feedback
                    </a>
                    <a className="btn btn-link" href="index.html">
                        Hyperlink Policy
                    </a>
                    <a className="btn btn-link" href="index.html">
                        Terms of Use
                    </a>
                    <a className="btn btn-link" href="index.html">
                        Privacy Policy
                    </a>
                    <a className="btn btn-link" href="index.html">
                        Disclaimer
                    </a>
                    <a className="btn btn-link" href="index.html">
                        Help
                    </a>
                    <a href="index.html" className="btn btn-link">
                        FQAs
                    </a>
                </div> */}
            </div>
        </div>
    );
}

export default FooterMenu;
