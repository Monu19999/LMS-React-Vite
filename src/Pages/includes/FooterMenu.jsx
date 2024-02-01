function FooterMenu() {
    return (
        <div
            className="container-fluid py-3"
            style={{
                backgroundColor: "#1e233d",
                borderBottom: "1px solid rgba(256, 256, 256, .1)",
            }}
        >
            <div className="row g-5 justify-content-center">
                <div className="col-lg-12 col-md-12 text-center">
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
                </div>
            </div>
        </div>
    );
}

export default FooterMenu;
