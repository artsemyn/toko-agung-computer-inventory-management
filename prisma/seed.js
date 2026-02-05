// Load environment variables FIRST before any imports
import 'dotenv/config'

// Use dynamic import to ensure env vars are loaded
import bcrypt from 'bcryptjs'

async function main() {
  console.log('🌱 Seeding database...')

  // Import prisma after dotenv is loaded
  const { prisma } = await import('../src/lib/prisma.js')

  // Clear existing data
  await prisma.stockLog.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const hashedPassword = await bcrypt.hash('password123', 10)

  await prisma.user.create({
    data: {
      name: 'Admin Owner',
      email: 'owner@techstore.com',
      password: hashedPassword,
      role: 'owner',
    }
  })

  await prisma.user.create({
    data: {
      name: 'Staff Gudang',
      email: 'gudang@techstore.com',
      password: hashedPassword,
      role: 'gudang',
    }
  })

  await prisma.user.create({
    data: {
      name: 'Staff Kasir',
      email: 'kasir@techstore.com',
      password: hashedPassword,
      role: 'kasir',
    }
  })

  console.log('✅ Users created')

  // Create Products
  await prisma.product.createMany({
    data: [
      // Processors
      { name: 'AMD Ryzen 5 5600X', category: 'Processor', brand: 'AMD', price: 2500000, stock: 15, minStock: 5, location: 'A1' },
      { name: 'AMD Ryzen 7 5800X', category: 'Processor', brand: 'AMD', price: 3800000, stock: 8, minStock: 3, location: 'A1' },
      { name: 'Intel Core i5-12400F', category: 'Processor', brand: 'Intel', price: 2300000, stock: 12, minStock: 5, location: 'A2' },
      { name: 'Intel Core i7-12700K', category: 'Processor', brand: 'Intel', price: 5200000, stock: 5, minStock: 2, location: 'A2' },

      // VGA
      { name: 'NVIDIA RTX 4060', category: 'VGA', brand: 'NVIDIA', price: 5500000, stock: 6, minStock: 3, location: 'B1' },
      { name: 'NVIDIA RTX 4070', category: 'VGA', brand: 'NVIDIA', price: 9500000, stock: 3, minStock: 2, location: 'B1' },
      { name: 'AMD RX 7600', category: 'VGA', brand: 'AMD', price: 4500000, stock: 8, minStock: 3, location: 'B2' },

      // RAM
      { name: 'Kingston DDR4 16GB 3200MHz', category: 'RAM', brand: 'Kingston', price: 650000, stock: 25, minStock: 10, location: 'C1' },
      { name: 'Corsair DDR4 32GB 3600MHz', category: 'RAM', brand: 'Corsair', price: 1500000, stock: 10, minStock: 5, location: 'C1' },
      { name: 'G.Skill DDR5 32GB 6000MHz', category: 'RAM', brand: 'G.Skill', price: 2200000, stock: 5, minStock: 3, location: 'C2' },

      // Storage
      { name: 'Samsung 970 EVO Plus 1TB', category: 'Storage', brand: 'Samsung', price: 1500000, stock: 15, minStock: 5, location: 'D1' },
      { name: 'WD Blue SN580 1TB', category: 'Storage', brand: 'Western Digital', price: 1100000, stock: 20, minStock: 8, location: 'D1' },
      { name: 'Seagate Barracuda 2TB HDD', category: 'Storage', brand: 'Seagate', price: 850000, stock: 12, minStock: 5, location: 'D2' },

      // Peripherals
      { name: 'Logitech G502 Hero', category: 'Mouse', brand: 'Logitech', price: 850000, stock: 0, minStock: 5, location: 'E1' },
      { name: 'Razer DeathAdder V3', category: 'Mouse', brand: 'Razer', price: 1200000, stock: 7, minStock: 3, location: 'E1' },
      { name: 'Keychron K8 Pro', category: 'Keyboard', brand: 'Keychron', price: 1800000, stock: 4, minStock: 2, location: 'E2' },
      { name: 'Royal Kludge RK84', category: 'Keyboard', brand: 'Royal Kludge', price: 750000, stock: 10, minStock: 5, location: 'E2' },

      // Monitor
      { name: 'LG 27GP850-B 27" 165Hz', category: 'Monitor', brand: 'LG', price: 5500000, stock: 3, minStock: 2, location: 'F1' },
      { name: 'ASUS VG249Q 24" 144Hz', category: 'Monitor', brand: 'ASUS', price: 2800000, stock: 6, minStock: 3, location: 'F1' },
    ]
  })

  console.log('✅ Products created')

  console.log('🎉 Seeding completed!')

  await prisma.$disconnect()
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
