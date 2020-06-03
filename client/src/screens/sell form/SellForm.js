import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MiniLoader from '../../components/loading/MiniLoader'
import "./sellForm.css";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { postAd } from '../../services/actions/advertiseAction'

// static data for input field suggestion
import { cityList, areas, categoryData } from "../../shared/staticData/data";

// file pond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import the plugin code for filepond
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

// Register the filepond plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop
);

const SellForm = ({ history, postAd, loading }) => {
  // filepond image
  const [files, setFiles] = useState([]);

  // city area for input suggestion
  const [cityArea, setCityArea] = useState(null);

  // show area suggestion based on city
  const setArea = e => {
    let val = e.target.value;
    const filterArea = areas.filter(area => {
      return area.city.match(val);
    });
    if (filterArea.length > 0) {
      setCityArea(filterArea[0].area);
    }
    if (filterArea.length > 1) {
      setCityArea(null);
    }
  };

  // warning notification for img blank field
  const pictureNotify = () =>
    toast.error("Please Add pictures !", {
      position: toast.POSITION.TOP_RIGHT
    });

  // show alert , if imgage is less than two 
  const addTwoImgNotify = () =>
    toast.error("Please Add Atleast Two Pictures !", {
      position: toast.POSITION.TOP_RIGHT
    });

  // success message for form submission
  //   const successNotify = () =>
  //     toast.success("Form Submitted Successfully !", {
  //       position: toast.POSITION.TOP_LEFT
  //     });

  // react hook form
  const { register, handleSubmit, errors } = useForm();

  // submit
  const onSubmit = data => {
    if (files.length === 0) {
      pictureNotify();
    } else if (files.length === 1) {
      addTwoImgNotify();
    } else {
      data.files = files;
      postAd(data, history)
    }
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <form className="post-ad-form" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="heading">Post your advertise</h3>
              <div className="division mb-3">
                <h6>Division</h6>
                {errors.division && <p className="error">Division is required</p>}
                <input
                  autoComplete="off"
                  name="division"
                  list="cities"
                  type="text"
                  onChange={e => setArea(e)}
                  ref={register({ required: true })}
                />
                <datalist id="cities">
                  {cityList.map((city, index) => (
                    <option key={index} value={city} />
                  ))}
                </datalist>
              </div>

              <div className="area mb-3">
                <h6>Area</h6>
                {errors.area && <p className="error">Area is required</p>}
                <input
                  autoComplete="off"
                  name="area"
                  list="areas"
                  type="text"
                  ref={register({ required: true })}
                />
                <datalist id="areas">
                  {cityArea !== null &&
                    cityArea.map((area, index) => (
                      <option key={index} value={area} />
                    ))}
                </datalist>
              </div>

              <div className="img">
                <h6>Please upload pictures max(5) </h6>
                <FilePond
                  files={files}
                  allowMultiple={true}
                  onupdatefiles={setFiles}
                  allowImageCrop={true}
                  labelFileTypeNotAllowed={"Error!"}
                  acceptedFileTypes={["image/*"]}
                  fileValidateTypeDetectType={(source, type) =>
                    new Promise((resolve, reject) => {
                      // Do custom type detection here and return with promise
                      resolve(type);
                    })
                  }
                  maxFiles={5}
                  labelIdle='Drag & Drop your image  or <span class="filepond--label-action">Browse</span>'
                />
              </div>

              <div className="category mb-3">
                <h6>Category</h6>
                {errors.category && <p className="error">Select Category</p>}
                <select name="category" ref={register({ required: true })}>
                  {categoryData.map((item, index) => {
                    return <option key={index} value={item}> {item} </option>
                  })}
                </select>
              </div>

              <div className="condition mb-3">
                <h6>Condition</h6>
                {errors.condition && <p className="error">Select Condition</p>}
                <input
                  type="radio"
                  name="condition"
                  value="used"
                  ref={register({ required: true })}
                />
                {"  "} Used{" "}
                <input
                  type="radio"
                  name="condition"
                  value="new"
                  ref={register({ required: true })}
                />
                {"  "} New
              </div>
              <div className="title mb-3">
                <h6>Title</h6>
                {errors.title && (
                  <p className="error">Title is required</p>
                )}
                <input
                  ref={register({ required: true })}
                  name="title"
                  type="text"
                />
              </div>

              <div className="description mb-3">
                <h6>Description</h6>
                {errors.description && (
                  <p className="error">Description is required</p>
                )}
                <textarea
                  ref={register({ required: true })}
                  name="description"
                ></textarea>
              </div>

              <div className="price mb-3">
                <h6>Price</h6>
                {errors.price && <p className="error">Price is required</p>}
                <input
                  ref={register({ required: true })}
                  name="price"
                  type="number"
                />
              </div>
              <div className="isNegotiable mb-3">
                <h6>Negotiable</h6>
                {errors.isNegotiable && <p className="error">Negotiable field is required</p>}
                <select name="isNegotiable" ref={register({ required: true })}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <button disabled={loading && true} className={loading && 'not-allowed'} type="submit"> {loading ? <span> Submitting... <MiniLoader /> </span> : "Submit"}  </button>
            </form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

SellForm.prototypes = {
  postAd: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  loading: state.ad.loading
})

export default connect(mapStateToProps, { postAd })(withRouter(SellForm));

