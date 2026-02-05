// Import dotenv to load .env file
require('dotenv').config()

// Use ES modules syntax via dynamic import
;(async () => {
  const { prisma } = await import('./src/lib/prisma.js')

  try {
    console.log('🔄 Testing database connection...')
    await prisma.$connect()
    console.log('✅ Connection successful!')

    // Try to fetch users
    const users = await prisma.user.findMany()
    console.log(`✅ Found ${users.length} users in database`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    console.error('\nFull error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
})()
