import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PostAdForm.scss";
import { withRouter } from "react-router-dom";

// static data for input field suggestion
import { bikeBrands, brandModel, cityList, areas } from "../../StaticData/Data";

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

const PostAdForm = ({ history }) => {
  // filepond image
  const [files, setFiles] = useState([]);

  // bikemodel for input suggestion
  const [bikeModel, setBikeModel] = useState(null);

  // city area for input suggestion
  const [cityArea, setCityArea] = useState(null);

  // show bike model suggestion based on bike
  const setModel = e => {
    let val = e.target.value;
    const filterBrand = brandModel.filter(item => {
      return item.brand.match(val);
    });

    if (filterBrand.length > 0) {
      setBikeModel(filterBrand[0].model);
    }
    if (filterBrand.length > 1) {
      setBikeModel(null);
    }
  };

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
      position: toast.POSITION.TOP_LEFT
    });

    // show alert , if imgage is less than two 
  const addTwoImgNotify = () =>
    toast.error("Please Add Atleast Two Pictures !", {
      position: toast.POSITION.TOP_LEFT
    });

  // success message for form submission
  const successNotify = () =>
    toast.success("Form Submitted Successfully !", {
      position: toast.POSITION.TOP_LEFT
    });

  // react hook form
  const { register, handleSubmit, errors } = useForm();

  // submit
  const onSubmit = data => {
    if (files.length === 0) {
      pictureNotify();
    } else if (files.length === 1) {
      addTwoImgNotify();
    } else {
      console.log(data);
      data.file = files[0];
      successNotify();
      history.push("/");
    }
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <form className="post-ad-form" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="heading">Post your advertise</h3>
              <div className="city mb-3">
                <h6>City</h6>
                {errors.city && <p className="error">City is required</p>}
                <input
                  autoComplete="off"
                  name="city"
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

              <div className="condition mb-3">
                <h6>Condition</h6>
                {errors.condition && <p className="error">Select Condition</p>}
                <input
                  type="radio"
                  name="condition"
                  value="New"
                  ref={register({ required: true })}
                />
                {"  "} New{" "}
                <input
                  type="radio"
                  name="condition"
                  value="Used"
                  ref={register({ required: true })}
                />
                {"  "} Used
              </div>

              <div className="category mb-3">
                <h6>Category</h6>
                {errors.category && <p className="error">Select Category</p>}
                <input
                  type="radio"
                  name="category"
                  value="Motorbike"
                  ref={register({ required: true })}
                />
                {"  "} Motorbike{" "}
                <input
                  type="radio"
                  name="category"
                  value="Schooter"
                  ref={register({ required: true })}
                />
                {"  "} Schooter
              </div>

              <div className="brand mb-3">
                <h6>Brand</h6>
                {errors.brand && <p className="error">Brand is required</p>}
                <input
                  ref={register({ required: true })}
                  autoComplete="off"
                  name="brand"
                  list="suggestions"
                  onChange={e => {
                    setModel(e);
                  }}
                  type="text"
                />
                <datalist id="suggestions">
                  {bikeBrands.map((brand, index) => (
                    <option key={index} value={brand} />
                  ))}
                </datalist>
              </div>

              <div className="model mb-3">
                <h6>Model</h6>
                {errors.model && <p className="error">Model is required</p>}
                <input
                  ref={register({ required: true })}
                  autoComplete="off"
                  name="model"
                  list="modelSuggestions"
                  type="text"
                />
                <datalist id="modelSuggestions">
                  {bikeModel !== null &&
                    bikeModel.map((brand, index) => (
                      <option key={index} value={brand} />
                    ))}
                </datalist>
              </div>

              <div className="model-year mb-3">
                <h6>Model year</h6>
                {errors.modelYear && (
                  <p className="error">Model year is required</p>
                )}
                <input
                  ref={register({ required: true })}
                  name="modelYear"
                  type="number"
                />
              </div>

              <div className="km mb-3">
                <h6>Kilometer Running</h6>
                {errors.runningKM && (
                  <p className="error">Running Kilometer is required</p>
                )}
                <input
                  ref={register({ required: true })}
                  name="runningKM"
                  type="number"
                />
              </div>

              <div className="engine-power mb-3">
                <h6>Engine Capacity(cc)</h6>
                {errors.enginePower && (
                  <p className="error">Engine capacity is required</p>
                )}
                <input
                  autoComplete="off"
                  ref={register({ required: true })}
                  name="enginePower"
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
              <button type="submit">Submit</button>
            </form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default withRouter(PostAdForm);
