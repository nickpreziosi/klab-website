# Environment Variables Setup

## Setting up SANITY_API_TOKEN

To run the article population script, you need to set your Sanity API token.

### Step 1: Get Your Token

1. Go to https://sanity.io/manage
2. Select your project (mp87vpva)
3. Navigate to **API** → **Tokens**
4. Click **Add API token**
5. Give it a name (e.g., "Article Population Script")
6. Set permissions to **Editor**
7. Copy the token

### Step 2: Set the Token

Create a `.env` file in the project root (same directory as `package.json`):

```bash
# In the project root directory
touch .env
```

Then add your token to the file:

```
SANITY_API_TOKEN=your-actual-token-here
```

**Important:**
- `.env` is already in `.gitignore`, so it won't be committed to git
- Never commit your API token to version control
- Replace `your-actual-token-here` with the actual token you copied

### Alternative: Set in Terminal (Temporary)

You can also set it temporarily in your terminal session:

```bash
export SANITY_API_TOKEN="your-token-here"
```

This only lasts for the current terminal session.

### Verify It's Set

You can verify the token is loaded by running:

```bash
node -e "require('dotenv').config({ path: '.env' }); console.log(process.env.SANITY_API_TOKEN ? 'Token is set' : 'Token not found')"
```

Or the script will tell you if the token is missing when you run it.
