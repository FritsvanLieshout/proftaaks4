import Axios from "axios";

const API_URL_FILE = "https://mytribes-api-rest-sprint3.herokuapp.com/mytribes";
//const API_URL_FILE = "http://localhost:8443/mytribes";

const API_URL_USER =
  "https://mytribes-api-rest-sprint3.herokuapp.com/mytribes/user";

const API_URL_PROFILE =
  "https://mytribes-api-rest-sprint3.herokuapp.com/mytribes/profile";
// const API_URL_PROFILE = "http://localhost:8443/mytribes/profile";

class RestService {
  async upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    return await Axios.post(`${API_URL_FILE}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getCurrentUser(userId) {
    return Axios.get(`${API_URL_USER}/profile?userId=${userId}`);
  }

  async updateUserProfileImage(userId, imageUrl) {
    return await Axios.put(`${API_URL_PROFILE}/upload`, {
      userId: userId,
      imageUrl: imageUrl,
    });
  }
}

export default new RestService();
