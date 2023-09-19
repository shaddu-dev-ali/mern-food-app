import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import axios from 'axios';

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/displayitems'
        );
        setFoodCat(response.data.categories);
        setFoodItems(response.data.items);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ objectFit: 'contain' }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div
          className="carousel-caption d-none d-md-block"
          style={{ zIndex: '10' }}
        >
          <div className="d-flex justify-content-center">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <button
              className="btn btn-outline-success text-white"
              type="submit"
            >
              Search
            </button> */}
          </div>
        </div>
        <div
          className="carousel-inner"
          style={{ maxHeight: '500px' }}
        >
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900×700/?steak"
              className="d-block w-100"
              alt="steak"
              style={{ filter: 'brightness(30%)' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?burger"
              className="d-block w-100"
              alt="burger"
              style={{ filter: 'brightness(30%)' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?pizza"
              className="d-block w-100"
              alt="pizza"
              style={{ filter: 'brightness(30%)' }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {foodCat.length > 0
          ? foodCat.map((cat) => {
              return (
                <div className="row">
                  <div key={cat._id} className="fs-3 m-3">
                    {cat.CategoryName}
                  </div>
                  {foodItems.length > 0
                    ? foodItems
                        .filter(
                          (item) =>
                            item.CategoryName ===
                              cat.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(
                                search.toLowerCase()
                              )
                        )
                        .map((filterItem) => {
                          return (
                            <div
                              key={filterItem._id}
                              className="col-12 col-md-6 col-lg-3"
                            >
                              <Card
                                foodItem={filterItem}
                                options={
                                  filterItem.options[0]
                                }
                              />
                            </div>
                          );
                        })
                    : ''}
                </div>
              );
            })
          : ''}
      </div>
      <Footer />
    </>
  );
}
