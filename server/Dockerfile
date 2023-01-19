# syntax=docker/dockerfile:1.4

FROM octoblu/pnpm as base
WORKDIR /home/node
COPY ./ /home/node/app
WORKDIR /home/node/app
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
ARG PORT=8000

RUN JWT_SECRET=$JWT_SECRET DATABASE_HOST=$DATABASE_HOST DATABASE_PORT=$DATABASE_PORT DATABASE_NAME=$DATABASE_NAME DATABASE_USERNAME=$DATABASE_USERNAME DATABASE_PASSWORD=$DATABASE_PASSWORD DATABASE_SSL=$DATABASE_SSL ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET API_TOKEN_SALT=$API_TOKEN_SALT PORT=$PORT pnpm build

WORKDIR /home/node

##

FROM octoblu/pnpm


WORKDIR /home/node/app

COPY --from=builder /home/node/app/package.json ./package.json
COPY --from=builder /home/node/app/dist/ ./dist/
COPY --from=builder /home/node/app/node_modules/ ./node_modules/

CMD ["pnpm", "run", "start"]