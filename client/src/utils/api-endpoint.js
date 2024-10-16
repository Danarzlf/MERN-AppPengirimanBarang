//  API Endpoint
export const API_ENDPOINT = {
  
  BASE_URL : "http://localhost:8000/api/v1",

  // USERS
  USER_LOGIN: "/users/login", // [POST] Login User
  USER_REGISTER: "/users/register", // [POST] Register User
  VERIFY_OTP: "/users/verify-otp", // [PUT] Verify OTP User
  FORGET_PASS: "/users/forget-password", // [POST] Forgot Password
  UPDATE_PASS: "/users/update-password", // [PUT] Update Password
  CHANGE_PASSWORD: "/users/change-password", // [PUT] Change Password
  AUTH_USER: "/users/authenticate", // [GET] Get User by Authenticate
  GET_ALL_USER: "/users/all-users", // [GET] Get All User
  GET_USER_BY_ID: "/users/:id", // [GET] Get User id
  LOGOUT_USER: "/users/logout", // [GET] Get User id

  // GOOGLE
  GOOGLE : "/users/google", // [GET] Login User With Google
  GOOGLE_CALLBACK: "/users/google/callback", // [GET] Google Callback

  // USER PROFILE
  UPDATE_PROFILE: "/user-profiles/update-profile", // [PUT] Edit User by Authenticate

  //SHIPMENT
  CREATE_SHIPMENT: "/shipments/create-shipments",
  GET_SHIPMENT_BY_ID: "/shipments/:id",
  DELETE_SHIPMENT: "/shipments/:id",
  GET_ALL_SHIPMENT: "/shipments/",
  UPDATE_SHIPMENT: "/shipments/:id",
  TRACK_SHIPMENT: "/shipments/track/:noTrack",

  //SENDER
  CREATE_SENDER: "/senders/create-senders",
  UPDATE_SENDER: "/senders/:senderId",
  GET_ALL_SENDER: "/senders/",

  //RECIPIENT
  CREATE_RECIPIENT: "/recipients/create-recipients",
  UPDATE_RECIPIENT: "/recipients/:recipientId",
  GET_ALL_RECIPIENT: "/recipients/",
  
  //PAYMENT
  CREATE_PAYMENT: "/payments/",
  MIDTRANS_CALLBACK: "/payments/webhook/midtrans",

  //PACKAGE
  CREATE_PACKAGE: "/packages/create-packages",
  UPDATE_PACKAGE: "/packages/:packageId",
  GET_ALL_PACKAGE: "/packages/",

  // NOTIFICATIONS
  GET_ALL_NOTIFICATIONS: "/notification", // [GET] Get All Notification by Authentication
  CREATE_NOTIFICATIONS: "/notification", // [POST] Create Notification
  UPDATE_NOTIFICATIONS: "/notification/markAsRead", // [PUT] Update Notification by Authentication
  DELETE_NOTIFICATIONS: "/notification/:id", // [PUT] Update Notification by Authentication
  
  // DROP POINT
  CREATE_DROP_POINT: "/drop-point/", // [GET] Get All Notification by Authentication
  UPDATE_DROP_POINT: "/drop-point/:dropPointId", // [POST] Create Notification
  GET_DROP_POINT_BY_ID: "/drop-point/:dropPointId", // [PUT] Update Notification by Authentication
  GET_ALL_DROP_POINT: "/drop-point/", // [PUT] Update Notification by Authentication
  DELETE_DROP_POINT: "/drop-point/:dropPointId", // [PUT] Update Notification by Authentication

  //COURIER
  GET_ALL_COURIERS: "/couriers", // [GET] Get all couriers by authentication
  CREATE_COURIER: "/couriers/create-courier", // [POST] Create a new courier
  UPDATE_COURIER: "/couriers/:courierId", // [PUT] Update a specific courier by ID
  DELETE_COURIER: "/couriers/:courierId", // [DELETE] Delete a specific courier by ID
  GET_COURIER_BY_ID: "/couriers/:courierId", // [GET] Get specific courier by ID

  //COST ESTIMATION
  GET_ALL_COST_ESTIMATIONS: "/cost-estimation", // [GET] Get all cost estimations
  CREATE_COST_ESTIMATION: "/cost-estimation", // [POST] Create a new cost estimation
  GET_COST_ESTIMATION_BY_ID: "/cost-estimation/:id", // [GET] Get a specific cost estimation by ID
  UPDATE_COST_ESTIMATION_BY_ID: "/cost-estimation/:id", // [PUT] Update a specific cost estimation by ID
  DELETE_COST_ESTIMATION: "/cost-estimation/:id", // [DELETE] Delete a specific cost estimation by ID
  ESTIMATE_COST: "/cost-estimation/estimateCost", // [POST] Estimate cost
  ESTIMATE_COST_BY_CITY_NAME: "/cost-estimation/estimateCostByCityName", // [POST] Estimate cost by city name

  //CITY
  GET_ALL_CITY: "/city", // [GET] Get all city
  CREATE_CITY: "/city", // [POST] Create a new city
  GET_CITY_BY_ID: "/city/:cityId", // [GET] Get a specific city by ID
  UPDATE_CITY_BY_ID: "/city/:cityId", // [PUT] Update a specific city by ID
  DELETE_CITY_BY_ID: "/city/:cityId", 

};
