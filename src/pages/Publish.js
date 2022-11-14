import axios from "axios";
import { useState } from "react";
const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  //   const [preview, setPreview] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [data, setData] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <main className="publish-main">
      <div className="publish-container">
        <form onSubmit={handleSubmit}>
          <h2>Vends ton article</h2>
          <div className="picture-upload">
            <div className="dashed-border">
              <label for="file" className="file-input-label">
                <span className="input-sign">+</span>
                <span>Ajoute une photo</span>
              </label>
              <input
                className="file-input"
                type="file"
                name="file"
                id="file"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                  // console.log(event.target.files[0]);

                  // const reader = new FileReader();
                  // reader.onload = () => {
                  //   if (reader.readyState === 2) {
                  //     setPreview(reader.result);
                  //   }
                  // };
                  // reader.readAsDataURL(event.target.files[0]);
                }}
              />
              {/* <img src={preview} alt="" /> */}
            </div>
          </div>
          <div className="title-and-description section-div">
            <div className="top-div">
              <p>Titre</p>
              <input
                className="input-field"
                type="text"
                placeholder="ex : Chemise Sézane verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="bottom-div">
              <p>Décris ton article</p>
              <input
                className="input-field"
                type="text"
                placeholder="ex : Porté quelques fois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="product-to-sell-details section-div">
            <div className="top-div">
              <p>Marque</p>{" "}
              <input
                className="input-field"
                type="text"
                placeholder="ex : Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="top-div">
              <p>Taille</p>
              <input
                className="input-field"
                type="text"
                placeholder="ex : L / 40 / 12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="top-div">
              <p>Couleur</p>
              <input
                className="input-field"
                type="text"
                placeholder="ex : Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="top-div">
              <p>Etat</p>
              <input
                className="input-field"
                type="text"
                placeholder="ex : Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="bottom-div">
              <p>Lieu</p>
              <input
                className="input-field"
                type="text"
                placeholder="ex : Paris"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="product-to-upload-price section-div">
            <div className="bottom-div">
              <p>Prix</p>
              <div className="price-input-div">
                <input
                  className="input-field"
                  type="text"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="trading">
                  <input type="checkbox" className="checkbox" />
                  <span> Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Ajouter
          </button>
        </form>
        {data && (
          <img
            src={data.product_image.secure_url}
            alt="product"
            className="submitted-picture"
          />
        )}
      </div>
    </main>
  );
};
export default Publish;
