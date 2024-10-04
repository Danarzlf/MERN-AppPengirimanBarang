import React, { useState, useEffect } from "react";
import NavBarNotification from "../../components/NavBar/NavBarNotification";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import NotificationDeleteModal from "../../components/Modals/NotificationDeleteModal";
import "../../components/styles/Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [displayedNotifications, setDisplayedNotifications] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("User"));
        const response = await fetch(
          "http://localhost:8000/api/v1/notification",
          {
            headers: {
              Authorization: `Bearer ${user.data.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.status) {
          setNotifications(data.data.notifications.reverse());
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleLoadMore = () => {
    setDisplayedNotifications(displayedNotifications + 5);
  };

  const handleShowLess = () => {
    setDisplayedNotifications(5);
  };

  const handleShowModal = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
    setShowModal(false);
  };

  const handleDeleteNotification = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      const response = await fetch(`http://localhost:8000/api/v1/notification/${selectedNotification._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.data.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status) {
        setNotifications(notifications.filter((notification) => notification._id !== selectedNotification._id));
        handleCloseModal();
      } else {
        console.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <>
      <NavBarNotification />
      <section className="section-notification">
        <div className="container">
          <h3 className="m-b-50 heading-line">
            Notifikasi <i className="fa fa-bell text-muted" />
          </h3>

          {notifications.length === 0 ? (
            <p className="text-center">Tidak ada notifikasi</p>
          ) : (
            <div className="notification-ui_dd-content">
              {notifications
                .slice(0, displayedNotifications)
                .map((notification, index) => (
                  <div
                    key={`${notification._id}-${index}`}
                    className={`notification-list ${
                      notification.isRead ? "read" : "unread"
                    }`}
                  >
                    <div className="notification-list_content">
                      <div className="notification-list_img">
                        <img src="notification_icon.png" alt="user" />
                      </div>
                      <div className="notification-list_detail">
                        <p className="fw-bold">{notification.title}</p>
                        <p
                          className="text-muted"
                          dangerouslySetInnerHTML={{
                            __html: notification.message,
                          }}
                        />
                      </div>
                    </div>
                    <div className="notification-list_feature-img">
                      <p>
                        {formatDistanceToNow(new Date(notification.updatedAt), {
                          locale: id,
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleShowModal(notification)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          )}

          {notifications.length > displayedNotifications && (
            <div className="text-center">
              <a href="#!" className="dark-link" onClick={handleLoadMore}>
                Tampilkan lebih banyak
              </a>
            </div>
          )}

          {displayedNotifications > 5 && (
            <div className="text-center">
              <a href="#!" className="dark-link" onClick={handleShowLess}>
                Tampilkan lebih sedikit
              </a>
            </div>
          )}
        </div>
      </section>

      <NotificationDeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleDeleteNotification}
        notificationTitle={selectedNotification ? selectedNotification.title : ""}
      />
    </>
  );
};

export default Notification;
