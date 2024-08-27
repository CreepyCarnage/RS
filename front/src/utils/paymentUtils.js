    export const simulatePayment = (paymentMethod, amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a 90% success rate
        if (Math.random() < 0.9) {
          resolve({
            success: true,
            transactionId: Math.random().toString(36).substring(2, 15),
            message: "Payment successful"
          });
        } else {
          reject({
            success: false,
            message: "Payment failed. Please try again."
          });
        }
      }, 2000); // Simulate a 2-second processing time
    });
  };

  export const generateBookingNumber = () => {
    const prefix = 'BK';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };