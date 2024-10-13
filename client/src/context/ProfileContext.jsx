import { createContext, useState, useEffect } from "react";
import { baseUrl, getRequest, putRequest } from "../utils/service";
import { API_ENDPOINT } from "../utils/api-endpoint";
import Cookies from "js-cookie";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [userProfiles, setUserProfiles] = useState(null);
  const [isUserProfilesLoading, setIsUserProfilesLoading] = useState(false);
  const [userProfilesError, setUserProfilesError] = useState(null);

  // Create state to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    country: "",
    city: "",
    image: null,
  });

  // MODAL
  const [isModalLoadingVisible, setIsModalLoadingVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
  };

  useEffect(() => {
    if (userProfiles) {
      setFormData({
        fullName: userProfiles?.UserProfile?.fullName || "",
        phoneNumber: userProfiles?.UserProfile?.phoneNumber || "",
        country: userProfiles?.UserProfile?.country || "",
        city: userProfiles?.UserProfile?.city || "",
        image: userProfiles?.UserProfile?.profilePicture || null,
      });
    }
  }, [userProfiles]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsModalLoadingVisible(true);

      const formDataObj = new FormData();
      formDataObj.append("fullName", formData.fullName);
      formDataObj.append("phoneNumber", formData.phoneNumber);
      formDataObj.append("country", formData.country);
      formDataObj.append("city", formData.city);
      formDataObj.append("image", formData.image);

      // Get the token directly from cookies
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await putRequest(
        `${baseUrl}${API_ENDPOINT.UPDATE_PROFILE}`,
        formDataObj,
        {
          Authorization: `Bearer ${token}`, // Use token directly
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      console.log("Profile updated successfully", responseData);
      setIsModalLoadingVisible(false);
      setIsSuccessModalVisible(true); // Show success modal
    } catch (error) {
      console.error("Error updating profile", error.message);
    }
  };

  useEffect(() => {
    const getUserProfiles = async () => {
      // Get the token directly from cookies
      const token = Cookies.get("token");

      if (!token) {
        setUserProfilesError({
          error: "Token not found",
        });
        return;
      }

      try {
        const response = await getRequest(
          `${baseUrl}${API_ENDPOINT.AUTH_USER}`,
          {
            Authorization: `Bearer ${token}`, // Use token directly
          }
        );

        setIsUserProfilesLoading(false);

        if (response.error) {
          return setUserProfilesError(response);
        }

        setUserProfiles(response.data.user);
      } catch (error) {
        setIsUserProfilesLoading(false);
        setUserProfilesError({
          error: "An error occurred while fetching user profiles",
        });
      }
    };

    getUserProfiles();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        userProfiles,
        isUserProfilesLoading,
        userProfilesError,
        formData,
        setFormData,
        handleFormSubmit,

        isModalLoadingVisible,
        isSuccessModalVisible,
        handleSuccessModalClose,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
