# syntax=docker/dockerfile:1.4

FROM node:18-alpine as base
WORKDIR /home/node
COPY --link ./ /home/node/app
RUN chown -R node:node ./app
USER node
WORKDIR /home/node/app
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN pnpm install

FROM base as builder

ARG JWT_SECRET
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_NAME
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG DATABASE_SSL
ARG ADMIN_JWT_SECRET
ARG API_TOKEN_SALT

RUN JWT_SECRET=$JWT_SECRET DATABASE_HOST=$DATABASE_HOST DATABASE_PORT=$DATABASE_PORT DATABASE_NAME=$DATABASE_NAME DATABASE_USERNAME=$DATABASE_USERNAME DATABASE_PASSWORD=$DATABASE_PASSWORD DATABASE_SSL=$DATABASE_SSL ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET API_TOKEN_SALT=$API_TOKEN_SALT pnpm build

WORKDIR /home/node

##

FROM node:18-alpine

ENV PORT=8000

WORKDIR /home/node/app

RUN chown -R node:node /home/node/app
USER node
COPY --link --from=builder /home/node/app/package.json ./package.json
COPY --link --from=builder /home/node/app/dist/ ./dist/
COPY --link --from=builder /home/node/app/node_modules/ ./node_modules/

CMD ["pnpm", "run", "start"]