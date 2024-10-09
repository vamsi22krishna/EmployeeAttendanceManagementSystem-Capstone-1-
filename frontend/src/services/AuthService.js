import axios from 'axios';

const login = async (userEmail, password) => {
  return axios.post('http://localhost:8080/api/userlogin/login', { userEmail, password });
};

export default { login };



// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/userlogin/login';

// const authService = {
//   login: async (userLoginDto) => {
//     return await axios.post(API_URL, userLoginDto);
//   },
// };

// export default authService;
// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/userlogin/login';

// const login = (email, password) => {
//     return axios.post(API_URL, {
//         userEmail: email,
//         password: password,
//     })
//     .then(response => {
//         return response.data; // Return the data for further processing
//     })
//     .catch(error => {
//         // Handle error here
//         console.error('Error logging in:', error.response ? error.response.data : error.message);
//         throw error; // Rethrow to be handled where called
//     });
// };

// export default {
//     login,
// };
