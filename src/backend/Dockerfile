FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

COPY package*.json ./

COPY entrypoint.sh .

RUN chmod +x ./entrypoint.sh

EXPOSE 3000 9229

ENTRYPOINT ["./entrypoint.sh"]
