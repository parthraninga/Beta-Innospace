import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';

async function debugPassword() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innospace';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Test 1: Manual password creation without model
    console.log('\\n=== Test 1: Manual bcrypt ===');
    const testPassword = 'admin123';
    const manualHash = await bcrypt.hash(testPassword, 12);
    const manualMatch = await bcrypt.compare(testPassword, manualHash);
    console.log('Manual hash:', manualHash);
    console.log('Manual verification:', manualMatch ? '✅ MATCH' : '❌ NO MATCH');

    // Test 2: Create user with plain password (let pre-save hash it)
    console.log('\\n=== Test 2: Using Model with plain password ===');
    await User.deleteOne({ email: 'test@example.com' });
    
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: testPassword, // Plain password
      role: 'admin',
    });
    
    console.log('Password before save:', testUser.password);
    await testUser.save();
    console.log('Password after save:', testUser.password);
    
    // Fetch the user and test password
    const savedUser = await User.findOne({ email: 'test@example.com' }).select('+password');
    if (savedUser) {
      console.log('Fetched password hash:', savedUser.password);
      const modelMatch = await savedUser.comparePassword(testPassword);
      console.log('Model verification:', modelMatch ? '✅ MATCH' : '❌ NO MATCH');
      
      // Test direct comparison
      const directMatch = await bcrypt.compare(testPassword, savedUser.password);
      console.log('Direct verification:', directMatch ? '✅ MATCH' : '❌ NO MATCH');
    }

    // Clean up
    await User.deleteOne({ email: 'test@example.com' });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\\nDisconnected from MongoDB');
  }
}

debugPassword();