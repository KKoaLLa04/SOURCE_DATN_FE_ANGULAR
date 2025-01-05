# Bước 1: Sử dụng image node chính thức làm nền tảng
FROM node:18 AS build

# Bước 2: Đặt thư mục làm việc
WORKDIR /app

# Bước 3: Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Bước 4: Cài đặt các phụ thuộc của dự án
RUN npm install

# Bước 5: Sao chép tất cả mã nguồn vào container
COPY . .

# Bước 6: Xây dựng dự án Angular
RUN npm run build --prod

# Bước 7: Tạo image chạy ứng dụng (dùng nginx để phục vụ ứng dụng Angular)
FROM nginx:alpine

# Bước 8: Sao chép các file build của Angular từ build container vào nginx container
COPY --from=build /app/dist/ /usr/share/nginx/html

# Bước 9: Mở cổng 80 để phục vụ ứng dụng
EXPOSE 80

# Bước 10: Chạy nginx khi container bắt đầu
CMD ["nginx", "-g", "daemon off;"]
