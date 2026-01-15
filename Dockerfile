FROM node:18-alpine

WORKDIR /app

# 1. Copy package files first (cache optimization)
COPY package*.json ./

# 2. Install dependencies
RUN npm install --production

# 3. Copy application code
COPY . .

# 4. Expose app port
EXPOSE 3000

# 5. Correct command (JSON form)
CMD ["npm", "start"]

