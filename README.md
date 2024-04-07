### 套件安裝

``` bash
pnpm i
```

### Config

所需 Config 已經列在 ConfigService，可以在 root 底下建立 `.env`，自定義 value

### 啟動

``` bash
npm run start:dev
```


### 測試

``` bash
npm run test
```

### DB

使用 MSSQL 並跑在 docker

``` bash
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=admin2024@WEI" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

### Migration

``` bash
cd src/database
npx knex migrate:latest
```

### Seed

``` bash
cd src/database
npx knex seed:run
```