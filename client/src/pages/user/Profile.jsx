import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import NavBarProfile from "../../components/NavBar/NavBarProfile";
import LinkUpProfile from "../../components/Profile/LinkUpProfile"; // Assuming this is your Pickup component
import ChangePassword from "../../components/Profile/ChangePassword"; // Assuming this is your Pickup component
import ProfileTitle from "../../components/Profile/ProfileTitle"; // Assuming this is your Pickup component
import LogoutModal from "../../components/Modals/LogoutModal";
import Footer from "../../components/Footer/Footer";
import { ListGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
// Modals
import LoadingModal from "../../components/Modals/LoadingModal";
import UpdateSuccesModal from "../../components/Modals/UpdateSuccesModal";

// CSS
import "../../components/styles/Profile.css";

const Profile = () => {
  const {
    user,
    logoutUser,
    isLogoutModalVisible,
    hideLogoutModal,
    confirmLogout,
  } = useContext(AuthContext);
  const {
    userProfiles,
    isUserProfilesLoading,
    userProfilesError,
    formData,
    setFormData,
    handleFormSubmit,
    isModalLoadingVisible,
    updateSuccesModal,
    isSuccessModalVisible,
    handleSuccessModalClose,
  } = useContext(ProfileContext);

  const [editMode, setEditMode] = useState(false);
  const [currentTab, setCurrentTab] = useState("profile");

  const handleEditClick = () => {
    setEditMode(true);
    setFormData({
      fullName: userProfiles?.userProfile?.fullName || "",
      phoneNumber: userProfiles?.userProfile?.phoneNumber || "",
      country: userProfiles?.userProfile?.country || "",
      city: userProfiles?.userProfile?.city || "",
      image: userProfiles?.userProfile?.profilePicture || null,
    });
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <NavBarProfile />
      <ProfileTitle />
      <Container className="mb-5">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-3 mb-3">
              <ListGroup as="ul" className="mb-3">
                <ListGroup.Item as="li">
                  Halo, {userProfiles?.userProfile?.fullName}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup as="ul">
                <ListGroup.Item as="li" active={currentTab === "profile"} onClick={() => handleTabChange("profile")}>
                  <img className="tab-profile-img" src="profile-null.png" />
                  Profile
                </ListGroup.Item>
                <ListGroup.Item as="li" active={currentTab === "pesanan"} onClick={() => handleTabChange("pesanan")}>
                  <img className="tab-profile-img" src="profile-null.png" />
                  Pesanan
                </ListGroup.Item>
                <ListGroup.Item as="li" active={currentTab === "changepassword"} onClick={() => handleTabChange("changepassword")}>
                  <img className="tab-profile-img" src="profile-null.png" />
                  Ubah Password
                </ListGroup.Item>
                <ListGroup.Item as="li" onClick={() => logoutUser()}>
                  <img className="tab-profile-img" src="profile-null.png" />
                  Keluar
                </ListGroup.Item>
              </ListGroup>
            </div>

            <div className="col-md-9">
              {currentTab === "profile" && (
                <div className="card mb-3 p-5">
                  <div className="mb-3">
                    {userProfiles?.userProfile?.profilePicture ? (
                      <img
                        src={userProfiles?.userProfile?.profilePicture}
                        alt="Profile"
                        className="rounded-circle"
                        width={150}
                      />
                    ) : (
                      <img
                        src="profile-null.png"
                        alt="Default Profile"
                        className="rounded-circle"
                        width={150}
                      />
                    )}
                  </div>
                  <h4>{userProfiles?.userProfile?.fullName}</h4>
                  <p className="text-secondary mb-1">
                    {userProfiles?.userProfile?.focused}
                  </p>
                  <p className="text-muted font-size-sm">
                    {userProfiles?.userProfile?.city},
                    {userProfiles?.userProfile?.country}
                  </p>
                  <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <label htmlFor="fullName" className="form-label">
                            Nama Lengkap
                          </label>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className={`form-control ${editMode ? "edit-input" : ""}`}
                            id="fullName"
                            value={editMode ? formData.fullName : userProfiles?.userProfile?.fullName || ""}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={userProfiles?.email}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <label htmlFor="phoneNumber" className="form-label">
                            Nomor Telepon
                          </label>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            className="form-control"
                            id="phoneNumber"
                            value={editMode ? formData.phoneNumber : userProfiles?.userProfile?.phoneNumber || ""}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <label htmlFor="country" className="form-label">
                            Negara
                          </label>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="country"
                            value={editMode ? formData.country : userProfiles?.userProfile?.country || ""}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <label htmlFor="city" className="form-label">
                            Kota
                          </label>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            value={editMode ? formData.city : userProfiles?.userProfile?.city || ""}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>

                      {editMode && (
                        <div className="row mb-3">
                          <hr />
                          <div className="col-sm-3">
                            <label htmlFor="image" className="form-label">
                              Gambar Profil
                            </label>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="file"
                              className="form-control"
                              id="image"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  image: e.target.files[0],
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                      <hr />
                      <div className="row">
                        <div className="col-sm-12">
                          {!editMode && (
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={handleEditClick}
                            >
                              Ubah
                            </button>
                          )}
                          {editMode && (
                            <>
                              <button type="submit" className="btn btn-info">
                                Simpan
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary ms-3"
                                onClick={handleCancelClick}
                              >
                                Batal
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </form>

                    <p className="text-end" style={{ fontStyle: "italic" }}>
                      {userProfiles?.userProfile?.updatedAt &&
                        `Profil diperbarui pada ${new Date(
                          userProfiles.userProfile?.updatedAt
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}`}
                    </p>
                    <p className="text-end" style={{ fontStyle: "italic" }}>
                      {userProfiles?.createdAt &&
                        `Akun dibuat pada ${new Date(
                          userProfiles.createdAt
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}`}
                    </p>
                  </div>
                </div>
              )}
              {currentTab === "pesanan" && (
                <LinkUpProfile /> // Assuming this is your Pickup component
              )}
              {currentTab === "changepassword" && (
                 <ChangePassword />
              )}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
      <LogoutModal
        show={isLogoutModalVisible}
        handleClose={hideLogoutModal}
        handleLogout={confirmLogout}
      />
      {isModalLoadingVisible && <LoadingModal />}
      <UpdateSuccesModal
        isVisible={isSuccessModalVisible}
        onClose={handleSuccessModalClose}
      />
    </>
  );
};

export default Profile;
