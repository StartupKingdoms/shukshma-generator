FROM node:13 as base_build

WORKDIR /usr/src/active-content-1593002800676

COPY ./package.json ./

RUN npm install

COPY ./ ./

FROM node:13-alpine 

COPY --from=base_build /usr/src/active-content-1593002800676 ./  

CMD ["npm","start"]
