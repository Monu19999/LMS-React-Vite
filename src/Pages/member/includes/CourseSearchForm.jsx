import React, { useState } from "react";

function CourseSearchForm({ onChangeCallback }) {
    const [course_name, setCourseName] = useState("");

    const handleInputChange = (e) => {
        const input_value = e.target.value;
        setCourseName(input_value);
        onChangeCallback(input_value.toLowerCase());
    };

    return (
        <div className="container">
            <div className="row mb-4">
                <div
                    className="col-lg-12 wow fadeInUp"
                    style={{ backgroundColor: "#06bbcc" }}
                >
                    <div className="search-title">
                        {/* Search Form Start */}
                        <div className="row justify-content-center">
                            <div className="form-group">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    value={course_name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Search By Course Name"
                                />
                            </div>
                        </div>
                        {/* Search Form End */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseSearchForm;
