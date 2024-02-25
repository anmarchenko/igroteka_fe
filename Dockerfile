# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.19.0
# Throw-away build stage to reduce size of final image
FROM node:${NODE_VERSION}-slim as build

WORKDIR /app
ENV NODE_ENV="production"

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY --link package-lock.json package.json ./

RUN npm ci --include=dev
COPY --link . .
RUN npm run build
RUN npm prune --omit=dev

# Step 2: Set up the production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
