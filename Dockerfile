FROM node:20 AS build-env
COPY . /app
WORKDIR /app

# Install app dependencies
RUN npm ci

# Create dist directory
RUN npm run build 

FROM gcr.io/distroless/nodejs20-debian11

WORKDIR /app


# Install app dependencies
# COPY package*.json ./

# RUN npm ci --omit=dev

COPY --from=build-env /app ./

# Remove this line
COPY ./data ./ 

CMD ["dist/index.js"]