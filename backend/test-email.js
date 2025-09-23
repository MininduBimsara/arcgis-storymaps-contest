// test-email.js
require("dotenv").config();
const emailService = require("./services/emailService");

async function testEmail() {
  try {
    const testUser = {
      email: "test@example.com",
      username: "Test User",
    };

    const testUrl = "http://localhost:3000/verify-email?token=test123";

    console.log("Testing email service...");
    const result = await emailService.sendEmailVerification(testUser, testUrl);
    console.log("✅ Email sent successfully!");
    console.log("Message ID:", result.messageId);

    // If using Ethereal Email in development
    if (process.env.NODE_ENV === "development" && !process.env.SMTP_HOST) {
      console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(result));
    }
  } catch (error) {
    console.error("❌ Email failed:", error.message);
  }
}

testEmail();
