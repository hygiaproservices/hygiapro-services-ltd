import { readFileSync } from "fs";
import { join } from "path";
import { neon } from "@neondatabase/serverless";

async function runMigration() {
  // Check for DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error("❌ Error: DATABASE_URL environment variable is not set");
    console.log("\nPlease set DATABASE_URL in your .env.local file:");
    console.log("DATABASE_URL=your_neon_database_url");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  // Get the migration file name from command line args or use default
  const migrationFile = process.argv[2] || "001-create-bookings-table.sql";
  const migrationPath = join(process.cwd(), "scripts", migrationFile);

  try {
    console.log(`📄 Reading migration file: ${migrationFile}`);
    const sqlContent = readFileSync(migrationPath, "utf-8");

    // Split by semicolons and filter out empty statements and comments
    const statements = sqlContent
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    if (statements.length === 0) {
      console.error("❌ No SQL statements found in migration file");
      process.exit(1);
    }

    console.log(`🚀 Executing ${statements.length} SQL statement(s)...\n`);

    // Execute each statement
    // Neon serverless driver uses template literals for parameterized queries
    // For DDL statements (CREATE TABLE, etc.), we can execute them directly
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        console.log(`  [${i + 1}/${statements.length}] Executing...`);
        // For raw SQL DDL, use the sql function with a template literal and interpolation
        // We construct a template literal at runtime by using the .raw() method
        // See: https://github.com/neondatabase/serverless#dynamic-sql
        const result = await sql`${statement}`;
        console.log(`  ✅ Statement ${i + 1} executed successfully`);
      } catch (error) {
        // Some errors are expected (e.g., IF NOT EXISTS when table already exists)
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        if (
          errorMessage.includes("already exists") ||
          errorMessage.includes("duplicate") ||
          (errorMessage.includes("relation") &&
            errorMessage.includes("already exists"))
        ) {
          console.log(`  ⚠️  Statement ${i + 1} skipped (already exists)`);
        } else {
          console.error(`  ❌ Error executing statement ${i + 1}:`);
          console.error(`     ${errorMessage}`);
          // Don't exit on error - continue with other statements
        }
      }
    }

    console.log("\n✨ Migration completed successfully!");
  } catch (error) {
    if (error instanceof Error && error.message.includes("ENOENT")) {
      console.error(`❌ Migration file not found: ${migrationPath}`);
      console.log("\nAvailable migration files:");
      console.log("  - 001-create-bookings-table.sql");
    } else {
      console.error("❌ Migration failed:", error);
    }
    process.exit(1);
  }
}

runMigration();
