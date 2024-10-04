  import React, { useState, useContext } from "react";
  import { Container, Collapse, ListGroup, Button } from "react-bootstrap";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
  import { AuthContext } from "../../context/AuthContext";
  import { ShipmentContext } from "../../context/ShipmentContext";
  import { useLocation } from "react-router-dom"; // Import useLocation
  import NavBarNormal from "../../components/NavBar/NavBarNormal";
  import Footer from "../../components/Footer/Footer";
  import CheckModal from "../../components/Modals/CheckModal";
  import "../../components/styles/CreatePickUp.css";

  const CreatePickUp = () => {
    const {
      user,
      logoutUser,
      isLogoutModalVisible,
      hideLogoutModal,
      confirmLogout,
    } = useContext(AuthContext);

    const {
      isCheckModalVisible,
      hideCheckModal,
      showCheckModal,
    } = useContext(ShipmentContext);

    // Mengambil shipmentId dari state yang diteruskan
    const location = useLocation();
    const { shipmentId , noTrack} = location.state || {};


    console.log(shipmentId)
    console.log("ini no track", noTrack)
    //sender
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");

    //recipient
    const [nameRecipient, setNameRecipient] = useState("");
    const [phoneNumberRecipient, setPhoneNumberRecipient] = useState("");
    const [cityRecipient, setCityRecipient] = useState("");
    const [addressRecipient, setAddressRecipient] = useState("");

    //package
    const [typePackage, setTypePackage] = useState("");
    const [itemNamePackage, setItemNamePackage] = useState("");
    const [quantityPackage, setQuantityPackage] = useState("");
    const [itemValuePackage, setItemValuePackage] = useState("");
    const [weightPackage, setWeightPackage] = useState("");
    const [heightPackage, setHeightPackage] = useState("");
    const [lengthPackage, setLengthPackage] = useState("");
    const [widthPackage, setWidthPackage] = useState("");
    const [remarksPackage, setRemarksPackage] = useState("");

    const [loading, setLoading] = useState(false); // Untuk handle loading
    const [isSenderCreated, setIsSenderCreated] = useState(false); // Track sender creation
    const [isRecipientCreated, setIsRecipientCreated] = useState(false); 
    const [isPackageCreated, setIsPackageCreated] = useState(false); 

    const [estimatedCost, setEstimatedCost] = useState(null);

    const [openPengirim, setOpenPengirim] = useState(true);
    const [openPenerima, setOpenPenerima] = useState(true);
    const [openBarang, setOpenBarang] = useState(true);
    const [useVolume, setUseVolume] = useState(false); // State for volume checkbox
    const [useInsurance, setUseInsurance] = useState(false); // State for insurance checkbox

    const handleVolumeChange = (e) => {
      setUseVolume(e.target.checked);
    };

    const handleInsuranceChange = (e) => {
      setUseInsurance(e.target.checked);
    };

    // Fungsi untuk submit data sender ke backend
    const handleSubmitSender = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8000/api/v1/senders/create-senders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phoneNumber,
            originCity: city,
            address,
            shipmentId, // Gunakan shipmentId yang diteruskan
          }),
        });

        const data = await response.json();
        setLoading(false);

        if (data.status) {
          console.log("Sender created successfully:", data);
          setIsSenderCreated(true);
          // Tambahkan logika setelah sender berhasil dibuat (misalnya notifikasi atau redirect)
        } else {
          console.error(data.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error creating sender:", error);
      }
    };


    const handleSubmitRecipient = async (e) => {
      e.preventDefault();
      setLoading(true);
    
      try {
        const response = await fetch("http://localhost:8000/api/v1/recipients/create-recipients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameRecipient,  // Ubah ke nameRecipient
            phoneNumber: phoneNumberRecipient,  // Ubah ke phoneNumberRecipient
            destinationCity: cityRecipient,  // Ubah ke cityRecipient
            address: addressRecipient,  // Ubah ke addressRecipient
            shipmentId, // Gunakan shipmentId yang diteruskan
          }),
        });
    
        const data = await response.json();
        setLoading(false);
    
        if (data.status) {
          console.log("Recipient created successfully:", data);
          setIsRecipientCreated(true);
          // Tambahkan logika setelah recipient berhasil dibuat (misalnya notifikasi atau redirect)
        } else {
          console.error(data.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error creating recipient:", error);
      }
    };



  
    // Package Submission
const handleSubmitPackage = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("http://localhost:8000/api/v1/packages/create-packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: typePackage,  // Use typePackage for item type
        itemName: itemNamePackage,
        quantity: quantityPackage,
        itemValue: itemValuePackage,
        weight: weightPackage,
        height: heightPackage,
        width: widthPackage,
        length: lengthPackage,
        remarks: remarksPackage,
        shipmentId,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.status) {
      console.log("Package created successfully:", data);
      setIsPackageCreated(true);
      // Add logic for successful package creation
    } else {
      console.error(data.message);
    }
  } catch (error) {
    setLoading(false);
    console.error("Error creating package:", error);
  }
};




    // Fungsi untuk menghitung estimasi biaya
    const estimateCost = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/v1/cost-estimation/estimateCostByCityName", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromCity: city,        // Kota pengirim
            toCity: cityRecipient, // Kota penerima
            weight: weightPackage,
            height: heightPackage,
            width: widthPackage,
            length: lengthPackage,
          }),
        });
        const data = await response.json();
        console.log(data); // Tambahkan ini untuk memeriksa hasil respons
        setLoading(false);
    
        if (data.status) {
          setEstimatedCost(data.data.estimatedCost); // Set estimated cost
        } else {
          console.error(data.message);
          setError(data.message); // Set error message
        }
      } catch (error) {
        setLoading(false);
        console.error("Error estimating cost:", error);
      }
    };
    

  
    return (
      <>
        <NavBarNormal />
        <div className="droppoint-title mb-4">
          <h1 className="mb-4">Create PickUp</h1>
          <p>Home &gt; Create Pickup</p>
        </div>
        <Container className="mb-5">
          <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-9">
                <div className="card mb-3 p-5">
                  <div onClick={() => setOpenPengirim(!openPengirim)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
                    <p className="fw-bold" style={{ margin: 0 }}>Informasi Pengirim</p>
                    <FontAwesomeIcon icon={openPengirim ? faChevronUp : faChevronDown} style={{ marginLeft: 'auto' }} />
                  </div>
                  <hr />
                  <Collapse in={openPengirim}>
                    <div>
                      <div className="card-body pt-0">
                        <form onSubmit={handleSubmitSender}>
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="fullName" className="form-label">
                                Nama Lengkap<span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isSenderCreated} 
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="phoneNumber" className="form-label">
                                No Telpon<span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                disabled={isSenderCreated} 
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                              Kota<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                              disabled={isSenderCreated} 
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                              Alamat Lengkap Penjemputan<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                              disabled={isSenderCreated} 
                            />
                          </div>
                          <div className="d-flex justify-content-end">
                          <Button type="submit" variant="primary" disabled={loading || isSenderCreated}>
                              {isSenderCreated ? "Berhasil" : loading ? "Menyimpan..." : "Simpan Data Pengirim"}
                          </Button>

                          </div>
                        </form>
                      </div>
                    </div>
                  </Collapse>

                  <div onClick={() => setOpenPenerima(!openPenerima)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
                    <p className="fw-bold" style={{ margin: 0 }}>Informasi Penerima</p>
                    <FontAwesomeIcon icon={openPenerima ? faChevronUp : faChevronDown} style={{ marginLeft: 'auto' }} />
                  </div>
                  <hr />
                  <Collapse in={openPenerima}>
                    <div>
                      <div className="card-body pt-0">
                        <form onSubmit={handleSubmitRecipient}>
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="fullName" className="form-label">
                                Nama Lengkap<span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                value={nameRecipient} 
                                onChange={(e) => setNameRecipient(e.target.value)}
                                disabled={isRecipientCreated}
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="phoneNumber" className="form-label">
                                No Telpon<span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="phoneNumber"
                                value={phoneNumberRecipient}
                                onChange={(e) => setPhoneNumberRecipient(e.target.value)}
                                disabled={isRecipientCreated}
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                              Kota<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              value={cityRecipient}
                              onChange={(e) => setCityRecipient(e.target.value)}
                              disabled={isRecipientCreated}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                              Alamat Lengkap Tujuan<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              value={addressRecipient}
                              onChange={(e) => setAddressRecipient(e.target.value)}
                              disabled={isRecipientCreated}
                            />
                          </div>
                          <div className="d-flex justify-content-end">
                          <Button type="submit" variant="primary" disabled={loading || isRecipientCreated}>
                              {isRecipientCreated ? "Berhasil" : loading ? "Menyimpan..." : "Simpan Data Penerima"}
                          </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Collapse>

                <div onClick={() => setOpenBarang(!openBarang)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}>
                  <p className="fw-bold" style={{ margin: 0 }}>Informasi Barang</p>
                  <FontAwesomeIcon icon={openBarang ? faChevronUp : faChevronDown} style={{ marginLeft: 'auto' }} />
                </div>
                <hr />
                <Collapse in={openBarang}>
                  <div>
                    <div className="card-body pt-0">
                      <form onSubmit={handleSubmitPackage}>
                        <div className="mb-3">
                          <label htmlFor="itemName" className="form-label">
                            Nama Barang<span style={{ color: 'red' }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="itemName"
                            value={itemNamePackage}
                            onChange={(e) => setItemNamePackage(e.target.value)}
                            disabled={isPackageCreated}
                          />
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">
                              Estimasi Berat<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              value={weightPackage}
                              onChange={(e) => setWeightPackage(e.target.value)}
                              disabled={isPackageCreated}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="quantity" className="form-label">
                              Kuantitas<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              value={quantityPackage}
                              onChange={(e) => setQuantityPackage(e.target.value)}
                              disabled={isPackageCreated}
                            />
                          </div>
                        </div>

                        <div className="d-flex gap-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="volumeCheckbox"
                              checked={useVolume}
                              onChange={handleVolumeChange}
                              disabled={isPackageCreated}
                            />
                            <label className="form-check-label" htmlFor="volumeCheckbox">
                              <p style={{ fontSize: "13px" }}>Pakai Volume</p> 
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="insuranceCheckbox"
                              checked={useInsurance}
                              onChange={handleInsuranceChange}
                              disabled={isPackageCreated}
                            />
                            <label className="form-check-label" htmlFor="insuranceCheckbox">
                              <p style={{ fontSize: "13px" }}>Asuransi</p> 
                            </label>
                          </div>
                        </div>

                        {useVolume && (
                          <div className="row mb-3">
                            <div className="col-md-4">
                              <label className="form-label">
                                Panjang<span style={{ color: 'red' }}>*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={lengthPackage}
                                  onChange={(e) => setLengthPackage(e.target.value)}
                                  disabled={isPackageCreated}
                                />
                                <span className="input-group-text">cm</span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">
                                Lebar<span style={{ color: 'red' }}>*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={widthPackage}
                                  onChange={(e) => setWidthPackage(e.target.value)}
                                  disabled={isPackageCreated}
                                />
                                <span className="input-group-text">cm</span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">
                                Tinggi<span style={{ color: 'red' }}>*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={heightPackage}
                                  onChange={(e) => setHeightPackage(e.target.value)}
                                  disabled={isPackageCreated}
                                />
                                <span className="input-group-text">cm</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {useInsurance && (
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="insuranceAmount" className="form-label">
                                Nilai Asuransi<span style={{ color: 'red' }}>*</span>
                              </label>
                              <div className="input-group">
                                <span className="input-group-text">Rp.</span>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="insuranceAmount"
                                  value={itemValuePackage}
                                  onChange={(e) => setItemValuePackage(e.target.value)}
                                  disabled={isPackageCreated}
                                />
                              </div>
                            </div>

                          </div>
                        )}

                        <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="itemType" className="form-label">
                            Jenis Barang<span style={{ color: 'red' }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            id="itemType"
                            value={typePackage} // Bind the value to the state
                            onChange={(e) => setTypePackage(e.target.value)} // Update the state when the value changes
                            disabled={isPackageCreated}
                          >
                            <option value="" disabled>
                              Pilih
                            </option>
                            <option value="document">DOKUMEN (DOCUMENT)</option>
                            <option value="package">PAKET (PACKAGE)</option>
                          </select>
                        </div>

                          <div className="col-md-6">
                            <label htmlFor="description" className="form-label">
                              Deskripsi Barang optional<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="description"
                              disabled={isPackageCreated} 
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="itemInstructions" className="form-label">
                            Keterangan/Instruksi khusus untuk kurir<span style={{ color: 'red' }}>*</span>
                          </label>
                          <textarea
                            className="form-control"
                            id="itemInstructions"
                            rows="3"
                            style={{ resize: 'vertical' }}
                            value={remarksPackage}
                            onChange={(e) => setRemarksPackage(e.target.value)}
                            disabled={isPackageCreated} 
                          ></textarea>
                        </div>

                        <div className="d-flex justify-content-end">
                        <Button type="submit" variant="primary" disabled={loading || isPackageCreated}>
                              {isPackageCreated ? "Berhasil" : loading ? "Menyimpan..." : "Simpan Data Barang"}
                          </Button>
                        </div>
                      </form>

                       {/* Tambahkan tombol untuk menghitung estimasi biaya setelah paket dibuat */}
                       {isPackageCreated && (
                        <div className="d-flex justify-content-end mt-3">
                          <Button variant="secondary" onClick={estimateCost} disabled={loading}>
                            {loading ? "Menghitung..." : "Hitung Estimasi Biaya"}
                          </Button>
                        
                          <p>Estimated Cost: {estimatedCost} IDR</p>
                        </div>
                        
                      )}
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <ListGroup as="ul">
                <ListGroup.Item as="li" onClick={() => setOpenPengirim(!openPengirim)}>
                  <img className="tab-profile-img" src="profile-null.png" alt="Pengirim" />
                  Pengirim
                </ListGroup.Item>
                <ListGroup.Item as="li" onClick={() => setOpenPenerima(!openPenerima)}>
                  <img className="tab-profile-img" src="profile-null.png" alt="Penerima" />
                  Penerima
                </ListGroup.Item>
                <ListGroup.Item as="li" onClick={() => setOpenBarang(!openBarang)}>
                  <img className="tab-profile-img" src="profile-null.png" alt="Barang" />
                  Barang
                </ListGroup.Item>
              </ListGroup>
              <Button onClick={() => showCheckModal()}>Selanjutnya</Button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
      <CheckModal show={isCheckModalVisible} onHide={hideCheckModal} noTrack={noTrack} estimatedCost={estimatedCost} shipmentId={shipmentId}/>
    </>
  );
};

export default CreatePickUp;
