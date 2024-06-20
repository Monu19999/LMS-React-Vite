import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Video() {
    const [downloadContent, setDownloadContent] = useState([
        { sno: 1, name: "download",  },
        { sno: 2, name: "download2",  },
        { sno: 3, name: "download3",  },
        { sno: 4, name: "download4",  },
        { sno: 5, name: "download5",  },
        { sno: 6, name: "download6",  },
      ]);
    
      const [filteredContent, setFilteredContent] = useState(downloadContent);
    
      const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
      } = useForm();
    
      const handleFormFilter = () => {
        const title = getValues().title.toLowerCase();
        const updatedContent = downloadContent.filter((item) =>
          item.name.toLowerCase().includes(title)
        );
        setFilteredContent(updatedContent);
      };
    
      const handleResetSearch = () => {
        reset();
        setFilteredContent(downloadContent);
      };
    
      return (
        <>
          {/* Header Start */}
          <div className="container-fluid bg-primary py-4 mb-4 page-header">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10 text-center">
                  <h1 className="display-3 text-white animated slideInDown">
                    Video
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {/* Header End */}
          <div className="container-xxl">
            <div className="container">
              <div className="row mb-4">
                <div
                  className="col-lg-12 wow fadeInUp"
                  style={{ backgroundColor: "#06bbcc" }}
                >
                  <div className="search-title">
                    {/* Search Form Start */}
                    <form onSubmit={handleSubmit(handleFormFilter)}>
                      <div className="row justify-content-center">
                        <div className="col-md-6 row mt-3">
                          <div className="form-group">
                            <input
                              type="text"
                              autoComplete="off"
                              {...register("title")}
                              className="form-control"
                              placeholder="Search By Title"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-2">
                          <div className="form-group mt-4">
                            <button
                              className="btn btn-dark py-md-2 px-md-4 animated slideInRight"
                              style={{
                                borderRadius: 40,
                                marginRight: 20,
                              }}
                              type="submit"
                            >
                              Search
                            </button>
                            <button
                              className="btn btn-light py-md-2 px-md-4 animated slideInRight"
                              style={{ borderRadius: 40 }}
                              type="button"
                              onClick={handleResetSearch}
                            >
                              <i className="fas fa-refresh" /> Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* Search Form End */}
                  </div>
                </div>
              </div>
              <div>
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <h1>Download Items</h1>
                      <table className="table table-striped align-items-center justify-content-center">
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col" className="px-5">Name</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          {filteredContent?.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">{item.sno}</th>
                              <td>
                                <a
                                  href="https://www.youtube.com/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item.name}
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default Video;
