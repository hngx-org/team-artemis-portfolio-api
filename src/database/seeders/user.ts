import { connectionSource } from "../data-source";
import { User } from "../entity/user";

async function populateUsers() {
  // Create a TypeORM connection

  try {
    await connectionSource.initialize();
    // Get the repository for the User entity
    const userRepository = connectionSource.getRepository(User);
    // Create a new User instance
    const user = new User();
    user.username = "john_doe";
    user.firstName = "John";
    user.lastName = "Doe";
    user.email = "john@example.com";
    user.password = "password123";
    user.isVerified = true;

    // Save the user to the database
    let r = userRepository.create(user);
    console.log("first", r);
    await userRepository.save(r);

    console.log("Users have been populated.");
  } catch (error) {
    console.error("Error populating users:", error);
  } finally {
    // Close the TypeORM connection
    await connectionSource.destroy();
  }
}

// Call the function to populate users
populateUsers();
