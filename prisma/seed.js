const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  
  // Clear existing data
  await prisma.availability.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.eventType.deleteMany();
  await prisma.user.deleteMany();

  // Create User
  const user = await prisma.user.create({
    data: {
      id: "user_hobo_den_haag",
      name: "Hobo Hifi Den Haag",
      email: "denhaag@hobohifi.nl",
      timeZone: "Europe/Amsterdam",
    },
  });

  // Create EventType matching the default ID used in the booking UI
  await prisma.eventType.create({
    data: {
      id: "cm00000000000000000000000",
      slug: "luistersessie",
      title: "Luidspreker Luistersessie",
      description: "Exclusieve luistersessie van 60 minuten met high-end Bowers & Wilkins luidsprekers.",
      duration: 60,
      userId: user.id,
    },
  });

  // Create Schedule
  const schedule = await prisma.schedule.create({
    data: {
      id: "schedule_hobo",
      name: "Standaard Openingsuren",
      userId: user.id,
    },
  });

  // Create Availability (Mon - Sat, 10:00 to 18:00 / 17:00)
  const availabilities = [];
  // Mon-Fri: 10:00 - 18:00
  for (let day = 1; day <= 5; day++) {
    availabilities.push({
      dayOfWeek: day,
      startTime: "10:00",
      endTime: "18:00",
      scheduleId: schedule.id,
    });
  }
  // Sat: 10:00 - 17:00
  availabilities.push({
    dayOfWeek: 6,
    startTime: "10:00",
    endTime: "17:00",
    scheduleId: schedule.id,
  });

  await prisma.availability.createMany({
    data: availabilities,
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
