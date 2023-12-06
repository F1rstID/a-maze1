# Step 1 : Build
FROM node:18 AS builder
# Work Directory 설정
WORKDIR /app
# 패키지 설치를 위한 Package.json 복사
COPY ["package.json" , "package-lock.json" , "./"]
# package.json 에 작성된 package 설치
RUN npm install
# Build를 위한 파일 복사
COPY ["./", "./"]

# Step 2 : Run
FROM node:18-alpine
# Work Directory 설정
WORKDIR /app
# Stemp 1의 builder에서 build된 프로젝트를 복사
COPY --from=builder /app ./
# npm run start:prod
CMD ["npm" , "run" ,"start"]