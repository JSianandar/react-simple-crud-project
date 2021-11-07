import React from "react";
import List from "./List";
import { useState, useEffect } from "react";
import { uid } from "uid";
import "./App.css";
import axios from "axios";

function Home() {
  const [layanan, setLayanan] = useState([]);

  //   const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState([
    {
      lingkupLayanan: "",
      layananTersedia: "",
    },
  ]);

  useEffect(() => {
    // fetch data
    axios.get("http://localhost:3000/layanan").then((res) => {
      console.log(res.data);
      setLayanan(res?.data ?? []);
    });
  }, []);

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // validasi
    if (formData.lingkupLayanan === "") {
      return false;
    }
    if (formData.layananTersedia === "") {
      return false;
    }
    // menambahkan lingkup layanan
    let data = [...layanan];
    let newData = {
      id: uid(),
      lingkupLayanan: formData.lingkupLayanan,
      layananTersedia: formData.layananTersedia,
    };
    data.push(newData);
    axios.post("http://localhost:3000/layanan", newData).then((res) => {
      alert("Berhasil menyimpan data");
    });
    setLayanan(data);
  }

  function handleDelete(id) {
    let data = [...layanan];
    let filteredData = data.filter((layanan) => layanan.id !== id);
    axios.delete(`http://localhost:3000/layanan/${id}`).then((res) => {
      alert("Berhasil mengapus data");
    });
    setLayanan(filteredData);
  }

  return (
    <div className="App">
      <header className="App-header">REACT JS SIMPLE CRUD</header>
      <form class="mb-5" onSubmit={handleSubmit}>
        <div class="mb-3 mt-3">
          <label for="kategori" class="form-label">
            Kategori
          </label>
          <select
            class="form-select"
            id="kategori"
            aria-label="Default select example"
            value={formData.lingkupLayanan}
            name="lingkupLayanan"
            onChange={handleChange}
          >
            <option selected>Lingkup</option>
            <option value="Studi">Studi</option>
            <option value="Survey dan Penelitian">Survey dan Penelitian</option>
            <option value="Perencanaan Teknis">Perencanaan Teknis</option>
            <option value="Supervisi Konstruksi">Supervisi Konstruksi</option>
            <option value="Managemen Konstruksi">Managemen Konstruksi</option>
            <option value="Technical Assistance">Technical Assistance</option>
          </select>
          <p class="fst-italic">Kategori lingkup layanan</p>
        </div>
        <div class="mb-5 mt-3">
          <label for="layanan" class="form-label">
            Layanan
          </label>
          <input
            type="text"
            class="form-control"
            id="layanan"
            placeholder="Layanan"
            value={formData.layananTersedia}
            name="layananTersedia"
            onChange={handleChange}
          />
          <p class="fst-italic">Layanan tersedia</p>
        </div>
        <button type="submit" class="btn btn-primary">
          Menciptakan Lingkup Layanan
        </button>
      </form>
      <List handleDelete={handleDelete} data={layanan} />
    </div>
  );
}

export default Home;
