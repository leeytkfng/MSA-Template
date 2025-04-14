FROM --platform=linux/amd64 node:20

WORKDIR /app

# 의존성 설치를 위한 최소 복사
COPY package.json ./
COPY yarn.lock ./
RUN corepack enable && corepack prepare yarn@1.22.22 --activate
RUN yarn install --ignore-optional

# 이후 전체 소스 복사
COPY . .

CMD ["yarn", "dev"]
