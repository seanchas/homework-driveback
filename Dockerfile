FROM node:8 as build
WORKDIR /app
COPY . ./
RUN yarn && yarn build

FROM node:8
WORKDIR /app
COPY --from=build /app/dist .
EXPOSE 8080
CMD ["node", "index"]
