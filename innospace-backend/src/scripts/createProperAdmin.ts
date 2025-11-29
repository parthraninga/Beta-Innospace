import mongoose from 'mongoose';
import User from '../models/User';

async function createProperAdmin() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innospace';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Delete existing admin user
    await User.deleteOne({ email: 'admin@innospace.com' });
    console.log('Deleted existing admin user');

    // Create admin user with PLAIN password (let the model hash it)
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@innospace.com',
      password: 'admin123', // Plain password - model will hash it
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Created admin user:', {
      id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
    });

    // Verify the password works
    const testUser = await User.findById(adminUser._id).select('+password');
    if (testUser) {
      const isMatch = await testUser.comparePassword('admin123');
      console.log('🔐 Password verification:', isMatch ? '✅ MATCH' : '❌ NO MATCH');
    }

    console.log('\\n🎉 Admin user created successfully!');
    console.log('📋 Login Credentials:');
    console.log('Email: admin@innospace.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\\nDisconnected from MongoDB');
  }
}

createProperAdmin();