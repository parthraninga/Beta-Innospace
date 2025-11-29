import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';

async function createNewAdmin() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innospace';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Delete existing admin user
    await User.deleteOne({ email: 'admin@innospace.com' });
    console.log('Deleted existing admin user');

    // Create new admin user with proper password hashing
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@innospace.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Created new admin user:', {
      id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
    });

    // Test the password immediately
    const testUser = await User.findById(adminUser._id).select('+password');
    if (testUser) {
      const isMatch = await testUser.comparePassword(password);
      console.log('🔐 Password verification:', isMatch ? '✅ MATCH' : '❌ NO MATCH');
    }

    console.log('\\n📋 Admin Login Credentials:');
    console.log('Email: admin@innospace.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\\nDisconnected from MongoDB');
  }
}

createNewAdmin();