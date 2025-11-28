# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Update package.json:**
   - Replace `YOUR_USERNAME` in `package.json` with your GitHub username
   - Update repository URLs

4. **Test locally:**
   ```bash
   # Set your OpenAI API key
   export OPENAI_API_KEY=sk-your-key-here
   
   # Run example
   npx ts-node examples/basic-usage.ts
   ```

5. **Connect to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Event Schema parser"
   git remote add origin https://github.com/YOUR_USERNAME/ai-event-schema.git
   git branch -M main
   git push -u origin main
   ```

6. **Publish to npm:**
   ```bash
   npm login
   npm publish --access public
   ```

## Next Steps

- Update README.md with your actual GitHub username
- Add badges to README (they'll work after publishing)
- Write tests (optional but recommended)
- Add CI/CD (GitHub Actions)

