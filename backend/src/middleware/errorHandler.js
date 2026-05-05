// Middleware untuk menangani error secara global di aplikasi
const errorHandler = (err, req, res, next) => {
  
  // Mencatat stack trace error ke console untuk keperluan debugging
  console.error(err.stack);

  // Mengambil status code dari error atau default ke 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  // Mengambil pesan error atau default ke pesan standar
  const message = err.message || 'Internal Server Error';

  // Mengirim respons JSON berisi pesan error ke client
  res.status(statusCode).json({
    message: message,
  });
};

module.exports = errorHandler;
