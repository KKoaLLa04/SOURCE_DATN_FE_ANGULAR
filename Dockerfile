# Bước 1: Sử dụng image node chính thức làm nền tảng
FROM node:18 AS build

# Bước 2: Đặt thư mục làm việc
WORKDIR /app

# Bước 3: Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Bước 4: Cài đặt các phụ thuộc của dự án
RUN npm install --force

# Bước 5: Sao chép tất cả mã nguồn vào container
COPY . .

# Bước 6: Xây dựng dự án Angular (build để có thư mục dist)
# RUN npm run build

# Bước 7: Cài đặt Angular CLI và các công cụ cần thiết
RUN npm install -g @angular/cli

# Bước 8: Mở cổng 80 để phục vụ ứng dụng
EXPOSE 80

# Bước 9: Chạy ứng dụng bằng lệnh ng serve trên cổng 80
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "80", "--disable-host-check"]
