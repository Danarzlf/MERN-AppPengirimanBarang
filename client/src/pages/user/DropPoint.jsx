import { useState, useContext } from "react";
import { DropPointContext } from "../../context/DropPointContext";
import NavBarNormal from "../../components/NavBar/NavBarNormal";
import Footer from "../../components/Footer/Footer";
import Table from 'react-bootstrap/Table';

// CSS
import "../../components/styles/DropPoint.css";

const DropPoint = () => {
  const {
    dropPoints,
    isLoading,
    error,
  } = useContext(DropPointContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewAll, setViewAll] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

 // Menampilkan semua drop point jika searchTerm kosong
 const filteredDropPoints = searchTerm.length < 3 
 ? dropPoints.data 
 : dropPoints.data.filter(dropPoint =>
     dropPoint.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
     dropPoint.address.toLowerCase().includes(searchTerm.toLowerCase())
   );


  const displayedDropPoints = viewAll ? filteredDropPoints : filteredDropPoints.slice(0, 5);

  return (
    <>
      <div className="droppoint-title mb-4">
        <h1 className="mb-4">Drop Point</h1>
        <p>Home &gt; Drop Point</p>
      </div>
      <div className="container mt-5" style={{marginBottom:'300px'}}>
        <h4>Cari Drop Point</h4>
        <p>Cari drop point terdekat di daerahmu</p>
        <input 
          className="input-droppoint mt-3 mb-4" 
          placeholder="Masukkan nama daerah atau alamat" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Table className="table-droppoint">
          <thead>
            <tr>
              <th>No.</th>
              <th>Kota</th>
              <th>Nama Cabang</th>
              <th>Kategori</th>
              <th>Alamat</th>
              <th>Link Map</th>
            </tr>
          </thead>
          <tbody>
            {displayedDropPoints.map((dropPoint, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{dropPoint.city}</td>
                <td>{dropPoint.branch_name}</td>
                <td>{dropPoint.category}</td>
                <td>{dropPoint.address}</td>
                <td><a href={dropPoint.link_map} target="_blank" rel="noopener noreferrer">View Map</a></td>
              </tr>
            ))}
          </tbody>
        </Table>

        {!viewAll && filteredDropPoints.length > 5 && (
          <button className="btn btn-primary" onClick={() => setViewAll(true)}>Selengkapnya</button>
        )}

        {viewAll && (
          <button className="btn btn-secondary" onClick={() => setViewAll(false)}>Tampilkan Lebih Sedikit</button>
        )}
      </div>
      <NavBarNormal />
      <Footer />
    </>
  );
};

export default DropPoint;