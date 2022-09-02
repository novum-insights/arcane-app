FROM --platform=linux/x86-64 node:lts-alpine

WORKDIR /app

RUN rm -rf *
COPY --from=build /app/package.json .
COPY --from=build /app/build .
RUN npx pnpm i
CMD ["node", "index.js"]
