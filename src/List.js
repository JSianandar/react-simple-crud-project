import React from "react";

function List({ data, handleEdit, handleDelete }) {
  return (
    <div>
      {data.map((layanan) => {
        return (
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Lingkup Layanan</th>
                <th scope="col">Layanan Tersedia</th>
                <th scope="col-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{layanan.id}</th>
                <td>{layanan.lingkupLayanan}</td>
                <td>{layanan.layananTersedia}</td>
                <td>
                  <button
                    // onClick={() => handleEdit(layanan.id)}
                    type="button"
                    class="btn btn-outline-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(layanan.id)}
                    type="button"
                    class="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}

export default List;
