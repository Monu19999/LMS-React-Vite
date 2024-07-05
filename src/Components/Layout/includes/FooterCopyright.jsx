function FooterCopyright() {
    return (
        <div className="container">
            <div className="copyright">
                <div className="row">
                    <div className="col-md-4 col-lg-4 text-center text-md-start mb-3 mb-md-0">
                        ©{" "}
                        <a className="border-bottom" href="index.html">
                            e-shiksha
                        </a>
                        , All Right Reserved.
                    </div>
                    <div className="col-md-4 col-lg-4 text-center">
                        {/* Last Update On : 03 Nov 2023, 15:50 */}
                    </div>
                    <div className="col-md-4 col-lg-4 text-center text-md-end">
                        <div className="footer-menu">
                            Designed and Developed By{" "}
                            <a className="border-bottom" href="index.html">
                                MPSEDC (CoE)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterCopyright;
