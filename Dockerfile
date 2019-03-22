FROM node:8-alpine as build
WORKDIR /app
COPY . ./
RUN yarn && yarn build

FROM node:8-alpine
WORKDIR /app
COPY --from=build /app/dist .
EXPOSE 8080
CMD ["node", "index"]
