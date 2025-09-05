# **quizly-mygcse**

A personal GCSE quiz platform for my needs (and hopefully others), while getting experience in the coding world.

## Installation

### Setup the codebase
Clone the repo
   - With git: `git clone https://github.com/BlueHouseProducts/quizly-mygcse.git`
   - With the Github CLI: `gh repo clone BlueHouseProducts/quizly-mygcse`

### Setup Appwrite
- You can [self host Appwrite](https://appwrite.io/docs/advanced/self-hosting) or use the [Appwrite cloud](https://cloud.appwrite.io)
- Install the [Appwrite CLI](https://appwrite.io/docs/tooling/command-line/installation)<br>
  *(With npm: `npm install -g appwrite-cli`)*

### Set Up Your Appwrite Project
We'll use the Appwrite CLI to set up the project.

1. **Log in to the Appwrite CLI**
    - Run `appwrite login`
    - If you're using a self-hosted instance you need to include the endpoint:
        ```bash
        appwrite login --endpoint "<URL_HERE>"
        ```
2. Push the project configuration to appwrite

    We'll use the appwrite push command. You'll be prompted to select one option, please select the following options (only one can be selected each time you run the command):

    - Settings

    - Functions

    - Collections

    - Teams

    If you're unsure what to select, just run appwrite push for each option — it’s safe, and if there's nothing to push, nothing will happen. (And I might have forgotten one, I've not tried this yet)

3. In appwrite.json, set `projectId` to your appwrite project id. In .env, configure the variables to the new things. (self-explanitory)

### Last steps
1. Run `npm install` to install all npm packages used in the project
2. To add the quizlets to the database, install the latest quizlet data at [the quiz_collections folder on Github](https://github.com/BlueHouseProducts/quizly-mygcse/tree/main/quiz_collections) (you should do this whenever a new update comes out, view the **update** section), run `npm run push:quizes {document_id} {json file e.g. [v0.1.0_data.json] }`
3. Run `npm run doctor` to clear all the things you don't need, and check everything is ready!

So you've done!
Let's get started! Either:
- Run `npm run dev` to start the developer server
- Build the project with `npm run build` and start it with `npm run start`

## Update
1. Clear the quizlet database using `npm run clear:quizes`
2. Get the latest quiz collection from [the quiz_collections folder on Github](https://github.com/BlueHouseProducts/quizly-mygcse/tree/main/quiz_collections)
