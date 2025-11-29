import mongoose from 'mongoose';
import User from '../models/User';

async function testLogin() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innospace';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Find the admin user
    const user = await User.findOne({ email: 'admin@innospace.com' }).select('+password');
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found:', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      hasPassword: !!user.password,
      passwordLength: user.password?.length
    });

    // Test password comparison
    const testPassword = 'admin123';
    const isMatch = await user.comparePassword(testPassword);
    
    console.log('🔐 Password test result:', isMatch ? '✅ MATCH' : '❌ NO MATCH');

    if (!isMatch) {
      console.log('🔧 Debugging password hash...');
      console.log('Stored password hash:', user.password);
      
      // Test direct bcrypt comparison
      const bcrypt = require('bcryptjs');
      const directMatch = await bcrypt.compare(testPassword, user.password);
      console.log('Direct bcrypt comparison:', directMatch ? '✅ MATCH' : '❌ NO MATCH');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testLogin();