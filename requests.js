import express from 'express'
import EmailRequest from './models/EmailRequestModel.js'

const requests = express.Router()

// Route for users to submit their email
requests.post('/submit-email', async (req, res) => {
  console.log("Wait, your email is submitting...");
  console.log(req.body);
  const { email } = req.body;
  console.log(email);

  try {
    await EmailRequest.create({ email: email });
    res.json({ message: 'Email submitted successfully for approval.' });
  } catch (error) {
    // Check if the error is a duplicate key error (MongoDB error code: 11000)
    if (error.code === 11000) {
      console.error("Duplicate email submission attempt:", error);
      res.status(400).json({ message: 'Email already submitted for approval.' });
    } else {
      console.error("Error submitting email:", error);
      res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
  }
});



// Route to fetch pending emails for admin approval
requests.get('/pending-emails', async (req, res) => {
  try {
    const pendingEmails = await EmailRequest.find({ status: 'pending' });
    res.json(pendingEmails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending emails.' });
  }
});

// Route for admin to approve an email
requests.post('/approve-email/:id', async (req, res) => {
  try {
    await EmailRequest.findByIdAndUpdate(req.params.id, { status: 'accepted' });
    res.json({ message: 'Email approved.' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving email.' });
  }
});

// Route for admin to reject an email
requests.post('/reject-email/:id', async (req, res) => {
  try {
    await EmailRequest.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.json({ message: 'Email rejected.' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting email.' });
  }
});

export default requests