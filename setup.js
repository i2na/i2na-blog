import inquirer from "inquirer";
import { saveConfig } from "./cli/config.js";
import chalk from "chalk";
import path from "path";

async function setup() {
    console.log(chalk.bold("\n🗂️  Heymark CLI Setup\n"));
    console.log(chalk.dim("Please provide the following information:\n"));

    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "postsGitRemote",
            message: "Posts Git repository URL:",
        },
        {
            type: "input",
            name: "postsRepoPath",
            message: "Posts folder (local absolute path):",
            validate: (input) => {
                if (!input || input.trim() === "") {
                    return "Posts folder path is required";
                }
                if (!path.isAbsolute(input)) {
                    return "Please provide an absolute path";
                }
                return true;
            },
        },
    ]);

    await saveConfig({
        postsGitRemote: answers.postsGitRemote,
        postsRepoPath: answers.postsRepoPath,
    });

    console.log(chalk.green("\n✓ Configuration saved to ~/.heymark-config.json"));
    console.log(chalk.dim("\nNext steps:"));
    console.log(chalk.dim("  1. yarn link"));
    console.log(chalk.dim("  2. heymark call"));
}

setup().catch((error) => {
    console.error(chalk.red("\n✗ Setup failed"));
    console.error(chalk.dim(error.message));
    process.exit(1);
});
