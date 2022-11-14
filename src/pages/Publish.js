import axios from "axios";
import { useState } from "react";
const Publish = (token) => {
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
            autorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
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
    <div>
      <form onSubmit={handleSubmit}>
        <p>Vends ton article</p>
        <div className="picture-upload">
          <input
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
        <div className="title-and-description">
          <p>Titre</p>
          <input
            type="text"
            placeholder="ex : Chemise Sézane verte"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <hr />
          <p>Décris ton article</p>
          <input
            type="text"
            placeholder="ex : Porté quelques fois, taille correctement"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div className="product-to-sell-details">
          <p>Marque</p>{" "}
          <input
            type="text"
            placeholder="ex : Zara"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <hr />
          <p>Taille</p>
          <input
            type="text"
            placeholder="ex : L / 40 / 12"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <hr />
          <p>Couleur</p>
          <input
            type="text"
            placeholder="ex : Fushia"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <hr />
          <p>Etat</p>
          <input
            type="text"
            placeholder="ex : Neuf avec étiquette"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <hr />
          <p>Lieu</p>
          <input
            type="text"
            placeholder="ex : Paris"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
        <div className="product-to-upload-price">
          <p>Prix</p>{" "}
          <input
            type="text"
            placeholder="0,00 €"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <input type="checkbox" />
          <span> Je suis intéressé(e) par les échanges</span>
        </div>
        <button type="submit">Ajouter</button>
      </form>
      {data && (
        <img
          src={data.secure_url}
          alt="product"
          className="submitted-picture"
        />
      )}
    </div>
  );
};
export default Publish;
